import React from 'react'
 
import { prismadb } from '@/lib/prismadb'
import { SizesColumn } from './components/columns';
import {format} from 'date-fns'
import SizeClient from './components/SizeClient';
const Sizes = async({params}:{params:{storeId:string}}) => {
  const billboards=await prismadb.size.findMany({
    where:{
      storeId:params.storeId,
      
    },
    include:{
      store:true
    },
    orderBy:{
      createdAt:'desc'
    }
  });

  const formattedBillboards:SizesColumn[]=billboards.map((item)=>({
    id:item.id,
    name:item.name,
    value:item.value,
    
    createdAt:format(item.createdAt,'MMMM do yyyy')
  }))
 
  return (
  <div className="flex-col">
    <div className="flex-1 space-y-4 p-8 pt-6">
          <SizeClient data={formattedBillboards} />
    </div>
  </div>
  )
}

export default Sizes