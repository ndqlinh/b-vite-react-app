import ReactDOM from 'react-dom/client';
import './global.css';
import App from './App.tsx';
import { Provider } from 'react-redux';
import { store } from './app/stores';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>
);
