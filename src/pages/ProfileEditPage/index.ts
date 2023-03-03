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
  validate: (value: string) => boolean
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
  init() {
    this.children.form = new Form({
      label: 'редактировать профиль',
      inputs: inputs.map((input) => ({
        ...input,
        events: {
          focusin: (e: Event) => {
            const { name } = e.target as HTMLInputElement
            const newInputs = inputs.map((el) => el.name === name ? { ...el, error: '' } : el)
            console.log(newInputs)
          },
          focusout: (e: Event) => {
            const { value, name } = e.target as HTMLInputElement
            const isValidValue = input.validate(value)
            const newInputs = inputs.map(
              (el) => el.name === name ? { ...el, error: isValidValue ? '' : 'Ошибка ввода' } : el
            )
            console.log(newInputs)
          }
        }
      })),
      submitButton: {
        label: 'сохранить',
        type: 'submit',
        events: {
          click: (e: Event) => {
            e.preventDefault()
            const isValid = (this.children.form as Form).isValid()
            const data = (this.children.form as Form).getValues()
            console.log('is valid: ', isValid)
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
