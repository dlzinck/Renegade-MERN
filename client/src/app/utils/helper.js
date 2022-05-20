export function validateEmail(email) {
    const op = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return op.test(String(email).toLowerCase());
  }
  
  export function checkPassword(input) {
    const password = /^[A-Za-z]\w{7,14}$/;
    if (input.match(password)) {
      return true;
    }
    return false;
  }

  export function checkUserName(input) {
    const userName = /^[a-zA-Z0-9]{8}$/;
    if (input.match(userName)) {
      return true;
    }
    return false;
  }