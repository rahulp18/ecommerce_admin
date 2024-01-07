import { UserButton, auth } from '@clerk/nextjs'
import React from 'react'
import MainNav from './main-nav'
import StoreSwitcher from './store-switcher'
import { redirect } from 'next/navigation'
import { prismadb } from '@/lib/prismadb'

const Navbar = async() => {
  const {userId}=auth();

  if(!userId){
    redirect('/login');
  }

  const stores=await prismadb.store.findMany({
    where:{
      userId
    }
  })
  return (
    <div className='border-b' >
        <div className="h-16 items-center flex px-4">
             <StoreSwitcher items={stores} />
             <MainNav className='mx-4' />
            <div className="ml-auto flex items-center space-x-4">
                <UserButton afterSignOutUrl='/' />
            </div>
        </div>

    </div>
  )
}

export default Navbar