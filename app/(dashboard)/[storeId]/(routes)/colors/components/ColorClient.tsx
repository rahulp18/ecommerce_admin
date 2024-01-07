"use client"
import Heading from '@/components/heading'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
 
import { Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { ColorsColumn, columns } from './columns'
import { DataTable } from '@/components/ui/data-table'
import ApiList from '@/components/ui/api-list'

const ColorClient = ({data}:{data:ColorsColumn[]}) => {
    const router=useRouter();
    const params=useParams();
   
  return (
   <>
   <div className="flex justify-between items-center">
    <Heading title={`Colors (${data.length})`} desc='Manage colors for your store' />
    <Button onClick={()=>router.push(`/${params.storeId}/colors/new`)} >
        <Plus className='h-4 w-4 mr-2'/>
        Add New
    </Button>
   </div>
   <Separator/>
   <DataTable data={data} columns={columns} searchKey='name' />
   <Heading title={`API`} desc='Api calls for Colors' />
   <Separator/>
   <ApiList entityIdName='colorId' entityName='colors'/>
   </>
  )
}

export default ColorClient