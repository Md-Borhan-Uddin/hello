import React from "react";

const CommonSelect = ({
  options,
  setSelectFieldValue,
  style = {},
  title,
  required,
  value,
  onBlur,
  onChange,
  name,
  error
}) => {
  return (
    <div className="mt-1">
      <p className="m-0 p-0">
        <label>
          {title}
          {required ? <span style={{ color: "red" }}> *</span> : null}
        </label>
      </p>
      {options && (
        <select
          name={name}
          style={style}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          required={required}
        >
          {options.map((data, i) => (
            <option value={data.value} key={i}>{data.key}</option>
          ))}
        </select>
      )}
      {error && <p className="text-red-600">{error}</p>}
    </div>
  );
};

export default CommonSelect;






/*

estateName
image
countryName
cityName
Location
stateType
ageYear
propertyMonths
rented
ownerCheck
purchasingCost
costCurrency
date
purpose
floorName
invoice

*/