import Block from '../../utils/Block'
import template from './template.hbs'
import { renderDom } from '../../utils/renderDom'
import style from './style.module.scss'
import { Form } from '../../components/Form'
import { isValidPassword } from '../../utils/validation'

const inputs: Array<{
  label: string,
  name: string,
  type: string,
  error: string,
  validate: (value: string) => boolean
}> = [
  {
    label: 'старый пароль',
    name: 'oldPassword',
    type: 'password',
    error: '',
    validate: isValidPassword
  },
  {
    label: 'новый пароль',
    name: 'newPassword',
    type: 'password',
    error: '',
    validate: isValidPassword
  },
  {
    label: 'повторите пароль',
    name: 'newPassword_copy',
    type: 'password',
    error: '',
    validate: isValidPassword
  }
]

export class PasswordEditPage extends Block {
  init() {
    this.children.form = new Form({
      label: 'изменить пароль',
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
