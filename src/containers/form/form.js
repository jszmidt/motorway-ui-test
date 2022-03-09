import React, { useState } from 'react';
import Dialog from '../../components/dialog/dialog';
import { useForm } from '../../hooks/use-form/use-form';
import TextField from '../../components/form/text-field/text-field';
import './form.css';

const Form = () => {
  const [isModalVisible, setIsModalVisibleVisible] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('values', values);
    alert('values: ' + JSON.stringify(values));
  };

  const { values, errors, bindField, isValid } = useForm({
    validations: {
      name: {
        pattern: {
          value: /^\w{3,50}$/,
          message: 'invalid name',
        },
      },
      email: {
        pattern: {
          value: /^\S+@\S+\.\S+$/,
          message: 'invalid email format',
        },
      },
      birthDate: {
        pattern: {
          value: /^\d{2}\/\d{2}\/\d{4}$/,
          message: 'invalid date format (dd/mm/yyyy)',
        },
      },
      favouriteColor: {
        required: 'field is required',
      },
    },
  });

  const salaryAttributes = {
    min: 20000,
    max: 40000,
    step: 1000,
  };

  return (
    <>
      <button onClick={(_) => setIsModalVisibleVisible(true)}>Form</button>
      <Dialog
        show={isModalVisible}
        handleClose={(_) => setIsModalVisibleVisible(false)}
        children={
          <form onSubmit={handleSubmit}>
            <TextField name="name" errors={errors} bindField={bindField} />
            <TextField name="email" type="email" errors={errors} bindField={bindField} />
            <TextField name="birthDate" label="birth date" errors={errors} bindField={bindField} />
            <TextField
              name="favouriteColor"
              label="favourite color"
              errors={errors}
              bindField={bindField}
            />
            <TextField
              name="salary"
              attributes={salaryAttributes}
              type="range"
              errors={errors}
              bindField={bindField}
            />
            <button type="submit" disabled={!isValid()}>
              submit
            </button>
          </form>
        }
      ></Dialog>
    </>
  );
};
export default Form;
