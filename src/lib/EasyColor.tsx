import React from 'react';
import './EasyEdit.css';

interface EasyColorProps {
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  attributes?: Record<string, any>;
  cssClassPrefix?: string;
  onFocus?: () => void;
  onBlur?: () => void;
};
const EasyColor:React.FC<EasyColorProps> = ({
  value = '',
  onChange,
  attributes = {},
  cssClassPrefix,
  onFocus,
  onBlur}) => {
  return (
    <div className={cssClassPrefix + "easy-edit-component-wrapper"}>
      <input
          type="color"
          defaultValue={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          {...attributes}
      />
    </div>
  );
};
export default EasyColor;
