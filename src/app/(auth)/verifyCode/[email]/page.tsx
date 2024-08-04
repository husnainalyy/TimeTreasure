'use client';
import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import axios from 'axios';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ApiResponse } from '@/types/ApiResponse';

const VerifyAccount = () => {
    const router = useRouter();
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const { email } = useParams();  // Use destructuring directly
    const [code, setCode] = useState('');
    const [errors, setErrors] = useState<{ code?: string }>({});

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};
        if (!code) newErrors.code = 'Verification code is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        setIsSubmitting(true);
        e.preventDefault();
        if (validateForm()) {
            try {
                const response = await axios.post<ApiResponse>(`/api/verifyCode`, {
                    email,
                    code,
                });
                if (response.data.success) {
                    router.replace('/signIn');
                    toast({
                        title: 'Success',
                        description: 'You have successfully verified.',
                    });
                } else {
                    toast({
                        title: 'Error',
                        description: response.data.message,
                        variant: 'destructive',
                    });
                }
            } catch (error:any) {
                if (error.response && error.response.data) {
                    toast({
                        title: 'Error',
                        description: error.response.data.message || 'An unexpected error occurred.',
                        variant: 'destructive',
                    });
                } else {
                    toast({
                        title: 'Error',
                        description: 'An unexpected error occurred.',
                        variant: 'destructive',
                    });
                }
            }finally{
                setIsSubmitting(false);
            }
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen text-black">
            <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
                <div className="text-center">
                    <h1 className="text-3xl font-extrabold tracking-tight lg:text-4xl mb-6">
                        Verify your account
                    </h1>
                    <p className="mb-4">Enter the verification code which is sent on your email</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="code" className="block text-gray-600">Verification Code</label>
                        <input
                            id="code"
                            type="text"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            placeholder="Verification Code"
                            className="w-full py-4 px-4 border-[1px] rounded-xl focus:border-blue-500 focus:outline-none hover:border-[1px] hover:border-black"
                        />
                        {errors.code && <div className="error text-red-800 text-xs font-bold">{errors.code}</div>}
                    </div>
                    <Button disabled={isSubmitting} type="submit" id="loginSubmit" className="w-full flex justify-center items-center py-3 border font-semibold rounded-xl bg-slate-800 text-white hover:bg-gray-300">
                        {isSubmitting ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Please wait
                            </>
                        ) : (
                            'Verify'
                        )}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default VerifyAccount;
