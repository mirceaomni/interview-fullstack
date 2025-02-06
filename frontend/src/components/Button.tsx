type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type: "submit" | "button";
};

export const Button = ({ children, onClick, type }: ButtonProps) => {
  return (
    <button type={type} onClick={onClick}>
      {children}
    </button>
  );
};
