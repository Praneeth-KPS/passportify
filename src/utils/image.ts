
type CropParams = {
    image: string,
    crop: { x: number, y: number, width: number, height: number }
};

export const onCroppedImg = async (
    image: string,
    crop: { x: number, y: number, width: number, height: number }
): Promise<Blob> => {
    const img = new Image();
    img.src = image;
    console.log({ image, crop });

    await new Promise((resolve) => img.onload = resolve);

    const canvas = document.createElement("canvas");
    canvas.width = crop.width;
    canvas.height = crop.height;

    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Failed to get canvas context");

    ctx.drawImage(
        img,
        crop.x,
        crop.y,
        crop.width,
        crop.height,
        0,
        0,
        crop.width,
        crop.height
    );

    return new Promise((resolve) => {
        canvas.toBlob(blob => {
            if (!blob) throw new Error("Canvas is empty");
            resolve(blob);
        }, "image/jpeg");
    });
};
