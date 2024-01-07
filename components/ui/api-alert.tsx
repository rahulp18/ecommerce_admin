"use client"
import React from 'react';
import { Badge, BadgeProps } from './badge';
import { Alert, AlertDescription, AlertTitle } from './alert';
import { Copy, Server } from 'lucide-react';
import { Button } from './button';
import toast from 'react-hot-toast';
interface ApiAlertProps {
  title: string;
  description: string;
  variant: 'public' | 'admin';
}

const textMap: Record<ApiAlertProps['variant'], string> = {
  public: 'Public',
  admin: 'Admin',
};
const variantMap: Record<ApiAlertProps['variant'], BadgeProps['variant']> = {
  public: 'secondary',
  admin: 'destructive',
};

const ApiAlert: React.FC<ApiAlertProps> = ({
  title,
  description,
  variant = 'public',
}) => {
  const onCopy = () => {
    navigator.clipboard.writeText(description);
    toast.success('Api routes copied to the clipboard');
  };
  return (
    <Alert>
      <Server className="h-4 w-3" />
      <AlertTitle className="flex items-center gap-x-2">
        {title}
        <Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
      </AlertTitle>
      <AlertDescription className="mt-4 flex justify-between items-center">
        <code className="relative bg-muted font-semibold font-mono px-[0.3rem] py-[0.2rem text-sm]">
          {description}
        </code>
        <Button size="sm" variant="outline" onClick={onCopy}>
          <Copy className="h-4 w-4" />
        </Button>
      </AlertDescription>
    </Alert>
  );
};

export default ApiAlert;
