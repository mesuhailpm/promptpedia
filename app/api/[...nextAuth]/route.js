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
            async signIn ({email}){
                
            
                },
            async session ({session}){
                return session;
                }}
                
                },

)

export default handler