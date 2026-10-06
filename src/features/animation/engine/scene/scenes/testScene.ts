import type {
    SceneConfig,
} from "./sceneConfigTypes";


export const testScene: SceneConfig = {

    width: 1920,

    height: 1080,

    fps: 60,

    duration: 5,


    elements: [

        {
            id: "message_1",

            type: "DiscordMessage",

            x: 960,

            y: 300,

            props: {
                username: "Usuario",
                timestamp: "hoy",
                message: "La vida es una tómbola",
            },

            start: {
                type: "time",
                value: 0,
            },

            end: {
                type: "time",
                value: 2.5,
            },

            anchor: {
                x: 0.5,
                y: 0.5,
            },

            tracks: [

                {
                    property: "scale",

                    easing: "easeInOutElastic",

                    keyframes: [

                        {
                            time: {
                                type: "progress",
                                value: 0,
                            },
                            value: 0,
                        },

                        {
                            time: {
                                type: "progress",
                                value: 0.5,
                            },
                            value: 2,
                        },

                    ],
                },


                {
                    property: "rotation",

                    type: "number",

                    easing: "linear",

                    keyframes: [

                        {
                            time: {
                                type: "progress",
                                value: 0,
                            },
                            value: -15,
                        },

                        {
                            time: {
                                type: "progress",
                                value: 1,
                            },
                            value: 0,
                        },

                    ],
                },

            ],
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
                date: "Ayer",
            },

            start: {
                type: "time",
                value: 0,
            },

            end: {
                type: "time",
                value: 5,
            },

            anchor: {
                x: 0.5,
                y: 0.5,
            },

            tracks: [

                {
                    property: "scale",

                    easing: "easeInOutElastic",

                    keyframes: [

                        {
                            time: {
                                type: "progress",
                                value: 0,
                            },
                            value: 0,
                        },

                        {
                            time: {
                                type: "progress",
                                value: 0.25,
                            },
                            value: 2,
                        },

                    ],
                },


                {
                    property: "rotation",

                    type: "number",

                    easing: "linear",

                    keyframes: [

                        {
                            time: {
                                type: "progress",
                                value: 0,
                            },
                            value: -15,
                        },

                        {
                            time: {
                                type: "progress",
                                value: 0.5,
                            },
                            value: 0,
                        },

                    ],
                },

            ],
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

            start: {
                type: "time",
                value: 0,
            },

            end: {
                type: "time",
                value: 2,
            },

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
                image: "/instagramtooltip.png",
            },

            start: {
                type: "time",
                value: 0,
            },

            end: {
                type: "time",
                value: 2,
            },

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
                image: "/minecraft-sword.png",
            },

            start: {
                type: "time",
                value: 0,
            },

            end: {
                type: "time",
                value: 2,
            },

            anchor: {
                x: 0.5,
                y: 0.5,
            },

            tracks: [],
        },


        {
            id: "phone",

            type: "Phone",

            x: 760,

            y: 240,

            start: {
                type: "time",
                value: 0,
            },

            end: {
                type: "time",
                value: 2,
            },

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
                model: "/models/pancreas3d.fbx",
            },

            start: {
                type: "time",
                value: 0,
            },

            end: {
                type: "time",
                value: 2,
            },

            anchor: {
                x: 0.5,
                y: 0.5,
            },

            tracks: [],
        },


        {
            id: "bar",

            type: "ProgressBar",

            x: 960,

            y: 900,

            start: {
                type: "time",
                value: 0,
            },

            end: {
                type: "time",
                value: 2,
            },

            anchor: {
                x: 0.5,
                y: 0.5,
            },

            tracks: [

                {
                    property: "scale",

                    keyframes: [

                        {
                            time: {
                                type: "progress",
                                value: 0,
                            },
                            value: 4,
                        },

                        {
                            time: {
                                type: "progress",
                                value: 1,
                            },
                            value: 4,
                        },

                    ],
                },


                {
                    property: "position.x",

                    easing: "easeOut",

                    type: "number",

                    keyframes: [

                        {
                            time: {
                                type: "progress",
                                value: 0,
                            },
                            value: 900,
                        },

                        {
                            time: {
                                type: "progress",
                                value: 0.5,
                            },
                            value: 1000,
                        },

                    ],
                },


                {
                    property: "offset.y",

                    keyframes: [

                        {
                            time: {
                                type: "progress",
                                value: 0,
                            },
                            value: -20,
                        },

                        {
                            time: {
                                type: "progress",
                                value: 0.5,
                            },
                            value: 20,
                        },

                    ],
                },


                {
                    property: "progress",

                    easing: "linear",

                    type: "number",

                    keyframes: [

                        {
                            time: {
                                type: "progress",
                                value: 0,
                            },
                            value: 0,
                        },

                        {
                            time: {
                                type: "progress",
                                value: 1,
                            },
                            value: 1,
                        },

                    ],
                },

            ],
        },


        {
            id: "bar2",

            type: "ProgressBar",

            x: 300,

            y: 700,

            start: {
                type: "time",
                value: 0,
            },

            end: {
                type: "time",
                value: 5,
            },

            anchor: {
                x: 0.5,
                y: 0.5,
            },

            tracks: [

                {
                    property: "progress",

                    type: "number",

                    easing: "easeOut",

                    keyframes: [

                        {
                            time: {
                                type: "progress",
                                value: 0,
                            },
                            value: 0,
                        },

                        {
                            time: {
                                type: "progress",
                                value: 1,
                            },
                            value: 0.88,
                        },

                    ],
                },


                {
                    property: "position.x",

                    type: "number",

                    easing: "easeOut",

                    keyframes: [

                        {
                            time: {
                                type: "progress",
                                value: 0,
                            },
                            value: -500,
                        },

                        {
                            time: {
                                type: "progress",
                                value: 0.5,
                            },
                            value: 300,
                        },

                    ],
                },


                {
                    property: "rotation",

                    type: "number",

                    easing: "linear",

                    keyframes: [

                        {
                            time: {
                                type: "progress",
                                value: 0,
                            },
                            value: -30,
                        },

                        {
                            time: {
                                type: "progress",
                                value: 0.5,
                            },
                            value: 0,
                        },

                    ],
                },

            ],
        },

    ],


    audio: [

        {
            src: "/audio/whoosh.mp3",

            start: {
                type: "time",
                value: 0,
            },

            end: {
                type: "time",
                value: 0.25,
            },

            volume: 3.0,
        },


        {
            src: "/audio/pop.mp3",

            start: {
                type: "time",
                value: 0.25,
            },

            end: {
                type: "time",
                value: 1 / 3,
            },

            volume: 1.0,
        },

    ],

};