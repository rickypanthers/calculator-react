import { useState } from 'react';
import './style.css';
import CalculatorBox from '../CalculatorBox';
import Button from '../Button';

const Calculator = () => {
  const [input, setInput] = useState({
    sign: '',
    num: 0,
    res: 0,
  });
  const handleInputChange = (event) => {
    setInput({ ...input, num: Number(event.target.value) });
  };

  const numClickHandler = (e) => {
    const value = e;
    if (input.num.toString().length < 16) {
      setInput({
        ...input,
        num:
          input.num === 0 && value === '0'
            ? '0'
            : input.num % 1 === 0
            ? Number(input.num + value)
            : input.num + value,
        res: !input.sign ? 0 : input.res,
      });
    }
  };

  const resetClickHandler = () => {
    setInput({
      ...input,
      sign: '',
      num: 0,
      res: 0,
    });
  };

  const equalsClickHandler = () => {
    if (input.sign && input.num) {
      const calcOps = (a, b, sign) =>
        sign === '+'
          ? a + b
          : sign === '-'
          ? a - b
          : sign === '*'
          ? a * b
          : a / b;

      setInput({
        ...input,
        res: calcOps(
          Number(input.res.toString()),
          Number(input.num.toString()),
          input.sign
        ),
        sign: '',
        num: 0,
      });
    }
  };

  const signClickHandler = (e) => {
    const value = e;
    setInput({
      ...input,
      sign: value,
      res: !input.res && input.num ? input.num : input.res,
      num: 0,
    });
  };

  const commaClickHandler = (e) => {
    const value = e;

    setInput({
      ...input,
      num: !input.num.toString().includes('.') ? input.num + value : input.num,
    });
  };

  const handleClickParent = (e) => {
    let btn = e.target.innerHTML;
    switch (btn) {
      case 'C':
        resetClickHandler();
        break;
      case '=':
        equalsClickHandler();
        break;
      case '/':
      case '*':
      case '-':
      case '+':
        e.preventDefault();
        signClickHandler(btn);
        break;
      case '.':
        e.preventDefault();
        commaClickHandler(btn);
        break;
      default:
        e.preventDefault();
        numClickHandler(btn);
    }
  };

  const btnValues = [
    ['C', 1, 2, 3, '+', 4, 5, 6, '-', 7, 8, 9, '*', 0, '.', '=', '/'],
  ];

  return (
    <div class="card">
      <input
        className="input-box"
        type="number"
        value={input.num ? input.num : input.res}
        onChange={handleInputChange}
      />
      <CalculatorBox onClick={handleClickParent}>
        {btnValues.flat().map((btn, i) => {
          return (
            <Button
              key={i}
              value={btn}
              disabled={
                (btn === '+' ||
                  btn === '-' ||
                  btn === '*' ||
                  btn === '/' ||
                  btn === '.') &&
                !input.num &&
                !input.res
              }
            />
          );
        })}
      </CalculatorBox>
    </div>
  );
};

export default Calculator;
