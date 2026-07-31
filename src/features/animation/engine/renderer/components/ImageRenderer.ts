import type { ComponentRenderer } from "../RendererRegistry";


export const ImageRenderer: ComponentRenderer = {


    render(
        component,
        state,
        context
    ) {

        const ctx =
            context.ctx;


        if(!ctx)
            return;


        ctx.save();


        ctx.translate(
            state.x ?? component.x,
            state.y ?? component.y
        );


        ctx.scale(
            state.scale ?? 1,
            state.scale ?? 1
        );


        ctx.globalAlpha =
            state.opacity ?? 1;


        ctx.drawImage(
            component.image,
            0,
            0,
            component.width,
            component.height
        );


        ctx.restore();

    }

};