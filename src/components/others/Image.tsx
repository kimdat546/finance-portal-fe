import React from "react";
import { cn } from "@/lib/utils";

export function links() {
    return [
        {
            rel: "preload",
            href: "./placeholder-image.webp",
            as: "image",
        },
    ];
}

type ImageProps = {
    alt: string;
    src: string;
    width?: number;
    height?: number;
    className?: string;
};

export const Image: React.FC<ImageProps> = ({
    alt,
    src,
    width,
    height,
    className,
}) => {
    return (
        <div
            className={cn("relative w-full", className)}
            style={{
                background: `top / contain no-repeat url("./placeholder-image.webp")`,
            }}
        >
            <img
                className="w-full"
                alt={alt}
                src={src}
                sizes="(min-width: 400px) 800px, 100vw"
                srcSet={`${src}?w=400 400w, ${src}?w=800 800w`}
                width={width}
                height={height}
            />
        </div>
    );
};
