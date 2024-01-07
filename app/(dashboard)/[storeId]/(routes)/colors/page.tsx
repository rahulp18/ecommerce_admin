import React from 'react'
 
import { prismadb } from '@/lib/prismadb'
import { ColorsColumn } from './components/columns';
import {format} from 'date-fns'
import ColorClient from './components/ColorClient';
 
const Sizes = async({params}:{params:{storeId:string}}) => {
  const colors=await prismadb.color.findMany({
    where:{
      storeId:params.storeId,
      
    },
  
    orderBy:{
      createdAt:'desc'
    }
  });

  const formattedBillboards:ColorsColumn[]=colors.map((item)=>({
    id:item.id,
    name:item.name,
    value:item.value,
    
    createdAt:format(item.createdAt,'MMMM do yyyy')
  }))
 
  return (
  <div className="flex-col">
    <div className="flex-1 space-y-4 p-8 pt-6">
          <ColorClient data={formattedBillboards} />
    </div>
  </div>
  )
}

export default Sizes