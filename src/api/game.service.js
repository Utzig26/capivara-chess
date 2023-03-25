import api from "./http.common";

import { 
  isLoggedIn,
  setUser
} from '../redux/auth.slice'

import { 
  isError, 
  isLoading, 
  setMessage,
  setGame
} from '../redux/app.slice'

function errorHandler(dispatch, err) {
  dispatch(isError(true));
  dispatch(setMessage(err.message))
}

class ApiAuthService {

  async create(dispatch, data){
    try{
      dispatch(isLoading(true));
      const game = await api.post('/games/', data, {withCredentials: true});
      localStorage.setItem("game", JSON.stringify(game));
      dispatch(setGame(game.data));
      dispatch(isError(false));
      dispatch(setMessage("Game Created"));
    } catch(err){
      errorHandler(dispatch, err);
    } finally {
      dispatch(isLoading(false));
    }
  }

  async join(dispatch, id){
    try{
      dispatch(isLoading(true));
      const game = await api.post('/games/' + id + '/join', {}, {withCredentials: true});
      localStorage.setItem("game", JSON.stringify(game));
      dispatch(setGame(game.data));
      dispatch(isError(false));
      dispatch(setMessage("Game Joined"));
    } catch(err){
      errorHandler(dispatch, err);
    } finally {
      dispatch(isLoading(false));
    }
  }

  async move(dispatch, id, data){
    try{
      dispatch(isLoading(true));
      const game = await api.post('/games/' + id + '/move', data, {withCredentials: true});
      localStorage.setItem("game", JSON.stringify(game));
      dispatch(setGame(game.data));
      dispatch(isError(false));
    } catch(err){
      errorHandler(dispatch, err);
    } finally {
      dispatch(isLoading(false));
    }
  }
  async drawOffer(dispatch, id) {
    try{
      dispatch(isLoading(true));
      const game = await api.post('/games/' + id + '/draw', {}, {withCredentials: true});
      localStorage.setItem("game", JSON.stringify(game));
      dispatch(setGame(game.data));
      dispatch(isError(false));
    } catch(err){
      errorHandler(dispatch, err);
    } finally {
      dispatch(isLoading(false));
    }
  }
  async drawCancel(dispatch, id) {
    try{
      dispatch(isLoading(true));
      const game = await api.delete('/games/' + id + '/draw', {}, {withCredentials: true});
      localStorage.setItem("game", JSON.stringify(game));
      dispatch(setGame(game.data));
      dispatch(isError(false));
    } catch(err){
      errorHandler(dispatch, err);
    } finally {
      dispatch(isLoading(false));
    }

  }
  async resign(dispatch, id){
    try{
      dispatch(isLoading(true));
      const game = await api.post('/games/' + id + '/resign', {}, {withCredentials: true});
      localStorage.setItem("game", JSON.stringify(game));
      dispatch(setGame(game.data));
      dispatch(isError(false));
    } catch(err){
      errorHandler(dispatch, err);
    } finally {
      dispatch(isLoading(false));
    }
  }
}


export default new ApiAuthService();