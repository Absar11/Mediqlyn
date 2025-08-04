import React from 'react'

const Privacy = () => {
    return (
        <div className='max-w-4xl mx-auto px-4 py-10 text-gray-700 leading-7'>
            <h1 className='text-3xl font-bold mb-6 text-center text-gray-800'>Privacy Policy</h1>

            <p className='mb-4'>
                At <strong>MediQlyn</strong>, your privacy is important to us. This Privacy Policy outlines how we collect, use, and protect your personal information when you use our platform.
            </p>

            <h2 className='text-xl font-semibold mt-6 mb-2'>1. Information We Collect</h2>
            <ul className='list-disc pl-5'>
                <li>Personal identification information (Name, Email address, Phone number, etc.)</li>
                <li>Health-related data provided by you during appointments</li>
                <li>Usage data like IP address, browser type, and visited pages</li>
            </ul>

            <h2 className='text-xl font-semibold mt-6 mb-2'>2. How We Use Your Information</h2>
            <ul className='list-disc pl-5'>
                <li>To manage appointments and provide healthcare services</li>
                <li>To communicate with you about services, updates, or offers</li>
                <li>To improve our platform performance and user experience</li>
            </ul>

            <h2 className='text-xl font-semibold mt-6 mb-2'>3. Data Protection</h2>
            <p>
                We use industry-standard security measures to protect your personal data. However, no method of transmission over the Internet is 100% secure.
            </p>

            <h2 className='text-xl font-semibold mt-6 mb-2'>4. Third-party Services</h2>
            <p>
                We may share your information with trusted third-party services only when necessary for service provision. All such partners comply with strict data privacy standards.
            </p>

            <h2 className='text-xl font-semibold mt-6 mb-2'>5. Cookies</h2>
            <p>
                Our platform may use cookies to enhance your browsing experience. You can disable cookies in your browser settings.
            </p>

            <h2 className='text-xl font-semibold mt-6 mb-2'>6. Your Rights</h2>
            <p>
                You have the right to access, update, or delete your personal data. Contact us at <strong>mediqlyn@gmail.com</strong> for any data-related concerns.
            </p>

            <h2 className='text-xl font-semibold mt-6 mb-2'>7. Changes to This Policy</h2>
            <p>
                We may update our privacy policy from time to time. Changes will be posted on this page with a revised date.
            </p>

            <p className='mt-8 text-sm text-gray-500'>Last Updated: August 4, 2025</p>
        </div>
    )
}

export default Privacy
