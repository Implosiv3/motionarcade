import { type WhatsAppMessageProps } from "./WhatsAppMessage.types";
import WhatsAppReceivedMessageTailSVG from "./svg/WhatsAppReceivedMessageTailSVG";
import WhatsAppSentMessageTailSVG from "./svg/WhatsAppSentMessageTailSVG";
import WhatsAppMessageStatusSVG from "./svg/WhatsAppMessageStatusSVG";
import "./WhatsAppMessage.css";
import { useAnimationStore } from "../../../../features/animation/store/animationStore";


export default function WhatsAppMessage({
    text = "hello world!",
    time = "9:41",
    direction = 'sent',
    checkStatus = 'sent',
    animation = {
        type: "typing",
        duration: 1
    },  
}: WhatsAppMessageProps) {
    const { progress } = useAnimationStore();

    let visibleText =
        animation.type === "typing"
            ? text.slice(
                0,
                Math.floor(
                    text.length * progress
                )
            )
        : text;

    if (visibleText == '') {
        visibleText = ' '
    }

    return (
        <div className={`wa ${
            direction == 'sent' ? 'wa-sent' : 'wa-received'
        }`}>
            {direction == 'sent' ? <WhatsAppSentMessageTailSVG /> : <WhatsAppReceivedMessageTailSVG />}

            <div className={`wa-text ${
                direction == 'sent' ? 'wa-text-sent' : 'wa-text-received'
            }`}>
                {visibleText}
            </div>

            <div className={`wa-meta ${
                direction == 'sent' ? 'wa-meta-sent' : 'wa-meta-received'
            }`}>
                <span>{time}</span>

                {direction == 'sent' && (
                    <WhatsAppMessageStatusSVG status={checkStatus} />
                )}
            </div>
        </div>
    );
}