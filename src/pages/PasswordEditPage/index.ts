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
  validate: (value: string) => string
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
  form = this.children.form as Form

  init() {
    this.children.form = new Form({
      label: 'изменить пароль',
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
