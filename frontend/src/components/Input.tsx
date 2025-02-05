type InputProps = {
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = ({ value, placeholder, onChange }: InputProps) => {
  return (
    <input placeholder={placeholder} value={value} onChange={onChange}></input>
  );
};
