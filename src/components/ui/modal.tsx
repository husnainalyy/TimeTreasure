import React, { ReactNode } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';

interface ModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
    children: ReactNode;
    footer?: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ open, onOpenChange, title, children, footer }) => {
    return (
        <div className="w-full max-w-6xl mx-auto bg-amber-50">
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className="max-w-4xl w-full bg-amber-50"> {/* Adjust the max-w class as needed */}
                    <DialogHeader>
                        <DialogTitle className='text-2xl'>{title}</DialogTitle>
                    </DialogHeader>
                    <DialogDescription>
                        {children}
                    </DialogDescription>
                    {footer && (
                        <DialogFooter>
                            {footer}
                        </DialogFooter>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default Modal;
