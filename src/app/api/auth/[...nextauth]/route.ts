import NextAuth, { AuthOptions, Session } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";

const authOptions: AuthOptions = {
  providers: [
    CredentialProvider({
      type: "credentials",
      name: "credentials",
      credentials: {},
      authorize: async (credentials, req) => {
        try {
          const res = await fetch(
            "https://passporter-backend.adaptable.app/api/applicant/auth/login",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(credentials),
            }
          );

          if (!res.ok) {
            throw new Error("Authentication failed");
          }
          const user = await res.json();
          return Promise.resolve(user);
        } catch (error) {
          console.log("error server", error);
          throw new Error("Internal Server Error");
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user;
      return Promise.resolve(token);
    },
    async session({ session, token }: any) {
      // localStorage.setItem("sessionData", JSON.stringify(session));
      if (token) {
        session.user = token.user;
        session.sessionData = token.sessionData;
      }
      session.user = token.user;
      session.data = token.sessionData;
      return Promise.resolve(session);
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
