import Block from '../../../utils/Block'
import template from './template.hbs'
import style from './style.module.scss'

export interface MessageProps {
  isUsersMessage: boolean,
  logo: string,
  content: string | string[],
  isImages: boolean
  date: {
    day: string,
    time: string
  }
}

export class Message extends Block<MessageProps> {
  render() {
    return this.compile(template, {
      style: {
        ...style, message: this.props.isUsersMessage ? style.usersMessage : style.message
      },
      ...this.props
    })
  }
}
