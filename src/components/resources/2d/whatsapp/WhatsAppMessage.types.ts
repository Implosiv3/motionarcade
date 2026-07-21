export type WhatsAppMessageProps = {
    text: string;
    time: string;
    direction: "sent" | "received";
    checkStatus: "none" | "sent" | "received" | "read";
    animation?: {
        type: "none" | "typing";
        duration: number;
    };
};