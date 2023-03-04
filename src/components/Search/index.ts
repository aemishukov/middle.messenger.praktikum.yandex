import Block from '../../utils/Block'
import template from './template.hbs'
import style from './style.module.scss'
import { TextInput } from '../Textnput'

export class Search extends Block {
  init() {
    this.children.input = new TextInput({
      placeholder: 'поиск сообщений',
      class: style.input,
      events: {
        focusin: () => console.log('focus'),
        focusout: () => console.log('blur')
      }
    })
  }

  render() {
    return this.compile(template, { style })
  }
}
