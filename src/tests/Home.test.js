import { render } from "@testing-library/react";
import React from "react";
import Home from "../pages/Home/Home.js";


test("Home", () => {
    render(<Home />,);
});