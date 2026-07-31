export function PopMessage({

    text,

    propertyState

}){


    if(
        propertyState.visible === false
    ){

        return null;

    }


    return (
        <div>
            {text}
        </div>
    );

}