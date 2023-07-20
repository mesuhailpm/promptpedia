import Image from "next/image";
import { PiCopySimpleLight } from "react-icons/pi";
import { LiaClipboardCheckSolid } from "react-icons/lia";
import { FcOpenedFolder } from "react-icons/fc/";
import { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { MdEdit } from "react-icons/md";
import { MdEditOff } from "react-icons/md";
import { useRouter } from "next/navigation";

const PromptCard = ({
  post,
  copied,
  handleCopy,
  handleTagSearch,
  parent,
  parentUrl,
}) => {
  const { creator, prompt, tag } = post;
  const { data: session } = useSession();
  const router = useRouter();

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this?")) {
      const response = await fetch(`/api/prompt/delete/${post._id}`, {
        method: "DELETE",
      });
      if (response.ok) router.push(parentUrl);
    }
  };

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <Link href={`/profile/${creator?._id}`} className="flex flex-col">
          <Image
            src={creator.image}
            alt="user-profile"
            width={30}
            height={30}
            className="rounded-full"
          />
        </Link>
        <div>
          <h1 className="font-santoshi font-semibold">{creator.username}</h1>
          <p>{creator.email}</p>
        </div>
        <div
          onClick={() => handleCopy && handleCopy(prompt)}
          className="copy_btn"
        >
          {copied && copied === prompt ? (
            <div className="flex flex-col items-center">
              <p className="text-xs font-inter font-bold">Copied!</p>
              <LiaClipboardCheckSolid />
            </div>
          ) : (
            <PiCopySimpleLight />
          )}
        </div>
      </div>

      <p className="text-sm font-inter font-semibold">{prompt} </p>
      <div
        onClick={() => handleTagSearch && handleTagSearch(tag)}
        className={`w-fit ${handleTagSearch && 'hover:underline cursor-pointer '}`}
      >
        <p className="text-xs font-inter m-5 ">#{tag} </p>
      </div>

      {(!parent || parent !== "single") && (
        <Link
          className="absolute right-5 bottom-5"
          href={`/prompt/${post._id}`}
        >
          <FcOpenedFolder title="Open" />
        </Link>
      )}

      {parent && parent === "single" && creator._id === session?.user?.id && (
        <div className="m-5 flex justify-center items-center gap-4 border-t border-gray-100 t-3">
          <Link
            href={`/prompt/edit/${post._id}`}
            className="px-5 font-santoshi text-amber-300	 p-2 bg-green-500 border border-2 border-white rounded-lg"
          >
            {" "}
            Edit{" "}
          </Link>
          <button
            onClick={handleDelete}
            className="font-santoshi p-2 bg-red-500 text-white border border-2 border-white rounded-lg"
          >
            {" "}
            Delete{" "}
          </button>
        </div>
      )}

      {!parent &&
        (creator._id === session?.user?.id ? (
          <Link
            className="absolute right-12 bottom-5"
            // className = {`aboslute ${parent && parent === 'single'? 'right-12 bottom-5': 'right-12 bottom-5'} `} //test
            href={`/prompt/edit/${post._id}`}
          >
            <MdEdit title="Edit" color="green" />
          </Link>
        ) : (
          <div
            // className = {`aboslute ${parent && parent === 'single'? 'right-12 bottom-5': ''} `} //test
            className="absolute right-12 bottom-5"
          >
            <MdEditOff title="Read-only" color="red" />
          </div>
        ))}
    </div>
  );
};

export default PromptCard;
