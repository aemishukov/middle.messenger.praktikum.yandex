import Block from '../../utils/Block'
import template from './template.hbs'
import style from './style.module.scss'
import { Button, ButtonProps } from '../Button'

interface NavigationButtonProps extends ButtonProps {
  isActive: boolean
}

export interface NavigationProps {
  chatButton: NavigationButtonProps,
  profileButton: NavigationButtonProps,
  logoutButton: ButtonProps,
}

export class Navigation extends Block<NavigationProps> {
  init() {
    this.children.chatButton = new Button({
      ...this.props.chatButton,
      class: this.props.chatButton.isActive
        ? style['navigation-chatButton-isActive'] : style['navigation-chatButton']
    })
    this.children.profileButton = new Button({
      ...this.props.profileButton,
      class: this.props.profileButton.isActive
        ? style['navigation-profileButton-isActive'] : style['navigation-profileButton']
    })
    this.children.logoutButton = new Button({ ...this.props.logoutButton, class: style['navigation-logoutButton'] })
  }

  render() {
    return this.compile(template, { style })
  }
}
