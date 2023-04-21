import { createContext, useReducer, useEffect } from "react";
import commonReducer from "./commonReducer";
import { getProfile, getListCategories } from "../../apis";

const commonContext = createContext();

const initState = {
  userProfile: {},
  loading: false,
  error: null,
};

const CommonProvider = ({ children }) => {
  const [state, dispatch] = useReducer(commonReducer, initState);

  useEffect(() => {
    dispatch({ type: "REQUEST" });

    const getUserProfile = async () => {
      let resp = await getProfile();

      if (resp) {
        dispatch({ type: "PROFILE_SUCCESS", data: resp });
        return;
      }
      dispatch({ type: "ERROR", error: "CO LOI XAY RA" });
    };
    
    const getAllCategory = async () => {
      let resp = await getListCategories();

      if (resp) {
        dispatch({ type: "CATEGORY_SUCCESS", data: resp });
        return;
      }
      dispatch({ type: "PROFILE_ERROR", error: "CO LOI XAY RA" });
    };
    getUserProfile();
    getAllCategory()
  }, []);

  const values = {
    profile: state.userProfile,
    category: state.category
  };

  return (
    <commonContext.Provider value={values}>{children}</commonContext.Provider>
  );
};

export default commonContext;
export { CommonProvider };
