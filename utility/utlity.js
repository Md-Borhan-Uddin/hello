export const months = (num)=>{
    let option = [];
    for(let i=1;i<=num;i++){
      option.push({ key: i.toString(), value: i.toString() })
    }
    return option
}


export function parseJwt(token) {
  if (!token) { return; }
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(window.atob(base64));
}

export const butifyErrors = (errors)=>{
  console.log("list error", errors)
  let err = []
  for(var key in errors){
    if(Array.isArray(errors[key])){
      errors[key].map(item=>err.push(item))
    }
    else{
      const val = errors[key].message
      if(!val){
        err.push(errors[key])
        console.log("errors[key]", errors[key])
      }
      else{
        err.push(errors[key].message)
        console.log("errors[key].message", errors[key].message)
      }
      
      
      
    }
  }
  console.log('error', err)
  return err;
}

