"use client"
import Link from 'next/link'
import Image from 'next/image'
import { useState,useEffect } from 'react';
import{ signIn, signOut, useSession, getProviders} from 'next-auth/react'
import Loading from './Loading';

const Nav = () => {

  const { data: session, status } = useSession()

  const [providers, setProviders] = useState(null)
  const [showDropdown, setShowDropdown] = useState (false)

    useEffect(()=>{
    
    const setNewProviders = async () => {
      const response = await getProviders();
      setProviders(response)
    }
    setNewProviders();

  }, [])

  return (
    <nav className='flex-between w-full mb-16 pt-3 '>
      <Link href='/' className='flex gap-2 flex-center'>
        <Image src='/assets/images/logoo.png' width='300' height='100' className='object-contain' alt='logo' />
      </Link>

      {status === 'loading' ? <Loading type='Oval' width= '40' color='#f5ee25' secondaryColor='#f54025'/>

       :
        (
        <>
          {/* Desktop Navigation */}

          <div className="sm:flex hidden">
            {session?.user
            ? (<div className='flex gap-3 md-gap-5'>
                  <Link href='/create-prompt' className='black_btn'>
                    Create a prompt
                  </Link>
                  <button type='button' onClick={signOut} className='font-santoshi font-semibold'>
                    Sign Out
                  </button>
                  <Link href='/profile'>
                    <Image  src={session?.user.image} width='35' height='35' alt='profile' className='rounded-full'/>
                  </Link>
              </div>
              )
            : (
                <>
                {providers && Object.values(providers).map((provider)=>(
                  <button
                  type='button'
                  key={provider.name}
                  onClick={()=>signIn(provider.id)}
                  className ='black_btn'
                  >
                    Sign in
                  </button>
                ))}
                </>
              )
            }

          </div>

          {/* Mobile Navigation */}
          <div className='sm:hidden flex relative'>
            {session?.user ?
            (<div className='flex'>
              <Image  src={session?.user.image} width='35' height='35' alt='profile' className='rounded-full' onClick={()=>setShowDropdown((prev)=> !prev)}/>
              {showDropdown &&
              <div className='dropdown'>
                <Link
                    href='/profile'
                    className='dropdown_link'
                    onClick={()=>setShowDropdown(false)}
                  >
                  My Profile
                </Link>
                <Link
                    href='/create-prompt'
                    className='dropdown_link'
                    onClick={()=>setShowDropdown(false)}
                    >
                  Create Prompt
                </Link>
                <button type='button' onClick={()=>{setShowDropdown(false); signOut()}}>
                  Sign Out
                </button>
              </div>
              }
            </div>) 
            :
            <>
              {providers &&
                Object.values(providers).map((provider)=>(
                  <button
                  type='button'
                  key={provider.name}
                  onClick={()=>signIn(provider.id)}
                  className ='black_btn'
                  >
                    Sign in
                </button>
              ))}
            </>
            }
          </div>
        </>) }
    </nav>
  );
};

export default  Nav;
