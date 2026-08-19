export const testScene = {

    width:1920,

    height:1080,

    fps:60,

    duration:300,

    elements:[
        {
            id: "message_1",
            type: "DiscordMessage",
            x: 960,
            y: 300,
            props: {
                username: "Usuario",
                timestamp: "hoy",
                message: "caraculo"
            },
            startFrame: 0,
            endFrame: 150,
            anchor: {
                x: 0.5,
                y: 0.5,
            },
            tracks: [
                {
                    property:"scale",
                    easing: "easeInOutElastic",
                    keyframes:[
                        {
                            frame:0,
                            value:0
                        },
                        {
                            frame:75,
                            value:2
                        }
                    ]
                },
                {
                    property:"rotation",
                    type:"number",
                    easing:"linear",
                    keyframes:[
                        {
                            frame:0,
                            value:-15
                        },
                        {
                            frame:150,
                            value:0
                        }
                    ]
                }
            ]
        },
        {
            id: "message_2",
            type: "BookingReview",
            x: 960,
            y: 600,
            props: {
                name: "Manuel",
                country: "España",
                score: "9.7",
                scoreLabel: "Excelente",
                title: "Increíble, repetiría 100%",
                text: "Una auténtica pasada, tienes que venir sí o sí!",
                date: "Ayer"
            },
            // props: {
            //     username: "Usuario",
            //     timestamp: "hoy",
            //     message: "caraculo"
            // },
            startFrame: 0,
            endFrame: 300,
            anchor: {
                x: 0.5,
                y: 0.5,
            },
            tracks: [
                {
                    property:"scale",
                    easing: "easeInOutElastic",
                    keyframes:[
                        {
                            frame:0,
                            value:0
                        },
                        {
                            frame:75,
                            value:2
                        }
                    ]
                },
                {
                    property:"rotation",
                    type:"number",
                    easing:"linear",
                    keyframes:[
                        {
                            frame:0,
                            value:-15
                        },
                        {
                            frame:150,
                            value:0
                        }
                    ]
                }
            ]
        },
        {
            id:"bar",
            type:"ProgressBar",
            x: 960,
            y: 900,
            // width:800,
            // height:64,
            startFrame:0,
            endFrame:120,
            anchor:{
                x:0.5,
                y:0.5
            },
            tracks:[
                {
                    property:"scale",
                    keyframes:[
                        {
                            frame:0,
                            value:4
                        },
                        {
                            frame:150,
                            value:4
                        }
                    ]
                },
                {
                    property: "position.x",
                    easing:"easeOut",
                    type:"number",
                    keyframes:[
                        {
                            frame:0,
                            value: 900
                        },
                        {
                            frame:60,
                            value: 1000
                        }
                    ]
                },
                {
                    property:"offset.y",
                    keyframes:[
                        {
                            frame:0,
                            value:-20
                        },
                        {
                            frame:60,
                            value:20
                        }
                    ]
                },
                {
                    property:"progress",
                    easing:"linear",
                    type:"number",
                    keyframes:[
                        {
                            frame:0,
                            value:0
                        },
                        {
                            frame:120,
                            value:1
                        }
                    ]
                }
            ]
        },
        {
            id:"bar2",
            type:"ProgressBar",
            x:300,
            y:700,
            startFrame:0,
            endFrame:300,
            tracks:[
                {
                    property:"progress",
                    type:"number",
                    easing:"easeOut",
                    keyframes:[
                        {
                            frame:0,
                            value:0
                        },
                        {
                            frame:300,
                            value:0.88
                        }
                    ]
                },
                {
                    property:"position.x",
                    type:"number",
                    easing:"easeOut",
                    keyframes:[
                        {
                            frame:0,
                            value:-500
                        },
                        {
                            frame:150,
                            value:300
                        }
                    ]
                },
                {
                    property:"rotation",
                    type:"number",
                    easing:"linear",
                    keyframes:[
                        {
                            frame:0,
                            value:-30
                        },
                        {
                            frame:150,
                            value:0
                        }
                    ]
                }
            ]
        }
    ]
};