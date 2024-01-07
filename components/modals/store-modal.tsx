"use client"
import { useStoreModal } from '@/hooks/use-store-modal'
import React, { useState } from 'react'
import { Modal } from '@/components/ui/modal';
import * as z from 'zod'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import axios from 'axios';
import toast from 'react-hot-toast';

const formSchema=z.object({
  name:z.string().min(1)
})



const StoreModal = () => {
  const [loading, setLoading] = useState(false)
    const storeModal=useStoreModal();
    const form=useForm<z.infer<typeof formSchema>>({
      resolver:zodResolver(formSchema),
      defaultValues:{
        name:''
      }
    })

    const onSubmit=async(values:z.infer<typeof formSchema>)=>{
 
      try {
        setLoading(true)
        const response=await axios.post(`/api/stores`,values)
       window.location.assign(`/${response.data.id}`)
       
      } catch (error) {
        console.log(error);
        toast.error('Something went wrong')
      }finally{
        setLoading(false)
      }
    }
  return (
    <Modal 
    title='Create Store'
    desc='Add a new store to manage products and categories'
    isOpen={storeModal.isOpen}
    onClose={storeModal.onClose}
    >
       <div className="">
         <div className="space-y-4 py-2 pb-4">
          <Form {...form} >
           <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField  
             control={form.control}
             name='name'
             render={({field})=>(
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input disabled={loading} placeholder='E-commerce' {...field} />
                </FormControl>
                <FormMessage  />
              </FormItem>
             )}
            />
            <div className="pt-6 flex gap-4 items-center justify-end">
              <Button variant='outline' onClick={storeModal.onClose} >Cancel</Button>
              <Button type='submit' disabled={loading} >Continue</Button>
            </div>
           </form>
          </Form>
         </div>
       </div>
    </Modal>
  )
}

export default StoreModal