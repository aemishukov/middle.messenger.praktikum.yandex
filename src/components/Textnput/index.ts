import Block from '../../utils/Block'
import template from './template.hbs'

export interface TextInputProps {
    label: string,
    name: string,
    placeholder: string,
    class: string,
    events: {
        focus: () => void,
        blur: () => void,
    }
}

export class TextInput extends Block {
  get value() {
    return (this.element as HTMLInputElement).value
  }

  get name() {
    return (this.element as HTMLInputElement).name
  }

  render() {
    return this.compile(template, { ...this.props })
  }
}
