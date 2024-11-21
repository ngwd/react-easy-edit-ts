import React from 'react';
import { EasyEditGlobals, ValueType }  from './EasyEditGlobals';
import { InputType } from './EasyEdit'
import './EasyEdit.css';

interface EasyInputProps {
  type: InputType;
  value: ValueType;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  attributes?: Record<string, any>;
  cssClassPrefix?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};
const EasyInput:React.FC<EasyInputProps> = ({
  type,
  value,
  placeholder = EasyEditGlobals.DEFAULT_PLACEHOLDER,
  onChange,
  onFocus = () => {}, 
  onBlur,
  cssClassPrefix,
  attributes = {},
  onMouseEnter,
  onMouseLeave
}) => {
  return (
      <div className={cssClassPrefix + "easy-edit-component-wrapper"}
           onMouseLeave={onMouseLeave}
           onMouseEnter={onMouseEnter}>
        <input
            autoFocus={attributes.autoFocus || true}
            type={type}
            value={value as string}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            placeholder={attributes.placeholder || placeholder}
            autoComplete={attributes.autoComplete || "off"}
            {...attributes}
        />
      </div>
  );
};
export default EasyInput;