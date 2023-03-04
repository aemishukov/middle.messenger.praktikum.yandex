import { AuthorizationPage } from '../pages/AuthorizationPage'
import { RegistrationPage } from '../pages/RegistrationPage'
import { ProfilePage } from '../pages/ProfilePage'
import { ProfileEditPage } from '../pages/ProfileEditPage'
import { PasswordEditPage } from '../pages/PasswordEditPage'
import { AvatarEditPage } from '../pages/AvatarEditPage'
import { NavigationPage } from '../pages/NavigationPage'
import { ChatsPage } from '../pages/ChatsPage'
import { ErrorPage as ErrorPage404 } from '../pages/ErrorPage/404'
import { ErrorPage as ErrorPage500 } from '../pages/ErrorPage/500'

export const ROUTES = {
  navigationPage: NavigationPage,
  authorizationPage: AuthorizationPage,
  registrationPage: RegistrationPage,
  profilePage: ProfilePage,
  profileEditPage: ProfileEditPage,
  passwordEditPage: PasswordEditPage,
  avatarEditPage: AvatarEditPage,
  chatsPage: ChatsPage,
  errorPage404: ErrorPage404,
  errorPage500: ErrorPage500
}

export function renderDom(route: keyof typeof ROUTES) {
  const root = document.querySelector('#app')!

  root.innerHTML = ''

  const PageComponent = ROUTES[route]
  const page = new PageComponent()

  root.appendChild(page.element)

  page.dispatchComponentDidMount()
}
