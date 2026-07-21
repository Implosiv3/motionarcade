import { useRef } from "react";
import "./PopMessage.scss";
import { useAnimationTimeline } from "../../../../features/animation/hooks/useAnimationTimeline";
import { entranceAnimations } from "../../../../features/animation/dom/presets";


type PopMessageProps = {
    text?: string;
};


export default function PopMessage({
    text = "Hello!"
}: PopMessageProps) {
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