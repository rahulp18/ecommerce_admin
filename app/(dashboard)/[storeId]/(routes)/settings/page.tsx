import { prismadb } from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import React from 'react'
import SettingForm from './components/setting-form';
interface SettingPageProps{
  params:{
    storeId:string;
  }
}
const SettingPage:React.FC<SettingPageProps> = async({params}) => {
  const {userId} =auth();

  if(!userId) {
    redirect('/login')
  }
  const store=await prismadb.store.findFirst({
    where:{
      id:params.storeId
    }
  });
  if(!store) {
    redirect('/')
  }
  return (
    <div className='flex-col' >
      <div className="flex-1 space-y-4 p-8 pt-4">
        <SettingForm initialData={store} />
      </div>
    </div>
  )
}

export default SettingPage