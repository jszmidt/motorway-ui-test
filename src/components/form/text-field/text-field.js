import React from 'react';

const TextField = (fieldProps) => {
  return (
    <div>
      <label htmlFor={fieldProps.name}>{fieldProps.label ?? fieldProps.name}</label>
      <input
        type={fieldProps.type || 'text'}
        name={fieldProps.name}
        id={fieldProps.name}
        {...fieldProps.attributes}
        {...fieldProps.bindField(fieldProps.name)}
      />
      {fieldProps.errors[fieldProps.name] && (
        <p className="error">{fieldProps.errors[fieldProps.name]}</p>
      )}
    </div>
  );
};

export default TextField;
