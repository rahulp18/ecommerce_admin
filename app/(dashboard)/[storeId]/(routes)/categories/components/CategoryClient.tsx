"use client"
import Heading from '@/components/heading'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
 
import { Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { CategoryColumns, columns } from './columns'
import { DataTable } from '@/components/ui/data-table'
import ApiList from '@/components/ui/api-list'

const CategoryClient = ({data}:{data:CategoryColumns[]}) => {
    const router=useRouter();
    const params=useParams();
   
  return (
   <>
   <div className="flex justify-between items-center">
    <Heading title={`Categories (${data.length})`} desc='Manage Categories for your store' />
    <Button onClick={()=>router.push(`/${params.storeId}/categories/new`)} >
        <Plus className='h-4 w-4 mr-2'/>
        Add New
    </Button>
   </div>
   <Separator/>
   <DataTable data={data} columns={columns} searchKey='name' />
   <Heading title={`API`} desc='Api calls for Categories' />
   <Separator/>
   <ApiList entityIdName='categoryId' entityName='categories'/>
   </>
  )
}

export default CategoryClient