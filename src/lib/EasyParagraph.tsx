import React, { ReactElement }from 'react';
import './EasyEdit.css';
import { EasyEditGlobals } from './EasyEditGlobals';

interface EasyParagraphProps {
  value?: string;
  placeholder?: string | ReactElement;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  attributes?: Record<string, any>;
  cssClassPrefix?: string;
  onFocus?: () => void;
  onBlur?: () => void;
};
const EasyParagraph:React.FC<EasyParagraphProps> = ({
  value, 
  placeholder = EasyEditGlobals.DEFAULT_PLACEHOLDER, 
  onChange, 
  attributes = {}, 
  cssClassPrefix, 
  onFocus, 
  onBlur
}) => {
  return (
    <div className={cssClassPrefix + "easy-edit-component-wrapper"}>
      <textarea
          autoFocus={attributes["autoFocus"] || true}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={placeholder as string}
          {...attributes}
          className={attributes["className"] !== undefined ? attributes["className"] + " easy-edit-textarea" : "easy-edit-textarea"}
      />
    </div>
  );
};

export default EasyParagraph;
