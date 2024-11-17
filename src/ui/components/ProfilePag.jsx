'use client'
import React from 'react'
import { useSession } from 'next-auth/react'
const ProfilePag = () => {
  return (
    <div>
      <h1>Profile Page</h1>
            <h1>Welcome </h1>
            <h1>This is a view of your favorite Tasks:</h1>
            <h1>Access and edit all of your tasks in the nav bar</h1>
    </div>
  )
}

export default ProfilePag
