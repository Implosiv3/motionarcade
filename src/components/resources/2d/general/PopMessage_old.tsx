import "./PopMessage.scss";
import { useComponentTimeline } from "../../../../features/animation/timeline/useComponentTimeline";
import { defineTimeline } from "../../../../features/animation/timeline/ComponentTimeline";


type PopMessageType =
    React.FC<PopMessageProps> & {
        canvas_mode:"2d";
    };


type PopMessageProps = {
    text?:string;
};


const timeline = defineTimeline({
    life: {
        startFrame: 0,
        endFrame: 180
    },

    animations: [
        {
            type: "shake",
            startFrame: 10,
            endFrame: 20,
            props: {
                amplitude: 1.2
            }
        },
        {
            type: "zoomIn",
            startFrame: 30,
            endFrame: 45,
            props: {
                fromScale: 1.5,
                toScale: 1.0
            }
        },
        {
            type: "zoomOut",
            startFrame: 45,
            endFrame: 50,
            props: {
                fromScale: 1.0,
                toScale: 1.5
            }
        }
    ]
});


export const PopMessage: PopMessageType = ({
    text = "Hello!"
}) => {
    const { visible, animatedStyle } = useComponentTimeline(timeline);

    if (!visible)
        return null;

    return (
        <div
            className="pop-message"
            style={animatedStyle}
        >
            {text}
        </div>
    );
};

PopMessage.canvas_mode = "2d";

export default PopMessage;