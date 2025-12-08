import React from 'react';
import './InputField.css';

export function InputField({
  label,
  type = 'text',
  placeholder = '',
  value = '',
  onChange,
  name = '',
  required = false
}) {
  return (
    <div className="input-group">
      {label && <label htmlFor={name}>{label}</label>}
      <input
        id={name}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
}
