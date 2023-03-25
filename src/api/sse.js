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

function getRealtimeData(data) {
  localStorage.setItem("game", JSON.stringify(data.game));
  dispatch(setGame(data.game));
}


class SSESerivce {
  constructor(id, dispatch) {
    this.dispatch = dispatch;
    this.id = id;
    this.eventSource = this.create(this.dispatch);
  }
  
  async create(dispatch) {
    try{
      dispatch(isLoading(true));
      dispatch(setMessage('Subscribing to SSE'))
      const sse = new EventSource(api.defaults.baseURL +'games/' + this.id + '/sse');
      sse.onmessage = (event) => {
        getRealtimeData(JSON.parse(event.data));
      };
      dispatch(isError(false));
      dispatch(setMessage('Subscribed to SSE'))
      return sse; 
    } catch (err) {
      errorHandler(dispatch, err);
    }
    finally {
      dispatch(isLoading(false));
    }
  }

  async close(dispatch) {
    try{
      dispatch(isLoading(true));
      this.eventSource.close();
      dispatch(isError(false));
    } catch (err) {
      errorHandler(dispatch, err);
    } finally {
      dispatch(isLoading(false));
    }
  }
}

export default SSESerivce;