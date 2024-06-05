import { useRef, useState } from 'react';

import useOutsideEvent from '@shared/hooks/useOutsideEvent';

const Dropdown = (props) => {
  const { triggerElm, dropdownContent } = props;
  const dropdownRef = useRef(null);
  const [isShowed, setShowed] = useState(false);
  useOutsideEvent(dropdownRef, () => handleClickOutside());

  const toggleDropdown = () => {
    setShowed(prev => !prev);
  }

  const handleClickOutside = () => {
    setShowed(false);
  }

  return (
    <div className="dropdown-container" ref={ dropdownRef }>
      <div className="flex-center-y" onClick={ toggleDropdown }>
        { triggerElm }
      </div>
      <div className={ `dropdown-menu ${ isShowed ? 'showed' : 'invisible' }` } onClick={ toggleDropdown }>
        { dropdownContent }
      </div>
    </div>
  );
};

export default Dropdown;
