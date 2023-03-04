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

export class Form extends Block<FormProps> {
  inputsElements = this.children.inputs as FormInput[]

  init() {
    this.children.inputs = this.props.inputs.map((input: FormInputProps) => new FormInput(input))
    this.children.submitButton = new Button({ ...this.props.submitButton, class: style.submitButton })
    this.children.secondButton = new Button({ ...this.props.secondButton, class: style.secondButton })
  }

  isValid() {
    return this.inputsElements.reduce((agg, input) => input.validate().length === 0 ? agg : false, true)
  }

  getValues() {
    return this.inputsElements.reduce((agg, input) => ({ ...agg, [input.name]: input.value }), {})
  }

  validate(name: string) {
    const currentInput = this.inputsElements.find((input) => input.name === name)

    if (!currentInput) throw new Error('input not found')

    currentInput.validate()
  }

  render() {
    return this.compile(template, { style, ...this.props })
  }
}
