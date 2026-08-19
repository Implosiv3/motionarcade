import { componentRegistry } from "./componentRegistry";
import { DiscordMessage, BookingReview, SimpleProgressBar } from "@implosiv3/fr8mer-components"


export function registerComponents(){

    componentRegistry.set(
        // TODO: Change to 'SimpleProgressBar' (?)
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