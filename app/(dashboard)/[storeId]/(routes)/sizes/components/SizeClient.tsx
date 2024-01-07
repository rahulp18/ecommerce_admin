"use client"
import Heading from '@/components/heading'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
 
import { Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { SizesColumn, columns } from './columns'
import { DataTable } from '@/components/ui/data-table'
import ApiList from '@/components/ui/api-list'

const SizeClient = ({data}:{data:SizesColumn[]}) => {
    const router=useRouter();
    const params=useParams();
   
  return (
   <>
   <div className="flex justify-between items-center">
    <Heading title={`Sizes (${data.length})`} desc='Manage Sizes for your store' />
    <Button onClick={()=>router.push(`/${params.storeId}/sizes/new`)} >
        <Plus className='h-4 w-4 mr-2'/>
        Add New
    </Button>
   </div>
   <Separator/>
   <DataTable data={data} columns={columns} searchKey='name' />
   <Heading title={`API`} desc='Api calls for Sizes' />
   <Separator/>
   <ApiList entityIdName='sizeId' entityName='sizes'/>
   </>
  )
}

export default SizeClient