import { nanoid } from 'nanoid'
import { EventBus } from './EventBus'

abstract class Block<Props extends Record<string, any> = unknown> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render'
  }

  public id = nanoid(6)

  protected props: Props

  public children: Record<string, Block | Block[]>

  private eventBus: () => EventBus

  private _element: HTMLElement | null = null

  private _meta: { props: unknown }

  constructor(propsWithChildren: any = {}) {
    const eventBus = new EventBus()
    const { props, children } = this._getChildrenAndProps(propsWithChildren)

    this._meta = { props }
    this.children = children
    this.props = this._makePropsProxy(props)
    this.eventBus = () => eventBus
    this._registerEvents(eventBus)

    eventBus.emit(Block.EVENTS.INIT)
  }

  private _getChildrenAndProps(childrenAndProps: any) {
    const props: Record<string, any> = {}
    const children: Record<string, Block | Block[]> = {}

    Object.entries(childrenAndProps).forEach(([key, value]) => {
      if (Array.isArray(value) && value.every((el) => el instanceof Block)) {
        children[key] = value
      } else if (value instanceof Block) {
        children[key] = value
      } else {
        props[key] = value
      }
    })

    return { props, children }
  }

  _addEvents() {
    const { events = {} } = this.props

    Object.keys(events).forEach((eventName) => this._element?.addEventListener(eventName, events[eventName]))
  }

  _removeEvents() {
    const { events = {} } = this.props

    Object.keys(events).forEach((eventName) => this._element?.removeEventListener(eventName, events[eventName]))
  }

  _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this._init.bind(this))
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this))
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this))
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this))
  }

  private _init() {
    // this._createResources()
    this.init()
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER)
  }

  protected init() {}

  _componentDidMount() {
    this.componentDidMount()
  }

  componentDidMount() {}

  public dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM)

    Object.values(this.children).forEach((child) => {
      if (Array.isArray(child)) {
        child.forEach((el) => el.dispatchComponentDidMount())
      } else {
        child.dispatchComponentDidMount()
      }
    })
  }

  private _componentDidUpdate(oldProps: any, newProps: any) {
    if (this.componentDidUpdate(oldProps, newProps)) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER)
    }
  }

  protected componentDidUpdate(oldProps: any, newProps: any) {
    return true
  }

  setProps = (nextProps: any) => {
    if (!nextProps) {
      return
    }

    Object.assign(this.props, nextProps)
  }

  get element() {
    return this._element as HTMLElement
  }

  private _render() {
    const fragment = this.render()
    const newElement = fragment.firstElementChild as HTMLElement

    this._removeEvents()

    if (this._element) {
      this._element.replaceWith(newElement)
    }

    this._element = newElement

    this._addEvents()
  }

  protected compile(template: (context: any) => string, context: any) {
    const contextAndStubs = { ...context }

    Object.entries(this.children).forEach(([name, component]) => {
      if (Array.isArray(component)) {
        contextAndStubs[name] = component.map((child) => `<div data-id="${child.id}"></div>`)
      } else {
        contextAndStubs[name] = `<div data-id="${component.id}"></div>`
      }
    })

    const html = template(contextAndStubs)
    const temp = document.createElement('template')

    temp.innerHTML = html

    Object.entries(this.children).forEach(([_, component]) => {
      if (Array.isArray(component)) {
        component.forEach((child) => {
          const stub = temp.content.querySelector(`[data-id="${child.id}"]`)

          if (!stub) return

          // child.getContent()?.append(...Array.from(stub.childNodes))
          stub.replaceWith(child.element!)
        })
      } else {
        const stub = temp.content.querySelector(`[data-id="${component.id}"]`)

        if (!stub) return

        // component.getContent()?.append(...Array.from(stub.childNodes))
        stub.replaceWith(component.element!)
      }
    })

    return temp.content
  }

  protected render(): DocumentFragment {
    return new DocumentFragment()
  }

  getContent() {
    return this.element
  }

  _makePropsProxy(props: any) {
    const self = this

    return new Proxy(props, {
      get(target, prop) {
        const value = target[prop]
        return typeof value === 'function' ? value.bind(target) : value
      },
      set(target, prop, value) {
        const oldTarget = { ...target }

        // eslint-disable-next-line no-param-reassign
        target[prop] = value

        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target)
        return true
      },
      deleteProperty() {
        throw new Error('Нет доступа')
      }
    })
  }

  _createDocumentElement(tagName: string) {
    return document.createElement(tagName)
  }

  show() {
    this.getContent()!.style.display = 'block'
  }

  hide() {
    this.getContent()!.style.display = 'none'
  }
}

export default Block
