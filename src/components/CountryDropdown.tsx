
import React, { useState } from "react";
import { Combobox } from "@headlessui/react";

import { onSome } from "utils/misc";

import { passportSizes } from "assets/sizes";

type Props = {
    selected: string;
    onChange: (code: string) => void;
};

const CountryDropdown: React.FC<Props> = ({ selected, onChange }) => {
    const [query, setQuery] = useState("");
    const [open, setOpen] = useState(false);

    const onQuery = e => {
        setQuery(e.target.value);
    };
    const onDisplay = (code: string) => {
        return passportSizes.find((c) => c.code === code)?.country || "";
    };

    const arr = passportSizes.filter((item) => {
        const found = item.country.toLowerCase().includes(query.toLowerCase());
        return found;
    });
    const filtered = query === "" ? passportSizes : arr;

    const some = onSome(filtered);

    return (
        <div className="my-4 w-full max-w-md">
            <Combobox value={selected} onChange={onChange}>
                <Combobox.Label className="block text-left text-base text-white mb-2">
                    Select Country
                </Combobox.Label>
                <div className="relative">
                    <Combobox.Input
                        className = "min-w-full w-full bg-[#2f2f2f] text-white px-3 py-2 rounded-md border border-gray-600"
                        onChange = {onQuery}
                        displayValue = {onDisplay}
                        placeholder = "Type a country name" />
                    <Combobox.Options className = "absolute mt-1 w-full bg-[#2f2f2f] border border-gray-600 rounded-md max-h-60 overflow-y-scroll z-10 scrollbar-thin scrollbar-thumb-[#444] scrollbar-track-transparent scrollbar-gutter-stable">
                        {!some && <div className = "p-2 text-gray-400">No results found.</div>}
                        {some &&
                            filtered.map((item) => {
                                return (
                                    <Combobox.Option
                                        key = {item.code}
                                        value = {item.code}
                                        className = {({ active }) =>
                                            `px-3 py-2 cursor-pointer flex items-center space-x-2 ${
                                            active ? "bg-[#624EB2] text-white" : "text-white"
                                        }`}>
                                        <img
                                            src = {item.url}
                                            alt = {item.country}
                                            className = "w-5 h-4 object-cover rounded-sm" />
                                        <span>
                                          {item.country} — {item.size}
                                        </span>
                                    </Combobox.Option>
                                );
                            })
                        }
                    </Combobox.Options>
                </div>
            </Combobox>
        </div>
    );
};

export default CountryDropdown;
