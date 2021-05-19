import { Grid, IconButton, InputAdornment, TextField } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import React from "react";

interface Props {
  half?: boolean;
  handleShowPassword?: any;
  handleChange: any;
  name: any;
  label: any;
  autoFocus?: any;
  type?: any;
}

const Input = ({
  name,
  handleChange,
  label,
  autoFocus,
  type,
  half,
  handleShowPassword,
}: Props) => {
  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
      <TextField
        name={name}
        onChange={handleChange}
        variant="outlined"
        required
        fullWidth
        label={label}
        autoFocus={autoFocus}
        type={type}
        InputProps={
          name === "password"
            ? {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowPassword}>
                      {type === "password" ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }
            : undefined
        }
      />
    </Grid>
  );
};

export default Input;
