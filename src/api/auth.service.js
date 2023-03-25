import api from "./http.common";

import { 
  isLoggedIn,
  setUser
} from '../redux/auth.slice'

import { 
  isError, 
  isLoading, 
  setMessage 
} from '../redux/app.slice'

function errorHandler(dispatch, err) {
  dispatch(isError(true));
  dispatch(setMessage(err.message))
}

class ApiAuthService {
  async signUp(dispatch, data){
    try {
      dispatch(isLoading(true)); 
      const user = await api.post('/auth/signup', data, {withCredentials: true});
      localStorage.setItem("user", JSON.stringify(user.data));
      dispatch(setUser(user.data));
      dispatch(isLoggedIn(true));
      dispatch(isError(false));
      dispatch(setMessage("User Created"));
    } catch (err) {
      errorHandler(dispatch, err);
    } finally {
      dispatch(isLoading(false));
    }
  }

  async signIn(dispatch, data){
    try {
      dispatch(isLoading(true)); 
      const accessToken = await api.post('/auth/signin', data, {withCredentials: true});
      const userData = await api.get('/users/me', {withCredentials: true})
      const user = accessToken.data;
      user.user = userData.data;
      localStorage.setItem("user", JSON.stringify(user));
      dispatch(setUser(user));
      dispatch(isLoggedIn(true));
      dispatch(isError(false));
      dispatch(setMessage("User Logged in"));
    } catch (err) {
      errorHandler(dispatch, err);
    } finally {
      dispatch(isLoading(false));
    }
  }
  
  async signOut(dispatch){
    try {
      dispatch(isLoading(true)); 
      await api.post('/auth/signout', {}, {withCredentials: true});
      localStorage.removeItem("user");
      dispatch(setUser(null));
      dispatch(isLoggedIn(false));
      dispatch(isError(false));
      dispatch(setMessage("User Logged out"));
      console.log("User logged out");
    } catch (err) {
      errorHandler(dispatch, err);
    } finally {
      dispatch(isLoading(false));
    }
  }

  async getuser () {
    return JSON.parse(localStorage.getItem("user"));
  }
}


export default new ApiAuthService();