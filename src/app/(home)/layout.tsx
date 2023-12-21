import Sidebar from '@/components/Sidebar'
import React from 'react'


export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return(
        <div className=" w-screen h-screen flex">
            <Sidebar/>
            <div className=" pt-8 px-5 pr-8 w-full bg-background-normal">
                {children}
            </div>
        </div>
    )
}