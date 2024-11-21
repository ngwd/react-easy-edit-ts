import React, { useState, useEffect, ReactElement } from 'react';
import { ValueType } from './EasyEditGlobals';
// type ValueType = string | number | [] | Record<string, any>;

interface EasyCustomProps {
  children?: ReactElement;
  cssClassPrefix?: string;
  onBlur?: () => void;
  onFocus?: () => void;
  onSetValue?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
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
    if (onSetValue) {
      onSetValue(newValue);
    }
  };

  const handleBlur = () => {
    if (onBlur) {
      // onBlur(value);
      onBlur();
    }
  };

  const handleFocus = () => {
    if (onFocus != undefined) {
      onFocus();
    }
  };

  const getChild = () => {
    if (React.isValidElement(children)) {
      const child = React.cloneElement(
        React.Children.only(children),
        {
          setParentValue: handleSetValue,
          onBlur: handleBlur,
          onFocus: handleFocus,
          value
        }
      );
      return child;
    }
    return null;
  }

  return (
    <div className={cssClassPrefix + "easy-edit-component-wrapper"}>
      {getChild()}
    </div>
  );
};

export default EasyCustom;
