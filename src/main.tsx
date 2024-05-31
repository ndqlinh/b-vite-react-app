import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './stylesheet/styles.scss';
import { Provider } from 'react-redux';
import { store } from './app/stores';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>
)
