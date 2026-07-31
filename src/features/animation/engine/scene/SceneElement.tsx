// TODO: I don't know if this is really needed
import React from "react";


type SceneElementProps = {
    children:React.ReactNode;
};

export default function SceneElement({
    children
}: SceneElementProps) {
    return children;
}