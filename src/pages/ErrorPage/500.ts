import Block from '../../utils/Block'
import template from './template.hbs'
import { Button } from '../../components/Button'
import { renderDom } from '../../utils/renderDom'
import style from './style.module.scss'

export class ErrorPage extends Block {
  init() {
    this.children.button = new Button({
      label: 'назад к чатам',
      events: {
        click: () => renderDom('navigationPage')
      }
    })
  }

  render() {
    return this.compile(template, { style, type: '500' })
  }
}
