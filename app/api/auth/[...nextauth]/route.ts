// app/api/auth/[...nextauth]/route.ts
import NextAuth, { NextAuthOptions } from 'next-auth';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import { MongoClient } from 'mongodb';

const clientPromise = MongoClient.connect(process.env.MONGODB_URI as string);
import EmailProvider from 'next-auth/providers/email';

export const authOptions: NextAuthOptions = {
    adapter: MongoDBAdapter(clientPromise),// Use MongoDB adapter
    providers: [
        EmailProvider({
            server: {
                host: process.env.EMAIL_SERVER_HOST,
                auth: {
                    user: process.env.EMAIL_SERVER_USER,
                    pass: process.env.EMAIL_SERVER_PASSWORD,
                },

            },
            from: process.env.EMAIL_FROM,
            sendVerificationRequest: ({ identifier, url }) => {
                console.log("Sending magic link to:", identifier);
                console.log("Magic link URL:", url);
                // Custom email logic goes here
                try {
                    // Your logic to send the email
                } catch (error) {
                    console.error("Error sending magic link email:", error);
                }
            },
        }),
    ],
    session: {
        strategy: 'jwt', // Use JWT for session management
    },
    secret: process.env.NEXTAUTH_SECRET,

    pages: {
        signIn: '/auth/sign-in',
        verifyRequest: '/auth/verify',
        error: '/auth/error',
    },
    callbacks: {
        async session({ session, token }) {
            if (session.user) {
                session.user.name = token.sub; // Attach user ID to session
            }
            return session;
        },
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
