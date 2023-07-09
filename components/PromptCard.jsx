import Image from "next/image";
import {PiCopySimpleLight} from 'react-icons/pi'
import {LiaClipboardCheckSolid} from 'react-icons/lia'
import {FcOpenedFolder} from 'react-icons/fc/'
import { useState } from "react";
import Link from "next/link";

const PromptCard = ({post, copied, handleCopy}) => {
  const{creator, prompt, tag} = post

    return (
      <div className="prompt_card">
        <div className="flex justify-between items-start gap-5">
          <div className="flex flex-col">
            <Image src={creator.image} alt='user-profile' width={30} height={30} className="rounded-full" />
          </div>
          <div>
            <h1 className="font-santoshi font-semibold">{creator.username}</h1>
            <p>{creator.email}</p>
          </div>
          <div onClick={()=>handleCopy && handleCopy(prompt)} className="copy_btn">
            {copied === prompt 
            ?
            ( <div className="flex flex-col items-center">
                <p className="text-xs">Copied!</p>
                <LiaClipboardCheckSolid />
              </div>
            )
            :
            (
              <PiCopySimpleLight/>  
            )}
            
          </div>

        </div>

        
        <p className="text-sm font-inter font-semibold">{prompt} </p>
        <p className="text-xs font-inter m-5">#{tag} </p>

        

        <Link className="absolute right-5 bottom-5" href={`/prompt/${post._id}`}>
          <FcOpenedFolder/>
        </Link>
      </div>
    );
  };

  export default PromptCard;
