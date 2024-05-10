import { BrowserRouter } from 'react-router-dom';
import { RouterOutlet } from './app/core/modules/RouterOutlet';
import appRoutes from './app.routes';

function App() {
  return (
    <BrowserRouter>
      <RouterOutlet routes={appRoutes} />
    </BrowserRouter>
  )
}

export default App
