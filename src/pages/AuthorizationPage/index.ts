import Block from '../../utils/Block'
import template from './template.hbs'
import { Form } from '../../components/Form'
import { renderDom } from '../../utils/renderDom'
import style from './style.module.scss'
import { isValidLogin, isValidPassword } from '../../utils/validation'

const inputs: Array<{
  label: string,
  name: string,
  type: string,
  error: string,
  validate: (value: string) => string
}> = [
  {
    label: 'логин',
    name: 'login',
    type: 'text',
    error: '',
    validate: isValidLogin
  },
  {
    label: 'пароль',
    name: 'password',
    type: 'password',
    error: '',
    validate: isValidPassword
  }
]

export class AuthorizationPage extends Block {
  form = this.children.form as Form

  init() {
    this.children.form = new Form({
      label: 'вход',
      inputs: inputs.map((input) => ({
        ...input,
        events: {
          focusin: () => this.form.validate(input.name),
          focusout: () => this.form.validate(input.name)
        }
      })),
      submitButton: {
        label: 'авторизоваться',
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
        label: 'нет аккаунта?',
        events: {
          click: () => renderDom('registrationPage')
        }
      }
    })
  }

  render() {
    return this.compile(template, { style })
  }
}
