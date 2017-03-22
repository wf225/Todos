import * as React from "react";
import * as ReactDOM from "react-dom";

import { Hello } from "./components/Hello";
import { Profile } from "./components/Profile";
import { Settings } from "./components/Settings";

ReactDOM.render(
    <Hello compiler="TypeScript" framework="React @Bill" />,
    document.getElementById("hello_world")
);

ReactDOM.render(
    <Profile username="wubil" picture="https://avatars.git.autodesk.com/u/2485?u=a7760c2a924ead5f1b16f49c0b83330a98c8b948&s=400" />,
    document.getElementById('component_combine')
);



// {['B', 'C']}

ReactDOM.render(
    <Settings results={[{'id': 'id-1', 'text': 'Hi - 1'}, {'id': 'id-2', 'text': 'Hi - 2'}]} />,
    document.getElementById('component_loop')
);

 /*{
    var items = {};
    this.props.results = [
        {
            "id": 1,
            "text": "Hi -1"
        }
    ];

    this.props.results.forEach((result) => {
        // If result.id can look like a number (consider short hashes), then
        // object iteration order is not guaranteed. In this case, we add a prefix
        // to ensure the keys are strings.
        items['result-' + result.id] = <li>{result.text}</li>;
    });

    return (
        <ol>
            {items}
        </ol>
    );
};*/