
import { Context } from "context/Context";

import Body1 from "components/ui/typo/Body1";

const Welcome = () => {
    const { state, setState } = Context();

    return (
        <div>
            <div>
                Check the font!!
            </div>
            <Body1 text = "This is Body1..." />
            <div className="p-4 bg-white rounded shadow">
                <p className="text-lg font-semibold">Hello, {state.img}!</p>
                <input
                    className="mt-2 p-2 border rounded w-full"
                    type="text"
                    placeholder="Enter your name"
                    onChange={(e) => setState({ ...state, img: e.target.value})} />
            </div>
        </div>
    );
};

export default Welcome;
