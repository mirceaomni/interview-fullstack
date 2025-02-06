type InputProps = {
  value: string;
  placeholder: string;
  ariaLabel: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Input = (props: InputProps) => {
  const { value, ariaLabel, placeholder, onChange } = props;

  return (
    <input
      aria-label={ariaLabel}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    ></input>
  );
};
