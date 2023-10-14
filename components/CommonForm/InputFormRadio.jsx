import React from "react";

const InputFormRadio = ({
  sideText,
  disabled=false,
  className,
  style,
  required=true,
  type,
  onchange,
  setRadioValue,
  radioValue,
  name,
  value,
  error,
  checked
}) => {
  return (
    <div className="mt-1">
      <input
        style={style}
        name={name}
        className={className}
        type="radio"
        onChange={onchange}
        disabled={disabled}
        value={value}
        checked={checked}
      />
      <span className="ml-2">
        {sideText} {required ? <span style={{ color: "red" }}> *</span> : null}
      </span>
      {error && <p className="text-red-600">{error}</p>}
    </div>
  );
};

export default InputFormRadio;
