import React from 'react'
 
import { prismadb } from '@/lib/prismadb'
 
import {format} from 'date-fns'
 
import { ProductColumn } from './components/columns';
import ProductClient from './components/ProductClient';
import { formatter } from '@/lib/utils';
const Billboards = async({params}:{params:{storeId:string}}) => {
  const products=await prismadb.product.findMany({
    where:{
      storeId:params.storeId,
      
    },
    include:{
      category:true,
      size:true,
      color:true
    },
    orderBy:{
      createdAt:'desc'
    }
  });

  const formattedProducts:ProductColumn[]=products.map((item)=>({
    id:item.id,
    name:item.name,
    price:formatter.format(item.price.toNumber()),
    isFeatured:item.isFeatured,
    isArchive:item.isArchive,
    size:item.size.value,
    category:item.category.name,
    color:item.color.value,
    createdAt:format(item.createdAt,'MMMM do yyyy')
  }))
 
  return (
  <div className="flex-col">
    <div className="flex-1 space-y-4 p-8 pt-6">
          <ProductClient data={formattedProducts} />
    </div>
  </div>
  )
}

export default Billboards