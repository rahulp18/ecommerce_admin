'use client';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { zodResolver } from '@hookform/resolvers/zod';
import {  Color } from '@prisma/client';
import { Trash } from 'lucide-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useRouter, useParams } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
import AlertModal from '@/components/modals/alert-modal';
 
interface ColorFormProps {
  initialData: Color | null;
}
const formSchema = z.object({
  name: z.string().min(1),
  value: z.string().min(4).regex(/^#/,{
    message:'String must be a valid hex code'
  }),
  
});
type ColorFormValues = z.infer<typeof formSchema>;
const ColorForm: React.FC<ColorFormProps> = ({ initialData }) => {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const params = useParams();
  const router = useRouter();
 

  const title = initialData ? 'Edit color' : 'Create color';
  const desc = initialData ? 'Edit a color' : 'Add a new color';
  const toastMessage = initialData ? 'Color Updated' : 'Color Created';
  const action = initialData ? 'Save changes' : 'Create';

  const form = useForm<ColorFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: '',
      value: '',
      
    },
  });

  const onSubmit = async (data: ColorFormValues) => {
    try {
      setLoading(true);
      if(initialData){

        await axios.patch(`/api/${params.storeId}/colors/${params.colorId}`, data);
      }else{
        await axios.post(`/api/${params.storeId}/colors`, data);
      }
      router.push(`/${params.storeId}/colors`)
      router.refresh();
      toast.success(toastMessage);
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };
  const onContinue = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/colors/${params.colorId}`);
      router.push(`/${params.storeId}/colors`)
      router.refresh();
      toast.success('Color deleted');
    } catch (error) {
      toast.error(
        'Make sure that you have deleted all Colors related this BillBoard',
      );
      console.log(error);
    } finally {
      setLoading(false);
      setIsOpen(false);
    }
  };
  return (
    <>
      <AlertModal
        loading={loading}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={onContinue}
      />
      <div className="justify-between items-center flex">
        <Heading title={title} desc={desc} />
        {initialData && (
          <Button
            color="icon"
            variant="destructive"
            onClick={() => setIsOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
       
          <div className="grid grid-cols-3 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      {...field}
                      placeholder="Store Name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-x-4">
                      
                    <Input
                      disabled={loading}
                      {...field}
                      placeholder="Value"
                    />
                      <div className="p-3 rounded-full border" style={{backgroundColor:field.value}} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} type="submit">
            {action}
          </Button>
        </form>
      </Form>
     
   
    </>
  );
};

export default ColorForm;
