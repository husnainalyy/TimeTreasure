"use client";
import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const LoginForm = () => {
    const { data: session, status } = useSession();

    const router = useRouter();
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    

    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');


    
    interface Errors {
        identifier?: string;
        password?: string;
    }

    const [errors, setErrors] = useState<Errors>({});

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};
        if (!identifier) newErrors.identifier = 'Email is required';
        if (!password) newErrors.password = 'Password is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: any) => {
        setIsSubmitting(true);
        e.preventDefault();
        if (validateForm()) {
            try {
                const result = await signIn('credentials', {
                    redirect: false,
                    identifier,
                    password
                });

                if (result?.error) {
                    setErrors({ identifier: result.error });
                    toast({
                        title: 'Error',
                        description: 'An error occurred during login. Please try again.',
                        variant: 'destructive',
                    });
                } else {
                    router.replace('/dashboard');
                    toast({
                        title: 'Success',
                        description: 'You have successfully logged in.',
                    });

                }
            } catch (error) {
                console.error('Error during login:', error);
                setErrors({ identifier: 'An error occurred during login. Please try again.' });
                toast({
                    title: 'Error',
                    description: 'An error occurred during login. Please try again.',
                    variant: 'destructive',
                });
            }finally{
                setIsSubmitting(false);
            }
        }
    };
    return (
        <div className='w-full h-screen bg-amber-50 text-black flex justify-center items-center'>
            <div id="login" className=" w-full lg:w-1/3 p-6 py-12 rounded-2xl bg-white text-black">
                <form id="loginForm" onSubmit={handleSubmit} className="w-full flex flex-col justify-center items-center gap-3">
                    <p className="text-3xl font-semibold text-nowrap">Login to TimeTreasure</p>

                    <div className="w-full flex gap-2">
                        <p className="text-sm">Don’t have an account?</p>
                        <Link href="/signUp" id="showSignup" className="text-sm font-semibold text-blue-700 underline underline-offset-2 decoration-blue-300 hover:decoration-blue-500">Get started</Link>
                    </div>

                    <label htmlFor="identifier" className="w-full block text-gray-600">Email</label>
                    <input type="text" id="identifier" value={identifier} onChange={(e) => setIdentifier(e.target.value)} placeholder="Email" className="w-full py-4 px-4 border-[1px] rounded-xl focus:border-blue-500 focus:outline-none hover:border-[1px] hover:border-black" />
                    {errors.identifier && <div className="error text-red-800 text-xs font-bold" id="identifierError">{errors.identifier}</div>}

                    <label htmlFor="password" className="w-full block text-gray-600">Password</label>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full py-4 px-4 border-[1px] rounded-xl focus:border-blue-500 focus:outline-none hover:border-[1px] hover:border-black" />
                    {errors.password && <div className="error text-red-800 text-xs font-bold" id="passwordError">{errors.password}</div>}

                    <Button disabled={isSubmitting} type="submit" id="loginSubmit" className="w-full flex justify-center items-center py-3 border font-semibold rounded-xl bg-red-700 text-white hover:bg-blue-900">
                        {isSubmitting ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Please wait
                            </>
                        ) : (
                            'Login'
                        )}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
