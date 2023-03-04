import Block from '../../../../utils/Block'
import template from './template.hbs'
import style from './style.module.scss'

export interface ErrorProps {
    text: string
}

export class Error extends Block<ErrorProps> {
  set error(text: string) {
    this.setProps({ text })
  }

  render() {
    return this.compile(template, { ...this.props, style })
  }
}
