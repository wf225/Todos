import * as React from "react";
import * as ReactDOM from "react-dom";

import { Hello } from "./components/Hello";
import { Profile } from "./components/Profile";
import { PersonalSettings } from "./components/PersonalSettings";

ReactDOM.render(
    <Hello compiler="TypeScript" framework="React @Bill" />,
    document.getElementById("hello_world")
);

ReactDOM.render(
    <Profile username="wubil" picture="https://avatars.git.autodesk.com/u/2485?u=a7760c2a924ead5f1b16f49c0b83330a98c8b948&s=400" />,
    document.getElementById('component_combine')
);

ReactDOM.render(
    <PersonalSettings items={['Account', 'Emails', 'Notifications']} />,
    document.getElementById('component_loop')
);
