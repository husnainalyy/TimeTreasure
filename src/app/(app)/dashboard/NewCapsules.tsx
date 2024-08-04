import { getSession } from 'next-auth/react';
import Image from 'next/image';
import React, { useState } from 'react';
import axios from 'axios';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FormData {
    subject: string;
    body: string;
    date: string;
    email: string;
    file: File | null;
}

const NewCapsules = () => {
    const [isCreatingCapsule, setIsCreatingCapsule] = useState(false);
    const { toast } = useToast();
    const [formData, setFormData] = useState<FormData>({
        subject: `A letter from ${new Date().toLocaleDateString()}`,
        body: 'Believe you can and you are halfway there.',
        date: new Date().toLocaleDateString('en-CA'), // Format: YYYY-MM-DD
        email: '',
        file: null
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        setFormData((prevFormData) => ({
            ...prevFormData,
            file,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        setIsCreatingCapsule(true);
        e.preventDefault();
        const session = await getSession();
        if (!session) {
            console.log('User not logged in');
            setIsCreatingCapsule(false);
            return;
        }

        const data = new FormData();
        data.append('subject', formData.subject);
        data.append('message', formData.body);
        data.append('creationDate', new Date().toLocaleDateString('en-CA'));
        data.append('deliveryDate', formData.date); // Ensure format YYYY-MM-DD
        data.append('email', formData.email);
        if (formData.file) data.append('file', formData.file);

        try {
            const response = await axios.post('/api/capsule/createCapsule', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.status !== 201) {
                throw new Error('Failed to create capsule');
            }

            toast({
                title: 'Success',
                description: 'You have successfully created a capsule.',
            });
            console.log('Capsule created successfully', response.data);
        } catch (error: any) {
            console.error('An error occurred while submitting the form', error.response?.data || error.message);
            toast({
                title: 'Error',
                description: 'Failed to create capsule.',
                variant: 'destructive',
            });
        } finally {
            setIsCreatingCapsule(false);
        }
    };

    const inspirationalLines = [
        "Believe you can and you're halfway there.",
        "The only way to do great work is to love what you do.",
        "Success is not the key to happiness. Happiness is the key to success.",
        "Don't watch the clock; do what it does. Keep going."
    ];

    const inspireMe = () => {
        const randomIndex = Math.floor(Math.random() * inspirationalLines.length);
        setFormData((prevFormData) => ({
            ...prevFormData,
            body: inspirationalLines[randomIndex],
        }));
    };

    return (
        <div>
            <form id="new_letter" onSubmit={handleSubmit} noValidate className="space-y-4">
                <div className="container mx-auto px-4 mt-20 md:px-8 flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-16">
                    <div className="w-full lg:w-1/2">
                        <h1 className="text-2xl lg:text-5xl text-[#0732EF] font-bold font-lato mb-5">
                            Write a Letter to Your Future Self
                        </h1>
                        <p className="text-lg font-lato text-[#0732EF] mb-4">
                            Pick a date. Write your note. Send. Verify. That’s it 📅✉️<br />
                            Your letter is safe with us - we’ve a long history of successful letter deliveries!
                        </p>

                        <input
                            className="w-full p-2 font-lato lg:text-2xl  bg-gray-100 border rounded font-semibold border-transparent"
                            placeholder="A letter from Jul 17th, 2024"
                            type="text"
                            value={formData.subject}
                            name="subject"
                            onChange={handleInputChange}
                        />
                        <div className="relative">
                            <input
                                readOnly
                                className="w-full p-2 bg-sky-100 border rounded text-[#0732EF] font-bold"
                                name="letterBodyInput"
                                value="Dear future me,"
                            />
                            <div className="">
                                <div className="flex items-start">
                                    <textarea
                                        className="h-96 w-full p-2 border rounded relative"
                                        name="body"
                                        placeholder="Dear FutureMe,"
                                        value={formData.body}
                                        onChange={handleInputChange}
                                    />
                                    <a
                                        className="absolute top-2 right-2 inline-flex items-center text-gray-600 px-4 py-2 rounded hover:text-gray-400"
                                        href="#"
                                    >
                                        <i className="fa-solid fa-expand mr-2"></i>
                                    </a>
                                </div>
                            </div>
                            <button
                                type="button"
                                className="absolute bottom-2 right-2 z-20 text-blue-500 border-[1px] border-blue-500 px-4 py-2 rounded hover:border-[#0732EF] hover:text-[#0732EF]"
                                onClick={inspireMe}
                            >
                                <i className="fa-regular fa-lightbulb mr-2"></i>
                                Inspire me!
                            </button>
                        </div>
                    </div>
                    <div id="formLetter" className="w-full lg:w-1/2 flex flex-col justify-end space-y-4">
                        <div className='h-64 flex w-full justify-center overflow-hidden'>
                            <Image
                                height={500}
                                width={500}
                                src="/time.png"
                                alt="Time Capsule"
                            />
                            </div>
                        <div>
                            <label className="font-semibold">
                                <strong>Deliver on</strong>
                            </label>
                            <div className="flex space-x-4 mb-4"></div>
                            <input
                                type="date"
                                id="date"
                                name="date"
                                className=" mt-1  w-40 lg:w-40 h-10 px-3 flex items- border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                required
                                value={formData.date}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label className="font-semibold">
                                <strong>Your Email Address</strong>
                            </label>
                            <input
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="me@example.com"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div>
                            <label className="font-semibold">
                                <strong>Upload a File</strong>
                            </label>
                            <input
                                type="file"
                                name="file"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                onChange={handleFileChange}
                            />
                        </div>
                        <Button
                            type="submit"
                            className="text-black font-semibold border border-white bg-gray-500 rounded-full px-4 py-2 text-center hover:border-white hover:bg-white hover:text-[#0732EF]"
                            disabled={isCreatingCapsule}
                        >
                            {isCreatingCapsule ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin" />Please Wait
                                </>
                            ) : (
                                'Send to the Future!'
                            )}
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default NewCapsules;