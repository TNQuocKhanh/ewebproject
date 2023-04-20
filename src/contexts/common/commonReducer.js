import { getProfile } from "../../apis";

const getUserProfile = async (state) => {
  const res = await getProfile();
  return {...state, profile: res}
};

const commonReducer = (state, action) => {
  switch (action.type) {
    case "GET_PROFILE":
      return getUserProfile();
    default:
      return state;
  }
};

export default commonReducer;
