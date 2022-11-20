// This will contain the children of every button
// for the calculator app. Better to contain buttons with
// another container than to use one big container.

import "./ButtonBox.css";

const ButtonBox = ({ children }) => {
    return <div className="buttonBox">{children}</div>;
};

export default ButtonBox;