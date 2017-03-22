import * as React from "react";
import { render } from 'react-dom';

const ProfilePic = (props) => {
  return (
    <img src={props.picture} height="200" width="200" />
  );
}

const ProfileLink = (props) => {
  return (
    <a href={'https://git.autodesk.com/orgs/AutoCAD-CI/people/' + props.username}>
      {props.username}
    </a>
  );
}

export const Profile = (props) => {
  return (
    <div>
      User Profile
      <p />
      <ProfilePic picture={props.picture} />
      <p />
      User name: <ProfileLink username={props.username} />
    </div>
  );
}

// render(
//   <Profile username="Bill Wu" />,
//   document.getElementById('link_buttons')
// );