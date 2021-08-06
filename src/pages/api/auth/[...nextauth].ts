import NextAuth from "next-auth";
import Providers from "next-auth/providers";

export default NextAuth({
  providers: [
    Providers.Discord({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    session: async (session, user) => {
      session.id = user.id;

      return Promise.resolve(session);
    },
  },
  database: process.env.DATABASE_URL,
  secret: process.env.DISCORD_COOKIE_SECRET,
});
