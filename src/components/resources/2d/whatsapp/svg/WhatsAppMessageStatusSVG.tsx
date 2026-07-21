type WhatsAppCheckSVGProps = {
    status: "none" | "sent" | "received" | "read"
};

export default function WhatsAppMessageStatusSVG({
    status = 'received'
}: WhatsAppCheckSVGProps) {
    const isSent = ['sent', 'received', 'read'].includes(status)
    const isDoubleChecked = ['received', 'read'].includes(status)
    const color = status == "read" ? "#53BDEB": "#AEBAC1"
    // TODO: We need to add the 'none' icon

    return (
        <svg
            width="18"
            height="12"
            viewBox="0 0 18 12"
            fill="none"
            aria-hidden="true"
        >
            {isSent && (
                <div>hola</div>
            )}

            {isDoubleChecked && (
                <path
                    d="M1 6.5 L4.5 10 L11 2"
                    stroke={color}
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            )}
            
            <path
                d="M7 6.5 L10.5 10 L17 2"
                stroke={color}
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
};

