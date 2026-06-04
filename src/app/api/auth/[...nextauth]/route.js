import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import { connect } from '@/app/lib/dbConnect';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
  ],

  pages: {
    signIn: '/login',
    error: '/login',
  },

  callbacks: {
    async signIn({ account, profile }) {
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
        alert('Error during sign-in:', error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
