import {
    useEffect,
    useState,
} from "react";

import {
    useParams,
} from "react-router-dom";

import Canvas from "../../components/Canvas/Canvas";

import type {
    RenderConfig,
} from "../../features/animation/engine/scene/sceneTypes";


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
    ] = useState<RenderConfig | null>(
        null,
    );


    const [
        error,
        setError
    ] = useState<string | null>(
        null,
    );


    useEffect(() => {

        if (
            !sceneId
        ) {

            setError(
                "Scene ID is missing.",
            );

            return;
        }


        let cancelled =
            false;


        async function loadScene() {

            try {

                const response =
                    await fetch(
                        `${API_URL}/scenes/${sceneId}`,
                    );


                if (
                    !response.ok
                ) {

                    throw new Error(
                        `Failed to load scene: ${response.status} ${response.statusText}`,
                    );
                }


                const data:
                    {
                        id: string;
                        render: RenderConfig;
                    } =
                    await response.json();


                if (
                    cancelled
                ) {
                    return;
                }


                setScene(
                    data.render,
                );

            }
            catch (
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
                        : "Failed to load scene.",
                );
            }
        }


        loadScene();


        return () => {

            cancelled =
                true;
        };

    }, [
        sceneId,
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


    return (
        <Canvas
            scene={
                scene
            }
        />
    );
}