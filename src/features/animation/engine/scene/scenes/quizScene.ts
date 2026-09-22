import type {
    SceneData
} from "../../scene/sceneTypes";



export const quizScene:SceneData = {


    width:1920,

    height:1080,


    fps:30,


    duration:450,



    elements:[


        /*
         * Imagen principal
         */

        {

            id:"question-image",

            type:"Image",


            x:760,

            y:120,


            width:400,

            height:400,


            startFrame:0,

            endFrame:300,


            props:{

                src:"/images/question.png"

            },


            animations:[

                {

                    type:"zoomIn",

                    startFrame:0,

                    endFrame:30,


                    props:{

                        fromScale:0.5,

                        toScale:1

                    }

                }

            ]

        },



        /*
         * Grupo respuestas
         */

        {

            id:"answers",

            type:"group",


            x:300,

            y:600,


            startFrame:60,

            endFrame:300,


            children:[


                {

                    id:"answer-a",

                    type:"PopMessage",


                    x:0,

                    y:0,


                    startFrame:60,

                    endFrame:300,


                    props:{

                        text:"A) Madrid"

                    }

                },


                {

                    id:"answer-b",

                    type:"PopMessage",


                    x:0,

                    y:100,


                    startFrame:60,

                    endFrame:300,


                    props:{

                        text:"B) París"

                    }

                },


                {

                    id:"answer-c",

                    type:"PopMessage",


                    x:0,

                    y:200,


                    startFrame:60,

                    endFrame:300,


                    props:{

                        text:"C) Roma"

                    }

                }

            ]

        },



        /*
         * Barra de tiempo
         */

        {

            id:"timer",

            type:"ProgressBar",


            x:500,

            y:950,


            startFrame:150,

            endFrame:300,


            animations:[

                {

                    type:"property",

                    property:"progress",


                    startFrame:150,

                    endFrame:300,


                    props:{

                        from:0,

                        to:1

                    }

                }

            ]

        },



        /*
         * Respuesta correcta
         */

        {

            id:"correct-answer",

            type:"PopMessage",


            x:700,

            y:500,


            startFrame:300,

            endFrame:450,


            props:{

                text:"Respuesta correcta: B"

            },


            animations:[


                {

                    type:"fadeIn",

                    startFrame:300,

                    endFrame:330

                }

            ]

        }

    ]

};