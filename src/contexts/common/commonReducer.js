const commonReducer = (state, action) => {
  switch (action.type) {
    case "REQUEST":
      return {...state, loading: true}
    case "PROFILE_SUCCESS":
      return {...state, loading: false, userProfile: action.data}
    case "CATEGORY_SUCCESS":
      return {...state, loading: false, category: action.data}
    case "ERROR":
      return {...state, loading: false, error: action.error}
    default:
      return state;
  }
};

export default commonReducer;
