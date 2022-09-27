import React from "react";
import { useState, useEffect } from "react";
import { NumberFormatBase } from "react-number-format";
import "./Home.css";
import Row from "../../components/Row/Row.js";
import Button from "../../components/Button/Button.js";


var operation = "";

function Home() {
    const [preState, setPreState] = useState("");
    const [curState, setCurState] = useState("");
    const [input, setInput] = useState("0");

    const inputNum = (e) => {
        operation += e.target.innerText;

        setCurState(curState + e.target.innerText);

        const ac = document.querySelector(".button-special"); // Selects the AC button
        ac.innerText = "C"; // Changes the text of the AC button to C

    };

    useEffect(() => { // Updates the input value
        setInput(curState); // Sets input to curState
    }, [curState]); // Runs when curState changes

    useEffect(() => { // If preState is empty set input to curState
        setInput("0"); // Sets input to 0
    }, []); // Runs when the page loads

    const operatorType = (e) => {
        if (curState === "") {
            return;
        }
        operation += e.target.innerText; // Adds the operator to the operation string
        setPreState(curState); // Sets preState to curState
        setCurState(""); // Sets curState to an empty string
    };

    const history = (result) => {
        let history = localStorage.getItem("history"); // get history from local storage
        if (history) {  // if history exists
            history = JSON.parse(history); // parse history
        } else { // if history does not exist
            history = []; // set history to empty array
        }
        history.push(result);
        localStorage.setItem("history", JSON.stringify(history)) // set history to local storage
    }

    const equals = (e) => {
        if (preState === "" || curState === "") {
            return;
        }
        if (e.target.innerText === "=") {
            operation = operation.replace(/X/g, "*");
            history(operation + "=" + eval(operation));
            let result = eval(operation);
            setInput("");
            setPreState(result);
            operation = "";
        }
    };

    const reset = (e) => {
        e.target.innerText = "AC"; // set text of AC button to AC
        setPreState("0"); // set previous state to 0
        setCurState(""); // set current state to empty
        operation = ""; // set operation to empty
        setInput("0"); // set input to 0
    };

    const changeInput = (e) => {
        // When the user clicks the mouse into a number on screen, the number should show the edit placeholder and flick like this
        e.target.innerText = ""; // set text of number to empty
        e.target.contentEditable = true; // set content editable to true
        e.target.focus(); // focus on number
    };

    return (
        <div className="calculator_container">
            <div className="calculator_iphone">
                <div className="calculator_input_display">
                    <div className="icon">
                        <div className="calculator-icon-red"></div>
                        <div className="calculator-icon-yellow"></div>
                        <div className="calculator-icon-green"></div>
                    </div>
                    <div className="calculator_input" onClick={changeInput}>
                        {input !== "" || input === "0" ? (
                            <NumberFormatBase
                                value={input}
                                displayType={"text"}
                            />
                        ) : (
                            <NumberFormatBase
                                value={preState}
                                displayType={"text"}
                            />
                        )}
                    </div>
                </div>
                <div className="calculator_button">
                    <Row className={"calculator_button-row"}>
                        <Button className={"button-special"} number={"AC"} onClick={reset}></Button>
                        <Button className={"button-special"} number={"+/-"}></Button>
                        <Button className={"button-special"} number={"%"}></Button>
                        <Button className={"button-operator"} number={"/"} onClick={operatorType}></Button>
                    </Row>
                    <Row className={"calculator_button-row"}>
                        <Button className={"button-number"} number={7} onClick={inputNum}></Button>
                        <Button className={"button-number"} number={8} onClick={inputNum}></Button>
                        <Button className={"button-number"} number={9} onClick={inputNum}></Button>
                        <Button className={"button-operator"} number={"X"} onClick={operatorType}></Button>
                    </Row>
                    <Row className={"calculator_button-row"}>
                        <Button className={"button-number"} number={4} onClick={inputNum}></Button>
                        <Button className={"button-number"} number={5} onClick={inputNum}></Button>
                        <Button className={"button-number"} number={6} onClick={inputNum}></Button>
                        <Button className={"button-operator"} number={"-"} onClick={operatorType}></Button>
                    </Row>
                    <Row className={"calculator_button-row"}>
                        <Button className={"button-number"} number={1} onClick={inputNum}></Button>
                        <Button className={"button-number"} number={2} onClick={inputNum}></Button>
                        <Button className={"button-number"} number={3} onClick={inputNum}></Button>
                        <Button className={"button-operator"} number={"+"} onClick={operatorType}></Button>
                    </Row>
                    <Row className={"calculator_button-row"}>
                        <Button className={"button-number zero"} number={0} onClick={inputNum}></Button>
                        <Button className={"button-decimal"} number={"."}></Button>
                        <Button className={"button-operator equal"} number={"="} onClick={equals}></Button>
                    </Row>
                </div>
            </div>
        </div>
    );
}

export default Home;