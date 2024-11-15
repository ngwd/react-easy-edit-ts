import * as React from 'react';
import {ReactNode, useCallback, useEffect, useRef, useState } from "react";
import "./EasyEdit.css";

// local modules
import { EasyEditGlobals, ValueType } from './EasyEditGlobals';
import EasyDropdown from "./EasyDropdown";
import EasyInput from "./EasyInput";
import EasyParagraph from "./EasyParagraph";
import EasyRadio from "./EasyRadio";
import EasyCheckbox from "./EasyCheckbox";
import EasyColor from "./EasyColor";
import EasyDatalist from "./EasyDatalist";
import EasyCustom from "./EasyCustom";

export const Types = {
  CHECKBOX: "checkbox",
  COLOR: "color",
  DATALIST: "datalist",
  DATE: "date",
  DATETIME_LOCAL: "datetime-local",
  EMAIL: "email",
  FILE: "file",
  MONTH: "month",
  NUMBER: "number",
  PASSWORD: "password",
  RADIO: "radio",
  RANGE: "range",
  SELECT: "select",
  TEL: "tel",
  TEXT: "text",
  TEXTAREA: "textarea",
  TIME: "time",
  URL: "url",
  WEEK: "week"
} as const;
type InputType = typeof Types[keyof typeof Types];

const useHover = ():[boolean, () => void, () => void] => {
  const [hover, setHover] = useState(false);
  const handleHoverOn = () => setHover(true);
  const handleHoverOff = () => setHover(false);
  return [hover, handleHoverOn, handleHoverOff];
};

