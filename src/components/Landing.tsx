
import React, { useState } from "react";
import { Context } from "context/Context";

import CountryDropdown from "components/CountryDropdown";

import { passportSizes } from "assets/sizes";

type Props = {
    onStep: (step: number) => void;
};

interface Dimensions = {
    width: number;
    height: number;
    unit: "mm" | "in";
    widthPx: number;
    heightPx: number
};

const Landing: React.FC<Props> = ({ onStep }) => {
    const { state, setState } = Context();
    const [country, setCountry] = useState("");
    const [dimensions, setDimensions] = useState<Dimensions>(state.dimensions);
    const onChange = (code: string) => {
        const item = passportSizes.find(v => v.code === code);
        if (!item) return;
        const size = item.size.replace("mm", "").trim();
        const [w, h] = size.split("x").map(Number);
        setCountry(code);
        setState({
            ...state,
            country: item.country,
            dimensions: {
                width: w,
                height: h,
                unit: "mm",
                widthPx: item.pixels[0],
                heightPx: item.pixels[1]
            }
        });
        setDimensions({
            ...dimensions,
            width: w,
            height: h,
            unit: "mm"
        });
    };
    const onDimensionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        console.log({ name, value });

        setDimensions({
            ...dimensions,
            [name]: name === "unit" ? (value as "mm" | "in") : parseFloat(value)
        });
    };
    return (
        <div className = "w-full max-w-3xl mx-auto px-2 space-y-6">
            <div className = "w-full text-center">
                <img
                    src = "/passportify-steps.png"
                    alt = "steps"
                    className = "mx-auto mb-6 w-full max-w-lg" />
            </div>
            <div className="mt-2 p-4 border border-gray-600 rounded-lg w-full min-h-[220px] flex flex-col items-center justify-center gap-6">
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-center w-full gap-6">
                    <div className="w-full lg:w-1/2">
                        <CountryDropdown
                            selected = {country}
                            onChange = {onChange} />
                    </div>
                    <div className = "w-full lg:w-auto lg:mt-5 mt-0 text-white font-bold text-center whitespace-nowrap">- OR -</div>
                    <div className = "flex flex-wrap items-center gap-3 w-full lg:w-1/2">
                        <div>
                            <label className = "block text-left text-base mb-2">Width</label>
                            <input
                                type = "number"
                                name = "width"
                                value = {dimensions.width}
                                onChange = {onDimensionChange}
                                className = "bg-[#242424] border border-gray-500 p-2 rounded w-24" />
                        </div>
                        <div>
                            <label className = "block text-left text-base mb-2">Height</label>
                            <input
                                type = "number"
                                name = "height"
                                value = {dimensions.height}
                                onChange = {onDimensionChange}
                                className = "bg-[#242424] border border-gray-500 p-2 rounded w-24" />
                        </div>
                        <div>
                            <label className="block text-left text-base mb-2">Unit</label>
                            <select
                                name = "unit"
                                value = {dimensions.unit}
                                onChange = {onDimensionChange}
                                className = "bg-[#242424] border border-gray-500 p-2 rounded" >
                                <option value = "mm">mm</option>
                                <option value = "in">in</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <button
                onClick = {() => onStep(1)}
                className = "w-full bg-[#7B61FF] hover:bg-[#937CFF] active:bg-[#634AD1] text-white py-3 rounded-xl text-lg font-semibold transition cursor-pointer">
                Start
            </button>
        </div>
    );
};

export default Landing;
