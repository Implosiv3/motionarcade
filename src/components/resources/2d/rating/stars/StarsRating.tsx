import { useMemo, useRef } from "react";
import { gsap } from "gsap";
import "./StarsRating.scss";
import { useAnimationTimeline } from "../../../../../features/animation/hooks/useAnimationTimeline";
import type { ComponentMode } from "../../componentMode";


interface StarsRatingProps {
    rating: 1 | 2 | 3 | 4 | 5;
}

type StarsRatingType = React.FC<StarsRatingProps> & {
    canvas_mode: "3d";
};

export const StarsRating: StarsRatingType = ({
    rating = 5,
}: StarsRatingProps) => {
    const rootRef = useRef<HTMLDivElement>(null);
    const stars = useRef<HTMLDivElement[]>([]);

    const starArray = useMemo(
        () => Array.from({ length: 5 }),
        []
    );

    useAnimationTimeline(
        rootRef,
        tl => {
            const stagger = 0.18;

            stars.current.forEach(star => {
                gsap.set(star, {
                    "--star-scale": 0,
                    "--dot-scale": 0.8,
                    "--color": "#8A91B4",
                });
            });

            for (let i = 0; i < rating; i++) {
                tl.to(
                    stars.current[i],
                    {
                        "--star-scale": 1,
                        "--dot-scale": 0,
                        "--color": "#FDCF10",
                        duration: 0.9,
                        ease: "elastic.out(1,.7)",
                    },
                    i * stagger,
                );
            }
        },
        [rating],
    );

    return (
        <div
            ref={rootRef}
            className="stars-rating"
        >
            {starArray.map((_, index) => (
                <div
                    key={index}
                    ref={(el) => {
                        if (el) {
                            stars.current[index] = el;
                        }
                    }}
                    className="star"
                >
                    <div className="star__dot" />
                    <div className="star__shape">
                        <div className="star__shape-top" />
                        <div className="star__shape-bottom" />
                    </div>
                </div>
            ))}
        </div>
    );
}

StarsRating.canvas_mode = "3d" satisfies ComponentMode;

export default StarsRating;