import Block from '../../utils/Block'
import template from './template.hbs'
import { Header } from './Header'
import { Message } from './Message'
import { Inputs } from './Inputs'
import style from './style.module.scss'

const chat = {
  name: 'Вадим',
  logo: ''
}
const messages = [
  {
    type: 'text',
    isUsersMessage: false,
    // eslint-disable-next-line max-len
    content: 'Посмотри плиз, что скажешь?\nСверстал 12-страничник про Френсиса Бэкона. Краткая биография, фотографии, картины. Самая главная задача при вёрстке — сохранить воздух. \n6 колонок, сетка Брокманновская (я ж книжку прикупила). Формат 260х230мм. \nФотки такие атмосферные все, что мне всё сильнее хочется начать фотографировать))',
    logo: '',
    date: {
      day: '17 января',
      time: '16:55'
    }
  },
  {
    type: 'text',
    isUsersMessage: true,
    // eslint-disable-next-line max-len
    content: 'Посмотри плиз, что скажешь?\nСверстал 12-страничник про Френсиса Бэкона. Краткая биография, фотографии, картины. Самая главная задача при вёрстке — сохранить воздух. \n6 колонок, сетка Брокманновская (я ж книжку прикупила). Формат 260х230мм. \nФотки такие атмосферные все, что мне всё сильнее хочется начать фотографировать))',
    logo: '',
    date: {
      day: '17 января',
      time: '16:55'
    }
  }
]

export class Messages extends Block {
  init() {
    this.children.header = new Header({ ...chat })
    this.children.messages = messages.map((message) => new Message(message))
    this.children.inputs = new Inputs({})
  }

  render() {
    return this.compile(template, { style, date: '17 января' })
  }
}
