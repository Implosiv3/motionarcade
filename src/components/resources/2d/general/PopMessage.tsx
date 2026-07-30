import { useRef } from "react";
import "./PopMessage.scss";
import { useAnimationTimeline } from "../../../../features/animation/hooks/useAnimationTimeline";
import { entranceAnimations } from "../../../../features/animation/dom/presets";
import type { ComponentMode } from "../../componentMode";


type PopMessageType =
    React.FC<PopMessageProps> & {
        canvas_mode: "2d";
    };

type PopMessageProps = {
    text?: string;
};


export const PopMessage: PopMessageType = ({
    text = "Hello!"
}: PopMessageProps) => {
    const rootRef = useRef<HTMLDivElement>(null);

    useAnimationTimeline(
        rootRef,
        tl => {
            entranceAnimations.fadeIn(
                tl,
                rootRef.current!
            );
        }
    );


    return (
        <div
            ref={rootRef}
            className="pop-message"
        >
            {text}
        </div>
    );
}

PopMessage.canvas_mode = "2d" satisfies ComponentMode;

export default PopMessage;