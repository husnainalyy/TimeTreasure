"use client"
import Image from 'next/image';
import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getSession } from 'next-auth/react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useToast } from '@/components/ui/use-toast'
import Link from 'next/link';

const TimeTreasure = () => {
    const { toast } = useToast()

    const [menuOpen, setMenuOpen] = useState(false);
    const options = { weekday: 'long' as const, year: 'numeric' as const, month: 'long' as const, day: 'numeric' as const };
    const formattedDate = new Date().toLocaleDateString(undefined, options);
    const [formData, setFormData] = useState({
        subject: `A letter from ${formattedDate}`,
        body: 'Believe you can and you are halfway there.',
        date: new Date().toISOString().split('T')[0], // Format: YYYY-MM-DD
        email: '',
        file: null // Add this to handle file input
    });

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const router = useRouter();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const session = await getSession();

        if (session) {
            // User is logged in, handle form submission
            console.log('Form data:', formData);
            // Add your form submission logic here
        } else {
            // User is not logged in, redirect to sign-in page
            toast({
                title: "Login Please",
                description: "You need to login to send a letter to your future self.",
                variant: "destructive",
            });
            
            router.push('/signIn');
            
        }
    };
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        setFormData((prevFormData: any) => ({
            ...prevFormData,
            file,
        }));
    };


    const inspirationalLines = [
        "Believe you can and you're halfway there.",
        "The only way to do great work is to love what you do.",
        "Success is not the key to happiness. Happiness is the key to success.",
        "Don't watch the clock; do what it does. Keep going."
    ];
    const inspireMe = () => {
        const randomIndex = Math.floor(Math.random() * inspirationalLines.length);
        setFormData({ ...formData, body: inspirationalLines[randomIndex] });
    };

    return (
        <div className="bg-amber-50 ">
        
            <section
                className="lg:bg-center bg-cover  min-h-min font-lato py-5 overflow-hidden bg-[url('https://images.unsplash.com/photo-1539800644988-3424dd648c2b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]"
            >
                <div className="container mx-auto px-4 mt-10">
                    <div className="flex flex-col  lg:items-end justify-end lg:justify-start h-full">
                        <div className="mb-14 lg:mb-0 lg:w-1/2">
                            <h1 className="text-6xl  font-lato md:text-[2.9rem] lg:text-5xl leading-none font-extrabold font-sans text-center lg:leading-tight s lg:mb-5 text-white">
                                Preserve Your Memories with Time Treasure
                            </h1>
                            
                        </div>
                        <div className="lg:w-1/2 flex flex-row items-center justify-center flex-wrap space-y-4 mt-10 font-lato">
                            <div className="bg-gray-500 bg-opacity-75 border border-[#0732EF] rounded-lg px-4 py-4  lg:max-w-sm text-white hover:translate-y-4 duration-700 ease-in  w-full lg:md:w-auto">
                                <h2 className="text-2xl font-bold mb-4">Optimize your ideas</h2>
                                <p className="text-lg mb-4">
                                    In the business world, time capsules can serve as a powerful tool for preserving the legacy and milestones of a company. They can be used to commemorate significant achievements, anniversaries, and the evolution of the business over time. Time Tressure offers a modern solution for businesses to create and manage digital time capsules, ensuring that their legacy is preserved in a secure and accessible way.
                                </p>
                                <Link href="/signIn"
                                    className="flex flex-row w-full px-4 py-2 rounded hover:bg-[#0732EF] hover:text-gray-800 bg-white text-[#0732EF]"
                                >
                                    Login Now
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Form */}
            <form id="new_letter" onSubmit={handleSubmit} noValidate className="space-y-">
                <div className="container mx-auto px-4 mt-20 md:px-8 flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-16">
                    <div className="w-full lg:w-1/2">
                        <h1 className="text-2xl lg:text-5xl text-[#0732EF] font-bold font-lato mb-5">
                            Write a Letter to Your Future Self
                        </h1>
                        <p className="text-lg font-lato text-[#0732EF] mb-4">
                            Pick a date. Write your note. Send. Verify. Thats it 📅✉️<br />
                            Your letter is safe with us - weve a long history of successful letter deliveries!
                        </p>

                        <input
                            className="w-full p-2 font-lato lg:text-2xl font-bold bg-gray-100 border rounded  border-transparent"
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
                                type="text"
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
                                alt=""
                            />
                        </div>
                        <div>
                            <label className="font-semibold">
                                <strong>Deliver on</strong>
                            </label>
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
                        <button
                            type="submit"
                            className="text-white font-semibold border border-white bg-gray-500 rounded-full px-4 py-2 text-center hover:border-white hover:bg-white hover:text-[#0732EF]"
                        >
                            Send to the Future!
                        </button>
                    </div>
                </div>
            </form>
            {/* stats */}
            <section id="" className="">
                <div className="container bg-amber-50 mx-auto px-4">
                    <h2 className="text-4xl md:text-7xl text-[#0732EF] font-bold  text-center md:text-left mt-10 mb-16">
                        Boosting Business
                    </h2>


                    <ul className="text-[#0732EF] text-lg md:text-xl font-bold flex flex-col items-center justify-center space-y-8 space-x-3 md:flex-row md:space-y-0">
                        <li className="flex flex-col items-center mb-8">
                            <div className="lg:mt-8">
                                <Image src="/Client Evenue.jpg" alt="Client Evenue" width={384} height={288} className="w-96 h-72" />
                            </div>
                            <div className="text-center md:text-left md:mt-15">
                                <p className="text-6xl font-medium">70+</p>
                                <p className="text-lg md:text-xl font-semibold">Active Users</p>
                            </div>
                        </li>
                        <li className="flex flex-col items-center lg:mb-8">
                            <Image src="/Growth.jpg" alt="Growth" width={384} height={288} className="h-72 w-96" />
                            <div className="text-center md:text-left">
                                <p className="text-6xl font-medium">72%</p>
                                <p className="text-lg md:text-xl font-semibold">Growth</p>
                            </div>
                        </li>
                        <li className="flex flex-col items-center lg:mb-8">
                            <Image src="/partners.jpg" alt="Global Partners" width={384} height={288} className="w-96 h-72" />
                            <div className="text-center md:text-left">
                                <p className="text-6xl font-medium">100+</p>
                                <p className="text-lg md:text-xl font-semibold">Time Capsules</p>
                            </div>
                        </li>
                        <li className="flex flex-col items-center lg:mb-8">
                            <Image src="/years.jpg" alt="Years" width={384} height={288} className="w-96 h-72" />
                            <div className="text-center md:text-left">
                                <p className="text-6xl font-medium">100%</p>
                                <p className="text-lg md:text-xl font-semibold">Secure</p>
                            </div>
                        </li>
                    </ul>
                </div>

                <div className="container flex flex-wrap items-center justify-start  mt-10  md:flex-row">
                    <div className=" lg:mb-0 lg:w-1/2">
                        <h1 className="max-w-xl text-[2.9rem] leading-none text-[#0732EF] font-extrabold font-sans text-center lg:text-5xl lg:text-left lg:leading-tight ">
                            Industries
                        </h1>
                    </div>
                </div>
                <div className="container flex flex-wrap justify-start  ">
                    <div className="bg-amber-50 rounded-lg lg:px-4 py-4 max-w-sm">
                        <h2 className="text-3xl font-bold text-[#0732EF] mb-4">Historical</h2>
                        <p className="text-lg text-[#0732EF] mb-4">
                            Time capsules have been used throughout history as a way to preserve a snapshot of a particular moment in time for future generations. The concept dates back to ancient civilizations, where items of cultural and historical significance were buried or stored in secure locations.
                        </p>
                    </div>
                    <div className="bg-amber-50 rounded-lg lg:px-4 py-4 max-w-sm">
                        <h2 className="text-3xl font-bold text-[#0732EF] mb-4">Business</h2>
                        <p className="text-lg text-[#0732EF] mb-4">
                            In the business world, time capsules can serve as a powerful tool for preserving the legacy and milestones of a company. They can be used to commemorate significant achievements, anniversaries, and the evolution of the business over time. Time Tressure offers a modern solution for businesses to create and manage digital time capsules, ensuring that their legacy is preserved in a secure and accessible way.
                        </p>
                    </div>
                    <div className="bg-amber-50 rounded-lg lg:px-4 py-4 max-w-sm">
                        <h2 className="text-3xl font-bold text-[#0732EF] mb-4">Personal Use</h2>
                        <p className="text-lg text-[#0732EF] mb-4">
                            For personal use, time capsules provide a unique way to capture and preserve memories, milestones, and personal achievements. Time Tressure makes it easy to create digital time capsules that can include photos, videos, letters, and other personal artifacts. These digital capsules can be securely stored and shared with loved ones.
                        </p>
                    </div>
                    <div className="flex justify-center mb-10 lg:mb-4 lg:w-1/2 mt-14 lg:justify-start">
                        <button disabled type="button" className=" text-[#0732EF] border-[1px] border-[#0732EF] rounded-full px-4 py-4 text-center hover:border-[1px] hover:bg-[#0732EF] hover:text-slate-200 duration-700">
                            Create a Free Capsule
                        </button>
                    </div>
                </div>
            </section>
            {/* footer  */}
            <footer className="relative bg-[#0732EF] font-[Comfortaa] pt-8 pb-6">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap text-left lg:text-left">
                        <div className="w-full lg:w-6/12 px-4">
                            <h4 className="text-3xl font-semibold text-white">Lets keep in touch!</h4>
                            <h5 className="text-lg mt-0 mb-2 text-white">
                                Find us on any of these platforms, we respond within 1-2 business days.
                            </h5>
                            <div className="mt-6 lg:mb-0 mb-6 flex">
                                <button
                                    className="bg-white shadow-lg font-normal h-10 w-10 flex items-center justify-center rounded-full outline-none focus:outline-none mr-2"
                                    type="button">
                                    <i className="fab fa-facebook-f text-[#2fa1f9] text-xl"></i>
                                </button>
                                <button
                                    className="bg-white shadow-lg font-normal h-10 w-10 flex items-center justify-center rounded-full outline-none focus:outline-none mr-2"
                                    type="button">
                                    <i className="fab fa-linkedin text-[#1c5bca] text-xl"></i>
                                </button>
                                <button
                                    className="bg-white shadow-lg font-normal h-10 w-10 flex items-center justify-center rounded-full outline-none focus:outline-none mr-2"
                                    type="button">
                                    <i className="fab fa-instagram text-[#da0b8e] text-xl"></i>
                                </button>
                                <button
                                    className="bg-white shadow-lg font-normal h-10 w-10 flex items-center justify-center rounded-full outline-none focus:outline-none mr-2"
                                    type="button">
                                    <i className="fab fa-github text-[#121212] text-xl"></i>
                                </button>
                            </div>
                        </div>
                        <div className="w-full lg:w-6/12 flex justify-center py-4 ">
                            <div className="w-full flex flex-col lg:flex-row  items-top mb-6">
                                <div className='w-1/2'>
                                    <div className="w-full  ">
                                        <span className="block uppercase text-white text-2xl lg:text-lg font-bold mb-2">Contact us</span>
                                        <ul className="list-unstyled">
                                            <li className="flex items-center py-2">
                                                <i className="fas fa-phone"></i>
                                                <strong className="text-white px-2 hover:text-gray-400">92426312341</strong>
                                            </li>
                                            <li className="flex items-center py-2">
                                                <i className="fas fa-envelope"></i>
                                                <strong className="text-white px-2 hover:text-gray-400">isabella@timetreasure.co</strong>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div className='flex  justify-between w-full lg:w-2/3 '>
                                    <div className="w-full  px-4  ">
                                        <span className="block uppercase text-white text-2xl lg:text-lg font-bold mb-2">Links</span>
                                        <ul className="list-unstyled flex flex-col justify-end">
                                            <li>
                                                <a href="/" className="text-white hover:text-gray-400">About Us</a>
                                            </li>
                                            <li>
                                                <a href="/" className="text-white hover:text-gray-400">Blog</a>
                                            </li>
                                            <li>
                                                <a href="/" className="text-white hover:text-gray-400">Contact</a>
                                            </li>
                                            <li>
                                                <a href="/" className="text-white hover:text-gray-400">Terms</a>
                                            </li>
                                            <li>
                                                <a href="/" className="text-white hover:text-gray-400">Privacy</a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="w-full  px-4 ">
                                        <span className="block uppercase text-white text-2xl lg:text-lg font-bold mb-2">Legal</span>
                                        <ul className="list-unstyled">
                                            <li>
                                                <a href="/" className="text-white hover:text-gray-400">Privacy Policy</a>
                                            </li>
                                            <li>
                                                <a href="/" className="text-white hover:text-gray-400">Terms of Service</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                    <div className="text-center pt-6">
                        <small className="text-white font-semibold">© 2024, <a href="https://www.infinitywavesolution.com" className="text-white hover:text-gray-400">Infinity Wave Solution</a>. All rights reserved.</small>
                    </div>
                </div>
            </footer>
            
        </div>
    );
};

export default TimeTreasure;
