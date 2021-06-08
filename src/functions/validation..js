function validateEmail(val) {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailPattern.test(val);
}

function validateNumber(val) {
  const actualVal = val.toString().replace(/^\+*91(?=\d{10})|\+|^0/g, ""); //only for indian numbers
  return actualVal.length === 10 && !isNaN(actualVal);
}

export { validateNumber, validateEmail };
