import React from 'react';
import './EasyEdit.css';
import { ValueType, InputValueType, OptionType } from './EasyEditGlobals'

interface EasyCheckboxProps {
  options: OptionType[]; 
  value?: InputValueType[];
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  attributes?: Record<string, any>;
  cssClassPrefix?: string;
  onFocus?: () => void;
  onBlur?: () => void;
};
const EasyCheckbox:React.FC<EasyCheckboxProps> = ({
  options,
  value,
  onChange,
  attributes = {},
  cssClassPrefix,
  onFocus,
  onBlur
}) => {
  let checkboxes = options.map(option => (
    <label key={option.value} className={cssClassPrefix + "easy-edit-checkbox-label"}>
      <input
          {...attributes}
          type="checkbox"
          value={option.value}
          key={option.value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          checked={value?.includes(option.value)}
      />{option.label}
    </label>
  ));
  return (
    <div>
      {checkboxes}
    </div>
  );
};
export default EasyCheckbox;