import {
    type RefObject,
    useEffect
} from "react";

import {
    htmlToPng2d,
    type PngExportOptions
} from "../exporters/htmlToPng2d";

import {
    registerExportNode,
    registerExportPng
} from "../exportRegistry";

export function useHtmlToPng2d(
    ref: RefObject<HTMLElement | null>,
    defaultOptions?: PngExportOptions
) {

    useEffect(() => {

        if (!ref.current) {
            return;
        }

        const unregisterNode =
            registerExportNode(
                ref.current
            );

        const unregisterPng =
            registerExportPng(
                (
                    options?: PngExportOptions
                ) =>
                    htmlToPng2d(
                        ref,
                        {
                            ...defaultOptions,
                            ...options
                        }
                    )
            );

        return () => {

            unregisterNode();
            unregisterPng();

        };

    }, [
        ref,
        defaultOptions
    ]);

}