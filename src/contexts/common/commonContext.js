import { createContext, useReducer } from "react";
import commonReducer from "./commonReducer";

const commonContext = createContext();

const CommonProvider = ({ children }) => {
  const [state, dispatch] = useReducer(commonReducer, {profile: {}});

  const getProfile = () => {
    return dispatch({
      type: 'GET_PROFILE',
    })
  }

  const values = {
    ...state,
    getProfile
  };

  return (
    <commonContext.Provider value={values}>{children}</commonContext.Provider>
  );
};

export default commonContext;
export { CommonProvider };
