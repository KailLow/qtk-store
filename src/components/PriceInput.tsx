// components/TextInput.tsx
import React from 'react';
import numeral from 'numeral';
import { TextInput } from 'flowbite-react';

interface TextInputProps {
  value: number;
  onChange: (value: number) => void;
}

const PriceInput: React.FC<TextInputProps> = ({ value, onChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const parsedValue = numeral(inputValue).value() || 0;
    onChange(inputValue);
  };

  const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });

  const formattedValue = VND.format(value)

  return (
    <TextInput type="text" value={formattedValue} onChange={handleChange} />
  );
};

export default PriceInput;