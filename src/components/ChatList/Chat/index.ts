import Block from '../../../utils/Block'
import template from './template.hbs'
import style from './style.module.scss'

export interface ChatProps {
  label: string,
  photo: string,
  isActive: boolean,
  newMessagesCount: number,
  lastMessage: {
    content: string,
    usersMessage: boolean,
    date: string,
  }
  events: {
      click: () => void
  }
}

export class Chat extends Block {
  render() {
    return this.compile(template, {
      style: { ...style, chat: this.props.isActive ? style.chatIsActive : style.chat },
      ...this.props
    })
  }
}
