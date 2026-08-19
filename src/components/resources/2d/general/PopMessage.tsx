// import type { RenderContext } from "../../../../features/animation/engine/renderer/RenderContext";
import type { ElementState } from "../../../../features/animation/engine/scene/state/ElementState";
import "./PopMessage.scss";


type PopMessageProps = {
    text: string;
    state: ElementState;
    // context: RenderContext;
};


export default function PopMessage({
    text,
    state,
    // context,
}: PopMessageProps) {

    const {
        width,
        height,
    } = state.layout;

    const visible =
        state.properties.visible ??
        true;

    if (!visible) {
        return null;
    }

    const x =
        state.properties.x ??
        0;

    const y =
        state.properties.y ??
        0;

    const opacity =
        state.properties.opacity ??
        1;

    const scale =
        state.properties.scale ??
        1;

    const rotation =
        state.properties.rotation ??
        0;

    return (
        <div
            className="pop-message"
            style={{
                width,
                height,

                opacity,

                transform: `
                    translate(${x}px, ${y}px)
                    scale(${scale})
                    rotate(${rotation}deg)
                `,
            }}
        >
            {text}
        </div>
    );
}