import Block from '../../../utils/Block'
import template from './template.hbs'
import { Button, ButtonProps } from '../../Button'

export interface UserProps extends ButtonProps {
  photo: string,
  name: string,
}

export class User extends Block<UserProps> {
  init() {
    this.children.userButton = new Button({
      label: this.props.name.slice(0, 1),
      class: this.props.class,
      events: this.props.events
    })
  }

  render() {
    return this.compile(template, { photo: this.props.photo })
  }
}
