import React from "react";
import "./Home.css";
import Row from "../../components/Row/Row.js";
import Button from "../../components/Button/Button.js";

function Home() {
    return (
        <div className="calculator_container">
            <div className="calculator_iphone">
                <div className="calculator_input_display">
                    <div className="icon">
                        <div className="calculator-icon-red"></div>
                        <div className="calculator-icon-yellow"></div>
                        <div className="calculator-icon-green"></div>
                    </div>
                    <div className="calculator_input">
                        0
                    </div>
                </div>
                <div className="calculator_button">
                    <Row className={"calculator_button-row"}>
                        <Button className={"button-special"} number={"AC"}></Button>
                        <Button className={"button-special"} number={"+/-"}></Button>
                        <Button className={"button-special"} number={"%"}></Button>
                        <Button className={"button-operator"} number={"/"}></Button>
                    </Row>
                    <Row className={"calculator_button-row"}>
                        <Button className={"button-number"} number={7}></Button>
                        <Button className={"button-number"} number={8}></Button>
                        <Button className={"button-number"} number={9}></Button>
                        <Button className={"button-operator"} number={"X"}></Button>
                    </Row>
                    <Row className={"calculator_button-row"}>
                        <Button className={"button-number"} number={4}></Button>
                        <Button className={"button-number"} number={5}></Button>
                        <Button className={"button-number"} number={6}></Button>
                        <Button className={"button-operator"} number={"-"}></Button>
                    </Row>
                    <Row className={"calculator_button-row"}>
                        <Button className={"button-number"} number={1}></Button>
                        <Button className={"button-number"} number={2}></Button>
                        <Button className={"button-number"} number={3}></Button>
                        <Button className={"button-operator"} number={"+"}></Button>
                    </Row>
                    <Row className={"calculator_button-row"}>
                        <Button className={"button-number zero"} number={0}></Button>
                        <Button className={"button-decimal"} number={"."}></Button>
                        <Button className={"button-operator equal"} number={"="}></Button>
                    </Row>
                </div>
            </div>
        </div>
    );
}

export default Home;