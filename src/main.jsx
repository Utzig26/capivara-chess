import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { Provider } from 'react-redux'
import store from './redux/store'
import Message  from './components/SnackBar'
      
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <Message />
      <App />
    </React.StrictMode>
  </Provider>,
)
