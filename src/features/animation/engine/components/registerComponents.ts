import { componentRegistry } from "./componentRegistry";
import {
    DiscordMessage,
    BookingReview,
    SimpleProgressBar,
} from "@implosiv3/fr8mer-components";
import { RipPhoto } from "@implosiv3/fr8mer-components";
import Like from "../../../../components/3d/Like";


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

    componentRegistry.set(
        "Like",
        {
            component: Like,
            renderer: "3d"
        }
    )

}