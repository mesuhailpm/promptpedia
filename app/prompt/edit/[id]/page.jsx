"use client"

import Form from "@components/Form"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const  EditPage = () => {
    const {data: session } = useSession()
    const router = useRouter ()
    const [submitting, setSubmitting] = useState(false)
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
    ///
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
        const response = await fetch(`/api/prompt/?id=${promptId}`)
        const data = await response.json()

        setForm(data)
    }
    console.log(form)

    useEffect (()=>{
        fetchPromptData()

    },[promptId])

    if(session?.user?.id !== form?.creator?._id) {return <p>Unauthenticated</p>}

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
