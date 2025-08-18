import NextAuth, { DefaultSession, DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      roles?: string[];
    } & DefaultSession['user'];
  }

  interface User extends DefaultUser {
    roles?: string[];
  }
}
