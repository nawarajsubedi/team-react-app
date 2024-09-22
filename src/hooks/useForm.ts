import { useState, ChangeEvent, FormEvent } from "react";

interface Validator {
  required?: { value: boolean; message: string };
  pattern?: { value: string; message: string };
  custom?: { isValid: (value: any) => boolean; message: string };
}

interface FormOptions<T> {
  initialValues?: T;
  validators?: { [key in keyof T]?: Validator };
  onSubmit?: (e: FormEvent<HTMLFormElement>, data: T) => void;
}

interface UseFormReturn<T> {
  data: T;
  handleChange: (
    fieldname: keyof T,
    transformer?: (value: any) => any
  ) => (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  errors: { [key in keyof T]?: string };
}

function useForm<T>(options: FormOptions<T>): UseFormReturn<T> {
  const [data, setData] = useState<T>(options.initialValues || ({} as T));
  const [errors, setErrors] = useState<{ [key in keyof T]?: string }>({});

  const handleChange =
    (fieldname: keyof T, transformer?: (value: any) => any) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = transformer ? transformer(e.target.value) : e.target.value;
      setData({
        ...data,
        [fieldname]: value,
      } as T);
    };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validators = options.validators;
    if (validators) {
      let valid = true;
      const errs: { [key in keyof T]?: string } = {};

      for (const fieldname in validators) {
        if (Object.prototype.hasOwnProperty.call(validators, fieldname)) {
          const value = data[fieldname as keyof T];
          const validator = validators[fieldname as keyof T];

          if (validator?.required?.value && !value) {
            valid = false;
            errs[fieldname as keyof T] = validator.required.message;
          }

          const pattern = validator?.pattern;
          if (
            pattern?.value &&
            typeof pattern.value === "string" &&
            !RegExp(pattern.value).test(String(value))
          ) {
            valid = false;
            errs[fieldname as keyof T] = pattern.message;
          }

          const custom = validator?.custom;
          if (custom?.isValid && !custom.isValid(value)) {
            valid = false;
            errs[fieldname as keyof T] = custom.message;
          }
        }
      }

      if (!valid) {
        setErrors(errs);
        return;
      }
    }

    setErrors({});

    if (options.onSubmit) {
      options.onSubmit(e, data);
    }
  };

  return {
    data,
    handleChange,
    handleSubmit,
    errors,
  };
}

export default useForm;
