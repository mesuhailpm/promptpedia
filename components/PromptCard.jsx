import Image from "next/image";
import {PiCopySimpleLight} from 'react-icons/pi'
import {LiaClipboardCheckSolid} from 'react-icons/lia'
import {FcOpenedFolder} from 'react-icons/fc/'
import { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { MdEdit} from 'react-icons/md'
import { MdEditOff} from 'react-icons/md'

const PromptCard = ({post, copied, handleCopy, handleTagSearch}) => {
  const{creator, prompt, tag} = post
  const {data: session} = useSession()

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
        <div onClick={()=> handleTagSearch(tag)} className="cursor-pointer">
          <p className="text-xs font-inter m-5">#{tag} </p>

        </div>



        <Link className="absolute right-5 bottom-5" href={`/prompt/${post._id}`}>
          <FcOpenedFolder title="Open"  />
        </Link>
        { creator._id === session?.user?.id ?
          (<Link className="absolute right-12 bottom-5" href={`/prompt/edit/${post._id}`}>
            <MdEdit title='Edit' color='green'/>
          </Link>)
          :
          (
            <div className="absolute right-12 bottom-5">
              <MdEditOff title='Read-only' color='red'/>
            </div>

          )


          }
      </div>
    );
  };

  export default PromptCard;
