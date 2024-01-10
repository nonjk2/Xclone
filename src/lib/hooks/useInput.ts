import React, { useState, ChangeEvent, Dispatch } from "react";

export interface FormState {
  [key: string]: string;
}

const useInput = (
  initialState: FormState
): [
  FormState,

  (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void,
  Dispatch<React.SetStateAction<FormState>>
] => {
  const [form, setForm] = useState<FormState>(initialState);
  const onChangeHandler = (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { className, value } = event.target;
    const newForm = {
      ...form,
      [className]: value,
    };
    setForm(newForm);
  };

  return [form, onChangeHandler, setForm];
};

export default useInput;
