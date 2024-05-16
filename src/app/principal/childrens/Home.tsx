import { useState } from 'react';

import ReactLogo from '@assets/icons/react.svg';

const Home = () => {
  const [count, setCount] = useState(0);

  const increaseCount = () => setCount(count => count + 1);

  return (
    <div className="home-page flex-col flex-col-centered">
      <img src={ ReactLogo } className="app-logo" alt="logo" />
      <h1>Vite + React</h1>
      <button className="btn btn-outline mb-3" onClick={increaseCount}>
        count is {count}
      </button>
      <div>
        <a
          className="txt-blue"
          href="https://react.dev"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        {' | '}
        <a
          className="txt-blue"
          href="https://vitejs.dev/guide/features.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          Vite Docs
        </a>
      </div>
    </div>
  )
};

export default Home;
