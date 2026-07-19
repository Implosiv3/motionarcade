import { type RefObject, useEffect, } from "react";
import { htmlToPng2d, type PngExportOptions } from "../exporters/htmlToPng2d";
import { registerExportPng } from "../exportRegistry";


export function useHtmlToPng2d(
    ref: RefObject<HTMLElement | null>,
    options?: PngExportOptions,
    // doTrimToBoundingBoxx?: boolean,
) {
    useEffect(() => {
        return registerExportPng(
            () => htmlToPng2d(ref, options)
        );
    }, [ref, options]);
}

