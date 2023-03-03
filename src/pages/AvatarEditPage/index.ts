import Block from '../../utils/Block'
import template from './template.hbs'
import { renderDom } from '../../utils/renderDom'
import style from './style.module.scss'
import { Avatar } from '../../components/Avatar'
import { Button } from '../../components/Button'
import { FileInput } from '../../components/FileInput'

const name = 'Иван'
const surname = 'Иванов'

export class AvatarEditPage extends Block {
  init() {
    this.children.avatar = new Avatar({
      photo: '../../assets/images/testPhoto.png',
      isEditButtonEnable: false
    })
    this.children.fileInput = new FileInput({
      label: 'загрузить файл с компьютера',
      name: 'avatar',
      class: style['avatarEdit-controls-button'],
      events: {
        click: () => console.log('click')
      }
    })
    this.children.chooseButton = new Button({
      label: 'выбрать готовый аватар',
      class: style['avatarEdit-controls-button'],
      events: {
        click: () => console.log('click')
      }
    })
    this.children.backwardButton = new Button({
      label: 'оставить всё как есть',
      class: style['avatarEdit-controls-button'],
      events: {
        click: () => renderDom('profilePage')
      }
    })
  }

  render() {
    return this.compile(template, { style, name, surname })
  }
}
