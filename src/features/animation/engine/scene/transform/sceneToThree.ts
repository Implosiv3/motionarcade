export const SCENE_SCALE = 0.01;

type SceneToThreeParams = {
    x: number;
    y: number;
    width: number;
    height: number;
};

export function sceneToThree({
    x,
    y,
    width,
    height,
}: SceneToThreeParams) {
    return {
        x:
            (x - width / 2) *
            SCENE_SCALE,

        y:
            (height / 2 - y) *
            SCENE_SCALE,
    };
}