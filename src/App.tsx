import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AOS from 'aos';

import appRoutes from './app.routes';
import { RouterOutlet } from './app/core/modules/RouterOutlet';
import DialogProvider from '@shared/components/partials/Dialog';

function App() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <BrowserRouter>
      <DialogProvider>
        <ToastContainer />
        <RouterOutlet routes={appRoutes} />
      </DialogProvider>
    </BrowserRouter>
  )
}

export default App
