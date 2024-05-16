import { useEffect } from 'react';

const useOutsideEvent = (ref, callback) => {
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [ref]);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      if (callback && typeof callback === 'function') {
        callback()
      }
    }
  }
}

export default useOutsideEvent;
