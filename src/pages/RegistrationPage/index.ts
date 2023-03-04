import Block from '../../utils/Block'
import template from './template.hbs'
import { Form } from '../../components/Form'
import { renderDom } from '../../utils/renderDom'
import style from './style.module.scss'
import {
  isValidLogin, isValidEmail, isValidName, isValidPhone, isValidPassword
} from '../../utils/validation'

const inputs: Array<{
  label: string,
  name: string,
  type: string,
  error: string,
  validate: (value: string) => string
}> = [
  {
    label: 'почта',
    name: 'email',
    type: 'text',
    error: '',
    validate: isValidEmail
  },
  {
    label: 'логин',
    name: 'login',
    type: 'text',
    error: '',
    validate: isValidLogin
  },
  {
    label: 'имя',
    name: 'first_name',
    type: 'text',
    error: '',
    validate: isValidName
  },
  {
    label: 'фамилия',
    name: 'second_name',
    type: 'text',
    error: '',
    validate: isValidName
  },
  {
    label: 'телефон',
    name: 'phone',
    type: 'text',
    error: '',
    validate: isValidPhone
  },
  {
    label: 'пароль',
    name: 'password',
    type: 'password',
    error: '',
    validate: isValidPassword
  },
  {
    label: 'пароль (ещё раз)',
    name: 'password_copy',
    type: 'password',
    error: '',
    validate: isValidPassword
  }
]

export class RegistrationPage extends Block {
  form = this.children.form as Form

  init() {
    this.children.form = new Form({
      label: 'регистрация',
      inputs: inputs.map((input) => ({
        ...input,
        events: {
          focusin: () => this.form.validate(input.name),
          focusout: () => this.form.validate(input.name)
        }
      })),
      submitButton: {
        label: 'зарегистрироваться',
        type: 'submit',
        events: {
          click: (e: Event) => {
            e.preventDefault()
            const isValid = this.form.isValid()
            const data = this.form.getValues()
            console.log('form is valid: ', isValid)
            console.log(data)
          }
        }
      },
      secondButton: {
        label: 'войти',
        events: {
          click: () => renderDom('authorizationPage')
        }
      }
    })
  }

  render() {
    return this.compile(template, { style })
  }
}
