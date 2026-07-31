export const testScene = {

    width:1920,

    height:1080,

    fps:60,

    duration:300,


    elements:[
        {
            id:"bar",
            type:"ProgressBar",
            x:300,
            y:500,
            startFrame:0,
            endFrame:300,
            tracks:[
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
                            frame:150,
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
                            frame:150,
                            value:0.5
                        }
                    ]
                }
            ]
        }
    ]
};