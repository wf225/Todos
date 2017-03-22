import * as React from "react";
import { render } from 'react-dom';

const ListItemWrapper = (props) => {
  return <li>{props.key} - {props.data}</li>;
}

export const Settings = (props) => {
  return (
    <div>
      {props.results.forEach((value) => {
        {/*return <ListItemWrapper key={value.id} data={value.text} />;*/ }
        return <li>{value.text}</li>;
      })}
    </div>
  );
}
