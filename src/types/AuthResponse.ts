import type { Token, User } from '.'

export type AuthResponse = {
  tokens: Token
  user: User
}
