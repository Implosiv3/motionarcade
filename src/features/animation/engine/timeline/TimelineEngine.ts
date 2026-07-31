import type { RenderContext } from "../render/RenderContext";


export type TimelineItem = {
    id: string;

    startFrame: number;
    endFrame: number;

    animations?: any[];

    [key: string]: any;
};


export type TimelineItemState = {
    visible: boolean;

    /**
     * Frame relativo dentro del componente.
     */
    localFrame: number;

    /**
     * Progreso 0-1 dentro de la vida del componente.
     */
    progress: number;
};


export class TimelineEngine {
    resolve(
        item: TimelineItem,
        context: RenderContext
    ): TimelineItemState {
        const visible = context.frame >= item.startFrame && context.frame <= item.endFrame;
        const duration = item.endFrame - item.startFrame;

        if (duration <= 0) {
            return {
                visible: false,
                localFrame: 0,
                progress: 0
            };
        }

        const localFrame = context.frame - item.startFrame;
        const progress =
            Math.max(
                0,
                Math.min(
                    1,
                    localFrame / duration
                )
            );

        return {
            visible,
            localFrame,
            progress
        };
    }

    getVisibleItems(
        items: TimelineItem[],
        context: RenderContext
    ) {
        return items.filter(
            item =>
                context.frame >= item.startFrame &&
                context.frame <= item.endFrame
        );
    }
}


export const timelineEngine = new TimelineEngine();