import { useState, useEffect, startTransition } from 'react'
import { useRouter } from 'next/router'

export default function Footer() {
    const router = useRouter()

    return (
        <>
            <footer className="bg-white dark:bg-gray-900 lg:p-8 p-4 py-8">
                <div className="mx-auto text-center max-w-5xl">
                    <div className="grid hmm">
                        <a onClick={()=> router.push('')} className="text-white flex"></a>
                    </div>
                </div>
            </footer>
        </>
    )
}