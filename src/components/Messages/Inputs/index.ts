import Block from '../../../utils/Block'
import template from './template.hbs'
import { Button } from '../../Button'
import { TextInput } from '../../Textnput'
import style from './style.module.scss'
import { isValidMessage } from '../../../utils/validation'

export class Inputs extends Block {
  init() {
    this.children.fileButton = new Button({
      label: '',
      class: style.fileButton,
      events: {
        click: () => console.log('click')
      }
    })
    this.children.textInput = new TextInput({
      placeholder: 'Сообщение',
      class: style.textInput,
      name: 'message',
      events: {
        focusin: (e: Event) => {
          const { value, name } = e.target as HTMLInputElement
          const isValidValue = isValidMessage(value)

          console.log(name, 'is valid: ', isValidValue)
        },
        focusout: (e: Event) => {
          const { value, name } = e.target as HTMLInputElement
          const isValidValue = isValidMessage(value)

          console.log(name, 'is valid: ', isValidValue)
        }
      }
    })
    this.children.submitButton = new Button({
      label: '',
      class: style.submitButton,
      type: 'submit',
      events: {
        click: (e: Event) => {
          e.preventDefault()

          const { value, name } = this.children.textInput as TextInput
          const isValidValue = isValidMessage(value)
          console.log('is valid: ', isValidValue)
          console.log({ [name]: value })
        }
      }
    })
  }

  render() {
    return this.compile(template, { style })
  }
}
