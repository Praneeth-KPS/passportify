
import React, { useRef, useState } from "react";
import { Context } from "context/Context";

type Props = {
    onStep: () => void;
};

type Dimensions = {
    width: number;
    height: number;
    unit: "mm" | "in";
};

const dpi = 300;

const Default_dimensions: Dimensions = { width: 35, height: 45, unit: "mm" };

const ImageUpload: React.FC<Props> = ({ onStep }) => {
    const ref = useRef<HTMLInputElement | null>(null);

    const { state, setState } = Context();

    const [preview, setPreview] = useState<string | null>(null);
    const [dimensions, setDimensions] = useState<Dimensions>(Default_dimensions);
    const [standard, setStandard] = useState(true);

    const onFile = (file: File) => {
        const url = URL.createObjectURL(file);
        setPreview(url);
    };

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;
        const file = files[0];
        if (file) onFile(file);
    };

    const onDragOver = (e: React.DragEvent<HTMLDivElement>) => e.preventDefault();

    const onFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            onFile(e.dataTransfer.files[0]);
            e.dataTransfer.clearData();
        }
    };

    const onTriggerInput = () => {
        if (ref && ref.current) ref.current.click();
    };

    const onDimensionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        console.log({ name, value });

        setDimensions({
            ...dimensions,
            [name]: name === "unit" ? (value as "mm" | "in") : parseFloat(value)
        });
    };

    const onNext = () => {
        if (preview) {
            const d1 = Default_dimensions.width / Default_dimensions.height;
            const d2 = dimensions.width / dimensions.height;
            const ratio = standard ? d1 : d2;
            const factor = dimensions.unit === "mm" ? (1 / 25.4) : 1;
            const widthPx = Math.round(dimensions.width * factor * dpi);
            const heightPx = Math.round(dimensions.height * factor * dpi);
            setState({
                ...state,
                img: preview,
                aspect: ratio,
                dimensions: {
                    ...dimensions,
                    widthPx,
                    heightPx
                }
            });
            onStep(2);
        }
    };

    const border = preview ? "border-gray-600" : "border-purple-400";

    return (
        <div>
            <div
                className = {`w-full max-w-3xl p-6 rounded-xl border-2 border-dashed ${border}`}
                onDrop = {onFileDrop}
                onDragOver = {onDragOver}>
                {!preview &&
                    <div className="flex flex-col items-center justify-center space-y-4 text-center">
                        <p className="text-gray-300">Select Or Drag & Drop Image Here</p>
                        <button
                            onClick = {onTriggerInput}
                            className = "bg-teal-600 hover:bg-teal-700 text-white font-semibold px-4 py-2 rounded" >
                            Select Image
                        </button>
                        <input
                            ref = {ref}
                            type = "file"
                            accept = "image/*"
                            onChange = {onFileChange}
                            className = "hidden" />
                    </div>
                }
                {preview &&
                    <div className="flex flex-col md:flex-row justify-between space-y-6 md:space-y-0 md:space-x-6">
                        <img
                            src = {preview}
                            alt = "Preview"
                            className = "w-48 h-auto border rounded-md" />

                        <div className = "flex-1 space-y-4">
                        <div>
                            <p className = "text-lg font-semibold text-gray-300 mb-1">Dimensions</p>
                            <label className = "flex items-center justify-center space-x-2 text-sm">
                                <input
                                    type = "checkbox"
                                    checked = {standard}
                                    onChange = {() => setStandard(!standard)} />
                                    <span>Use default passport size (35mm x 45mm)</span>
                            </label>
                            {!standard && (
                                <div className = "flex justify-center space-x-4 mt-3">
                                    <div>
                                        <label className = "block text-sm">Width</label>
                                        <input
                                            type = "number"
                                            name = "width"
                                            value = {dimensions.width}
                                            onChange = {onDimensionChange}
                                            className = "bg-[#242424] border border-gray-500 p-2 rounded w-24" />
                                    </div>
                                    <div>
                                        <label className = "block text-sm">Height</label>
                                        <input
                                            type = "number"
                                            name = "height"
                                            value = {dimensions.height}
                                            onChange = {onDimensionChange}
                                            className = "bg-[#242424] border border-gray-500 p-2 rounded w-24" />
                                    </div>
                                    <div>
                                        <label className="block text-sm">Unit</label>
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
                            )}
                        </div>
                        <div>
                            <button
                                onClick = {onTriggerInput}
                                className = "bg-teal-600 hover:bg-teal-700 text-white font-semibold px-4 py-2 rounded">
                                Re-upload Image
                            </button>
                            <input
                                ref = {ref}
                                type = "file"
                                accept = "image/*"
                                onChange = {onFileChange}
                                className = "hidden"  />
                        </div>
                      </div>
                    </div>
                }
            </div>
            <button
                className = "w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 rounded text-center"
                onClick = {onNext}>
                Proceed to Next Step
            </button>
        </div>
    );
};

export default ImageUpload;

// <div className="p-4 max-w-md mx-auto bg-white rounded-2xl shadow-md space-y-4">
//     <h2 className="text-xl font-semibold">Upload Passport Photo</h2>
//
//     <input
//         type = "file"
//         accept = "image/*"
//         onChange = {onFileChange}
//         className = "block w-full text-sm text-gray-500
//           file:mr-4 file:py-2 file:px-4
//           file:rounded-full file:border-0
//           file:text-sm file:font-semibold
//           file:bg-blue-50 file:text-blue-700
//           hover:file:bg-blue-100" />
//
//     {preview && (
//         <img
//           src = {preview}
//           alt = "Preview"
//           className = "w-48 h-auto border rounded" />
//     )}
//
//     <div>
//         <label className="flex items-center space-x-2">
//           <input
//             type = "checkbox"
//             checked = {standard}
//             onChange = {() => setStandard((prev) => !prev)} />
//           <span>Use standard passport size (35mm x 45mm)</span>
//         </label>
//     </div>
//
//     {!standard && (
//         <div className="flex space-x-2">
//           <div>
//             <label className="block text-sm font-medium">Width</label>
//             <input
//               type="number"
//               name="width"
//               value={dimensions.width}
//               onChange = {onDimensionChange}
//               className="border p-1 rounded w-20"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium">Height</label>
//             <input
//               type="number"
//               name="height"
//               value={dimensions.height}
//               onChange = {onDimensionChange}
//               className="border p-1 rounded w-20"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium">Unit</label>
//             <select
//               name="unit"
//               value={dimensions.unit}
//               onChange={(e) =>
//                 setDimensions((prev) => ({
//                   ...prev,
//                   unit: e.target.value as 'mm' | 'in',
//                 }))
//               }
//               className="border p-1 rounded"
//             >
//               <option value="mm">mm</option>
//               <option value="in">in</option>
//             </select>
//           </div>
//         </div>
//       )}
//   </div>
