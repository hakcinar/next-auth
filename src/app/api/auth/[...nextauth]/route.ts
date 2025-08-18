// src/app/api/auth/[...nextauth]/route.ts
import NextAuth, { AuthOptions } from 'next-auth';
import Auth0Provider from 'next-auth/providers/auth0';
import type { JWT } from 'next-auth/jwt';

if (
  !process.env.AUTH0_CLIENT_ID ||
  !process.env.AUTH0_CLIENT_SECRET ||
  !process.env.AUTH0_DOMAIN
) {
  throw new Error('Auth0 env değişkenleri tanımlı değil!');
}

export const authOptions: AuthOptions = {
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      issuer: process.env.AUTH0_DOMAIN,
    }),
  ],
  session: { strategy: 'jwt' },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, account }: { token: JWT; account?: any }) {
      if (account?.id_token) {
        const decoded = JSON.parse(
          Buffer.from(account.id_token.split('.')[1], 'base64').toString()
        );
        token.roles = decoded['http://localhost:3000/claims/roles'] || [];
      }
      return token;
    },
    async session({ session, token }: { session: any; token: JWT }) {
      if (session.user) session.user.roles = token.roles;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
