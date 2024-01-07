import { prismadb } from '@/lib/prismadb';
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation';
import  { ReactNode } from 'react'

const RootLayout = async({children}:{children:ReactNode}) => {
const {userId}=auth();

if(!userId){
    redirect(`/login`)
}
const store=await prismadb.store.findFirst({
    where:{
        userId
    }
});
if(store){
    redirect(`/${store.id}`)
}
  return (
    <>
        {children}
    </>
  )
}

export default RootLayout