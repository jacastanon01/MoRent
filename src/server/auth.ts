import { PrismaAdapter } from '@next-auth/prisma-adapter';
import {
  DefaultSession,
  getServerSession,
  type NextAuthOptions,
} from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import { env } from '@/env';
import { db } from '@/server/db';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';

declare module 'next-auth' {
  export interface Session {
    user: {
      id: string;
    } & DefaultSession['user'];
  }
}

export const authOptions: NextAuthOptions = {
  session: { strategy: 'jwt' },
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(db),
  pages: {
    signIn: '/auth/signin',
    error: '/auth/signin',
  },
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: 'your credentials',
      credentials: {
        email: { label: 'email', type: 'email' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials, req): Promise<any | null> {
        const user = await db.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });

        if (!user) {
          throw Error('User not found');
        }

        if (!user.password) {
          throw Error('Login with your google account or enter password');
        }

        if (credentials?.password) {
          const isValidPassword = await bcrypt.compare(
            credentials.password,
            user.password,
          );

          if (!isValidPassword) {
            throw Error('Incorrect credentials');
          }
        }
        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          id: user.id,
        };
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
        },
      };
    },
  },
};

export const getServerAuthSession = () => getServerSession(authOptions);