interface UseEditStateProps {
  initialValue: ValueType;
  editMode?: boolean;
  onSave: (value: ValueType) => void;
  onCancel: () => void;
  onValidate: (value: ValueType) => boolean;
}
const useEditState = ({
  initialValue,
  editMode = false,
  onSave,
  onCancel,
  onValidate
}: UseEditStateProps) => {
  const [editing, setEditing] = useState(editMode || false);
  const [value, setValue] = useState<ValueType>(initialValue);
  const [tempValue, setTempValue] = useState<ValueType>(initialValue);
  const [isValid, setIsValid] = useState(true);
  const [isHidden, setIsHidden] = useState(false);

  const handleSave = useCallback(() => {
    if (onValidate(tempValue)) {
      setEditing(false);
      setValue(tempValue);
      setIsValid(true);
      onSave(tempValue);
    } else {
      setIsValid(false);
    }
  }, [onSave, onValidate, tempValue]);

  useEffect(() => {
    setTempValue(initialValue);
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    if (editing !== editMode) {
      setEditing(editMode);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editMode, editing]);

  const handleCancel = () => {
    setEditing(false);
    setTempValue(value);
    onCancel();
  };

  return {
    editing,
    value,
    tempValue,
    setTempValue,
    isValid,
    isHidden,
    setIsHidden,
    handleSave,
    handleCancel,
    setEditing
  };
};

const isNullOrUndefinedOrEmpty = (value: any) => {
  return value === null || value === undefined || value === "";
};

interface EasyEditProps {
  type: InputType;
  value: ValueType; 
  options?: any[];
  saveButtonLabel?: string;
  saveButtonStyle?: string;
  cancelButtonLabel?: string;
  cancelButtonStyle?: string;
  deleteButtonLabel?: string;
  deleteButtonStyle?: string;
  editButtonLabel?: string;
  editButtonStyle?: string;
  buttonsPosition?: string;
  placeholder?: string;
  onCancel: () => void;
  onDelete?: () => void;
  onValidate: (value: ValueType) => boolean;
  onFocus?: (value: ValueType) => void;
  onBlur?: (value: ValueType) => void;
  onSave: (value: ValueType) => void;
  validationMessage?: string;
  editable?: boolean;
  inputAttributes?: Record<string, any>;
  viewAttributes?: Record<string, any>;
  instructions?: ReactNode;
  editComponent?: ReactNode;
  displayComponent?: ReactNode;
  disableAutoSubmit?: boolean,
  disableAutoCancel?: boolean,
  cssClassPrefix?: string;
  hideSaveButton?: boolean;
  hideCancelButton?: boolean;
  hideDeleteButton?: boolean;
  hideEditButton?: boolean,
  onHoverCssClass?: string;
  saveOnBlur?: boolean;
  cancelOnBlur?: boolean;
  isEditing?: boolean;
  showEditViewButtonsOnHover?: boolean;
  showViewButtonsOnHover?: boolean;
};

export const EasyEdit: React.FC<EasyEditProps> = ({
  type,
  value,
  options = [],
  saveButtonLabel = EasyEditGlobals.DEFAULT_SAVE_BUTTON_LABEL,
  saveButtonStyle =  undefined,
  cancelButtonLabel =  EasyEditGlobals.DEFAULT_CANCEL_BUTTON_LABEL,
  cancelButtonStyle = undefined,
  deleteButtonLabel = EasyEditGlobals.DEFAULT_DELETE_BUTTON_LABEL,
  deleteButtonStyle =  undefined,
  editButtonLabel =  EasyEditGlobals.DEFAULT_EDIT_BUTTON_LABEL,
  editButtonStyle =  undefined,
  buttonsPosition =  EasyEditGlobals.POSITION_AFTER,
  placeholder = EasyEditGlobals.DEFAULT_PLACEHOLDER,
  onCancel = () => {},
  onDelete =  () => {},
  onBlur =  (value: ValueType) => {},
  onValidate =  (value: ValueType) => true,
  validationMessage =  EasyEditGlobals.FAILED_VALIDATION_MESSAGE,
  onFocus = (value: ValueType) => {},
  onSave =  (value: ValueType) => {},
  editable =  true,
  inputAttributes = {},
  viewAttributes = {},
  instructions = null,
  editComponent = {},
  displayComponent = false,
  disableAutoSubmit = false ,
  disableAutoCancel = false,
  cssClassPrefix = "",
  hideSaveButton = false,
  hideCancelButton = false,
  hideDeleteButton = true,
  hideEditButton = true,
  onHoverCssClass = EasyEditGlobals.DEFAULT_ON_HOVER_CSS_CLASS,
  saveOnBlur = false,
  cancelOnBlur = false,
  isEditing = false,
  showEditViewButtonsOnHover = false,
  showViewButtonsOnHover = false
}) => {
  const [hover, handleHoverOn, handleHoverOff] = useHover();
  const {
    editing,
    tempValue,
    setTempValue,
    value: currentValue,
    isValid,
    isHidden,
    setIsHidden,
    handleSave,
    handleCancel,
    setEditing
  } = useEditState({value, isEditing, onSave, onCancel, onValidate});

  const saveButton : React.RefObject<HTMLButtonElement> = useRef<HTMLButtonElement>(null);
  const editButton: React.RefObject<HTMLButtonElement> = useRef<HTMLButtonElement>(null);
  const cancelButton: React.RefObject<HTMLButtonElement> = useRef<HTMLButtonElement>(null);
  const deleteButton: React.RefObject<HTMLButtonElement> = useRef<HTMLButtonElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!disableAutoCancel && e.key === "Enter") {
      handleCancel();
    }

    if (!disableAutoSubmit) {
      if ((e.key === "Enter" && type !== Types.TEXTAREA) || (e.key === "Enter"
        && e.ctrlKey && type === Types.TEXTAREA)) {
        handleSave();
      }
    }
  };

  const handleBlur = () => {
    if (saveOnBlur && cancelOnBlur) {
      console.warn(
        "EasyEdit: You've set both `saveOnBlur` and `cancelOnBlur` to true, please set either one to false.");
    }
    if (saveOnBlur) {
      onBlur(tempValue);
      handleSave();
    } else if (cancelOnBlur) {
      handleCancel();
    } else {
      onBlur(tempValue);
    }
  };

  const handleFocus = () => {
    if (onFocus) {
      onFocus(tempValue);
    }
  };

  const handleDelete = () => {
    setEditing(false);
    setTempValue(currentValue);
    handleHoverOff();
    setIsHidden(true);
    onDelete();
  };

  const handleEditing = () => {
    setEditing(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (e.target) {
      setTempValue(e.target.value);
    }
  };

  interface Option {
    value: string;
  }
  
  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    tempValue: string[] | undefined
    // options: Option[],
    // setTempValue: (value: string[]) => void
  ) => {
    let values = tempValue || [];
  
    if (e.target.checked && !values.includes(e.target.value)) {
      values.push(e.target.value);
    } else {
      values.splice(values.indexOf(e.target.value), 1);
    }
  
    let optionValues = options.map((o) => o.value);
    values = values.filter((value) => optionValues.includes(value));
  
    setTempValue(values);
  };


  const handleClick = () => {
    if (editable) {
      setEditing(true);
    }
  };

  const renderComponentView = () => {
    const inputValue = editing ? tempValue : currentValue;

    if (React.isValidElement(editComponent)) {
      return (
        <EasyCustom
          onSetValue={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          value={tempValue}
          cssClassPrefix={cssClassPrefix}
        >
          {editComponent}
        </EasyCustom>
      );
    }

    switch (type) {
      case Types.CHECKBOX:
        return renderCheckbox(inputValue);
      case Types.COLOR:
        return renderColor(inputValue);
      case Types.DATALIST:
        return renderDatalist(inputValue);
      case Types.DATE:
      case Types.DATETIME_LOCAL:
      case Types.EMAIL:
      case Types.FILE:
      case Types.MONTH:
      case Types.NUMBER:
      case Types.PASSWORD:
      case Types.RANGE:
      case Types.TEL:
      case Types.TEXT:
      case Types.TIME:
      case Types.URL:
      case Types.WEEK:
        return renderInput(inputValue);
      case Types.RADIO:
        return renderRadio(inputValue);
      case Types.SELECT:
        return renderSelect(inputValue);
      case Types.TEXTAREA:
        return renderTextarea(inputValue);
      default:
        throw new Error(EasyEditGlobals.ERROR_UNSUPPORTED_TYPE);
    }
  };

  const renderButtons = () => {
    if (!showEditViewButtonsOnHover || (showEditViewButtonsOnHover && hover)) {
      return (
        <div className={cssClassPrefix + "easy-edit-button-wrapper"}>
          {!hideSaveButton && generateButton(saveButton, handleSave,
            saveButtonLabel, manageButtonStyle(saveButtonStyle), "save",
            saveOnBlur)}
          {!hideCancelButton && generateButton(cancelButton, handleCancel,
            cancelButtonLabel, manageButtonStyle(cancelButtonStyle), "cancel",
            saveOnBlur)}
          {!hideDeleteButton && generateButton(deleteButton, handleDelete,
            deleteButtonLabel, manageButtonStyle(deleteButtonStyle), "delete",
            saveOnBlur)}
        </div>
      );
    }
  };

  const manageButtonStyle = (style?:string) => {
    return style === null ? cssClassPrefix + EasyEditGlobals.DEFAULT_BUTTON_CSS_CLASS
      : style;
  };

  const renderValidationMessage = () => {
    if (!isValid) {
      return <div className={cssClassPrefix
        + "easy-edit-validation-error"}>{validationMessage}</div>;
    }
  };

  const renderInstructions = () => {
    if ((editing || isEditing) && instructions !== null) {
      return <div className={cssClassPrefix
        + "easy-edit-instructions"}>{instructions}</div>;
    }
  };

  const setCssClasses = (existingClasses:string) => {
    if (viewAttributes["class"]) {
      existingClasses += " " + viewAttributes["class"];
    }
    if (viewAttributes["className"]) {
      existingClasses += " " + viewAttributes["className"];
    }

    if (!editable) {
      return cssClassPrefix + "easy-edit-not-allowed " + existingClasses;
    } else if (hover) {
      return onHoverCssClass === EasyEditGlobals.DEFAULT_ON_HOVER_CSS_CLASS
        ? cssClassPrefix + "easy-edit-hover-on " + existingClasses
        : onHoverCssClass + " " + existingClasses;
    } else {
      return existingClasses;
    }
  };

  const generateButton = (
    ref: React.Ref<HTMLButtonElement>, 
    onClick: React.MouseEventHandler<HTMLButtonElement>, 
    label: string, 
    cssClass: string, 
    name: string, 
    saveOnBlur: boolean = false
  ) => {
    if (saveOnBlur) {
      return "";
    }
    return (
      <button ref={ref} onClick={onClick} className={cssClass} name={name}>
        {label}
      </button>
    );
  };

  const generateEditButton = (
    cssClassPrefix: string, 
    hideEditButton: boolean, 
    editButtonLabel: string,
    editButtonStyle?: string
    ) => {
    if (!showViewButtonsOnHover || (showViewButtonsOnHover && hover)) {
      return (
        !hideEditButton && (
          <div className={cssClassPrefix + "easy-edit-view-button-wrapper"}>
            {generateButton(editButton, handleEditing, editButtonLabel,
              manageButtonStyle(editButtonStyle), "edit")}
          </div>
        )
      );
    }
  };

  const renderComplexView = () => {
    const { placeholder, options, type } = props;

    if (isNullOrUndefinedOrEmpty(currentValue)) {
      return placeholder;
    }

    let selected;
    if (Types.CHECKBOX === type) {
      selected = options.filter((option) => {
        return currentValue.includes(option.value);
      });
    } else {
      selected = options.filter((option) => {
        return currentValue === option.value;
      });
    }

    if (selected.length !== 0) {
      return selected.map(checkbox => checkbox.label).join(", ");
    } else {
      return currentValue;
    }
  };

  const renderInput = (inputValue: ValueType) => {
    return (
      <EasyInput
        value={inputValue}
        placeholder={placeholder}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        type={type}
        attributes={inputAttributes}
        cssClassPrefix={cssClassPrefix}
        onMouseEnter={handleHoverOn}
        onMouseLeave={handleHoverOff}
      />
    );
  };

  const renderTextarea = (inputValue) => {
    return (
      <EasyParagraph
        value={inputValue}
        placeholder={placeholder}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        attributes={inputAttributes}
        cssClassPrefix={cssClassPrefix}
      />
    );
  };

  const renderSelect = (inputValue) => {
    return (
      <EasyDropdown
        value={inputValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        options={options}
        placeholder={placeholder === EasyEditGlobals.DEFAULT_PLACEHOLDER
          ? EasyEditGlobals.DEFAULT_SELECT_PLACEHOLDER : placeholder}
        attributes={inputAttributes}
        cssClassPrefix={cssClassPrefix}
      />
    );
  };

  const renderRadio = (inputValue) => {
    return (
      <EasyRadio
        value={inputValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        options={options}
        attributes={inputAttributes}
        cssClassPrefix={cssClassPrefix}
      />
    );
  };

  const renderCheckbox = (inputValue) => {
    return (
      <EasyCheckbox
        value={inputValue}
        onChange={handleCheckboxChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        options={options}
        attributes={inputAttributes}
        cssClassPrefix={cssClassPrefix}
      />
    );
  };

  const renderDatalist = (inputValue) => {
    return (
      <EasyDatalist
        value={inputValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        options={options}
        attributes={inputAttributes}
        cssClassPrefix={cssClassPrefix}
      />
    );
  };

  const renderColor = (inputValue) => {
    return (
      <EasyColor
        value={inputValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        attributes={inputAttributes}
        cssClassPrefix={cssClassPrefix}
      />
    );
  };

  const renderPlaceholder = () => {
    const cssWrapperClass = cssClassPrefix + "easy-edit-wrapper";

    if (React.isValidElement(displayComponent)) {
      return (
        <div
          {...viewAttributes}
          className={setCssClasses(cssWrapperClass)}
          onClick={handleClick}
          onMouseEnter={handleHoverOn}
          onMouseLeave={handleHoverOff}
        >
          {!isNullOrUndefinedOrEmpty(currentValue)
            ? React.cloneElement(displayComponent, { value: currentValue })
            : placeholder}
          {generateEditButton(cssClassPrefix, hideEditButton, editButtonLabel,
            editButtonStyle)}
        </div>
      );
    }

    switch (type) {
      case Types.DATALIST:
      case Types.DATE:
      case Types.DATETIME_LOCAL:
      case Types.EMAIL:
      case Types.FILE:
      case Types.TEXT:
      case Types.TEL:
      case Types.TEXTAREA:
      case Types.NUMBER:
      case Types.TIME:
      case Types.MONTH:
      case Types.RANGE:
      case Types.WEEK:
      case Types.URL:
      case Types.PASSWORD: {
        let passwordValue = type === Types.PASSWORD ? "••••••••" : currentValue;
        return (
          <div
            {...viewAttributes}
            className={setCssClasses(cssWrapperClass)}
            onClick={handleClick}
            onMouseEnter={handleHoverOn}
            onMouseLeave={handleHoverOff}
          >
            {!isNullOrUndefinedOrEmpty(currentValue) ? passwordValue
              : placeholder}
            {generateEditButton(cssClassPrefix, hideEditButton, editButtonLabel,
              editButtonStyle)}
          </div>
        );
      }
      case Types.RADIO:
      case Types.CHECKBOX:
      case Types.SELECT: {
        return (
          <div
            {...viewAttributes}
            className={setCssClasses(cssWrapperClass)}
            onClick={handleClick}
            onMouseEnter={handleHoverOn}
            onMouseLeave={handleHoverOff}
          >
            {renderComplexView()}
            {generateEditButton(cssClassPrefix, hideEditButton, editButtonLabel,
              editButtonStyle)}
          </div>
        );
      }
      case Types.COLOR: {
        return (
          <input
            {...viewAttributes}
            type={type}
            value={currentValue}
            onClick={handleClick}
            readOnly
          />
        );
      }
      default: {
        throw new Error(EasyEditGlobals.ERROR_UNSUPPORTED_TYPE);
      }
    }
  };

  if (isHidden) {
    return null;
  }

  if (editing || isEditing) {
    return (
      <div
        className={cssClassPrefix + "easy-edit-inline-wrapper"}
        onMouseEnter={handleHoverOn}
        onMouseLeave={handleHoverOff}
        onKeyDown={handleKeyDown}
      >
        {buttonsPosition === EasyEditGlobals.POSITION_BEFORE && renderButtons()}
        {renderComponentView()}
        {buttonsPosition === EasyEditGlobals.POSITION_AFTER && renderButtons()}
        {renderInstructions()}
        {renderValidationMessage()}
      </div>
    );
  }
  return renderPlaceholder();
};
export default EasyEdit;