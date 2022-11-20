// The screen for the calculator app, located on the top section
// of the app itself. It will display the input/calculated values
// while also resizing the text length if the amount is too
// far (utilizing react-textfit, which can be 
// installed with npm i react-textfit)

import { Textfit } from "react-textfit";
import "./Screen.css";

const Screen = ({ value }) => {
    return (
        <Textfit className="screen" mode="single" max={70}>
            {value}
        </Textfit>
    );
};

export default Screen;