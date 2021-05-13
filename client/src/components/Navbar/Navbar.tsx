import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import React from "react";
import { NavLink } from "react-router-dom";

import memories from "../../images/memories.svg";
import useStyles from "./styles";

interface Props {}

const Navbar = (props: Props) => {
  const classes = useStyles();

  const user = null;

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography
          component={NavLink}
          to="/"
          className={classes.heading}
          variant="h2"
          align="center"
        >
          Memories
        </Typography>
        <img
          className={classes.image}
          src={memories}
          alt="memories"
          height="60"
        />
      </div>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              // alt={user.result.name}
              // src={user.result.imageUrl}
            />
            <Typography className={classes.userName} variant="h6">
              {/* {user.result.name} */}
            </Typography>
            <Button variant="contained" color="secondary">
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={NavLink}
            to="/auth"
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
