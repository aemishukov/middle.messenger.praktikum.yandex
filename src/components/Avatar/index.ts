import Block from '../../utils/Block'
import template from './template.hbs'
import style from './style.module.scss'
import { Button } from '../Button'
import { renderDom } from '../../utils/renderDom'

export interface AvatarProps {
  photo: string,
  isEditButtonEnable: boolean,
}

export class Avatar extends Block<AvatarProps> {
  init() {
    this.children.editButton = new Button({
      label: 'изменить \n аватар',
      class: style['avatar-photo-editButton'],
      events: {
        click: () => renderDom('avatarEditPage')
      }
    })
  }

  render() {
    return this.compile(template, { ...this.props, style })
  }
}
