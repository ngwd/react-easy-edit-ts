import React, { useState, useEffect, ReactElement } from 'react';
import { ValueType } from './EasyEditGlobals';

interface EasyCustomProps {
  // children?: ReactElement;
  children?: ReactElement<{
    setParentValue: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void; 
    onBlur: () => void;
    onFocus: () => void;
    value: ValueType;
  }>;
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

  const handleSetValue = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const newValue = e.target.value;
    setValue(newValue);

    if (onSetValue) {
      onSetValue(e);  // Pass the ChangeEvent to the parent handler
    }
  };

  const handleBlur = () => {
    if (onBlur) {
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
          value: value
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
