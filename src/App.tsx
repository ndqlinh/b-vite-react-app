import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { RouterOutlet } from './app/core/modules/RouterOutlet';
import appRoutes from './app.routes';

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <RouterOutlet routes={appRoutes} />
    </BrowserRouter>
  )
}

export default App
