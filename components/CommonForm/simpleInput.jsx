import React from "react";
// import { CFormGroup, CInput, CLabel } from "@coreui/react";

const SimpleInput = ({
  id = "",
  title = "",
  placeholder = "",
  value = "",
  type = "text",
  className = "",
  onChange = () => {},
  onBlur = () => {},
  onFocus = () => {},
  error,
  required = false,
  disabled = false,
  sideText,
  isEditable = true,
  minTime,
  maxTime,
  style = {},
}) => {
  console.log(error, "errrrr");
  return (
    <>
      <p>
        <label>
          {title}
          {required ? <span style={{ color: "red" }}> *</span> : null}
        </label>
      </p>

      <input
        type={type}
        className={className}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        value={value}
        min={minTime}
        max={maxTime}
        {...(maxTime || minTime ? required : null)}
        style={{
          borderColor: error ? "#e55353" : "",
          paddingBlock: 25,
          ...style,
        }}
        disabled={disabled}
      />

      {error ? <label style={{ color: "#e55353" }}>{error}</label> : null}
    </>
  );
};

export default SimpleInput;
