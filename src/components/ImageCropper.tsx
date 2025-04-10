
import React, { useState } from "react";
import Cropper from "react-easy-crop";
import type { Area } from "react-easy-crop";

import { Context } from "context/Context";

import { onCroppedImg } from "utils/image";

type Props = {
    image: string;
    aspect: number;
    onNext: (url: string) => void;
};

const ImageCropper: React.FC<Props> = ({ image, aspect, onNext }) => {
    const { state, setState } = Context();
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [pixels, setPixels] = useState<Area | null>(null);

    const onSubmit = async () => {
        const croppedBlob = await onCroppedImg(image, pixels!);

        const previewUrl = URL.createObjectURL(croppedBlob);
        console.log({ previewUrl });

        // onCrop(croppedBlob, previewUrl);
        onUpload(croppedBlob);
        setState({ ...state, cropped: previewUrl });
        console.log('Cropped image ready:', previewUrl);
    };

    const onUpload = async (blob: Blob) => {
        console.log({ blob });
        const { dimensions } = state;

        const form = new FormData();
        form.append("image", blob);
        form.append("dimensions", `${dimensions.widthPx}x${dimensions.heightPx}`);

        const backend = import.meta.env.VITE_API_URL;
        console.log({ backend });

        await fetch(`${backend}/process-photo`, {
            method: "POST",
            body: form
        }).then((res) => res.json()).then((data) => {
            console.log({ data });

            const url = data.preview_base64;
            onNext(url);
            setState({ ...state, token: data.token });
        });
        // console.log({ res: res.data });
        //
        // const data = res.json();
        // const url = data.preview_base64;
        // // const processedImg = await res.blob();
        // console.log({ url });
        //
        // console.log("got response from flask");

        // const url = URL.createObjectURL(processedImg);

        // onNext(url);
    };

    return (
        <div className = "w-full max-w-3xl h-[500px] mx-auto relative">
            <Cropper
                image = {image}
                crop = {crop}
                zoom = {zoom}
                aspect = {aspect}
                onCropChange = {setCrop}
                onZoomChange = {setZoom}
                onCropComplete = {(_, croppedAreaPixels) => setPixels(croppedAreaPixels)}
                cropShape = "rect"
                showGrid = {false}
                style = {{
                  cropAreaStyle: { border: '2px solid #00FFFF' },
                  containerStyle: { backgroundColor: '#000' }
                }} />
            <div className = "absolute bottom-4 left-1/2 transform -translate-x-1/2">
                <button
                    className = "bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 px-6 rounded shadow-lg"
                    onClick = {onSubmit}>
                    Confirm image
                </button>
            </div>
        </div>
    );
};

export default ImageCropper;
