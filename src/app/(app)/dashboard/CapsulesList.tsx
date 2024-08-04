import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import Modal from '@/components/ui/modal';
import { Badge } from '@/components/ui/badge';
import { Trash, Eye, Loader2 } from 'lucide-react';
import axios from 'axios';
import Image from 'next/image';
import { useToast } from '@/components/ui/use-toast';
import { useSession } from 'next-auth/react';
import Loading from './loading';

export interface Capsule {
    _id: string;
    subject: string;
    message: string;
    fileUrl: string[];
    creationDate: string;
    deliveryDate: string;
    status: string;
    owner: string;
}

export interface User {
    username: string;
}

const CapsuleList: React.FC = () => {
    const [loadingCapsuleId, setLoadingCapsuleId] = useState<string | null>(null);
    const [isDeletingCapsule, setIsDeletingCapsule] = useState(false);
    const { toast } = useToast();
    const { data: session, status } = useSession();
    const [loading, setLoading] = useState(true);

    const [capsules, setCapsules] = useState<Capsule[]>([]);
    const [selectedCapsule, setSelectedCapsule] = useState<Capsule | null>(null);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [showModal, setShowModal] = useState(false);

    const [imageLoading, setImageLoading] = useState(true);

    useEffect(() => {
        const fetchCapsules = async () => {
            try {
                const response = await axios.get('/api/capsule/getCapsule');
                setCapsules(response.data);
            } catch (error) {
                console.error('Failed to fetch capsules', error);
                toast({
                    title: 'Error',
                    description: 'Failed to fetch capsules.',
                    variant: 'destructive',
                });
            } finally {
                setLoading(false);
            }
        };

        fetchCapsules();
    }, [toast]);

    const handleView = async (capsule: Capsule) => {
        setImageLoading(true);
        setLoadingCapsuleId(capsule._id);
        setSelectedCapsule(capsule);
        try {
            const response = await axios.get(`/api/user/getUser`);
            setSelectedUser(response.data);
        } catch (error) {
            console.error('Failed to fetch user', error);
            toast({
                title: 'Error',
                description: 'Failed to fetch user.',
                variant: 'destructive',
            });
        } finally {
            setLoadingCapsuleId(null);
            setShowModal(true);
        }
    };

    const handleDelete = async (capsuleId: string) => {
        setLoadingCapsuleId(capsuleId);
        setIsDeletingCapsule(true);
        try {
            await axios.delete('/api/capsule/deleteCapsule', {
                data: { capsuleId }
            });
            toast({
                title: 'Success',
                description: 'You have successfully deleted the capsule.',
            });
            const response = await axios.get('/api/capsule/getCapsule');
            setCapsules(response.data);
            setShowModal(false);
        } catch (error) {
            console.error('Failed to delete capsule', error);
            toast({
                title: 'Error',
                description: 'Failed to delete capsule.',
                variant: 'destructive',
            });
        } finally {
            setLoadingCapsuleId(null);
            setIsDeletingCapsule(false);
        }
    };

    const renderCapsuleId = (id: string) => {
        if (!id) {
            return '';
        }
        return id.length > 10 ? `${id.slice(0, 5)}...${id.slice(-5)}` : id;
    };

    if (status === "loading" || loading) {
        return (
            <div className="flex justify-center items-center h-96">
                <Loader2 className="mr-2 h-8 w-8 animate-spin" />
                Loading...
            </div>
        );
    }

    return (
        <div className="p-4 md:p-6">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className='hidden lg:block md:block'>Capsule ID</TableHead>
                        <TableHead>Heading</TableHead>
                        <TableHead className='hidden lg:block md:block'>Creation Date</TableHead>
                        <TableHead>Delivery Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {capsules.map((capsule) => (
                        <TableRow key={capsule._id}>
                            <TableCell className='hidden lg:block md:block'>{renderCapsuleId(capsule._id)}</TableCell>
                            <TableCell>{capsule.subject}</TableCell>
                            <TableCell className='hidden lg:block md:block'>{new Date(capsule.creationDate).toLocaleDateString()}</TableCell>
                            <TableCell>{new Date(capsule.deliveryDate).toLocaleDateString()}</TableCell>
                            <TableCell >
                                <Badge variant={capsule.status === 'opened' ? 'default' : 'destructive'}>
                                    {capsule.status}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                {capsule.status === 'opened' ? (
                                    loadingCapsuleId === capsule._id ? (
                                        <Button variant="outline" size="sm" onClick={() => handleView(capsule)}>
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                        </Button>
                                    ) : (
                                        <Button variant="outline" size="sm" onClick={() => handleView(capsule)}>
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                    )
                                ) : (
                                    loadingCapsuleId === capsule._id ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                        <Button variant="outline" size="sm" onClick={() => handleDelete(capsule._id)}>
                                            <Trash className="h-4 w-4" />
                                        </Button>
                                    )
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {selectedCapsule && selectedUser && (
                <Modal
                    open={showModal}
                    onOpenChange={setShowModal}
                    title={selectedCapsule.subject}
                    footer={
                        <Button
                            disabled={isDeletingCapsule}
                            onClick={() => handleDelete(selectedCapsule._id)}
                            type="submit"
                            className="flex justify-center items-center py-3 border font-semibold rounded-xl bg-red-600 hover:bg-red-700 text-white"
                        >
                            {isDeletingCapsule ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Please wait
                                </>
                            ) : (
                                'Delete'
                            )}
                        </Button>
                    }
                >
                    <div className='flex flex-col md:flex-row gap-4'>
                        <div className='w-full md:w-1/2'>
                            <strong className='text-left text-xl text-blue-700'>Content:</strong>
                            <p className='text-md px-4 text-black'>{selectedCapsule.message}</p>
                            <strong className='text-left text-xl text-blue-700'>Creation Date:</strong>
                            <p className='text-md px-4 text-black'> {new Date(selectedCapsule.creationDate).toLocaleDateString()}</p>
                            <strong className='text-left text-xl text-blue-700'>Delivery Date:</strong>
                            <p className='text-md px-4 text-black'> {new Date(selectedCapsule.deliveryDate).toLocaleDateString()}</p>
                            <strong className='text-left text-xl text-blue-700'>Status:</strong>
                            <p className='text-md px-4 text-black'> {selectedCapsule.status}</p>
                        </div>
                        <div className='w-full md:w-1/2'>
                            {selectedCapsule.fileUrl && selectedCapsule.fileUrl.length > 0 && (
                                selectedCapsule.fileUrl.map((url, index) => (
                                    <div key={index} className="relative w-full h-64">
                                        {imageLoading && <Loading className="absolute inset-0" />}
                                        <Image
                                            src={url}
                                            alt={`File ${index + 1}`}
                                            fill
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                            style={{ objectFit: 'contain' }}
                                            onLoad={() => {
                                                setImageLoading(false);
                                            }}
                                        />
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default CapsuleList;
