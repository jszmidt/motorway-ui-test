import { useState } from 'react';

export function useForm({ validations, initialValues = {} }) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  function validateField(name, value) {
    const rules = validations[name];

    if (rules) {
      if (rules.required) {
        if (!value.trim()) {
          return typeof rules.required === 'string' ? rules.required : 'required';
        }
      }

      if (rules.pattern) {
        if (!new RegExp(rules.pattern.value).exec(value)) {
          return rules.pattern.message || 'invalid';
        }
      }
    }

    return '';
  }

  function bindField(name) {
    return {
      value: values[name] || '',
      onChange: (e) => {
        const { value } = e.target;

        setValues((state) => ({
          ...state,
          [name]: value,
        }));

        setErrors((state) => ({
          ...state,
          [name]: validateField(name, value),
        }));
      },
    };
  }

  function isValid() {
    const hasErrors = Object.keys(validations).some((name) =>
      Boolean(validateField(name, values[name]))
    );

    return !hasErrors;
  }

  return {
    values,
    errors,
    validateField,
    bindField,
    isValid,
  };
}
