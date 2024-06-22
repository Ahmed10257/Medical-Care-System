import * as React from "react";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import {
  ArrowRight,
  Home,
  SquareUserRound,
  CalendarDays,
  ShieldPlus,
  UserSearch,
  Phone,
  LogOut,
  Menu,
} from "lucide-react";

type Anchor = "right";

const Sidbar = () => {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    <Box
      sx={{
        width: "300px",
        height: "100vh",
        backgroundColor: "#0070CD",
      }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem component="a" href="#" className="flex justify-end items-end">
          <ListItemIcon>
            <ArrowRight
              color="white"
              size={"30px"}
              className="relative left-48"
            />
          </ListItemIcon>
          <ListItemText />
        </ListItem>

        <ListItem
          component={Link}
          to="/"
          className=" text-white border-b border-white-500"
        >
          <ListItemIcon>
            <Home color="white" />
          </ListItemIcon>
          <ListItemText primary="Home Page" className="py-3" />
        </ListItem>

        <ListItem
          component="a"
          href="#"
          className=" text-white   border-b border-white-500"
        >
          <ListItemIcon>
            <SquareUserRound color="white" />
          </ListItemIcon>
          <ListItemText primary="My Profile" className="py-3" />
        </ListItem>

        <ListItem
          component="a"
          href="#"
          className=" text-white  md:hidden  border-b border-white-500"
        >
          <ListItemIcon>
            <CalendarDays color="white" />
          </ListItemIcon>
          <ListItemText primary="My Appointments" className="py-3" />
        </ListItem>

        <ListItem
          component="a"
          href="#"
          className="text-white border-b border-white-500"
        >
          <ListItemIcon>
            <ShieldPlus color="white" />
          </ListItemIcon>
          <ListItemText primary="My Insurance" className="py-3" />
        </ListItem>

        <ListItem
          component="a"
          href="#"
          className="text-white border-b border-white-500"
        >
          <ListItemIcon>
            <UserSearch color="white" />
          </ListItemIcon>
          <ListItemText primary="Vezeeta For Doctors" className="py-3" />
        </ListItem>

        <ListItem
          component={Link}
          to="contact"
          className="text-white border-b border-white"
        >
          <ListItemIcon>
            <Phone color="white" />
          </ListItemIcon>
          <ListItemText primary="Contact Us" className="py-3" />
        </ListItem>

        <ListItem component="a" href="#" className="text-white">
          <ListItemIcon>
            <LogOut color="white" />
          </ListItemIcon>
          <ListItemText primary="Logout" className="py-3" />
        </ListItem>

        <ListItem component="a" href="#" className="text-white">
          <ListItemText primary="عربى" className="px-3 text-base" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      <Button onClick={toggleDrawer("right", true)}>
        <Menu color="white" className="relative left-16" />
      </Button>
      <SwipeableDrawer
        anchor="right"
        open={state.right}
        onClose={toggleDrawer("right", false)}
        onOpen={toggleDrawer("right", true)}
      >
        {list("right")}
      </SwipeableDrawer>
    </div>
  );
};

export default Sidbar;
