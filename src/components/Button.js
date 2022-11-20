// The button for the calculator (obviously). Each button
// will have it's own functionality through the App.js file
// This is just to set up a button and put into the container
// before actually making the function

import "./Button.css";

const Button = ({ className, value, onClick }) => {
    return (
        <button className={className} onClick={onClick}>
            {value}
        </button>
    );
};

export default Button;