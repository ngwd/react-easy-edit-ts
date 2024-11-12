import React, { useState, useEffect, ReactElement } from 'react';

type ValueType = string | number | [] | Record<string, any>;
interface EasyCustomProps {
  children?: ReactElement;
  cssClassPrefix?: string;
  onBlur?: () => void;
  onFocus?: () => void;
  onSetValue?: (value: ValueType) => void;
  value?: ValueType;
};
const EasyCustom:React.FC<EasyCustomProps> = ({
  children, 
  cssClassPrefix, 
  onBlur, 
  onFocus, 
  onSetValue, 
  value: initialValue 
}) => {
  const [value, setValue] = useState<ValueType>(initialValue as ValueType);
  useEffect(() => {
    setValue(initialValue as ValueType);
  }, [initialValue]);

  const handleSetValue = (newValue: ValueType) => {
    setValue(newValue);
    if (onSetValue !== undefined) {
      onSetValue(newValue);
    }
  };

  const handleBlur = () => {
    if (onBlur !== undefined) {
      // onBlur(value);
      onBlur();
    }
  };

  const handleFocus = () => {
    if (onFocus != undefined) {
      onFocus();
    }
  };

  const child = React.cloneElement(
    React.Children.only(children),
    {
      setParentValue: handleSetValue,
      onBlur: handleBlur,
      onFocus: handleFocus,
      value
    }
  );

  return (
    <div className={cssClassPrefix + "easy-edit-component-wrapper"}>
      {child}
    </div>
  );
};

export default EasyCustom;
