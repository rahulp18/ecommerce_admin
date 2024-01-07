"use client";
import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./dialog";
interface ModalProps{
    title:string;
    desc:string;
    isOpen:boolean;
    onClose:()=>void;
    children?:React.ReactNode
}


export const Modal:React.FC<ModalProps>=({title,desc,children,onClose,isOpen})=>{
    const onChange=(open:boolean)=>{
        if(!open){
            onClose();
        }
    }
    return (
<Dialog open={isOpen} onOpenChange={onChange}  >
 <DialogContent>
    <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{desc}</DialogDescription>
    </DialogHeader>
    <div className="">
        {children}
    </div>
 </DialogContent>
</Dialog>
    )
}