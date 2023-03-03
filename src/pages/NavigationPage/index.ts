import { Button } from '../../components/Button'
import Block from '../../utils/Block'
import template from './template.hbs'
import { renderDom, ROUTES } from '../../utils/renderDom'
import style from './style.module.scss'

const buttons: Array<{label: string, route: keyof typeof ROUTES}> = [
  {
    label: 'регистрация',
    route: 'registrationPage'
  },
  {
    label: 'авторизация',
    route: 'authorizationPage'
  },
  {
    label: 'профиль',
    route: 'profilePage'
  },
  {
    label: 'редактирование профиля',
    route: 'profileEditPage'
  },
  {
    label: 'изменение пароля',
    route: 'passwordEditPage'
  },
  {
    label: 'изменение аватара',
    route: 'avatarEditPage'
  },
  {
    label: 'чаты',
    route: 'chatsPage'
  },
  {
    label: '404',
    route: 'errorPage404'
  },
  {
    label: '500',
    route: 'errorPage500'
  }
]

export class NavigationPage extends Block {
  init() {
    buttons.forEach((button, i) => {
      this.children[`button${i + 1}`] = new Button({
        label: button.label,
        events: {
          click: () => renderDom(button.route)
        }
      })
    })
  }

  render() {
    return this.compile(template, { style })
  }
}
