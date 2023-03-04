import Block from '../../utils/Block'
import template from './template.hbs'
import { renderDom } from '../../utils/renderDom'
import style from './style.module.scss'
import { Form } from '../../components/Form'
import {
  isValidLogin, isValidEmail, isValidName, isValidPhone
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
    label: 'имя в чате',
    name: 'display_name',
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
  }
]

export class ProfileEditPage extends Block {
  form = this.children.form as Form

  init() {
    this.children.form = new Form({
      label: 'редактировать профиль',
      inputs: inputs.map((input) => ({
        ...input,
        events: {
          focusin: () => this.form.validate(input.name),
          focusout: () => this.form.validate(input.name)
        }
      })),
      submitButton: {
        label: 'сохранить',
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
        label: 'закрыть',
        events: {
          click: () => renderDom('profilePage')
        }
      }
    })
  }

  render() {
    return this.compile(template, { style })
  }
}
