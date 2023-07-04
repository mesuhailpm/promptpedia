import GoogleProvider from 'next-auth/providers/google'
import NextAuthHandler from 'next-auth'

const handler = NextAuthHandler (
    {
        providers: [
            GoogleProvider({
                clientId:'',
                clientSecret:''
            })
        ],
        callbacks: {
            async signIn ({profile}){


                },
            async session ({session}){
                return session;
                }}

                },

)

export { handler as GET, handler as POST }
