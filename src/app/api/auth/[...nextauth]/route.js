import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { connect } from '@/app/lib/dbConnect';

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  trustHost: true,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),

    CredentialsProvider({
      name: 'credentials',
      credentials: {},
      async authorize(credentials) {
        const { identifier, password } = credentials;
        const usersCollection = await connect('users');
        const user = await usersCollection.findOne({
          $or: [{ email: identifier }, { phone: identifier }],
        });
        if (!user) throw new Error('User not found');
        if (user.provider !== 'register')
          throw new Error('Please login with Google or Facebook');
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error('Login failed.');
        return {
          id: user._id.toString(),
          userId: user.userId,
          name: user.name,
          email: user.email,
          image: user.image,
          phone: user.phone,
          role: user.role,
        };
      },
    }),
  ],
  session: { strategy: 'jwt' },

  pages: {
    signIn: '/login',
    error: '/login',
  },

  callbacks: {
    async signIn({ account, profile }) {
      if (account.type === 'credentials') return true;
      try {
        const usersCollection = await connect('users');
        const existingUser = await usersCollection.findOne({
          email: profile.email,
          provider: account.provider,
        });

        if (!existingUser) {
          const providerImage =
            account.provider === 'google'
              ? profile.picture
              : profile?.picture?.data?.url || null;
          const newUser = {
            name: profile.name,
            email: profile.email,
            provider: account.provider,
            authType: account.provider,
            userId: account.providerAccountId,
            image: providerImage,
            phone: '',
            address: '',
            role: 'user',
            balance: 0,
            emailVerified: profile.email_verified || false,
            password: null,
            createdAt: new Date(),
          };
          await usersCollection.insertOne(newUser);
        }

        return true;
      } catch (error) {
        console.error('Error during sign-in:', error);
        return false;
      }
    },
    async jwt({ token, user, account }) {
      // প্রথম login-এর সময়
      if (user) {
        token.id = user.id;
        token.phone = user.phone || '';
        token.userId = user.userId;
      }

      // Google/Facebook OAuth login-এর সময়
      if (account?.type === 'oauth') {
        token.userId = account.providerAccountId;
      }

      // প্রতিবার database থেকে latest role নেওয়া
      if (token.userId) {
        const usersCollection = await connect('users');

        const dbUser = await usersCollection.findOne({
          userId: token.userId.toString(),
        });

        if (dbUser) {
          token.role = dbUser.role;
          token.phone = dbUser.phone || '';
        } else {
          // DB-তে user না পেলে
          token.role = 'user';
        }
      }

      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.userId = token.userId;
      session.user.role = token.role || 'user';
      session.user.phone = token.phone || '';

      return session;
    },
  },
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
