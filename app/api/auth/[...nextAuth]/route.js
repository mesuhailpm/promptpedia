import GoogleProvider from 'next-auth/providers/google'
import NextAuthHandler from 'next-auth'
import connectToDb from '@utils/database'
import User from '@models/User'


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

                try {
                    connectToDb()
                    User.find({email: profile.email})


                } catch (error) {
                    alert(error)
                }



                },
            async session ({session}){
                return session;
                }}

                },

)

export { handler as GET, handler as POST }
