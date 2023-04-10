/* eslint-disable react/prop-types */
import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import clsx from 'clsx';

import { DialogOverlay } from './DialogOverlay';
import { DialogPortal } from './DialogPortal';

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={clsx(
        'animate-in data-[state=open]:fade-in-90 data-[state=open]:slide-in-from-bottom-10 sm:zoom-in-90 data-[state=open]:sm:slide-in-from-bottom-0',
        'fixed z-50 flex flex-col items-center w-11/12 md:w-2/3 gap-8 rounded-sm bg-darkBg p-8 md:px-20 md:py-8 self-center',
        className,
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute top-4 right-4 outline-gray-dark outline-offset-4 rounded-sm hover:outline-gray-dark transition-all hover:outline disabled:pointer-events-none">
        <X className="h-4 w-4 text-gray-dark" />
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

export { DialogContent };
