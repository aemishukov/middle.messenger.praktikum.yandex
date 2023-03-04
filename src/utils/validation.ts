/* eslint-disable max-len */
/* eslint-disable no-useless-escape */
const regexp = {
  name: /^[A-Z][a-zA-Z-\.]{1,}$/,
  login: /^[a-zA-Z][a-zA-Z0-9-_\.]{2,20}$/,
  email: /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/,
  password: /^(?=.*?[0-9])(?=.*?[A-Z])[a-zA-Z0-9]{8,40}$/,
  phone: /^[+|0-9][0-9]{9,15}$/,
  message: /^\w{1,}$/
}

type ValiationType = (value: string) => string

export const isValidName: ValiationType = (value) => regexp.name.test(value) ? '' : 'используйте символы латиницы или кириллицы, первая буква должна быть заглавной, без пробелов, цифр и спецсимволов (кроме дефис)'

export const isValidLogin: ValiationType = (value) => regexp.login.test(value) ? '' : 'от 3 до 20 символов, используйте символы латиницы, цифры, без пробелов и спецсимволов (кроме дефис и нижнее подчёркивание)'

export const isValidEmail: ValiationType = (value) => regexp.email.test(value) ? '' : 'используйте символы латиницы, цифры и спецсимволы (напрмер: test_1@test.test)'

export const isValidPassword: ValiationType = (value) => regexp.password.test(value) ? '' : 'от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра'

export const isValidPhone: ValiationType = (value) => regexp.phone.test(value) ? '' : 'от 10 до 15 символов, состоит из цифр, может начинается с плюса'

export const isValidMessage: ValiationType = (value) => regexp.message.test(value) ? '' : 'значение не может быть пустым'
