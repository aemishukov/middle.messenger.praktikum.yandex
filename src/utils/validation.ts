/* eslint-disable no-useless-escape */
const regexp = {
  name: /^[A-Z][a-zA-Z-\.]{1,}$/,
  login: /^[a-zA-Z][a-zA-Z0-9-_\.]{3,20}$/,
  email: /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/,
  password: /((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8.40})/,
  phone: /^[+|0-9][0-9]{9,15}$/,
  message: /^\w{1,}$/
}

export function isValidName(value: string) {
  return regexp.name.test(value)
}

export function isValidLogin(value: string) {
  return regexp.login.test(value)
}

export function isValidEmail(value: string) {
  return regexp.email.test(value)
}

export function isValidPassword(value: string) {
  return regexp.password.test(value)
}

export function isValidPhone(value: string) {
  return regexp.phone.test(value)
}

export function isValidMessage(value: string) {
  return regexp.message.test(value)
}
