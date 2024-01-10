'use client';
import Heading from '@/components/heading';

import { Separator } from '@/components/ui/separator';

import React from 'react';
import { OrderColumn, columns } from './columns';
import { DataTable } from '@/components/ui/data-table';

const OrderClient = ({ data }: { data: OrderColumn[] }) => {
  return (
    <>
      <div className="flex justify-between items-center">
        <Heading
          title={`Orders (${data.length})`}
          desc="Manage Orders for your store"
        />
      </div>
      <Separator />
      <DataTable data={data} columns={columns} searchKey="products" />
    </>
  );
};

export default OrderClient;
