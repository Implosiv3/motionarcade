import { componentRegistry } from "./componentRegistry";
import {
    DiscordMessage,
    BookingReview,
    SimpleProgressBar,
} from "@implosiv3/fr8mer-components";
import { RipPhoto } from "@implosiv3/fr8mer-components";
import { PlaneImage } from "@implosiv3/fr8mer-components";
import { VoxelizedImage } from "@implosiv3/fr8mer-components";
import { Phone } from "@implosiv3/fr8mer-components";
import { Model3D } from "@implosiv3/fr8mer-components";


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
        "PlaneImage",
        {
            component: PlaneImage,
            renderer: "3d"
        }
    )

    componentRegistry.set(
        "VoxelizedImage",
        {
            component: VoxelizedImage,
            renderer: "3d"
        }
    )

    componentRegistry.set(
        "Phone",
        {
            component: Phone,
            renderer: "3d"
        }
    )

    componentRegistry.set(
        "Model3D",
        {
            component: Model3D,
            renderer: "3d"
        }
    )

}