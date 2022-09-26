import React from "react";
import { useState, useEffect } from "react";
import { NumberFormatBase } from "react-number-format";
import "./Home.css";
import Row from "../../components/Row/Row.js";
import Button from "../../components/Button/Button.js";

function Home() {
    const [preState, setPreState] = useState("");
    const [curState, setCurState] = useState("");
    const [input, setInput] = useState("0");
    const [operator, setOperator] = useState(null);
    const [total, setTotal] = useState(false);

    const inputNum = (e) => {
        if (e.target.value === "." && input.includes(".")) return; // Prevents multiple decimals

        if (total) { // If total is true Reset preState
            setPreState("");
        }

        // If curState is empty set curState to the value of the button clicked, else add the value of the button clicked to curState
        curState ? setCurState((pre) => pre + e.target.innerText) : setCurState(e.target.innerText); 

        const ac = document.querySelector(".button-special"); // Selects the AC button
        ac.innerText = "C"; // Changes the text of the AC button to C

        setTotal(false); // Sets total to false
    };

    useEffect(() => { // Updates the input value
        setInput(curState); // Sets input to curState
    }, [curState]); // Runs when curState changes

    useEffect(() => { // If preState is empty set input to curState
        setInput("0"); // Sets input to 0
    }, []); // Runs when the page loads

    const operatorType = (e) => {
        setTotal(false); // reset total
        setOperator(e.target.innerText); // set operator
        if (curState === "") return; // if no current state, return
        if (preState !== "") { // if previous state is not empty, calculate
            equals(); // calculate
        } else { // if previous state is empty, set current state to previous state
            setPreState(curState); // set current state to previous state
            setCurState(""); // set current state to empty
        }
    };

    const history = (result) => {
        let history = localStorage.getItem("history"); // get history from local storage
        if (history) {  // if history exists
            history = JSON.parse(history); // parse history
        } else { // if history does not exist
            history = []; // set history to empty array
        }
        history.push(preState + operator + curState + "=" + result) // push history to array
        localStorage.setItem("history", JSON.stringify(history)) // set history to local storage
    }

    const equals = (e) => {
        if (e.target.innerText === "=") { // if equals button is clicked
            setTotal(true); // set total to true
        }
        let result; // create result variable
        switch (operator) { // switch statement for operator
        case "/": // if operator is divide previous state by current state
            result = String(Number(preState) / Number(curState)); 
            break;
        case "+": // if operator is add previous state to current state
            result = String(Number(preState) + Number(curState));
            break;
        case "X": // if operator is multiply previous state by current state
            result = String(Number(preState) * Number(curState));
            break;
        case "-": // if operator is subtract previous state by current state
            result = String(Number(preState) - Number(curState));
            break;
        default: // if no operator, return
            return;
        }
        history(result);
        setInput(""); // set input to empty
        setPreState(result); // set previous state to result
        setCurState(""); // set current state to empty
    };

    const minusPlus = () => {
        if (curState.charAt(0) === "-") { // if current state starts with a minus
            setCurState(curState.substring(1)); // remove the minus
        } 
        else { // if current state does not start with a minus
            setCurState("-" + curState); // add a minus to the start of the current state
        }
    };

    const percent = () => {
        // if previous state is not empty, set current state to the current state divided by 100 multiplied by the previous state, else set current state to the current state divided by 100
        preState ? setCurState(String((parseFloat(curState) / 100) * preState)) : setCurState(String(parseFloat(curState) / 100)); 
    };

    const reset = (e) => {
        e.target.innerText = "AC"; // set text of AC button to AC
        setPreState("0"); // set previous state to 0
        setCurState(""); // set current state to empty
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
                        <Button className={"button-special"} number={"+/-"} onClick={minusPlus}></Button>
                        <Button className={"button-special"} number={"%"} onClick={percent}></Button>
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
                        <Button className={"button-decimal"} number={"."} onClick={inputNum}></Button>
                        <Button className={"button-operator equal"} number={"="} onClick={equals}></Button>
                    </Row>
                </div>
            </div>
        </div>
    );
}

export default Home;