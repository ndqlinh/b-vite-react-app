import { useState } from 'react';

import ReactLogo from '@assets/icons/react.svg';

const Home = () => {
  const [count, setCount] = useState(0);

  const increaseCount = () => setCount((count) => count + 1);

  return (
    <div className="flex flex-col items-center justify-center flex-1">
      <img src={ReactLogo} className="h-[40vmin] mb-12" alt="logo" />
      <h1>Vite + React</h1>
      <button
        className="py-2.5 px-5 me-2 mb-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700"
        onClick={increaseCount}
      >
        count is {count}
      </button>
      <div>
        <a
          className="text-blue-500 underline"
          href="https://react.dev"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        {' | '}
        <a
          className="text-blue-500 underline"
          href="https://vitejs.dev/guide/features.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          Vite Docs
        </a>
      </div>
    </div>
  );
};

export default Home;
