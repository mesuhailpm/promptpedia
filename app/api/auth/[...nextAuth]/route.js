import GoogleProvider from 'next-auth/providers/google'
import NextAuthHandler from 'next-auth'
import {connectToDb} from '@utils/database'
import User from '@models/User'


const handler = NextAuthHandler (
    {
        providers: [
            GoogleProvider({
                clientId:process.env.GOOGLE_CLIENT_ID,
                clientSecret:process.env.GOOGLE_CLIENT_SECRET
            })
        ],

        callbacks: {
            async session ({session,token}){ // has object with 'sesssion' and 'token'
                try {
                    const existingUser = await User.findOne({email: session.user.email})    
                    session.user.id = existingUser._id
                    return session;  

                } catch (error) {
                   console.log('session is not updataed, error: ',error) 
                    
                }
            },
            
    
            async signIn ({user,account,profile}){     //not containig credential property, also 'profile' has no email but 'user' has        
                try {
                    console.log(user.email, ' is the email trying to be signed in');
                    connectToDb()
                    const userAlreadyExists = await User.findOne({email: user.email})
                    if (userAlreadyExists) console.log(userAlreadyExists, 'is the user already there')
                    
                    if (!userAlreadyExists) {
                        await User.create({
                            email: user.email,
                            username: user.name.replace(" ",""),
                            image: user.image
                        })
                    }
                    return true;
                    
                } catch (error) {
                    console.log('error chcking if user exists :',error)
                    return false;
                }     
            },
            
            
        }
    }
)

export { handler as GET, handler as POST }