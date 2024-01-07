"use client"
import Heading from '@/components/heading'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
 
import { Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { BillBoard, columns } from './columns'
import { DataTable } from '@/components/ui/data-table'
import ApiList from '@/components/ui/api-list'

const BillboardClient = ({data}:{data:BillBoard[]}) => {
    const router=useRouter();
    const params=useParams();
   
  return (
   <>
   <div className="flex justify-between items-center">
    <Heading title={`Billboards (${data.length})`} desc='Manage billboards for your store' />
    <Button onClick={()=>router.push(`/${params.storeId}/billboards/new`)} >
        <Plus className='h-4 w-4 mr-2'/>
        Add New
    </Button>
   </div>
   <Separator/>
   <DataTable data={data} columns={columns} searchKey='label' />
   <Heading title={`API`} desc='Api calls for billboards' />
   <Separator/>
   <ApiList entityIdName='billboardId' entityName='billboards'/>
   </>
  )
}

export default BillboardClient