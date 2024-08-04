import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Image from 'next/image'

const Services = () => {
    return (
        <div className='bg-amber-50 text-black'>
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

export default Services;
