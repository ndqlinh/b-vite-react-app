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
  placeholder,
}: SelectProps) => {
  const [value, setValue] = useState('');
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    document.addEventListener('click', handleClickOutSide);
    return () => {
      document.removeEventListener('click', handleClickOutSide);
    };
  }, [showOptions]);

  useEffect(() => {
    if (selectedValue) {
      setValue(selectedValue);
    }
  }, [selectedValue]);

  const toggleShowOptions = () => {
    setShowOptions((prev) => !prev);
  };

  const handleClickOutSide = (e) => {
    if (e.target.closest('.select-box-wrapper')) {
      return;
    }
    if (showOptions) {
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
  };

  return (
    <div
      className="select-box-wrapper relative flex items-center shadow appearance-none border rounded w-full py-3 px-3 pl-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline cursor-pointer"
      onClick={toggleShowOptions}
    >
      {preIcon && (
        <div className="absolute text-gray-400 text-xl left-3">{preIcon}</div>
      )}
      <>
        <label className="form-label" htmlFor={name}>
          {label}
        </label>
        <div className="select-group">
          <div
            className={`form-control select selected-value ${
              isDisabled ? 'disabled' : ''
            } ${value ? '' : 'text-gray-400'}`}
          >
            {options?.find((item) => item?.value === value)?.name ||
              placeholder}
          </div>

          {showOptions && (
            <ul className="absolute z-10 bg-white shadow-lg border rounded mt-1 w-full max-h-60 overflow-auto left-0 top-full">
              {options?.map((item) => (
                <li
                  key={item?.value}
                  className={`py-2 px-4 hover:bg-blue-50 ${
                    item?.value === value
                      ? 'bg-blue-600 text-white hover:bg-blue-600'
                      : ''
                  }`}
                  onClick={() => onSelect(item?.value)}
                >
                  {item?.name}
                </li>
              ))}
            </ul>
          )}

          <input
            type="text"
            name={name}
            {...formRegister}
            className="form-field hidden"
            onChange={doOnChange}
            onSelect={doOnChange}
            disabled={isDisabled}
          />
        </div>
      </>
      <span className="absolute right-3 cursor-pointer text-gray-500 text-xl">
        <ArrowDownIcon />
      </span>
    </div>
  );
};

export default SelectBox;
