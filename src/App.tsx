
import { useState, useEffect } from 'react'
import './App.css'

import { Context } from "context/Context";

import Header from "components/Header";
import StepLayout from "components/StepLayout";
import Landing from "components/Landing";
import ImageUpload from "components/ImageUpload";
import ImageCropper from "components/ImageCropper";
import ImagePreview from "components/ImagePreview";

import GridLoader from "components/ui/GridLoader";

function App() {
    const { state } = Context();
    const [step, setStep] = useState<number>(0);
    const [url, setUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(state.loading);
    useEffect(() => {
        setLoading(state.loading);
    }, [state.loading]);
    const onStep = (s: number) => setStep(s);
    const onNext = (link: string) => {
        if (!link) return;
        setUrl(link);
        setStep(3);
    };
    const bool = Boolean(step > 0);

    return (
        <div>
            <Header />
            {bool && <StepLayout step = {step} />}
            <div className = "w-full mt-6 mb-20 text-white flex items-center justify-center px-4">
                {step === 0 && <Landing onStep = {onStep} />}
                {step === 1 && <ImageUpload onStep = {onStep} />}
                {step === 2 && !loading &&
                    <ImageCropper
                        image = {state.img}
                        aspect = {state.aspect}
                        onPrev = {s => setStep(s)}
                        onNext = {onNext} />
                }
                {step === 2 && loading && <GridLoader />}
                {step === 3 && url &&
                    <ImagePreview imageUrl = {url} />
                }
            </div>
        </div>
    );
};

export default App
