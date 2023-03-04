import Block from '../../../utils/Block'
import template from './template.hbs'
import { Button } from '../../Button'
import style from './style.module.scss'

export interface HeaderProps {
  label: string,
  class: string,
  events: {
    click: () => void
  }
}

export class Header extends Block<HeaderProps> {
  init() {
    this.children.button = new Button({
      label: '',
      class: style.button,
      events: {
        click: () => console.log('click')
      }
    })
  }

  render() {
    return this.compile(template, { style, ...this.props })
  }
}
