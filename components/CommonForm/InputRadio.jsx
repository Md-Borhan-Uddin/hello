import React from "react";

const InputRadio = ({
  sideText,
  disabled,
  className,
  style,
  required,
  type,
  onclick,
}) => {
  return (
    <div>
      <input
        style={style}
        className={className}
        type="radio"
        onClick={onclick}
        required
        disabled={disabled}
      />
      <span>
        {sideText} {required ? <span style={{ color: "red" }}> *</span> : null}
      </span>
    </div>
  );
};

export default InputRadio;
