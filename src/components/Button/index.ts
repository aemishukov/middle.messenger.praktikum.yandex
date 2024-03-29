import Block from '../../utils/Block'
import template from './template.hbs'

export interface ButtonProps {
    label: string,
    type?: string,
    class?: string,
    events: {
        click: () => void
    }
}

export class Button extends Block<ButtonProps> {
  render() {
    return this.compile(template, { ...this.props, type: this.props.type || 'button' })
  }
}
