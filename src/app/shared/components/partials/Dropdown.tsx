import { useRef, useState } from 'react';

import LogoutIcon from '@assets/icons/logout.svg?react';
import ProfileIcon from '@assets/icons/profile.svg?react';

import useOutsideEvent from '@shared/hooks/useOutsideEvent';

const Dropdown = (props) => {
  const { triggerElm } = props;
  const dropdownRef = useRef(null);
  const [isShowed, setShowed] = useState(false);
  useOutsideEvent(dropdownRef, () => handleClickOutside());

  const toggleDropdown = () => {
    setShowed(prev => !prev);
  }

  const handleClickOutside = () => {
    console.log(123123);
    setShowed(false);
  }

  return (
    <div className="dropdown-container" ref={ dropdownRef }>
      <div className="flex-center-y" onClick={ toggleDropdown }>
        { triggerElm }
      </div>
      <div className={ `dropdown-menu ${ isShowed ? 'showed' : 'invisible' }` }>
        <ul className="dropdown-list">
          <li className="dropdown-item">
            <div className="pre-icon">
              <ProfileIcon />
            </div>
            <span className="dropdown-item-title">Profile</span>
          </li>
          <li className="dropdown-item">
            <div className="pre-icon">
              <LogoutIcon />
            </div>
            <span className="dropdown-item-title">Logout</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dropdown;
