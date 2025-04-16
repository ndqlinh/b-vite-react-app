import { useRef, useState } from 'react';

import useOutsideEvent from '@shared/hooks/useOutsideEvent';

const Dropdown = (props) => {
  const { triggerElm, dropdownContent } = props;
  const dropdownRef = useRef(null);
  const [isShowed, setShowed] = useState(false);
  useOutsideEvent(dropdownRef, () => handleClickOutside());

  const toggleDropdown = () => {
    setShowed((prev) => !prev);
  };

  const handleClickOutside = () => {
    setShowed(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="flex-center-y" onClick={toggleDropdown}>
        {triggerElm}
      </div>
      <div
        className={`absolute py-1 rounded min-w-[140px] scale-75 bg-white shadow-lg border top-full right-0 mt-2 transition-all ease-in-out duration-100 z-10 ${
          isShowed ? 'scale-100 visible opacity-100' : 'opacity-0 invisible'
        }`}
        onClick={toggleDropdown}
      >
        {dropdownContent}
      </div>
    </div>
  );
};

export default Dropdown;
