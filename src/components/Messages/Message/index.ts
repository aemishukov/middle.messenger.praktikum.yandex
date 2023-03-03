import Block from '../../../utils/Block'
import template from './template.hbs'
import style from './style.module.scss'

export class Message extends Block {
  render() {
    return this.compile(template, {
      style: {
        ...style, message: this.props.isUsersMessage ? style.usersMessage : style.message
      },
      ...this.props
    })
  }
}
