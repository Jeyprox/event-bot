import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";
import DiscordProvider from "next-auth/providers/discord";
import { SessionProvider } from "next-auth/react";

async function refreshAccessToken(token: JWT) {
  try {
    const url = "https://discord.com/api/v8/oauth2/token?";
    // new URLSearchParams({
    //   client_id: process.env.DISCORD_CLIENT_ID,
    //   client_secret: process.env.DISCORD_CLIENT_SECRET,
    //   grant_type: "refresh_token",
    //   refresh_token: token.refreshToken,
    // });

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
    };
  } catch (error) {
    console.log(error);
    return { ...token, error: "RefreshAccesTokenError" };
  }
}

export default NextAuth({
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      // initial sign in
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          userId: user.id,
          accessTokenExpires: Date.now() + account.expires_at! * 1000,
        };
      }

      // if (Date.now() < token.accessTokenExpires) {
      //   return token;
      // }

      return token;
      // return await refreshAccessToken(token);
    },
    session: ({ session, token }) => {
      if (token) {
        session.accessToken = token.accessToken;
        session.userId = token.userId;
      }
      return session;
    },
  },
  session: {
    maxAge: 30 * 24 * 60 * 60,
  },
  jwt: {
    secret: process.env.DISCORD_JWT_SECRET,
  },
  secret: process.env.DISCORD_COOKIE_SECRET,
});
