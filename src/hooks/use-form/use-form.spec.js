import { renderHook, act } from '@testing-library/react-hooks';

import { useForm } from './use-form';

describe('useForm', () => {
  describe('smoke tests', () => {
    it('should be a function', () => {
      expect(typeof useForm).toBe('function');
    });

    it('should require the `validations` option', () => {
      renderHook(() => {
        expect(() => {
          useForm({});
        }).toThrow('the option `validations` is required');
      });
    });

    it('should require the validation option to be an object', () => {
      renderHook(() => {
        expect(() => {
          useForm({
            validations: true,
          });
        }).toThrow('the option `validations` should be an object');
      });
    });
  });

  describe('validateField', () => {
    describe('required', () => {
      it("should return a default error message for fields that don't have a value", () => {
        const { result } = renderHook(() =>
          useForm({
            validations: {
              name: {
                required: true,
              },
            },
          })
        );

        expect(result.current.validateField('name', '')).toBe('required');
      });

      it('should return a custom error message', () => {
        const { result } = renderHook(() =>
          useForm({
            validations: {
              name: {
                required: 'the field "name" is required',
              },
            },
          })
        );

        expect(result.current.validateField('name', '')).toBe('the field "name" is required');
      });
    });

    describe('pattern', () => {
      it('should return an error message if the value does not satisfy the pattern', () => {
        const { result } = renderHook(() =>
          useForm({
            validations: {
              email: {
                pattern: {
                  value: /\w+@\w+\.com/gi,
                },
              },
            },
          })
        );

        expect(result.current.validateField('email', '')).toBe('invalid');
      });

      it('should return an custom error message if the message attribute exists', () => {
        const { result } = renderHook(() =>
          useForm({
            validations: {
              email: {
                pattern: {
                  value: /\w+@\w+\.com/gi,
                  message: 'Invalid e-mail',
                },
              },
            },
          })
        );

        expect(result.current.validateField('email', '')).toBe('Invalid e-mail');
      });
    });
  });

  describe('bindField', () => {
    it('should return an object with value and onChange attributes', () => {
      const { result } = renderHook(() =>
        useForm({
          validations: {
            name: {
              required: true,
            },
          },
        })
      );

      expect(result.current.bindField('name')).toEqual({
        value: expect.any(String),
        onChange: expect.any(Function),
      });
    });

    describe('onChange', () => {
      it('should update the Hook state when called', () => {
        const { result } = renderHook(() =>
          useForm({
            validations: {
              name: {
                required: true,
              },
            },
          })
        );

        const bindFieldResult = result.current.bindField('name');

        act(() => {
          bindFieldResult.onChange({ target: { value: 'John' } });
        });

        expect(result.current.values.name).toBe('John');
        expect(result.current.errors.name).toBe('');

        act(() => {
          bindFieldResult.onChange({ target: { value: '' } });
        });

        expect(result.current.values.name).toBe('');
        expect(result.current.errors.name).toBe('required');
      });
    });
  });

  describe('initialValues', () => {
    it('should trhow an Error if the initialValues is not an object', () => {
      renderHook(() => {
        expect(() => {
          useForm({
            initialValues: true,
          });
        }).toThrow('the option `initialValues` should be an object');
      });
    });

    it('should initialize the values state with the initial values', () => {
      const { result } = renderHook(() =>
        useForm({
          initialValues: {
            name: 'Carlos',
          },
          validations: {},
        })
      );

      expect(result.current.values.name).toBe('Carlos');
    });
  });

  describe('isValid', () => {
    it('should be a function', () => {
      const { result } = renderHook(() =>
        useForm({
          validations: {},
        })
      );

      expect(typeof result.current.isValid).toBe('function');
    });

    it('should return false when it finds any error on the form', () => {
      const { result } = renderHook(() =>
        useForm({
          initialValues: {
            name: 'Carlos',
            surname: '',
          },
          validations: {
            name: {
              required: true,
            },
            surname: {
              required: true,
            },
            birthDate: {
              pattern: {
                value: /^\d{2}\/\d{2}\/\d{4}$/gi,
                message: 'invalid date',
              },
            },
          },
        })
      );

      expect(result.current.isValid()).toBe(false);
    });

    it('should return true if all the form fields are valid', () => {
      const { result } = renderHook(() =>
        useForm({
          initialValues: {
            name: 'Carlos',
            surname: 'Silva',
            birthDate: '28/10/1990',
          },
          validations: {
            name: {
              required: true,
            },
            surname: {
              required: true,
            },
            birthDate: {
              pattern: {
                value: /^\d{2}\/\d{2}\/\d{4}$/gi,
                message: 'invalid date',
              },
            },
          },
        })
      );

      expect(result.current.isValid()).toBe(true);
    });
  });
});
