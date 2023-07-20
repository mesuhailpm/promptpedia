// 'use client'
import loading from "@app/loading";
import PromptCard from "./PromptCard";
import Loading from '@components/Loading';
import { useState } from "react";

const Profile = ({user, desc, data, handleDelete, handleEdit, isLoading, parentUrl}) => {
   const [copied, setcopied] = useState('')
   const handleCopy = async (text) =>{
    navigator.clipboard.writeText(text)
    .then(()=> {
      setcopied(text)
      setTimeout(()=>{
        setcopied('')
      },5000)})
    .catch((error) => console.log(error))
    }
    



    if (isLoading) return <Loading/>

    
    return (
      <section className='w-full'>
        <p className='head_text text-left '>
            <span className='blue_gradient'>{user === 'My'? 'My ' : `${user}'s `}Profile page</span>
        </p>
        <p className="desc">{desc}</p>

        {isLoading &&
        <Loading type='Comment'/>
        }

        { !isLoading &&         
          (
            <div className="mt-16 prompt_layout">

            {data?.length
              ?
                data.map((prompt,index) =>(
                  <PromptCard
                      key={index}
                      post={prompt}
                      parentUrl={parentUrl}
                      copied={copied}
                      handleCopy={handleCopy}
                    />
                  
                ))
              :
                <p>No posts found</p>}
            </div>
          )
        }


    </section>
    );
  };

  export default Profile;
