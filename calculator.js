let docs=document.getElementById('numbers');
let expression = '';
for(let i=9;i>=0;i--){
  let button = document.createElement('BUTTON');
  button.innerHTML = i;
  button.className = "numbercss";
  button.setAttribute('id',`${i}`)
  docs.appendChild(button);
}
let opts = ['+','*','/','-','=','C']
document.getElementById('numbers').addEventListener('click',(event)=>{
   console.log("event came", event.target.id);
  
  
   if(event.target.id === '='){
    document.querySelector('.child').innerHTML = evalute(expression); 
    expression = document.querySelector('.child').innerHTML;
   }else if(event.target.id === 'C'){
   document.querySelector('.child').innerHTML = backspace(expression); 
    expression = document.querySelector('.child').innerHTML;
   }
   else{
    expression = expression + event.target.id;
   document.querySelector('.child').innerHTML = expression;
   }
   console.log(expression,"expression");
   
});
for(let i=0;i<opts.length;i++){
  let buttons = document.createElement("BUTTON");
  buttons.setAttribute('id',`${opts[i]}`);
  buttons.innerHTML = opts[i];
  buttons.className = "numbercss";
  docs.appendChild(buttons);
}

function evalute(exp){
 let tokens = exp.split('');
 let values =[], ops = [];
  for(let i=0;i<tokens.length;i++){
     if(tokens[i] === ' '){
      continue;
     }
     if(opts.includes(tokens[0]) || (opts.includes(tokens[i]) && opts.includes(tokens[i+1]))){
      alert("Operator should not be the first in the calculator");
      break;
     }
     if((tokens[i]>='0' && tokens[i]<='9')){
     let subs='';
       while(i<tokens.length && tokens[i]>='0' && tokens[i]<='9'){
         
         subs= subs + tokens[i++];
         
         
         
       }
       console.log(subs,"subsss")
       values.push(parseInt(subs,10));
       i--;
     }
     else if(tokens[i]==='+'|| tokens[i] ==='-' || tokens[i]==='/' || tokens[i]==='*'){
       if(ops.length>0 && hasPrecedence(tokens[i], ops[ops.length-1])){
       values.push(applyop(ops.pop(),values.pop(),values.pop()))
       }
       
       ops.push(tokens[i]);
       console.log("tokenhhhhhh",tokens[i], ops.length)
     }
  }
  console.log("token", ops.length,values)
  while(ops.length>0){
    values.push(applyop(ops.pop(),values.pop(),values.pop()));
    
  }
  return values.pop();
  
}
function hasPrecedence(op1,op2){
    if((op1 === '*' || op1=== '/')&& (op2==='+'||op2==='-')){
    return false;
    }
    return true;
  }
  function applyop(op,a,b){
    switch(op){
    case '+':
      return a+b;
    case '-':
    if(a<b){
     return a-b;
    }else{
    return b-a;
    }
    console.log(newa, b,"values")
    
   
    case '*':
    return a*b;
    case '/':
     if(a!== 0){
       return b/a;
     }else{
     console.log("invalid")
     alert("invalid")
     }
    }
  }
  function backspace(expression){
    let exp = expression.split('');
    exp.pop();
    let res = '';
    exp.forEach((elm)=>{
      res = res+elm;
    })
    
    return res;
  }
