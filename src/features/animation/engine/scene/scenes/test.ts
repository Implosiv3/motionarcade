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
            id: "rip-photo",
            type: "RipPhoto",
            x: 960,
            y: 540,
            props: {
                photo_url:
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSg6OlxdzbiRrCvXeSsUKpAx7D5iITnf7DIzW97G_mkgmJxPh_X2sMQUdi9&s=10",
            },
            startFrame: 0,
            endFrame: 120,
            anchor: {
                x: 0.5,
                y: 0.5,
            },
            tracks: [],
        },
        {
            id: "plane-image",
            type: "PlaneImage",
            x: 1560,
            y: 240,
            props: {
                image: "/instagramtooltip.png"
            },
            startFrame: 0,
            endFrame: 120,
            anchor: {
                x: 0.5,
                y: 0.5,
            },
            tracks: [],
        },
        {
            id: "voxelized-image",
            type: "VoxelizedImage",
            x: 360,
            y: 240,
            props: {
                image: "/minecraft-sword.png"
            },
            startFrame: 0,
            endFrame: 120,
            anchor: {
                x: 0.5,
                y: 0.5,
            },
            tracks: [],
        },
        {
            id: "phone",
            type: "Phone",
            x: 560,
            y: 240,
            // props: {
            //     image: "/minecraft-sword.png"
            // },
            startFrame: 0,
            endFrame: 120,
            anchor: {
                x: 0.5,
                y: 0.5,
            },
            tracks: [],
        },
        {
            id: "model-3d",
            type: "Model3D",
            x: 1360,
            y: 240,
            props: {
                model: "/models/pancreas3d.fbx"
            },
            startFrame: 0,
            endFrame: 120,
            anchor: {
                x: 0.5,
                y: 0.5,
            },
            tracks: [],
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
            anchor:{
                x:0.5,
                y:0.5
            },
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
    ],

    /*
    If the startFrame is out of the total
    scene duration, it will not be played
    in the final exported video.
    */
    audio: [
        {
            src: "/audio/whoosh.mp3",
            startFrame: 0,
        },
        {
            src: "/audio/pop.mp3",
            startFrame: 15,
        },
    ]
};