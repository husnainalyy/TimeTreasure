"use client";

import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';
import { ApiResponse } from '@/types/ApiResponse';


const SignupForm = () => {
    const router = useRouter();
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);

    
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};
        if (!firstName) newErrors.firstName = 'First name is required';
        if (!lastName) newErrors.lastName = 'Last name is required';
        if (!phone) newErrors.phone = 'Phone number is required';
        if (!email) newErrors.email = 'Email is required';
        if (!password) newErrors.password = 'Password is required';
        if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        if (validateForm()) {
            try {
                const response = await axios.post<ApiResponse>('/api/signUp', {
                    firstName,
                    lastName,
                    phone,
                    email,
                    password
                });

                if (response.data.success) {
                    router.replace(`/verifyCode/${email}`);
                    toast({
                        title: 'Success',
                        description: 'You have successfully signed up.',
                    });
                } else {
                    toast({
                        title: 'Error',
                        description: response.data.message,
                        variant: 'destructive',
                    });
                }
            } catch (error: any) {
                // Check if error response exists and handle accordingly
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
            } finally {
                setIsSubmitting(false);
            }
        }
    };


    return (
        <div className='flex justify-center items-center w-full   h-screen bg-amber-50 text-black'>
            <div id="signup" className="w-full lg:w-1/3 p-6 py-12 rounded-2xl bg-white overflow-hidden">
                <form id="signupForm" onSubmit={handleSubmit} className="w-full flex flex-col justify-center items-center gap-3">
                    <p className="text-3xl font-semibold text-nowrap">Sign up for TimeTreasure</p>

                    <div className="w-full flex gap-2">
                        <p className="text-sm">Already have an account?</p>
                        <Link href="/signIn" id="showLogin" className="text-sm font-semibold text-blue-700 underline underline-offset-2 decoration-blue-300 hover:decoration-blue-500">Login</Link>
                    </div>

                    <div className="flex space-x-4 w-full">
                        <input type="text" id="first-name" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-1/2 flex-1 py-2 px-2 border rounded-md focus:border-blue-500 focus:outline-none hover:border hover:border-black" placeholder="First name" required />
                        <input type="text" id="last-name" value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-1/2 flex-1 py-2 px-2 border rounded-md focus:border-blue-500 focus:outline-none hover:border hover:border-black" placeholder="Last name" required />
                    </div>

                    <div className="w-full">
                        <label htmlFor="signup-phone" className="block text-gray-600">Phone Number</label>
                        <input type="text" id="signup-phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Enter your phone number" className="w-full py-2 px-2 border rounded-md focus:border-blue-500 focus:outline-none hover:border hover:border-black" required />
                        {errors.phone && <div className="error text-red-800 text-xs font-bold" id="phoneError">{errors.phone}</div>}
                    </div>

                    <div className="w-full">
                        <label htmlFor="signup-email" className="block text-gray-600">Email</label>
                        <input type="email" id="signup-email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full py-2 px-2 border rounded-md focus:border-blue-500 focus:outline-none hover:border hover:border-black" placeholder="Enter your email" required />
                        {errors.email && <div className="error text-red-800 text-xs font-bold" id="emailError2">{errors.email}</div>}
                    </div>

                    <div className="w-full">
                        <label htmlFor="signup-password" className="block text-gray-600">Password</label>
                        <input type="password" id="signup-password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full py-2 px-2 border rounded-md focus:border-blue-500 focus:outline-none hover:border hover:border-black" placeholder="Enter your password" required />
                        {errors.password && <div className="error text-red-800 text-xs font-bold" id="passwordError2">{errors.password}</div>}
                    </div>

                    <div className="w-full">
                        <label htmlFor="confirm-password" className="block text-gray-600">Confirm Password</label>
                        <input type="password" id="confirm-password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full py-2 px-2 border rounded-md focus:border-blue-500 focus:outline-none hover:border hover:border-black" placeholder="Confirm password" required />
                        {errors.confirmPassword && <div className="error text-red-800 text-xs font-bold" id="confirmpasswordError">{errors.confirmPassword}</div>}
                    </div>

                    <button disabled={isSubmitting} type="submit" id="signupSubmit" className="w-full flex justify-center items-center py-3 border font-semibold rounded-xl bg-red-700 text-white hover:bg-blue-900">
                        {isSubmitting ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Please wait
                            </>
                        ) : (
                            'Sign Up'
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignupForm;
