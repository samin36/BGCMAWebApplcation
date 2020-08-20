import React from "react";
import { Menu, Image, Icon, Dropdown } from "semantic-ui-react";
import { NavLink, withRouter } from "react-router-dom";

const NavBarDesktop = () => {
  const options = [
    {
      key: "user",
      text: (
        <span>
          Signed in as <strong>Taylor Smith</strong>
        </span>
      ),
      disabled: true,
    },
    { key: "profile", text: "Account Settings", icon: "settings" },
    { key: "help", text: "Help & FAQ", icon: "help" },
    { key: "contact", text: "Contact Us", icon: "talk" },
  ];

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
          <Dropdown
            trigger={<Icon name="user circle" size="large" />}
            options={options}
          />
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};

export default NavBarDesktop;
