import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import NavBar from '@/components/NavBar'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { AuthProvider } from '@/lib/useAuth'
import Footer from '@/components/Footer'


function App({ Component, pageProps }: AppProps) {
  const router = useRouter()


  return (
    // HOC
  <AuthProvider >
    <NavBar />
    <Component {...pageProps} />
    <Footer />
  </AuthProvider>
  )
}

export default App