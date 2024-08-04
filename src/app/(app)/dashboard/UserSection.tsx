import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useSession, signIn } from 'next-auth/react';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';


interface SessionUser {
    firstName: string;
    lastName: string;
    phoneNumber: string;
}

const UserSection: React.FC = () => {
    const { toast } = useToast();
    const [isUpdatingData, setIsUpdatingData] = useState(false);
    const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

    const { data: session } = useSession();
    const [user, setUser] = useState<SessionUser>({
        firstName: '',
        lastName: '',
        phoneNumber: '',
    });
    const [passwords, setPasswords] = useState({
        oldPassword: '',
        newPassword: '',
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const { data } = await axios.get('/api/user/getUser');
                setUser({
                    firstName: data.firstName || '',
                    lastName: data.lastName || '',
                    phoneNumber: data.phoneNumber || '',
                });
            } catch (error) {
                toast({
                    title: 'Error',
                    description: 'Failed to load user info',
                    variant: 'destructive',
                });
            }
        };

        if (session) {
            fetchUserData();
        }
    }, [session,toast]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({ ...prevUser, [name]: value }));
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPasswords((prevPasswords) => ({ ...prevPasswords, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        setIsUpdatingData(true);
        e.preventDefault();
        try {
            const response = await axios.post('/api/user/updateAccountDetails', user);

            if (response.status === 200) {
                // Invalidate and refresh the session
                await signIn('credentials', { redirect: false });
                // Fetch the updated session
                const { data: updatedSession } = await axios.get('/api/auth/session');
                // Update state with the new session data
                toast({
                    title: 'Success',
                    description: 'Account details updated successfully',
                });
            } else {
                toast({
                    title: 'Error',
                    description: response.data.message,
                    variant: 'destructive',
                });
            }
        } catch (error) {
            toast({
                title: 'Error',
                description: 'An error occurred during updating information. Please try again.',
                variant: 'destructive',
            });
        }finally{
            setIsUpdatingData(false);
        }
    };

    const handleChangePassword = async (e: React.FormEvent) => {
        setIsUpdatingPassword(true);
        e.preventDefault();
        try {
            await axios.post('/api/user/changeCurrentPassword', passwords);
            toast({
                title: 'Success',
                description: 'Password changed successfully.',
            });
        } catch (error) {
            toast({
                title: 'Error',
                description: 'An error occurred during changing password. Please try again.',
                variant: 'destructive',
            });
        }finally{
            setIsUpdatingPassword(false);
        }
    };

    return (
        <div>
            <h2 className="text-2xl mb-4">Edit User Information</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="firstName">First Name</label>
                    <Input
                        type="text"
                        name="firstName"
                        value={user.firstName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="lastName">Last Name</label>
                    <Input
                        type="text"
                        name="lastName"
                        value={user.lastName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <Input
                        type="text"
                        name="phoneNumber"
                        value={user.phoneNumber}
                        onChange={handleChange}
                        required
                    />
                </div>
                <Button disabled={isUpdatingData} type="submit" className=" flex justify-center items-center py-3 border font-semibold rounded-xl bg-slate-800 text-white hover:bg-gray-300">
                    {isUpdatingData ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Please wait
                        </>
                    ) : (
                        'Update Information'
                    )}
                </Button>
            </form>

            <h2 className="text-2xl mt-8 mb-4">Change Password</h2>
            <form onSubmit={handleChangePassword} className="space-y-4">
                <div>
                    <label htmlFor="oldPassword">Old Password</label>
                    <Input
                        type="password"
                        name="oldPassword"
                        value={passwords.oldPassword}
                        onChange={handlePasswordChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="newPassword">New Password</label>
                    <Input
                        type="password"
                        name="newPassword"
                        value={passwords.newPassword}
                        onChange={handlePasswordChange}
                        required
                    />
                </div>
                <Button disabled={isUpdatingPassword} type="submit"  className=" flex justify-center items-center py-3 border font-semibold rounded-xl bg-slate-800 text-white hover:bg-gray-300">
                    {isUpdatingPassword ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Please wait
                        </>
                    ) : (
                        'Change Password'
                    )}
                </Button>
            </form>

        </div>
    );
};

export default UserSection;
