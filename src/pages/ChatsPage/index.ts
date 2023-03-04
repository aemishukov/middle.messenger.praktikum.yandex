import Block from '../../utils/Block'
import template from './template.hbs'
import { Navigation } from '../../components/Navigation'
import { Users } from '../../components/Users'
import { Search } from '../../components/Search'
import { ChatList } from '../../components/ChatList'
import { Messages } from '../../components/Messages'
import { renderDom } from '../../utils/renderDom'
import style from './style.module.scss'

export class ChatsPage extends Block {
  init() {
    this.children.navigation = new Navigation({
      chatButton: {
        label: 'чаты',
        isActive: true,
        events: {
          click: () => renderDom('chatsPage')
        }
      },
      profileButton: {
        label: 'мой профиль',
        isActive: false,
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
    this.children.users = new Users({})
    this.children.search = new Search({})
    this.children.chatList = new ChatList({})
    this.children.messages = new Messages({})
  }

  render() {
    return this.compile(template, { style })
  }
}
