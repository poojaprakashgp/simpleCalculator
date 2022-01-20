let docs = document.querySelector('.numbersContiner');
let expression = '';
for (let i = 9; i >= 0; i--) {
  let button = document.createElement('BUTTON');
  button.innerHTML = i;
  button.className = "numbercss";
  button.setAttribute('id', `${i}`)
  docs.appendChild(button);
}
let opts = ['+', '*', '/', '-', '=', 'C']
document.querySelector('.numbersContiner').addEventListener('click', (event) => {
  console.log("event came", event.target.id);


  if (event.target.id === '=') {
    document.querySelector('.child').innerHTML = evalute(expression);
    expression = document.querySelector('.child').innerHTML;
  } else if (event.target.id === 'C') {
    document.querySelector('.child').innerHTML = backspace(expression);
    expression = document.querySelector('.child').innerHTML;
  }
  else {
    expression = expression + event.target.id;
    document.querySelector('.child').innerHTML = expression;
  }

});
for (let i = 0; i < opts.length; i++) {
  let buttons = document.createElement("BUTTON");
  buttons.setAttribute('id', `${opts[i]}`);
  buttons.innerHTML = opts[i];
  buttons.className = "numbercss";
  docs.appendChild(buttons);
}
function evalute(exp) {
  let tokens = exp.split('');
  let values = [], ops = [];
  let firstNo = '', second = '';
  for (let i = 0; i < tokens.length; i++) {

    if (tokens[i] === ' ') {
      continue;
    }
    if (tokens[i] >= '0' && tokens[i] <= '9') {
      let subs = '';
      while (i < tokens.length && tokens[i] >= '0' && tokens[i] <= '9') {
        subs = (i > 1 ? '' : firstNo) + second + subs + tokens[i++];
      }
      console.log(subs, "subsss")
      values.push(parseInt(subs, 10));
      i--;
    }
    else if (tokens[i] === '+' || tokens[i] === '-' || tokens[i] === '/' || tokens[i] === '*') {
      if (i === 0 && tokens[i] === '-') {
        firstNo = tokens[i];
      }

      if (ops.length > 0 && hasPrecedence(tokens[i], ops[ops.length - 1])) {
        values.push(applyop(ops.pop(), values.pop(), values.pop()))
      }
      if (i !== 0 || opts.includes(tokens[i + 1])) {
        ops.push(tokens[i]);
      }
      if (tokens[i + 1] === '-') {
        second = tokens[i + 1];
        i = i + 1;
      } else {
        // 
      }

    }
  }

  while (ops.length > 0 && isNumber(tokens[tokens.length - 1])) {
    values.push(applyop(ops.pop(), values.pop(), values.pop()));
  }
  if (isNumber(tokens[tokens.length - 1])) {
    return values.pop();
  } else {
    return [...values, ...ops].join('');
  }


}

function isNumber(n) { return /^-?[\d.]+(?:e-?\d+)?$/.test(n); }

function hasPrecedence(op1, op2) {
  if ((op1 === '*' || op1 === '/') && (op2 === '+' || op2 === '-')) {
    return false;
  }
  return true;
}
function applyop(op, a, b) {
  switch (op) {
    case '+':
      return a + b;
    case '-':
      if (b < 0) {
        return -(a - b);
      } else if (a < b) {
        return b - a;
      } else {
        return -(a - b);
      }
    case '*':
      return a * b;

    case '/':
      if (a !== 0) {
        return b / a;
      } else {
        alert("Can not be divided by zero");
        return "Can not be divided by zero";
      }
  }
}
function backspace(expression) {
  if (/[a-zA-Z]/.test(expression)) {
    return '';
  } else {
    let exp = expression.split('');
    exp.pop();
    let res = '';
    exp.forEach((elm) => {
      res = res + elm;
    })

    return res;
  }

}
