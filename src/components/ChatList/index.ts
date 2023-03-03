import Block from '../../utils/Block'
import template from './template.hbs'
import style from './style.module.scss'
import { Chat, ChatProps } from './Chat'

const chats = [
  {
    label: 'Андрей',
    photo: '',
    isActive: false,
    newMessagesCount: 2,
    lastMessage: {
      content: 'изображение',
      usersMessage: false,
      date: '10:49'
    },
    events: {
      click: () => console.log('click')
    }
  },
  {
    label: 'Киноклуб',
    photo: '',
    isActive: false,
    newMessagesCount: 0,
    lastMessage: {
      content: 'стикер',
      usersMessage: true,
      date: '12:00'
    },
    events: {
      click: () => console.log('click')
    }
  },
  {
    label: 'Илья',
    photo: '',
    isActive: false,
    newMessagesCount: 4,
    lastMessage: {
      content: 'друзья, у меня для вас особенный выпуск новостей!...',
      usersMessage: false,
      date: '15:12'
    },
    events: {
      click: () => console.log('click')
    }
  },
  {
    label: 'Вадим',
    photo: '',
    isActive: true,
    newMessagesCount: 0,
    lastMessage: {
      content: 'круто!',
      usersMessage: true,
      date: 'Пт'
    },
    events: {
      click: () => console.log('click')
    }
  },
  {
    label: 'Day.',
    photo: '',
    isActive: false,
    newMessagesCount: 0,
    lastMessage: {
      content: 'так увлёкся работой по курсу, что совсем забыл его анонсир...',
      usersMessage: false,
      date: '5 января 2023'
    },
    events: {
      click: () => console.log('click')
    }
  }
]

export class ChatList extends Block {
  init() {
    this.children.chats = chats.map((chat: ChatProps) => new Chat(chat))
  }

  render() {
    return this.compile(template, { style, chats })
  }
}
