import './style.css';

const Button = ({ value, disabled }) => {
  return (
    <button className={disabled ? 'disabled' : ''} disabled={disabled}>
      {value}
    </button>
  );
};

export default Button;
