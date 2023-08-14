import React from "react";

const InputField = ({
  title,
  type,
  name,
  value,
  onChange,
  required,
  placeholder,
  className,
  style,
  disabled,
  sideText,
  error,
  min,
  src
}) => {
  return (
    <div className="mt-1">
      <p className="m-0 p-0">
        <label>
          {title}
          {required ? <span style={{ color: "red" }}> *</span> : null}
        </label>
      </p>
      <input
        style={style}
        className={className}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        min={min&&min}
        src={src?src:null}
      />
      {sideText && <span>{sideText}</span>}
      {error && <p className="text-red-600">{error}</p>}
    </div>
  );
};

export default InputField;
