const quizScene = {
 id:"quiz",

 type:"group",

 x:0,
 y:0,

 children:[

   {
    id:"image",
    type:"Image",
    x:500,
    y:100,
    startFrame:0,
    endFrame:300
   },


   {
    id:"answers",
    type:"group",
    x:300,
    y:500,

    startFrame:60,
    endFrame:300,

    children:[
        {
          id:"answer1",
          type:"Text"
        },
        {
          id:"answer2",
          type:"Text"
        },
        {
          id:"answer3",
          type:"Text"
        }
    ]
   }

 ]

}