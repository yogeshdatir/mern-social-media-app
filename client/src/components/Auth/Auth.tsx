import {
  Container,
  Paper,
  Avatar,
  Typography,
  Grid,
  Button,
} from "@material-ui/core";
import React, { useState } from "react";

import useStyles from "./styles";

import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Input from "./Input";
import GoogleLogin from "react-google-login";

import Icon from "./Icon";
import { useDispatch } from "react-redux";
import { AUTH } from "../../constants/actionTypes";
import { useHistory } from "react-router-dom";

interface Props {}

const Auth = (props: Props) => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [isSignUp, setIsSignUp] = useState<boolean>(true);

  const dispatch = useDispatch();
  const history = useHistory();

  const handleShowPassword = () => setShowPassword(!showPassword);

  const handleChange = () => {};

  const handleSubmit = () => {};

  const googleSuccess = async (res: any) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({ type: AUTH, data: { result, token } });

      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const googleFailure = (error: any) => {
    console.log("google errors", error);
  };

  const switchMode = () => {
    setIsSignUp(!isSignUp);
    setShowPassword(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignUp ? `Sign Up` : `Sign In`}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignUp && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />

            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignUp && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </Button>
          <GoogleLogin
            clientId="525331554976-3ogt1nj0s5p9a03da52f4n68ncvlb1kt.apps.googleusercontent.com"
            render={(renderProps: any) => (
              <Button
                className={classes.googleButton}
                color="primary"
                fullWidth
                onClick={renderProps.onClick}
                // disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant="contained"
              >
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          />
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignUp
                  ? "Already have an account? Sign in"
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
