import React from "react";
import { Menu, Image, Icon, Dropdown } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import firebase from "../Firebase/firebase";
import useFirebaseUser from "../CustomHooks/useFirebaseUser";

const NavBarDesktop = () => {
  const user = useFirebaseUser();
  // const user = useContext(FirebaseAuthContext);
  // const user = JSON.parse(sessionStorage.getItem("authenticatedUser"));
  const displayName = user ? user.displayName : "";
  const options = [
    {
      key: "user",
      text: (
        <span>
          Signed in as <strong>{displayName}</strong>
        </span>
      ),
      disabled: true,
    },
    { key: "profile", text: "Account Settings", icon: "settings" },
    { key: "help", text: "Help & FAQ", icon: "help" },
    { key: "contact", text: "Contact Us", icon: "talk" },
  ];

  const handleLogout = () => {
    firebase
      .logout()
      .then(() => {
        console.log("Successfully signed out");
        sessionStorage.clear();
        localStorage.clear();
        window.location.reload();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return user !== null ? (
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
        <Menu.Item as={NavLink} to="/dashboard">
          Home
        </Menu.Item>
        <Menu.Item onClick={handleLogout}>Logout</Menu.Item>
        <Menu.Item>
          <Dropdown
            trigger={<Icon name="user circle" size="large" />}
            options={options}
          />
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  ) : null;
};

export default NavBarDesktop;
