import React from 'react';
import './EasyEdit.css';

interface EasyDatalistProps {
  options?: any[]; 
  value?: string|number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  attributes?: Record<string, any>;
  placeholder?: string;
  cssClassPrefix?: string;
  onFocus?: () => void;
  onBlur?: () => void;
};
const EasyDatalist:React.FC<EasyDatalistProps> = ({
  options,
  value,
  onChange,
  attributes = {},
  placeholder,
  cssClassPrefix,
  onFocus,
  onBlur
}) => {
  const datalistId = 'easy-datalist-id';

  let datalistOptions = options.map(dl => (
    <option key={dl.value} value={dl.value} />
  ));

  return (
    <div className={cssClassPrefix + "easy-edit-component-wrapper"}>
      <input
        autoFocus={attributes["autoFocus"] || true}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={placeholder}
        autoComplete={attributes["autoComplete"] || "off"}
        {...attributes}
        list={datalistId}
      />
      <datalist id={datalistId}>
        {datalistOptions}
      </datalist>
    </div>
  );
};

export default EasyDatalist;
