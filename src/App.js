import Wrapper from "./components/Wrapper";
import Screen from "./components/Screen";
import ButtonBox from "./components/ButtonBox";
import Button from "./components/Button";

import React, { useState } from "react";

// Have to format the values into a string for the display screen
const toLocaleString = (num) =>
  String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");

// Just in case there are any spaces within the number, they have to
// be removed for the sake of calculation
const removeSpaces = (num) => num.toString().replace(/\s/g, "");

// This is where the actual math takes place
const math = (a, b, sign) =>
  sign === "+" ? a + b : sign === "-" ? a - b : sign === "x" ? a * b : a / b;

// Button layout for the calculator app. The layout should be similar
// to what was shown and demoed in the class lecture.
// link: https://github.com/martysen/calculatorAppDemo
const btnValues = [
  ["+", "-", "x", "/"],
  [7, 8, 9],
  [4, 5, 6],
  [1, 2, 3],
  [0, ".", "AC", "="],
];

const App = () => {
  // Have to use state variables to grab certain values,
  // like the sign, the number, and the result of that number
  // This is to make sure that this is all set to default values
  let [calc, setCalc] = useState({
    sign: "",
    num: 0,
    res: 0,
  });

  // This function resets values to the default number (0)
  const allClearHandler = () => {
    setCalc({
      ...calc,
      sign: "",
      num: 0,
      res: 0,
    });
  };

  // This function handles numbers when the user clicks on them.
  const numberHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    if (removeSpaces(calc.num).length < 16) {
      setCalc({
        ...calc,
        num:
          calc.num === 0 && value === "0"
            ? "0"
            : calc.num % 1 === 0
              ? toLocaleString(Number(removeSpaces(calc.num + value)))
              : toLocaleString(calc.num + value),
        res: !calc.sign ? 0 : calc.res,
      });
    }
  };

  // This function handles decimal points when the user clicks
  // on the "." button.
  const decimalHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    setCalc({
      ...calc,
      num: !calc.num.toString().includes(".") ? calc.num + value : calc.num,
    });
  };

  // This 
  const signHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    setCalc({
      ...calc,
      sign: value,
      res: !calc.num
        ? calc.res
        : !calc.res
        ? calc.num
        : toLocaleString(
            math(
              Number(removeSpaces(calc.res)),
              Number(removeSpaces(calc.num)),
              calc.sign
            )
          ),
      num: 0,
    });
  };

  const equalsHandler = () => {
    if (calc.sign && calc.num) {
      setCalc({
        ...calc,
        res:
          calc.num === "0" && calc.sign === "/"
            ? "Infinity"
            : toLocaleString(
                math(
                  Number(removeSpaces(calc.res)),
                  Number(removeSpaces(calc.num)),
                  calc.sign
                )
              ),
        sign: "",
        num: 0,
      });
    }
  };

  return (
    <Wrapper>
      <Screen value={calc.num ? calc.num : calc.res} />
      <ButtonBox>
        {
          btnValues.flat().map((btn, i) => {
            // Gotta map out specific layouts for the buttons
            let daClass = "";
            switch (btn) {
              case "=":
                daClass = "equals";
                break;
              case "AC":
                daClass = "all-clear";
                break;
              default:
                daClass = "";
                break;
            }
            return (
              <Button
                key={i}
                className={daClass}
                value={btn}
                // onClick function sets certain button functions
                onClick={
                    btn === "AC"
                    ? allClearHandler
                    : btn === "="
                    ? equalsHandler
                    : btn === "+" || btn === "-" || btn === "x" || btn === "/"
                    ? signHandler
                    : btn === "."
                    ? decimalHandler
                    : numberHandler
                }
              />
            );
          })
        }
      </ButtonBox>
    </Wrapper>
  );
};

export default App;