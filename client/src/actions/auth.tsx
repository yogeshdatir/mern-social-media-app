export const signUp =
  (formData: any, history: any) => async (dispatch: any) => {
    try {
      // sign up the user

      history.push("/");
    } catch (error) {
      console.log(error.message);
    }
  };

export const signIn =
  (formData: any, history: any) => async (dispatch: any) => {
    try {
      // log in the user

      history.push("/");
    } catch (error) {
      console.log(error.message);
    }
  };
