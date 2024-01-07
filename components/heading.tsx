import React from 'react'
interface HeadingProps{
    title:string;
    desc:string;
}
const Heading:React.FC<HeadingProps> = ({title,desc}) => {
  return (
    <div>
       <h1 className="text-2xl font-bold tracking-tight text-black dark:text-white">{title}</h1>
       <p className="text-sm text-muted-foreground">{desc}</p>
    </div>
  )
}

export default Heading