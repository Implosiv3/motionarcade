/*
This module has been inspired by:
- https://codepen.io/ste-vg/pen/rNjOgYv
*/

import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useLoader } from "@react-three/fiber";

import border_image from "../../assets/rip_photo_border.png";
import rip_image from "../../assets/rip_photo_rip.jpg";

import { useAnimationElement } from "@implosiv3/fr8mer-components";

interface RipPhotoProps {
    photo_url: string;
}

const ripVertexShader = `
    uniform float uTearAmount;
    uniform float uTearWidth;
    uniform float uTearXAngle;
    uniform float uTearYAngle;
    uniform float uTearZAngle;
    uniform float uTearXOffset;
    uniform float uXDirection;
    uniform float uRipSide;
    uniform float uRipSeed;

    varying vec2 vUv;
    varying float vAmount;

    mat4 rotationX(in float angle) {
        return mat4(
            1.0, 0, 0, 0,
            0, cos(angle), -sin(angle), 0,
            0, sin(angle), cos(angle), 0,
            0, 0, 0, 1
        );
    }

    mat4 rotationY(in float angle) {
        return mat4(
            cos(angle), 0, sin(angle), 0,
            0, 1.0, 0, 0,
            -sin(angle), 0, cos(angle), 0,
            0, 0, 0, 1
        );
    }

    mat4 rotationZ(in float angle) {
        return mat4(
            cos(angle), -sin(angle), 0, 0,
            sin(angle), cos(angle), 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        );
    }

    void main() {

        float ripAmount = 0.0;

        float yAmount =
            max(
                0.0,
                (uTearAmount - (1.0 - uv.y))
            );

        float zRotate =
            uTearZAngle * yAmount;

        float xRotate =
            uTearXAngle * yAmount;

        float yRotate =
            uTearYAngle * yAmount;

        vec3 rotation = vec3(
            xRotate * yAmount,
            yRotate * yAmount,
            zRotate * yAmount
        );

        float halfHeight =
            float(HEIGHT) * 0.5;

        float halfWidth =
            (float(WIDTH) - uTearWidth * 0.5) * 0.5;

        vec4 vertex = vec4(
            position.x +
                (halfWidth * uXDirection) -
                halfWidth,

            position.y +
                halfHeight,

            position.z,
            1.0
        );

        vertex =
            vertex *
            rotationY(rotation.y) *
            rotationX(rotation.x) *
            rotationZ(rotation.z);

        vertex.x +=
            uTearXOffset * yAmount +
            ripAmount +
            halfWidth;

        vertex.y -= halfHeight;

        vec4 modelPosition =
            modelMatrix * vertex;

        vec4 viewPosition =
            viewMatrix * modelPosition;

        vec4 projectedPosition =
            projectionMatrix * viewPosition;

        gl_Position =
            projectedPosition;

        vUv = uv;
        vAmount = yAmount;
    }
`;

