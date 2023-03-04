import Block from '../../utils/Block'
import template from './template.hbs'
import { Navigation } from '../../components/Navigation'
import { ProfileRow } from '../../components/ProfileRow'
import { Button } from '../../components/Button'
import { renderDom } from '../../utils/renderDom'
import style from './style.module.scss'
import { Avatar } from '../../components/Avatar'

const info: Array<{name: string, value: string}> = [
  {
    name: 'почта',
    value: 'ivan@meowmeow.com'
  },
  {
    name: 'логин',
    value: 'ivanivanov'
  },
  {
    name: 'имя',
    value: 'Иван'
  },
  {
    name: 'фамилия',
    value: 'Иванов'
  },
  {
    name: 'имя в чате',
    value: 'Иван'
  },
  {
    name: 'телефон',
    value: '+7 (999) 999-99-99'
  }
]

const testPhoto = '../../assets/images/testPhoto.png'
const name = 'Иван'
const surname = 'Иванов'
const status = 'online'
const phrase = 'на лучшее не настроился, вот и не расстроился'

export class ProfilePage extends Block {
  init() {
    this.children.navigation = new Navigation({
      chatButton: {
        label: 'чаты',
        isActive: false,
        events: {
          click: () => renderDom('chatsPage')
        }
      },
      profileButton: {
        label: 'мой профиль',
        isActive: true,
        events: {
          click: () => renderDom('profilePage')
        }
      },
      logoutButton: {
        label: 'выйти \n из аккаунта',
        events: {
          click: () => renderDom('navigationPage')
        }
      }
    })
    this.children.avatar = new Avatar({ photo: testPhoto, isEditButtonEnable: true })
    this.children.info = info.map((el) => new ProfileRow(el))
    this.children.profileEditButton = new Button({
      label: 'редактировать профиль',
      events: {
        click: () => renderDom('profileEditPage')
      }
    })
    this.children.passwordEditButton = new Button({
      label: 'изменить пароль',
      events: {
        click: () => renderDom('passwordEditPage')
      }
    })
  }

  render() {
    return this.compile(template, {
      style,
      name,
      surname,
      status,
      phrase
    })
  }
}
