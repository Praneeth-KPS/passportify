
import React from "react";
import clsx from "clsx";

type Body1Props = {
    children: React.ReactNode,
    className?: string,
    testId?: string,
    text?: string,
    html?: string,
    color?: string,
    hover?: string,
    active?: string,
    transform?: string,
    align?: string,
    wrap?: string,
    single?: boolean,
    clamp?: number,
    onClick?: () => void
};

const Body1 = (props: Body1Props) => {
    const {
        text = "",
        html = "",
        color = "white",
        hover = "white",
        active = "white",
        transform = "none",
        align = "left",
        wrap = "wrap",
        single = false,
        clamp = 0
    } = props;

    const colorMap = {
        white: "text-white"
    };

    const alignMap = {
        left: "text-left",
        right: "text-right",
        center: "text-center"
    };

    return (
        <p
        data-testid = {props.testId}
        onClick = {props.onClick}
        className = {clsx(
          "leading-relaxed tracking-wide transition-all cursor-default break-words",
          colorMap[color], // font-color
          "text-sm", // font-size
          alignMap[align] // text-align
        )}>
        {text}
        </p>
    );
};

export default Body1;
