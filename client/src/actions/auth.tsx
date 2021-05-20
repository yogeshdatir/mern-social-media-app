import * as api from "../api";
import { AUTH } from "../constants/actionTypes";

export const signUp =
  (formData: any, history: any) => async (dispatch: any) => {
    try {
      // sign up the user
      const { data } = await api.signUp(formData);

      dispatch({  type: AUTH, data  });;

      history.push("/");
    } catch (error) {
      console.log(error.message);
    }
  };

export const signIn =
  (formData: any, history: any) => async (dispatch: any) => {
    try {
      // log in the user
      const { data } = await api.signIn(formData);

      dispatch({ type: AUTH, data });

      history.push("/");
    } catch (error) {
      console.log(error.message);
    }
  };
