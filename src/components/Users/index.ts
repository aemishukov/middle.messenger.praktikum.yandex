import Block from '../../utils/Block'
import template from './template.hbs'
import style from './style.module.scss'
import { Button } from '../Button'
import { User } from './User'

const users = [{ photo: '', name: 'Иван' }, { photo: '', name: 'Мария' }]

export class Users extends Block {
  init() {
    this.children.addUserButton = new Button({
      label: '',
      class: style.addUserButton,
      events: {
        click: () => console.log('addUser')
      }
    })
    this.children.users = users.map((user) => new User({
      ...user,
      class: style.userButton,
      events: {
        click: () => console.log('user click')
      }
    }))
  }

  render() {
    return this.compile(template, { style, users })
  }
}
