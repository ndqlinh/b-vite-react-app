import { useEffect, useState } from 'react';

import ArrowDownIcon from '@assets/icons/arrow-dropdown.svg?react';

interface SelectProps {
  name: string;
  formRegister: any;
  label?: string;
  options: Array<any>;
  preIcon?: any;
  selectedValue?: any;
  onChange?: any;
  isDisabled?: boolean;
  setFormValue?: any;
  placeholder?: string;
}

const SelectBox = ({
  name,
  formRegister,
  label,
  options,
  preIcon,
  selectedValue,
  onChange,
  isDisabled,
  setFormValue,
  placeholder
}: SelectProps) => {
  const [value, setValue] = useState('');
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    document.addEventListener('click', handleClickOutSide);
    return () => {
      document.removeEventListener('click', handleClickOutSide);
    };
  }, []);

  useEffect(() => {
    if (selectedValue) {
      setValue(selectedValue)
    }
  }, [selectedValue]);

  const toggleShowOptions = () => {
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
    setFormValue(name, val);
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
          <div
            className={ `form-control select selected-value ${isDisabled ? 'disabled' : ''} ${ value ? '' : 'txt-placeholder' }` }
            onClick={ toggleShowOptions }
          >
            { options?.find(item => item?.value === value)?.name || placeholder }
          </div>
          <span className='icon-arrow-down arrow-icon'>
            <ArrowDownIcon />
          </span>
          {
            (showOptions && !isDisabled) &&
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

          <input
            type="text"
            name={ name }
            { ...formRegister }
            className="form-field hidden"
            onChange={ doOnChange }
            onSelect={ doOnChange }
            disabled={ isDisabled }
          />
        </div>
      </div>
    </div>
  );
}

export default SelectBox;
