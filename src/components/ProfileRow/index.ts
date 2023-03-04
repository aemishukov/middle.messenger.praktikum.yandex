import Block from '../../utils/Block'
import template from './template.hbs'
import style from './style.module.scss'

export interface ProfileRowProps {
    name: string,
    value: string,
}

export class ProfileRow extends Block<ProfileRowProps> {
  render() {
    return this.compile(template, { ...this.props, style })
  }
}
