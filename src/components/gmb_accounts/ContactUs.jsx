import React, { useState } from 'react';
import { Search, ArrowLeft, Mail, Phone, MapPin, Clock, Facebook, Twitter, Instagram, Youtube, User, Building, MessageSquare, Calendar, Send, X } from 'lucide-react';
import ContactUsLayout from '../Layouts/ContactUsLayout';


const ContactUs = () => {
    const [currentPage, setCurrentPage] = useState('contact');
    const [showSearchModal, setShowSearchModal] = useState(false);
    const [showClaimModal, setShowClaimModal] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        businessName: '',
        businessCategory: '',
        email: '',
        contactNumber: '',
        callTime: '',
        message: ''
    });

    // API Integration Setup
    const API_BASE_URL = 'https://localhost:8089/api-endpoint.com/api';

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_BASE_URL}/contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert('Message sent successfully!');
                setFormData({
                    name: '',
                    businessName: '',
                    businessCategory: '',
                    email: '',
                    contactNumber: '',
                    callTime: '',
                    message: ''
                });
            } else {
                alert('Failed to send message. Please try again.');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Network error. Please try again.');
        }
    };

    const handleSearch = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/search?query=${encodeURIComponent(searchQuery)}`);
            const data = await response.json();
            setSearchResults(data.results || []);
        } catch (error) {
            console.error('Search error:', error);
            setSearchResults([]);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    return (
        <ContactUsLayout>
        <div className="min-h-screen bg-gray-50">
           
           
            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-6 py-12">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-blue-500 mb-4">Contact Us</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Lorem ipsum is a dummy or placeholder text commonly used in graphic design, publishing, and web development.
                    </p>
                </div>

                {/* Contact Form */}
                <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Name*
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="Enter name"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Business Name*
                            </label>
                            <input
                                type="text"
                                name="businessName"
                                value={formData.businessName}
                                onChange={handleInputChange}
                                placeholder="Enter name"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Business Category*
                            </label>
                            <select
                                name="businessCategory"
                                value={formData.businessCategory}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-500"
                                required
                            >
                                <option value="">Select category</option>
                                <option value="restaurant">Restaurant</option>
                                <option value="retail">Retail</option>
                                <option value="services">Services</option>
                                <option value="healthcare">Healthcare</option>
                                <option value="education">Education</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email Id*
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="Enter email id"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Contact Number*
                            </label>
                            <input
                                type="tel"
                                name="contactNumber"
                                value={formData.contactNumber}
                                onChange={handleInputChange}
                                placeholder="Enter contact number"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Choose when to call*
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    name="callTime"
                                    value={formData.callTime}
                                    onChange={handleInputChange}
                                    placeholder="Select Time"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                                <Calendar className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Message*
                            </label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleInputChange}
                                placeholder="Enter your message"
                                rows="4"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                required
                            />
                        </div>

                        <button
                            onClick={handleFormSubmit}
                            className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors font-medium"
                        >
                            Send Message
                        </button>

                    </div>
                </div>
                
            </div>
        </div>
        </ContactUsLayout>
    );
}
export default ContactUs;