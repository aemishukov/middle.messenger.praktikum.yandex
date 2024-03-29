import Block from '../../utils/Block'
import template from './template.hbs'
import style from './style.module.scss'

export interface FileInputProps {
    label: string,
    name: string,
    class: string,
    style: {key: string, value: string}
}

export class FileInput extends Block<FileInputProps> {
  get value() {
    return (this.element as HTMLInputElement).value
  }

  render() {
    return this.compile(template, { ...this.props, style: { ...style, ...this.props.style } })
  }
}
