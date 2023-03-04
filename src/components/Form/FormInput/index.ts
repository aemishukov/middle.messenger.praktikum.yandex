import Block from '../../../utils/Block'
import template from './template.hbs'
import style from './style.module.scss'
import { Error } from './Error'

export interface FormInputProps {
    label: string,
    name: string,
    type: string,
    error: string,
    events: {
        focus: () => void,
        blur: () => void,
    },
    validate: (value: string) => string
}

export class FormInput extends Block<FormInputProps> {
  inputElement = (this.element as HTMLElement).children[1] as HTMLInputElement

  errorElement = this.children.error as Error

  get value() {
    return this.inputElement.value
  }

  get name() {
    return this.inputElement.name
  }

  get isValid() {
    return this.props.validate(this.inputElement.value)
  }

  validate() {
    const error = this.props.validate(this.inputElement.value)

    this.errorElement.error = error

    return error
  }

  init() {
    this.children.error = new Error({ text: this.props.error })
  }

  render() {
    return this.compile(template, { ...this.props, style })
  }
}