const ripFragmentShader = `
    uniform sampler2D uMap;
    uniform sampler2D uRip;
    uniform sampler2D uBorder;

    uniform vec3 uShadeColor;
    uniform float uUvOffset;
    uniform float uRipSide;
    uniform float uTearXAngle;
    uniform float uShadeAmount;
    uniform float uTearWidth;
    uniform float uWhiteThreshold;
    uniform float uTearOffset;

    varying vec2 vUv;
    varying float vAmount;

    void main() {

        bool rightSide =
            uRipSide == 1.0;

        float ripAmount =
            -1.0;

        float width =
            float(WIDTH);

        float widthOverlap =
            (uTearWidth * 0.5) +
            width;

        bool frontSheet =
            uTearXAngle > 0.0;

        float xScale =
            widthOverlap /
            float(FULL_WIDTH);

        vec2 uvOffset =
            vec2(
                vUv.x * xScale +
                uUvOffset,
                vUv.y
            );

        vec4 textureColor =
            texture2D(
                uMap,
                uvOffset
            );

        vec4 borderColor =
            texture2D(
                uBorder,
                uvOffset
            );

        if (borderColor.r > 0.0) {
            textureColor =
                vec4(
                    vec3(0.95),
                    1.0
                );
        }

        float ripRange =
            uTearWidth /
            widthOverlap;

        float ripStart =
            rightSide
                ? 0.0
                : 1.0 - ripRange;

        float alpha =
            1.0;

        float ripX =
            (vUv.x - ripStart) /
            ripRange;

        float ripY =
            vUv.y * 0.5 +
            (0.5 * uTearOffset);

        vec4 ripCut =
            texture2D(
                uRip,
                vec2(ripX, ripY)
            );

        vec4 ripColor =
            texture2D(
                uRip,
                vec2(
                    ripX * 0.9,
                    ripY - 0.02
                )
            );

        float whiteness =
            dot(
                vec4(1.0),
                ripCut
            ) / 4.0;

        if (
            !rightSide &&
            whiteness <= uWhiteThreshold
        ) {
            whiteness =
                dot(
                    vec4(1.0),
                    ripColor
                ) / 4.0;

            if (
                whiteness >=
                uWhiteThreshold
            ) {
                textureColor =
                    ripColor;
            } else {
                alpha = 0.0;
            }
        }

        if (
            rightSide &&
            whiteness >=
            uWhiteThreshold
        ) {
            alpha = 0.0;
        }

        gl_FragColor =
            mix(
                vec4(
                    textureColor.rgb,
                    alpha
                ),
                vec4(
                    uShadeColor,
                    alpha
                ),
                vAmount *
                    uShadeAmount
            );
    }
`;

