import './style.css';

const CalculatorBox = ({ children, onClick }) => {
  return (
    <div className="CalculatorBox" onClick={onClick}>
      {children}
    </div>
  );
};

export default CalculatorBox;
