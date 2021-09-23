import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import { LOGOUT } from "../../constants/actionTypes";
import decode from "jwt-decode";

import memories from "../../images/memories.svg";
import useStyles from "./styles";

interface Props {}

const Navbar = (props: Props) => {
  const classes = useStyles();

  const [user, setUser] = useState<any>(
    JSON.parse(localStorage.getItem("profile") || "{}")
  );

  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const logout = () => {
    dispatch({ type: LOGOUT });

    history.push("/");

    setUser(null);
  };

  // we need to refresh page for getting user in navbar rendered. To avoid that following useEffect is useful.
  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken: any = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem("profile") || "{}"));
  }, [location, user?.token]);

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
          InstaMilligram
        </Typography>
        <img
          className={classes.image}
          src={memories}
          alt="memories"
          height="60"
        />
      </div>
      <Toolbar className={classes.toolbar}>
        {user?.result ? (
          <div className={classes.profileContainer}>
            <div className={classes.profile}>
              <Avatar
                className={classes.purple}
                alt={user.result.name}
                src={user.result.imageUrl}
              />
              <Typography className={classes.userName} variant="h6">
                {user.result.name}
              </Typography>
            </div>
            <Button variant="contained" color="secondary" onClick={logout}>
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
