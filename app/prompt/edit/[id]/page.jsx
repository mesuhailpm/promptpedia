"use client"

import Form from "@components/Form"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const  EditPage = () => {
    const {data: session } = useSession()
    const router = useRouter ()
    const [submitting, setSubmitting] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [form, setForm] = useState({
        prompt:'',
        tag:''
    })
    

    console.log(form)

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setSubmitting(true);

            const sanitizeTag = (tag) => {
                if (tag.charAt(0)==='#'){return tag.slice(1)}
                return tag
            }

            const response = await fetch(`/api/prompt/edit?id=${promptId}`, {
                method: "PATCH",
                body: JSON.stringify({
                    creator: session?.user.id,
                    prompt: form.prompt,
                    tag: sanitizeTag(form.tag).trim(),
                })
            })
            if (response.ok)
            router.push('/')

        } catch (error) {
            console.log('prompt creation failed: ',error)

        }finally {
            setSubmitting(false);
        }

    }
    const [promptId, setPromptId] = useState('')

    const retrieveId = () => {
        const path = window.location.pathname
        const pathArray = path.split('/')
        const slug = pathArray[pathArray.length-1]
        return slug
    }

    useEffect(()=>{
        setPromptId(retrieveId())

    },[])

    const fetchPromptData = async () =>{
        setIsLoading(true)
        const response = await fetch(`/api/prompt/?id=${promptId}`)
        const data = await response.json()

        setForm(data)
        setIsLoading(false)
    }
    console.log(form)

    useEffect (()=>{
        fetchPromptData()

    },[promptId])
    console.log(session?.user?.id ,' is session userID')//test
    console.log(form?.creator?._id , 'is form userID')//test

    if(isLoading) return<p className="text-bold text-2xl">Loading</p>

    if(session?.user?.id !== form?.creator?._id) {return <p className="text-bold text-3xl">Unauthenticated</p>}

    return(
        <>
            <Form
            type='Edit'
            handleSubmit={handleSubmit}
            form={form}
            setForm={setForm}
            submitting={submitting}
            />
        </>
    )

}

export default EditPage
