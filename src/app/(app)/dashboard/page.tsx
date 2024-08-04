"use client"
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Box, HelpingHandIcon, MoveHorizontal, Package, Timer, User2Icon, Users } from "lucide-react";
import HelpSupportSection from './HelpSupportSection';
import UserSection from './UserSection';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CapsuleList from './CapsulesList';
import NewCapsules from './NewCapsules';
import { Suspense } from 'react';
import Loading from './loading';
export interface Capsule {
    id: string;
    heading: string;
    creationDate: string;
    deliveryDate: string;
    status: 'opened' | 'pending';
    content: string;
}

const Dashboard: React.FC = () => {
    const [capsules, setCapsules] = useState<Capsule[]>([]);

    const fetchCapsules = async () => {
        try {
            const response = await axios.get('/api/user/getCapsules');
            setCapsules(response.data.capsules);
        } catch (error) {
            console.error('Failed to fetch capsules', error);
        }
    };

    useEffect(() => {
        fetchCapsules();
    }, []);
    
    
    // Use useSearchParams to get query parameters
    const searchParams = useSearchParams(); 
    const section = searchParams.get('section') || 'user'; // Default to 'default' if no section is specified
    console.log('Current section:', section);

    return (
        <div className="grid min-h-screen bg-amber-50 w-full overflow- lg:grid-cols-[280px_1fr]">
            {/* Sidebar */}
            <div className=" border-r bg-muted/40 lg:block">
                <div className="flex flex-col gap-2">
                    <div className="flex h-[60px] items-center px-6">
                        <Link
                            href="?section=user"
                            className="flex items-center gap-2 font-semibold"
                            prefetch={false}
                        >
                            <Package className="h-6 w-6" />
                            <span>Dashboard</span>
                        </Link>
                    </div>
                    <div className="flex-1">
                        <nav className="grid items-start px-4 text-sm font-medium">
                            <Link
                                href="?section=user"
                                className={`flex items-center gap-3 rounded-lg px-3 py-2 ${section === 'user' ? 'bg-muted text-primary' : 'text-muted-foreground'} transition-all hover:text-primary`}
                                prefetch={false}
                            >
                                <User2Icon className="h-4 w-4" />
                                User
                            </Link>
                            <Link
                                href="?section=my-capsules"
                                className={`flex items-center gap-3 rounded-lg px-3 py-2 ${section === 'my-capsules' ? 'bg-muted text-primary' : 'text-muted-foreground'} transition-all hover:text-primary`}
                                prefetch={false}
                            >
                                <Timer className="h-4 w-4" />
                                My Capsules{" "}
                            </Link>
                            <Link
                                href="?section=new-capsules"
                                className={`flex items-center gap-3 rounded-lg px-3 py-2 ${section === 'new-capsules' ? 'bg-muted text-primary' : 'text-muted-foreground'} transition-all hover:text-primary`}
                                prefetch={false}
                            >
                                <Box className="h-4 w-4" />
                                New Capsules
                            </Link>
                            
                            <Link
                                href="?section=help-support"
                                className={`flex items-center gap-3 rounded-lg px-3 py-2 ${section === 'help-support' ? 'bg-muted text-primary' : 'text-muted-foreground'} transition-all hover:text-primary`}
                                prefetch={false}
                            >
                                <HelpingHandIcon className="h-4 w-4" />
                                Help & Support
                            </Link>
                        </nav>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex flex-col">
                <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-muted/40 px-6">
                    <Link href="#" className="lg:hidden" prefetch={false}>
                        <Package className="h-6 w-6" />
                        <span className="sr-only">Time Capsules</span>
                    </Link>
                    <div className="flex-1">
                        <h1 className="font-semibold text-lg">{section === 'user' ? 'User Information' : section === 'my-capsules' ? 'My Capsules' : section === 'new-capsules' ? 'New Capsules' : section === 'notifications' ? 'Notifications' : 'Help & Support'}</h1>
                    </div>
                    
                </header>
                <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
                    {/* Conditional Rendering Based on Section */}
                    {section === 'user' && <UserSection />}
                    {section === 'my-capsules' && <Suspense fallback={<Loading />}>
                        <CapsuleList />
                    </Suspense>}
                    {section === 'new-capsules' && <NewCapsules />}
                    {section === 'help-support' && <HelpSupportSection />}
                </main>
            </div>
        </div>
    );
};


export default Dashboard;
