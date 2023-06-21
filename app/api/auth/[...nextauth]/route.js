import { mongooseConnect } from '@/lib/mongoose';
import { Admin } from '@/models/Admin';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';

export const authOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      type: 'credentials',
      credentials: {},
      async authorize(credentials, req) {
        const { email, password } = credentials;
        await mongooseConnect();
        console.log('Email:', email);
        const admin = await Admin.findOne({ email });
        console.log('Admin:', admin);
        if (!admin) throw new Error('Admin not found!');
        const passwordMatch = await bcrypt.compare(password, admin.password);
        if (!passwordMatch) throw new Error('email/password mismatch!');

        return {
          name: admin.name,
          email: admin.email,
          role: admin.role,
          id: admin._id,
        };
      },
    }),
  ],
  callbacks: {
    jwt(params) {
      if (params.admin?.role) {
        params.token.role = params.admin.role;
        params.token.id = params.admin.id;
      }
      return params.token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

// export async function isAdminRequest(request, res) {
//   const session = await getServerSession(authOptions);

//   if (!adminEmails.includes(session?.user?.email)) {
//     res.status(401);
//     res.end();
//     throw 'not an admin';
//   }
// }
