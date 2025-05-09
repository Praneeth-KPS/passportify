
import React from "react";

import { Context } from "context/Context";

type Props = {
    imageUrl: string | undefined;
};

const ImagePreview: React.FC<Props> = ({ imageUrl }) => {
    const { state } = Context();
    const onDownload = async () => {
        // const res = await fetch(`http://127.0.0.1:5000/download/${state.token}`, {
        //     method: "GET"
        // });
        // const url = await res.blob();
        // console.log({ url });

        const link = document.createElement("a");
        const backend = import.meta.env.VITE_API_URL;
        link.href = `${backend}/download/${state.token}`;
        link.download = "passport-photo-grid.jpg";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className = "space-y-4">
            <h2 className = "text-lg font-semibold">Your Processed Passport Photo</h2>
            <img
                src = {imageUrl}
                alt = "Processed"
                className = "border rounded" />
            <button
                className = "bg-[#7B61FF] hover:bg-[#937CFF] active:bg-[#634AD1] text-white px-4 py-2 rounded cursor-pointer"
                onClick = {onDownload}>
                Download
            </button>
        </div>
  );
};

export default ImagePreview;
