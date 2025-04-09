
import { useState } from 'react'
import './App.css'

import { Context } from "context/Context";

import ImageUpload from "components/ImageUpload";
import ImageCropper from "components/ImageCropper";
import ImagePreview from "components/ImagePreview";

function App() {
    const { state } = Context();
    const [step, setStep] = useState<number>(1);
    const [url, setUrl] = useState<string | null>(null);
    const onStep = (s: number) => setStep(s);
    const onNext = (link: string) => {
        if (!link) return;
        console.log("Got url setting it.");
        console.log({ onNext: link });
        setUrl(link);
        setStep(3);
    };
    return (
        <div className = "min-h-screen bg-[#1A1A1A] text-white flex items-center justify-center px-4">
            {step === 1 && <ImageUpload onStep = {onStep} />}
            {step === 2 &&
                <ImageCropper
                    image = {state.img}
                    aspect = {state.aspect}
                    onNext = {onNext} />
            }
            {step === 3 && url &&
                <ImagePreview imageUrl = {url} />
            }
        </div>
    );
};

export default App
