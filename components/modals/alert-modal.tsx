"use client"
import React, { useEffect, useState } from 'react'
import { Modal } from '../ui/modal';
import { Button } from '../ui/button';
interface AlertModalProps{
    isOpen:boolean;
    onClose:()=>void;
    onConfirm:()=>void;
    loading:boolean;
}
const AlertModal:React.FC<AlertModalProps> = ({isOpen,onClose,loading,onConfirm}) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(()=>{
setIsMounted(true)
    },[])
    if(!isMounted){
        return null;
    }
  return (
     <Modal title='Are you sure?' desc='This action cannot be undone' isOpen={isOpen} onClose={onClose}   >
        <div className="pt-6 space-x-2 flex  items-center justify-end w-full">
            <Button variant='outline' onClick={onClose} disabled={loading} >Cancel</Button>
            <Button variant='destructive' onClick={onConfirm} disabled={loading} >Continue</Button>
        </div>

     </Modal>
  )
}

export default AlertModal