import bcrypt from 'bcryptjs'
import NextAuth, { type NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { z } from 'zod'
import prisma from './libs/prisma'

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/auth/login',
    signOut: '/',
    newUser: '/auth/new-account'
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials)

        if (!parsedCredentials.success) return null

        const { email, password } = parsedCredentials.data

        const user = await prisma.user.findFirst({
          where: {
            email: email.toLowerCase()
          }
        })

        if (!user) return null

        const userPassword: string = user.password || ''

        if (!bcrypt.compareSync(password, userPassword)) return null

        const { password: _, ...userWithoutPassword } = user

        return userWithoutPassword
      }
    })
  ]
}

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig)
