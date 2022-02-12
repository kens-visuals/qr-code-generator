import { useState } from 'react';

const useOnChange = () => {
  const [{ value, format, bgColor }, setValue] = useState({
    value: '',
    format: 'png',
    bgColor: '2b7dfa',
  });

  const onChange = (e, fieldName) =>
    setValue((prev) => ({ ...prev, [fieldName]: e.target.value }));

  return { value, format, bgColor, onChange };
};

export default useOnChange;
