import { useEffect, useState } from 'react';

import ArrowDownIcon from '@assets/icons/arrow-dropdown.svg?react';

interface SelectProps {
  name: string;
  register: any;
  label?: string;
  options: Array<any>;
  preIcon?: any;
  selectedValue?: any;
  onChange?: any;
  isDisabled?: boolean;
}

const SelectBox = ({
  name,
  register,
  label,
  options,
  preIcon,
  selectedValue,
  onChange,
  isDisabled
}: SelectProps) => {
  const [value, setValue] = useState(selectedValue || options[0]?.value);
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    document.addEventListener('click', handleClickOutSide);
    return () => {
      document.removeEventListener('click', handleClickOutSide);
    };
  }, []);

  const toggleShowOptions = () => {
    console.log(123123123);
    setShowOptions(prev => !prev);
  };

  const handleClickOutSide = (e) => {
    if (!e.target.classList.contains('select')) {
      setShowOptions(false);
    }
  };

  const doOnChange = () => {
    if (typeof onChange === 'function') {
      onChange();
    }
  };

  const onSelect = (val) => {
    setValue(val);
    setShowOptions(false);
  }

  return (
    <div className='form-group select-group'>
      <div className="select-box-wrapper">
        {
          preIcon &&
          <div className="prev-icon">
            { preIcon }
          </div>
        }
        <label className="form-label" htmlFor={ name }>
          { label }
        </label>
        <div className="select-group">
          <div className={ `form-control select selected-value ${isDisabled ? 'disabled' : ''}` } onClick={ toggleShowOptions }>
            { options?.find(item => item?.value === value)?.name }
          </div>
          <span className='icon-arrow-down arrow-icon'>
            <ArrowDownIcon />
          </span>
          {
            showOptions && !isDisabled &&
            <ul className="option-list">
              {
                options?.map(item => (
                  <li
                    key={ item?.value }
                    className={ `option-item ${item?.value === value ? 'selected' : ''}` }
                    onClick={ () => onSelect(item?.value) }
                  >
                    { item?.name }
                  </li>
                ))
              }
            </ul>
          }
          <select
            name={ name }
            ref={ register }
            className="form-field hidden"
            onChange={ doOnChange }
            value={ value }
            disabled={ isDisabled }
          >
            {
              options.map((opt, ind) => (
                <option key={ ind } value={ opt.value }>
                  { opt.name }
                </option>
              ))
            }
          </select>
        </div>
      </div>
    </div>
  );
}

export default SelectBox;
