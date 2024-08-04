import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react'; // Import necessary icons

const faqs = [
    {
        question: 'How does Time Treasure work?',
        answer: 'Time Treasure is a time capsule application that allows users to create, manage, and share time capsules. A time capsule is a digital container where you can store messages, images, and other files to be opened at a future date. You can set specific dates or time frames for when the capsule will be accessible, making it a unique way to preserve memories or send messages to the future.'
    },
    {
        question: 'What types of content can I include in a time capsule?',
        answer: 'You can include text messages, images, videos, and documents in your time capsules. The application supports various file formats to ensure you can preserve all types of content for future viewing.'
    },
    {
        question: 'Can I share my time capsules with others?',
        answer: 'Yes, you can share your time capsules with friends and family by generating a shareable link. The recipient can access the capsule when it becomes available based on the settings you configured.'
    },
    {
        question: 'How do I recover a forgotten password?',
        answer: 'If you forget your password, click on the "Forgot Password" link on the login page. You will receive an email with instructions to reset your password and regain access to your account.'
    },
    {
        question: 'How do I contact support?',
        answer: 'If you need assistance or have any questions, you can contact our support team by clicking the "Contact Support" button below or by sending an email to alyhusnaiin@gmail.com.'
    },
    {
        question: 'Where can I find the user guide?',
        answer: 'The user guide is available in the "Documentation" section of the website. It provides detailed instructions on how to use all the features of the Time Treasure application.'
    }
];

const HelpSupportSection: React.FC = () => {
    return (
        <div className="p-4 md:p-6">
            <h2 className="text-2xl font-semibold mb-4">Help & Support</h2>

            <section className="mb-6">
                <h3 className="text-xl font-medium mb-2">How Time Treasure Works</h3>
                <p className="mb-4">
                    Time Treasure is designed to help you preserve and share your most cherished moments through digital time capsules. Whether you want to send a heartfelt message to a loved one for a future date or keep a personal memory safe for years to come, Time Treasure makes it easy and secure.
                </p>
                <p>
                    With features like customizable release dates, shareable links, and various content formats, Time Treasure provides a unique way to communicate across time and create lasting memories. Learn more about our features and how they can enhance your experience below.
                </p>
            </section>

            <section className="mb-6">
                <h3 className="text-xl font-medium mb-2">How We Solve Your Problems</h3>
                <p className="mb-4">
                    Our support team is dedicated to resolving any issues you may encounter with the Time Treasure application. We offer comprehensive troubleshooting guides and responsive customer support to address your concerns promptly.
                </p>
                <p>
                    From account issues to technical difficulties, our team is here to help you every step of the way. For any unresolved issues, please do not hesitate to reach out to us through the contact button below.
                </p>
            </section>

            <section className="mb-6">
                <h3 className="text-xl font-medium mb-2">Frequently Asked Questions</h3>
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="border rounded-lg p-4 shadow-sm">
                            <h4 className="font-semibold text-lg mb-2">{faq.question}</h4>
                            <p>{faq.answer}</p>
                        </div>
                    ))}
                </div>
            </section>

            <div className="mt-6">
                <Button
                    className="flex items-center gap-2"
                    onClick={() => window.location.href = 'mailto:alyhusnaiin@gmail.com'}
                >
                    Contact Support
                    <ArrowRight className="w-4 h-4" />
                </Button>
            </div>
        </div>
    );
};

export default HelpSupportSection;
