// Contains all of the children components needed
// for the calculator app, while also centering
// the app to the screen itself

import "./Wrapper.css";

const Wrapper = ({ children }) => {
    return <div className="wrapper">{children}</div>;
}

export default Wrapper;