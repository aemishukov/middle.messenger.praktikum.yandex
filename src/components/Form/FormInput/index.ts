import Block from '../../../utils/Block'
import template from './template.hbs'
import style from './style.module.scss'

export interface FormInputProps {
    label: string,
    name: string,
    type: string,
    error: string,
    events: {
        focus: () => void,
        blur: () => void,
    }
}

export class FormInput extends Block {
  render() {
    return this.compile(template, { ...this.props, style })
  }
}
