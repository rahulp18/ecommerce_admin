import React, {} from 'react'

interface Props{
    children:React.ReactNode
}

const AuthLayout:React.FC<Props>=({children})=>{
return (
    <div className="flex justify-center h-screen items-center">
        {children}
    </div>
)
}

export default AuthLayout