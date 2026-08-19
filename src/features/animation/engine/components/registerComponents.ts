import PopMessage from "../../../../components/resources/2d/general/PopMessage";
import { componentRegistry } from "./componentRegistry";
import { DiscordMessage, BookingReview, SimpleProgressBar } from "@implosiv3/fr8mer-components"






export function registerComponents(){

    componentRegistry.set(
        "PopMessage",
        PopMessage
    );

    componentRegistry.set(
        "ProgressBar",
        SimpleProgressBar
    );

    componentRegistry.set(
        "DiscordMessage",
        DiscordMessage
    )

    componentRegistry.set(
        "BookingReview",
        BookingReview
    )

}