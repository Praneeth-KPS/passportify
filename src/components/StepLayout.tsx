
import React from "react";

type Props = {
    step: number
}

const map = {
    0: "Start",
    1: "Upload",
    2: "Crop",
    3: "Download"
};

const StepLayout: React.FC<Props> = ({ step }) => {
    return (
        <div className="flex items-center justify-center w-full max-w-xl mx-auto mt-8 px-4 sm:px-0">
            {[1, 2, 3].map((value, idx) => {
                return (
                    <React.Fragment key={value}>
                        <div
                            className={`min-w-10 h-10 p-2 flex items-center justify-center rounded-md border-2 transition-all duration-300
                                ${step >= value ? "border-[#7B61FF] bg-[#7B61FF] text-white" : "border-gray-400 bg-white text-black"}`}>
                                {`${value} - ${map[value]}`}
                        </div>

                        {idx < 2 && (
                            <div className="flex-1 h-1 mx-2 bg-gray-300 relative overflow-hidden">
                                <div
                                className={`absolute left-0 top-0 h-full bg-[#7B61FF] transition-all duration-500 ease-in-out`}
                                style={{
                                    width: step > value ? "100%" : "0%",
                                }} />
                                </div>
                        )}
                    </React.Fragment>
                );
            })}
        </div>
    );
};

export default StepLayout;
