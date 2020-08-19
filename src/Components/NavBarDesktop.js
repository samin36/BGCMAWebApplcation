import React from "react";
import { Menu, Image, Icon } from "semantic-ui-react";
import { NavLink, withRouter } from "react-router-dom";

const NavBarDesktop = () => {
  return (
    <Menu
      size="large"
      secondary
      tabular
      style={{
        background: "#E5E9F2",
        padding: "0",
        margin: "0",
        borderBottom: "0.45em solid grey",
      }}
    >
      <Menu.Item header as="h3" style={{ margin: "0", padding: "0.4em" }}>
        <Image src="/images/bgcmalogo.png" size="tiny" spaced />
        <span style={{ width: "50%", padding: "0" }}>
          Boys & Girls Club of Metro Atlanta
        </span>
      </Menu.Item>

      <Menu.Menu position="right" style={{ fontSize: "1.2em" }}>
        <Menu.Item as={NavLink} to="/">
          Home
        </Menu.Item>
        <Menu.Item as={NavLink} to="/logout">
          Logout
        </Menu.Item>
        <Menu.Item>
          <Icon name="user circle" size="large" />
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};

export default NavBarDesktop;