export function RipPhoto({
    photo_url,
}: RipPhotoProps) {

    const group =
        useRef<THREE.Group>(null);

    const left =
        useRef<THREE.Mesh>(null);

    const right =
        useRef<THREE.Mesh>(null);

    const [photo, rip, border] =
        useLoader(
            THREE.TextureLoader,
            [
                photo_url,
                rip_image,
                border_image,
            ]
        );

    const { progress } =
        useAnimationElement();

    [
        photo,
        rip,
        border,
    ].forEach((texture) => {
        texture.colorSpace =
            THREE.SRGBColorSpace;
    });

    /*
     * This is the visual size of the
     * complete photo in Three units.
     *
     * With SCENE_SCALE = 0.01:
     *
     * 6 units = 600 scene pixels
     * 4 units = 400 scene pixels
     */
    const sheet =
        useMemo(
            () => ({
                width: 3 * 1,
                height: 2 * 1,

                widthSegments: 30,
                heightSegments: 50,

                tearWidth: 0.4,

                left: {
                    uvOffset: 0,
                    ripSide: 0,
                    tearXAngle: -0.01,
                    tearYAngle: -0.1,
                    tearZAngle: 0.05,
                    direction: -1,
                    shadeAmount: 0.2,
                    shadeColor:
                        new THREE.Color(
                            "white"
                        ),
                },

                right: {
                    uvOffset:
                        (
                            (
                                6 -
                                0.4
                            ) /
                            6
                        ) * 0.5,

                    ripSide: 1,

                    tearXAngle: 0.2,

                    tearYAngle: 0.1,

                    tearZAngle: -0.1,

                    direction: 1,

                    shadeAmount: 0.4,

                    shadeColor:
                        new THREE.Color(
                            "black"
                        ),
                },
            }),
            []
        );

    const geometry =
        useMemo(
            () =>
                new THREE.PlaneGeometry(
                    sheet.width / 2 +
                        sheet.tearWidth / 2,

                    sheet.height,

                    sheet.widthSegments,

                    sheet.heightSegments
                ),
            [sheet]
        );

    const createMaterial =
        (
            side:
                | "left"
                | "right"
        ) =>
            new THREE.ShaderMaterial({

                defines: {

                    HEIGHT:
                        sheet.height,

                    WIDTH:
                        sheet.width / 2,

                    FULL_WIDTH:
                        sheet.width,

                    WIDTH_SEGMENTS:
                        sheet.widthSegments,

                    HEIGHT_SEGMENTS:
                        sheet.heightSegments,
                },

                transparent: true,

                uniforms: {

                    uMap: {
                        value: photo,
                    },

                    uRip: {
                        value: rip,
                    },

                    uBorder: {
                        value: border,
                    },

                    uRipSide: {
                        value:
                            sheet[
                                side
                            ].ripSide,
                    },

                    uTearWidth: {
                        value:
                            sheet.tearWidth,
                    },

                    uWhiteThreshold: {
                        value: 0.7,
                    },

                    uTearAmount: {
                        value: 0,
                    },

                    uTearOffset: {
                        value: 0.37,
                    },

                    uUvOffset: {
                        value:
                            sheet[
                                side
                            ].uvOffset,
                    },

                    uTearXAngle: {
                        value:
                            sheet[
                                side
                            ].tearXAngle,
                    },

                    uTearYAngle: {
                        value:
                            sheet[
                                side
                            ].tearYAngle,
                    },

                    uTearZAngle: {
                        value:
                            sheet[
                                side
                            ].tearZAngle,
                    },

                    uTearXOffset: {
                        value: 0,
                    },

                    uXDirection: {
                        value:
                            sheet[
                                side
                            ].direction,
                    },

                    uShadeColor: {
                        value:
                            sheet[
                                side
                            ].shadeColor,
                    },

                    uShadeAmount: {
                        value:
                            sheet[
                                side
                            ].shadeAmount,
                    },
                },

                vertexShader:
                    ripVertexShader,

                fragmentShader:
                    ripFragmentShader,
            });

    const leftMaterial =
        useMemo(
            () =>
                createMaterial(
                    "left"
                ),
            []
        );

    const rightMaterial =
        useMemo(
            () =>
                createMaterial(
                    "right"
                ),
            []
        );

    /*
     * The shader geometry is asymmetric
     * around its local origin.
     *
     * Compensate that here instead of
     * modifying SceneNode3D.
     *
     * This means:
     *
     * SceneNode3D (0, 0)
     *        ↓
     * RipPhoto center
     */
    const centeredX =
        (
            sheet.width / 2 -
            sheet.tearWidth / 2
        ) * 0.5;

    useEffect(() => {

        const tear =
            Math.min(
                progress * 1.5,
                1.5
            );

        [left, right].forEach(
            (ref) => {

                if (!ref.current) {
                    return;
                }

                const material =
                    ref.current
                        .material as
                        THREE.ShaderMaterial;

                material
                    .uniforms
                    .uTearAmount
                    .value =
                    tear;
            }
        );

        if (
            !group.current ||
            !left.current ||
            !right.current
        ) {
            return;
        }

        const p =
            progress > 0.55
                ? (progress - 0.55) /
                  0.45
                : 0;

        const gravity =
            Math.pow(
                p,
                2.2
            );

        /*
         * Keep the whole RipPhoto
         * centered on its SceneNode3D
         * while preserving the existing
         * animation.
         */
        group.current.position.x =
            centeredX;

        /*
         * Existing animation.
         */

        left.current.rotation.z =
            -gravity * 0.22;

        right.current.rotation.z =
            gravity * 0.22;

        left.current.position.x =
            -gravity * 0.18;

        right.current.position.x =
            gravity * 0.18;

        left.current.position.y =
            -gravity * 7;

        right.current.position.y =
            -gravity * 7.4;

        group.current.position.z =
            gravity * 0.6;

    }, [progress, centeredX]);

    useEffect(
        () =>
            () => {

                geometry.dispose();

                leftMaterial.dispose();

                rightMaterial.dispose();

            },
        [
            geometry,
            leftMaterial,
            rightMaterial,
        ]
    );

    return (
        <group
            ref={group}
        >
            <mesh
                ref={left}
                geometry={geometry}
                material={leftMaterial}
            />

            <mesh
                ref={right}
                geometry={geometry}
                material={rightMaterial}
                position-z={0.0001}
            />
        </group>
    );
}