import * as React from "react";
import { render } from 'react-dom';

const ListItemWrapper = (props) => {
  return <li>{props.data.text}</li>;
}

/*export const PersonalSettings = (props) => {
  return (
    <ul>
      {props.items.map((item, i) => {
        return <ListItemWrapper key={item.id} data={item} />;
      })}
    </ul>
  );
}*/

export interface SettingItems { items: [string]; }

export class PersonalSettings extends React.Component<SettingItems, undefined> {
  handleClick(i) {
    console.log('You clicked: ' + this.props.items[i]);
  }

  render() {
    return (
      <div>
        {this.props.items.map((item, i) => {
          return (
            <div onClick={this.handleClick.bind(this, i)} key={i}>{item}</div>
          );
        })}      
      </div>
    );
  }
}