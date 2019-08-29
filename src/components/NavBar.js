import React from "react";
import { withRouter } from "react-router-dom";
import { Menu } from "semantic-ui-react";

function NavBar(props) {
  return (
    <Menu>
      <Menu.Item
        as="a"
        onClick={_ => {
          window.localStorage.removeItem("running-token");
          props.history.push("/");
        }}
      >
        Logout
      </Menu.Item>
    </Menu>
  );
}

export default withRouter(NavBar);
