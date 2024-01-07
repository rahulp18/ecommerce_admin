import React from 'react'
 
import { prismadb } from '@/lib/prismadb'
import {  CategoryColumns } from './components/columns';
import {format} from 'date-fns'
import CategoryClient from './components/CategoryClient';
const Categories = async({params}:{params:{storeId:string}}) => {
  const categories=await prismadb.category.findMany({
    where:{
      storeId:params.storeId,
      
    },
    include:{
  billboard:true
    },
    orderBy:{
      createdAt:'desc'
    }
  });

  const formattedCategories:CategoryColumns[]=categories.map((item)=>({
    id:item.id,
    name:item.name,
    billboardLabel:item.billboard.label,
    createdAt:format(item.createdAt,'MMMM do yyyy')
  }))
 
  return (
  <div className="flex-col">
    <div className="flex-1 space-y-4 p-8 pt-6">
          <CategoryClient data={formattedCategories} />
    </div>
  </div>
  )
}

export default Categories