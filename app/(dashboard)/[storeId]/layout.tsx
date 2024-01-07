import Navbar from '@/components/navbar';
import { prismadb } from '@/lib/prismadb';
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation';
import React from 'react'

const DashboardLayout = async({params,children}:{params:{storeId:string},children:React.ReactNode}) => {
  const {userId}=auth();

if(!userId){
    redirect('/login');
}
const store=await prismadb.store.findFirst({
    where:{
        id:params.storeId,
        userId
    }
})

if(!store){
  redirect('/')
}
  return (
   <>
  <Navbar />
   <main>{children}</main>
   </>
  )
}

export default DashboardLayout