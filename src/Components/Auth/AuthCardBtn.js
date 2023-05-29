export const Button = ({ isDisabled, text, className, onClick }) => {
  return (
    <button disabled={isDisabled} onClick={onClick} className={className}>
      {text}
    </button>
  );
};
