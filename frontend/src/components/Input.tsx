type InputProps = {
  value: string;
  type: 'email' | 'password';
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = ({ value, type, placeholder, onChange }: InputProps) => {
  return (
    <input type={type} placeholder={placeholder} value={value} onChange={onChange}></input>
  );
};
