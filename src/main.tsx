import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';

import './global.css';
import '@/stylesheet/styles.scss';
import 'react-datepicker/dist/react-datepicker.css';

import App from './App.tsx';
import { Provider } from 'react-redux';
import { store } from './app/stores';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <ToastContainer />
    <App />
  </Provider>
);
