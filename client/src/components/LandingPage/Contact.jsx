import React, { useState } from 'react';
import Navbar from './Navbar';

export default function Contact() {
  const [showMore, setShowMore] = useState(false);

  const toggleReadMore = () => {
    setShowMore(!showMore);
  };

  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-r from-yellow-100 to-green-500 min-h-screen p-6">
        <div>
          <h1 className="font-bold text-4xl text-green-700">Get in Touch</h1>
        </div>
        <div>
          <h3 className="font-semibold text-xl text-green-700">
            We'd love to hear from you, Here's how you can reach us.
          </h3>
        </div>

        {/* Stacked layout without flex */}
        <div className="p-6 space-y-6">

          {/* Privacy Policy & Details Box */}
          <div className="bg-green-300 p-4 rounded-xl">
            <h1 className="font-bold text-green-700">Privacy Policy & Details</h1>
            <p className='text-green-700'>
              Welcome to Krishi Seva, a platform connecting farmers and buyers for contract farming. We value your privacy and are committed to protecting your personal data. This Privacy Policy outlines how we collect, use, and protect your data when you use our services, including transactions facilitated through MetaMask and communications through our chat interface.
            </p>

            <button 
              onClick={toggleReadMore} 
              className="text-green-700 font-semibold underline mt-4"
            >
              {showMore ? 'Read Less' : 'Read More'}
            </button>

            {showMore && (
              <div>
                <h2 className="text-lg font-bold mt-4 mb-2 text-green-700">1. Information We Collect</h2>
                <ul className="list-disc pl-6 text-green-700">
                  <li><strong>Personal Information:</strong> When you register on the Platform, we may collect personal details such as your name, contact information, and identification data necessary to verify your identity and facilitate agreements between farmers and buyers.</li>
                  <li><strong>Transaction Information:</strong> For transactions conducted via MetaMask, we collect and store transaction data, including wallet addresses and contract details. We do not store your private MetaMask keys or access your MetaMask wallet.</li>
                  <li><strong>Chat Data:</strong> Any communication between farmers and buyers conducted through our chat interface is logged to ensure transparency and resolve disputes. This includes any messages exchanged and contracts formed through the chat.</li>
                  <li><strong>Usage Data:</strong> We collect information about how you interact with the Platform, such as your IP address, browser type, and device information, to improve user experience and security.</li>
                </ul>

                <h2 className="text-lg font-bold mt-4 mb-2 text-green-700">2. Security Measures</h2>
                <p className='text-green-700'>
                  We take security seriously and use industry-standard measures to protect your data. However, please note that no method of transmission over the internet is completely secure. While we strive to protect your data, we cannot guarantee its absolute security.
                </p>

                <h2 className="text-lg font-bold mt-4 mb-2 text-green-700">3. How We Use Your Information</h2>
                <ul className="list-disc pl-6 text-green-700">
                  <li><strong>Facilitation of Contracts</strong>: To enable smooth communication and agreement between farmers and buyers.</li>
                  <li><strong>Transaction Processing</strong>: To process and verify transactions conducted through MetaMask.</li>
                  <li><strong>Customer Support and Dispute Resolution</strong>: To help resolve any issues or disputes that arise from interactions on the platform.</li>
                  <li><strong>Legal Compliance</strong>: To comply with applicable laws, such as tax regulations and financial reporting obligations.</li>
                </ul>

                <h2 className="text-lg font-bold mt-4 mb-2 text-green-700">4. Data Sharing</h2>
                <ul className='text-green-700'>
                  <li><strong>Legal Obligations:</strong> When required to comply with the law, enforce our terms of service, or protect our users.</li>
                  <li><strong>Service Providers:</strong> We may share data with third-party service providers (such as hosting providers) who help us operate the Platform. These providers are bound by strict confidentiality agreements.</li>
                  <li><strong>Business Transfers:</strong> In the event of a merger or acquisition, your data may be transferred to the new owners as part of the transaction.</li>
                </ul>

                <h2 className="text-lg font-bold mt-4 mb-2 text-green-700">5. Your Rights</h2>
                <ul className='text-green-700'>
                  <li><strong>Access:</strong> You can request a copy of the data we hold about you.</li>
                  <li><strong>Correction:</strong> You can update or correct your personal data at any time.</li>
                  <li><strong>Deletion:</strong> You can request that we delete your personal data, subject to legal obligations.</li>
                </ul>

                <h2 className="text-lg font-bold mt-4 mb-2 text-green-700">6. MetaMask Transactions</h2>
                <p className='text-green-700'>Transactions through MetaMask are governed by the MetaMask privacy policy and terms of service. We do not have access to your private keys or control over your MetaMask wallet. You are responsible for maintaining the security of your MetaMask wallet.</p>

                <h2 className="text-lg font-bold mt-4 mb-2 text-green-700">7. Chat Interface</h2>
                <p className='text-green-700'>The chat interface is intended to facilitate communication and agreement between farmers and buyers. All messages exchanged may be stored to ensure transparency and help resolve disputes. Please use the chat responsibly and avoid sharing sensitive personal information.</p>

                <h2 className="text-lg font-bold mt-4 mb-2 text-green-700">8. Changes to this policy</h2>
                <p className='text-green-700'>We may update this Privacy Policy from time to time. When we do, we will notify you by updating the effective date at the top of the policy. We encourage you to review this policy periodically.</p>
              </div>
            )}
          </div>

          {/* Contact Details Box */}
          <div className="bg-green-400 p-4 rounded-xl">
            <h1 className="font-bold text-green-800">Contact Details</h1>
            <h2 className='text-green-700'><strong>Email</strong>: supreeth2022@gmail.com</h2>
            <h2 className='text-green-700'><strong>Phone</strong>: +91-7892648624</h2>
            <p className='text-green-700'><strong>Address:  </strong>Shavige Malleshwara Hills, 1st Stage, Kumaraswamy Layout, Bengaluru, Karnataka, India</p>
          </div>
        </div>
      </div>
    </>
  );
}
