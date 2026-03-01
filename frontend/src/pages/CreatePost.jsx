import React from 'react'
import PostForm from '../components/PostForm'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function CreatePost() {
  return (
    <>
      <Navbar />

      <section >
        <PostForm />
      </section>

      <section >
        <Footer />
      </section>
    </>
  )
}
