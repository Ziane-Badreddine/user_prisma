import { redirect } from 'next/navigation'
import React from 'react'

const page = () => {

    redirect("/user")
  return (
    <div>page</div>
  )
}

export default page