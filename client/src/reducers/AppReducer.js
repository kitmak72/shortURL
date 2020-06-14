export default function (state, action) {
  switch (action.type) {
    case 'USER_LOADING':
      return {
        ...state,
        isLoading: true,
        error: null
      };

    case 'USER_LOADED':
      return {
        ...state,
        user: action.payload.user,
        isAuth: true,
        isLoading: false,
        error: null
      };

    case 'LOGIN_SUCCESS':
    case 'SIGNUP_SUCCESS':
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuth: true,
        error: null
      };

    case 'LOGOUT_SUCCESS':
      localStorage.removeItem('token');
      return {
        ...state,
        isAuth: false,
        token: null,
        user: null
      };

    case 'USER_LOAD_ERROR':
      return {
        ...state,
        token: null,
        isLoading: false
      };

    case 'AUTH_ERROR':
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        user: null,
        error: action.payload
      };

    default:
      return state;
  }
}
