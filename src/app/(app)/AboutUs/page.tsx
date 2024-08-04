import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Image from 'next/image';

const AboutUs = () => {
    return (
        <div className="bg-amber-50 font-[Lato]">
            {/* Main content */}
            <div className="text-xl text-[#0732EF] bg-amber-50 h-full w-full">
                <div className="text-7xl text-[#0732EF] flex justify-between font-bold lg:mt-10 lg:mb-16 mb-10 lg:ml-40">
                    <h2>Our Story</h2>
                </div>

                <div className="text-[#0732EF] font-[Lato] lg:mt-20 lg:w-1/2 lg:ml-40 px-4">
                    <p>
                        The idea for Time Treasure was born out of a shared passion for memory preservation and
                        storytelling. Inspired by the timeless tradition of burying physical time capsules, we wanted to
                        bring this concept into the digital age. Our journey began with a simple question: &quot;What if we could
                        preserve our thoughts, dreams, and messages for the future, all in one place?&quot;
                    </p>
                    <p className="mt-10">
                        Our mission is to provide a unique platform for individuals to document their lives, share their
                        stories, and create lasting memories. We envision a world where every moment, big or small, is
                        treasured and revisited, connecting generations and bridging the past, present, and future. We are
                        constantly working on new features and improvements to enhance your experience with Time Treasure.
                        Stay tuned for exciting updates and additions that will make your time capsules even more magical.
                    </p>
                </div>

                <div className="text-[#0732EF] font-[Lato] text-2xl mt-20 lg:w-1/2 lg:ml-40 ml-4 font-bold">
                    <h2>The Team at Time Treasure</h2>
                </div>

                <div className="main-page font-[Lato] flex flex-col justify-center items-center mt-14 space-y-4">
                    <div className="team-member font-[Lato] border-[1px] border-[#0732EF] rounded-lg w-3/4 flex lg:flex-row flex-col justify-center p-4 hover:bg-[#BCC5F2] hover:translate-x-6 duration-500">
                        <Image
                            src="/Owner11.jpeg"
                            alt="Portrait of Mahnoor Fatima"
                            width={128}
                            height={128}
                            className="w-32 h-32 rounded-full object-cover mr-4"
                        />                        <div className="member-info flex flex-col justify-center">
                            <h3 className="text-lg font-bold">Mahnoor Fatima</h3>
                            <p className="text-sm text-[#0732EF]">Founder</p>
                            <p className="text-sm text-[#0732EF]">Mahnoor is the visionary behind our company. With a passion for innovation and a drive for excellence, she leads our team towards achieving our goals.</p>
                            <p><a href="" target="_blank" className="text-blue-500 hover:text-[#0732EF]">Mahnoor LinkedIn Profile</a></p>
                        </div>
                    </div>

                    <div className="team-member font-[Lato] border-[1px] border-[#0732EF] rounded-lg w-3/4 flex lg:flex-row flex-col justify-center mt-20 p-4 hover:bg-[#BCC5F2] hover:translate-x-6 duration-500">
                        <Image
                            src="https://media.licdn.com/dms/image/D4D03AQEUlMg7URs0jg/profile-displayphoto-shrink_800_800/0/1718238958396?e=1727913600&v=beta&t=7gZFwspi5uS5Jrqjib76ZB25s2zGortmnsIyqsa3KN8"
                            alt="Portrait of Husnain Ali"
                            width={128}
                            height={128}
                            className="w-32 h-32 rounded-full object-cover mr-4"
                        />                        <div className="member-info flex flex-col justify-center">
                            <h3 className="text-lg font-bold">Husnain Ali</h3>
                            <p className="text-sm text-[#0732EF]">Co-founder</p>
                            <p className="text-sm text-[#0732EF]">Husnain brings a wealth of experience and a strategic mindset to our team. His expertise in business development is crucial to our success.</p>
                            <p><a href="www.linkedin.com/in/husnainalyy" target="_blank" className="text-blue-500 hover:text-[#0732EF] duration-500">Husnain LinkedIn Profile</a></p>
                        </div>
                    </div>
                </div>

                <div className="flex justify-start font-[Lato] mt-14 lg:justify-start mb-4 w-48 lg:ml-40 ml-8">
                    <button type="button" className="text-[#0732EF] border-[1px] border-[#0732EF] rounded-full px-4 py-4 text-center hover:border-[1px] hover:bg-[#0732EF] hover:text-slate-200">
                        <a href="#">Get Started</a>
                    </button>
                </div>
            </div>
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

export default AboutUs;