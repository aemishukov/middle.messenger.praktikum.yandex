import Block from '../../utils/Block'
import template from './template.hbs'
import style from './style.module.scss'
import { FormInput, FormInputProps } from './FormInput'
import { Button, ButtonProps } from '../Button'

export interface FormProps {
    label: string,
    inputs: Array<FormInputProps>,
    submitButton: ButtonProps,
    secondButton: ButtonProps
}

export class Form extends Block {
  init() {
    this.children.inputs = this.props.inputs.map((input: FormInputProps) => new FormInput(input))
    this.children.submitButton = new Button({ ...this.props.submitButton, class: style.submitButton })
    this.children.secondButton = new Button({ ...this.props.secondButton, class: style.secondButton })
  }

  isValid() {
    return (this.children.inputs as FormInput[]).reduce((agg, input) => {
      const { value, name } = ((input.element as HTMLElement).children[1] as HTMLInputElement)
      const isValidValue = this.props.inputs.find((el: FormInputProps) => el.name === name).validate(value)
      console.log(name, value, `is valid: ${isValidValue}`)
      return isValidValue ? agg : isValidValue
    }, true)
  }

  getValues() {
    return (this.children.inputs as FormInput[]).reduce((agg, input) => {
      const { value, name } = ((input.element as HTMLElement).children[1] as HTMLInputElement)

      return { ...agg, [name]: value }
    }, {})
  }

  render() {
    return this.compile(template, { style, ...this.props })
  }
}
