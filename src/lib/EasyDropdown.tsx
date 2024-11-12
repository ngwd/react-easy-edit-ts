import React, { ReactElement } from 'react';
import './EasyEdit.css';
import EasyEditGlobals from './EasyEditGlobals';

interface EasyDropdownProps {
  options: any[]; 
  value?: string|number;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  placeholder?: string | ReactElement;
  attributes?: Record<string, any>;
  cssClassPrefix?: string;
  onFocus?: () => void;
  onBlur?: () => void;
};
const EasyDropdown:React.FC<EasyDropdownProps> = ({
  options, 
  value, 
  onChange, 
  placeholder = EasyEditGlobals.DEFAULT_SELECT_PLACEHOLDER, 
  attributes = {}, 
  cssClassPrefix, 
  onFocus, 
  onBlur
}) => {
  return (
    <div className={cssClassPrefix + "easy-edit-component-wrapper"}>
      <select
          value={value || ''}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          {...attributes}
      >
        <option key="" value="" disabled>{placeholder}</option>
        {options.map(option => (
            <option value={option.value} key={option.value}>
              {option.label}
            </option>
        ))}
      </select>
    </div>
  );
};
export default EasyDropdown;
