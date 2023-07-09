"use client"

import Form from "@components/Form"
import { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

const CreatePage = () => {
    const {data: session } = useSession()
    const router = useRouter ()
    const [submitting, setSubmitting] = useState(false)
    const [form, setForm] = useState({
        prompt:'',
        tag:''
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setSubmitting(true);

            const sanitizeTag = (tag) => {
                if (tag.charAt(0)==='#'){return tag.slice(1)}
                return tag
            }

            const response = await fetch('/api/prompt/create', {
                method: "POST",
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
  return (

    <div className="flex flex-col">
        <Form
         type='Create'
         handleSubmit={handleSubmit}
         form={form}
         setForm={setForm}
         submitting={submitting}

        />


    </div>
  )
}

export default CreatePage
