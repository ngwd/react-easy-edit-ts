import React from 'react';
import './EasyEdit.css';
import { InputValueType, OptionType } from './EasyEditGlobals'

interface EasyRadioProps {
  options: OptionType[]; 
  value?: InputValueType;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  attributes?: Record<string, any>;
  cssClassPrefix?: string;
  onFocus?: () => void;
  onBlur?: () => void;
};
const EasyRadio:React.FC<EasyRadioProps> = ({
  options, 
  value, 
  onChange, 
  attributes = {}, 
  cssClassPrefix, 
  onFocus, 
  onBlur
}) => {
  let radios = options.map(option => (
    <label key={option.value} className={cssClassPrefix + "easy-edit-radio-label"}>
      <input
          type="radio"
          value={option.value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          checked={option.value === value}
          {...attributes}
      />{option.label}
    </label>
  ));
  return (
      <div>
        {radios}
      </div>
  );
};

export default EasyRadio;
