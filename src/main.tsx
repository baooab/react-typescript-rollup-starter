import React from "react";
import ReactDOM from "react-dom";
import { HelloWorld } from "./components/hello-world";

import "./style.scss";

document.body.appendChild(
  Object.assign(document.createElement(`div`), { id: "root" }),
);
ReactDOM.render(<HelloWorld name="Jordi" />, document.getElementById("root"));
