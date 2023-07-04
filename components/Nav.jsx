"use client"
import Link from 'next/link'
import Image from 'next/image'
import { useState,useEffect } from 'react';
import{ signIn, signOut, useSession, getProviders} from 'next-auth/react'

const Nav = () => {
  const [isUserLoggedin, setIsUserLoggedin] = useState(false)
  const [propviders, setProviders] = useState(null)
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
        <Image src='/assets/images/logo.svg' width='30' height='30' className='object-contain' alt='logo' />
        <p className='logo_text'>Promptpedia</p>
      </Link>
     {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        {isUserLoggedin
        ? (<div className='flex gap-3 md-gap-5'>
              <Link href='create-prompt' className='black_btn'>
                Create a prompt
              </Link>
              <button type='button' onClick={signOut}>
                Sign Out
              </button>
              <Link href='/profile'>
                <Image  src='/assets/images/logo.svg' width='35' height='35'/>
              </Link>
           </div>
          )
        : (
            <>
            {propviders && Object.values(propviders).map((provider)=>(
              <button
                type='button'
                key={provider.name}
                onClick={()=>signIn(provider.id)}
                className ='black_btn'
              >
              </button>
            ))}
            </>
          )
      }

      </div>


     {/* Mobile Navigation */}
     <div className='sm:hidden flex relative'>
      {isUserLoggedin ?
      (<div className='flex'>

        <Image  src='/assets/images/logo.svg' width='35' height='35' alt='profile' className='rounded-full' onClick={()=>setShowDropdown((prev)=> !prev)}/>
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
      </div>
      )


        :
        <>
        {propviders &&
         Object.values(propviders).map((provider)=>(
          <button
          type='button'
          key={provider.name}
          onClick={()=>signIn(provider.id)}
          className ='black_btn'
          >
          </button>

        ))}
        </>

      }


     </div>


    </nav>
  );
};

export default  Nav;
