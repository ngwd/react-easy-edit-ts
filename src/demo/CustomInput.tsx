import React, { Component, ChangeEvent } from 'react';

interface CustomInputProps {
  value?: string;
  setParentValue?: (value: string) => void;
  onBlur?: () => void;
}

interface CustomInputState {
  value: string;
}

export default class CustomInput extends Component<CustomInputProps, CustomInputState> {
  constructor(props: CustomInputProps) {
    super(props);
    this.state = {
      value: props.value || ''
    };
    this.onChange = this.onChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  onChange(e: ChangeEvent<HTMLInputElement>) {
    const newValue = e.target.value.toUpperCase();
    if (this.props.setParentValue) {
      this.props.setParentValue(newValue);
    }
    this.setState({
      value: newValue
    });
  }

  onBlur() {
    if (this.props.onBlur) {
      this.props.onBlur();
    }
  }

  render() {
    const { value } = this.state;
    return (
      <input
        onChange={this.onChange}
        onBlur={this.onBlur}
        value={value}
        placeholder="Custom input capitalises text"
      />
    );
  }
}

