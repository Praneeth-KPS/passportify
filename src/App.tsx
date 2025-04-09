
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { Context } from "context/Context";

import Welcome from "components/Welcome";
import ImageUpload from "components/ImageUpload";
import ImageCropper from "components/ImageCropper";
import ImagePreview from "components/ImagePreview";

function App() {
    const { state } = Context();
    const [step, setStep] = useState<1 | 2 | 3>(1);
    const [count, setCount] = useState(0);
    const [url, setUrl] = useState<string | null>(null);
    const onCrop = area => {

    };
    const onStep = s => setStep(s);
    const onNext = url => {
        console.log("Got url setting it.");
        console.log({ onNext: url });
        setUrl(url);
        setStep(3);
    };
    const bool = Boolean(state.img && state.aspect);
    return (
        <div className = "min-h-screen bg-[#1A1A1A] text-white flex items-center justify-center px-4">
            {step === 1 && <ImageUpload onStep = {onStep} />}
            {step === 2 &&
                <ImageCropper
                    image = {state.img}
                    aspect = {state.aspect}
                    onCrop = {onCrop}
                    onNext = {onNext} />
            }
            {step === 3 &&
                <ImagePreview imageUrl = {url} />
            }
        </div>
    );
};

export default App
