import React from "react";
import "./Home.css";
import { useState, useEffect } from "react";
import Button from "../../components/Button/Button.js";
import Row from "../../components/Row/Row.js";
import  { replaceCharAt, storeToHistory } from "../../utils/utility.js";

function Home() {
    const [input, setInput] = useState("0");
    const [operator, setOperator] = useState("");
    const [expression, setExpression] = useState("");
    const [replaceDigitIndex, setReplaceDigitIndex] = useState(-1);

    useEffect(() => {
        document.addEventListener("mousedown", (event) => {
            if (!event.target.classList.contains("button-number")) {
                setReplaceDigitIndex(-1);
            }
        })

        return () => {
            document.removeEventListener("mousedown", (event) => {
                if (!event.target.classList.contains("button-number")) {
                    setReplaceDigitIndex(-1);
                }
            })
        }
    }, []);

    function handleInputNumber(e) {
        const digit = e.target.innerText;

        if (replaceDigitIndex !== -1) {
            const newInput = replaceCharAt(input, replaceDigitIndex, digit);
            const newExpression = replaceCharAt(expression, expression.length
                                                    - input.length
                                                    + replaceDigitIndex, digit);
            console.log(newInput);
            console.log(newExpression);
            setInput(newInput);
            setExpression(newExpression);
            setReplaceDigitIndex(-1);
            return;
        }

        if (expression === "") {
            if (digit === "0") {
                return;
            }

            setInput(digit);
            
            if (operator === "-" && digit !== "0") {
                setExpression("-" + digit);
            } else {
                setExpression(digit);
            }
        }
       
        if (expression !== "") {
            if (operator !== "") {
                setInput(digit);
            } else {
                setInput(input + digit);
            }

            setExpression(expression + operator + digit);
            setOperator("");
        }
    }

    function operatorType (event) {
        setOperator(event.target.innerText);
    }

    function calculateExpression () {
        const formatExpression = expression.replace(/^0+/, "").replace(/X/g, "*");

        setOperator("");

        if (formatExpression === "") {
            setInput("0");
            return;
        }

        storeToHistory(formatExpression);
        const result = eval(formatExpression).toString();
        
        setInput(result);
        setExpression(result === "0" ? "" : result);
    }

    function reset (event) {
        event.target.innerText = "AC"; 
        setInput("0"); 
        setExpression("");
        setOperator("");
        setReplaceDigitIndex(-1);
    }

    function handleDigitClicked(index) {
        setOperator("");
        setReplaceDigitIndex(index);
    }

    return (
        <div className="calculator-container">
            <div className="calculator-iphone">
                <div className="calculator-input-display">
                    <div className="icon">
                        <div className="calculator-icon-red"></div>
                        <div className="calculator-icon-yellow"></div>
                        <div className="calculator-icon-green"></div>
                    </div>
                    <div className="calculator-input">
                        <div className="calculator-input-list">
                            {input.split("").map((item, index) => {
                                return (
                                    <input
                                        key={index}
                                        className="calculator-input-list-item"
                                        value={item}
                                        onClick={() => handleDigitClicked(index)}
                                        readOnly
                                    />
                                )})}
                        </div>
                    </div>
                </div>
                <div className="calculator-button">
                    <Row className={"calculator-button-row"}>
                        <Button className={"button-special"} number={"AC"} onClick={reset}></Button>
                        <Button className={"button-special"} number={"+/-"}></Button>
                        <Button className={"button-special"} number={"%"}></Button>
                        <Button className={"button-operator"} active={operator === "/"} number={"/"} onClick={operatorType}></Button>
                    </Row>
                    <Row className={"calculator-button-row"}>
                        <Button className={"button-number"} number={7} onClick={handleInputNumber}></Button>
                        <Button className={"button-number"} number={8} onClick={handleInputNumber}></Button>
                        <Button className={"button-number"} number={9} onClick={handleInputNumber}></Button>
                        <Button className={"button-operator"} active={operator === "X"} number={"X"} onClick={operatorType}></Button>
                    </Row>
                    <Row className={"calculator-button-row"}>
                        <Button className={"button-number"} number={4} onClick={handleInputNumber}></Button>
                        <Button className={"button-number"} number={5} onClick={handleInputNumber}></Button>
                        <Button className={"button-number"} number={6} onClick={handleInputNumber}></Button>
                        <Button className={"button-operator"} active={operator === "-"} number={"-"} onClick={operatorType}></Button>
                    </Row>
                    <Row className={"calculator-button-row"}>
                        <Button className={"button-number"} number={1} onClick={handleInputNumber}></Button>
                        <Button className={"button-number"} number={2} onClick={handleInputNumber}></Button>
                        <Button className={"button-number"} number={3} onClick={handleInputNumber}></Button>
                        <Button className={"button-operator"} active={operator === "+"} number={"+"} onClick={operatorType}></Button>
                    </Row>
                    <Row className={"calculator-button-row"}>
                        <Button className={"button-number zero"} number={0} onClick={handleInputNumber}></Button>
                        <Button className={"button-decimal"} number={"."}></Button>
                        <Button className={"button-operator equal"} number={"="} onClick={calculateExpression}></Button>
                    </Row>
                </div>
            </div>
        </div>
    );
}

export default Home;

