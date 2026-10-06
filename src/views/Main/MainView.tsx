import {
    useEffect,
    useState,
} from "react";

import {
    useParams,
} from "react-router-dom";

import Canvas from "../../components/Canvas/Canvas";

import {
    resolveScene,
} from "../../features/animation/engine/scene/resolveScene";

import type {
    SceneConfig,
} from "../../features/animation/engine/scene/sceneConfigTypes";


const API_URL =
    "http://localhost:4000";


export default function MainView() {

    const {
        sceneId,
    } =
        useParams<{
            sceneId: string;
        }>();


    const [
        scene,
        setScene
    ] = useState<SceneConfig | null>(
        null
    );


    const [
        error,
        setError
    ] = useState<string | null>(
        null
    );


    useEffect(() => {

        if (
            !sceneId
        ) {

            setError(
                "Scene ID is missing."
            );

            return;
        }


        let cancelled =
            false;


        async function loadScene() {

            try {

                const response =
                    await fetch(
                        `${API_URL}/scenes/${sceneId}`
                    );


                if (
                    !response.ok
                ) {

                    throw new Error(
                        `Failed to load scene: ${response.status} ${response.statusText}`
                    );
                }


                const data:
                    {
                        id: string;
                        config: SceneConfig;
                    } =
                    await response.json();


                if (
                    cancelled
                ) {
                    return;
                }


                setScene(
                    data.config
                );

            } catch (
                error
            ) {

                if (
                    cancelled
                ) {
                    return;
                }


                setError(
                    error instanceof Error
                        ? error.message
                        : "Failed to load scene."
                );
            }
        }


        loadScene();


        return () => {

            cancelled =
                true;
        };

    }, [
        sceneId
    ]);


    if (
        error !== null
    ) {

        return (
            <div>
                Error loading scene:
                {" "}
                {error}
            </div>
        );
    }


    if (
        scene === null
    ) {

        return (
            <div>
                Loading scene...
            </div>
        );
    }


    const renderScene =
        resolveScene(
            scene
        );


    console.log(
        "RESOLVED SCENE:",
        JSON.stringify(
            renderScene,
            null,
            4
        )
    );


    return (
        <Canvas
            scene={
                renderScene
            }
        />
    );
}