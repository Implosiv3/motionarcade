import { componentRegistry } from "./componentRegistry";
import {
    DiscordMessage,
    BookingReview,
    SimpleProgressBar,
} from "@implosiv3/fr8mer-components";
import { RipPhoto } from "@implosiv3/fr8mer-components";


export function registerComponents() {

    componentRegistry.set(
        "ProgressBar",
        {
            component: SimpleProgressBar,
            renderer: "2d",
        }
    );

    componentRegistry.set(
        "DiscordMessage",
        {
            component: DiscordMessage,
            renderer: "2d",
        }
    );

    componentRegistry.set(
        "BookingReview",
        {
            component: BookingReview,
            renderer: "2d",
        }
    );

    componentRegistry.set(
        "RipPhoto",
        {
            component: RipPhoto,
            renderer: "3d"
        }
    )

}