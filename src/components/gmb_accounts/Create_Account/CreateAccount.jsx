import React, { useState } from 'react';
import {
    Home,
    BarChart3,
    Users,
    FileText,
    Globe,
    MessageCircle,
    Share2,
    Gift,
    User,
    ChevronDown
} from 'lucide-react';
import Layout from '../../Layouts/Layout';
import Select from 'react-select';
import countryList from 'react-select-country-list';
import { useMemo } from 'react';
import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import markerIconPng from "leaflet/dist/images/marker-icon.png";





const VisibeenOnboarding = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        businessName: '',
        businessCategory: '',
        hasPhysicalLocation: null,
        country: '',
        state: '',
        city: '',
        streetAddress: '',
        pinCode: '',
        latitude: 32.2649,
        longitude: 75.6455,
        businessHoursType: ''
    });
    const addressInputRef = useRef(null);
    const countryRef = useRef(null);
    const stateRef = useRef(null);
    const cityRef = useRef(null);
    const addressRef = useRef(null);


    const businessCategories = [
        'Restaurant & Food Service',
        'Retail & Shopping',
        'Healthcare & Medical',
        'Professional Services',
        'Beauty & Wellness',
        'Automotive',
        'Real Estate',
        'Education & Training',
        'Technology',
        'Entertainment & Events',
        'Home & Garden',
        'Sports & Fitness'
    ];

    const icon = L.icon({
        iconUrl: markerIconPng,
        iconSize: [25, 41],
        iconAnchor: [12, 41]
    });


    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleNext = () => {
        // Validate current step
        if (currentStep === 1) {
            if (!formData.businessName || !formData.businessCategory) {
                alert('Please fill in all required fields');
                return;
            }
        }

        if (currentStep < 2) {
            setCurrentStep(currentStep + 1);
        } else {
            // Handle form submission
            // handleSubmit();
        }
    };

    const handleConfirm = () => {
        if (formData.hasPhysicalLocation === null) {
            alert('Please select an option');
            return;
        }
        setCurrentStep(3);
    };
    const options = countryList().getData();

    useEffect(() => {

        if (!window.google || !window.google.maps) return;

        const autocompleteCountry = new window.google.maps.places.Autocomplete(countryRef.current, {
            types: ['(regions)'],
            componentRestrictions: { country: [] } // allow all
        });

        autocompleteCountry.setFields(['address_components']);
        autocompleteCountry.addListener('place_changed', () => {
            const place = autocompleteCountry.getPlace();
            const country = place.address_components?.find(comp => comp.types.includes('country'))?.long_name;
            if (country) {
                setFormData(prev => ({ ...prev, country }));
            }
        });

        const autocompleteState = new window.google.maps.places.Autocomplete(stateRef.current, {
            types: ['(regions)']
        });
        autocompleteState.addListener('place_changed', () => {
            const place = autocompleteState.getPlace();
            const state = place.address_components?.find(comp => comp.types.includes('administrative_area_level_1'))?.long_name;
            if (state) {
                setFormData(prev => ({ ...prev, state }));
            }
        });

        const autocompleteCity = new window.google.maps.places.Autocomplete(cityRef.current, {
            types: ['(cities)']
        });
        autocompleteCity.addListener('place_changed', () => {
            const place = autocompleteCity.getPlace();
            const city = place.address_components?.find(comp => comp.types.includes('locality'))?.long_name;
            if (city) {
                setFormData(prev => ({ ...prev, city }));
            }
        });

        const autocompleteAddress = new window.google.maps.places.Autocomplete(addressRef.current, {
            types: ['geocode']
        });
        autocompleteAddress.addListener('place_changed', () => {
            const place = autocompleteAddress.getPlace();
            if (!place || !place.address_components) return;

            const components = place.address_components;

            const streetAddress = place.formatted_address;
            const postalCode = components.find(c => c.types.includes('postal_code'))?.long_name || '';
            const latitude = place.geometry?.location?.lat();
            const longitude = place.geometry?.location?.lng();

            setFormData(prev => ({
                ...prev,
                streetAddress,
                pinCode: postalCode,
                latitude,
                longitude,
            }));
        });
    }, []);

    const cityOptions = [
        { label: 'Mohali', value: 'Mohali' },
        { label: 'Chandigarh', value: 'Chandigarh' },
        { label: 'Patiala', value: 'Patiala' },
    ];

    const stateOptions = [
        { label: 'Delhi', value: 'Delhi' },
        { label: 'Maharashtra', value: 'Maharashtra' },
        { label: 'Karnataka', value: 'Karnataka' },
    ];


    // const handleSubmit = () => {
    //     // This is where you'd integrate with your backend
    //     console.log('Form Data:', formData);
    //     alert('Account creation completed! Data logged to console.');
    // }
    return (
        <Layout>

            {/* Main Content */}
            <div className="main-content">
                <div className="content-container">
                    {currentStep === 1 && (
                        <div className="card">
                            <h1 className="title">Create Account</h1>
                            <p className="subtitle">
                                Lorem Ipsum is a dummy or placeholder text commonly used in graphic design, publishing, and web development.
                            </p>

                            <div className="form-container">
                                <div className="form-group">
                                    <label className="form-label">
                                        Business Name<span className="required">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter business name"
                                        value={formData.businessName}
                                        onChange={(e) => handleInputChange('businessName', e.target.value)}
                                        className="form-input"
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">
                                        Business Category<span className="required">*</span>
                                    </label>
                                    <div className="select-container">
                                        <select
                                            value={formData.businessCategory}
                                            onChange={(e) => handleInputChange('businessCategory', e.target.value)}
                                            className="form-select"
                                        >
                                            <option value="">Select business category</option>
                                            {businessCategories.map((category, index) => (
                                                <option key={index} value={category}>{category}</option>
                                            ))}
                                        </select>
                                        <div className="select-icon">
                                            <ChevronDown size={20} />
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={handleNext}
                                    className="btn-primary"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    )}

                    {currentStep === 2 && (
                        <div className="card">
                            <h1 className="title">
                                Do you want to add a location customers can visit, like a store or office?
                            </h1>
                            <p className="subtitle">
                                Lorem Ipsum is a dummy or placeholder text commonly used in graphic design, publishing, and web development.
                            </p>

                            <div className="form-container">
                                <div className="radio-group">
                                    <label className="radio-item">
                                        <input
                                            type="radio"
                                            name="hasPhysicalLocation"
                                            value="yes"
                                            checked={formData.hasPhysicalLocation === 'yes'}
                                            onChange={(e) => handleInputChange('hasPhysicalLocation', e.target.value)}
                                            className="radio-input"
                                        />
                                        <span className="radio-label">Yes</span>
                                    </label>

                                    <label className="radio-item">
                                        <input
                                            type="radio"
                                            name="hasPhysicalLocation"
                                            value="no"
                                            checked={formData.hasPhysicalLocation === 'no'}
                                            onChange={(e) => handleInputChange('hasPhysicalLocation', e.target.value)}
                                            className="radio-input"
                                        />
                                        <span className="radio-label">No</span>
                                    </label>
                                </div>

                                <button
                                    onClick={handleConfirm}
                                    className="btn-primary"
                                >
                                    Confirm
                                </button>
                            </div>

                            <button
                                onClick={() => setCurrentStep(1)}
                                className="btn-link"
                            >
                                ← Back to previous step
                            </button>
                        </div>
                    )}
                    {currentStep === 3 && (
                        <div className="card">
                            <h1 className="title">Enter your Business Address</h1>
                            <p className="subtitle">Lorem Ipsum is a dummy or placeholder text...</p>

                            <div className="form-group">
                                <label className="form-label">Country<span className="required">*</span></label>
                                <input
                                    ref={countryRef}
                                    placeholder="Enter country"
                                    className="form-input"
                                    type="text"
                                />

                            </div>

                            <div className="form-group">
                                <label className="form-label">Street Address<span className="required">*</span></label>
                                <input
                                    ref={addressRef}
                                    placeholder="Enter street address"
                                    className="form-input"
                                    type="text"
                                />
                            </div>
                            <label className="form-label">City<span className="required">*</span></label>
                            <div className="form-group">
                                <input
                                    ref={cityRef}
                                    placeholder="Enter city"
                                    className="form-input"
                                    type="text"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">State<span className="required">*</span></label>
                                <input
                                    ref={stateRef}
                                    placeholder="Enter state"
                                    className="form-input"
                                    type="text"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Pin Code<span className="required">*</span></label>
                                <input
                                    type="text"
                                    value={formData.pinCode}
                                    placeholder="Enter pin code"
                                    className="form-input"
                                    readOnly
                                />
                            </div>
                            <button onClick={() => setCurrentStep(4)} className="btn-primary">Next</button>
                            <button
                                onClick={() => setCurrentStep(2)}
                                className="btn-link"
                            >
                                ← Back to previous step
                            </button>
                        </div>

                    )}
                    {currentStep === 4 && (
                        <div className="card">
                            <h1 className="title">Where is your service available? <span className="optional">(optional)</span></h1>
                            <p className="subtitle">Lorem Ipsum is a dummy or placeholder text...</p>

                            <div className="form-group">
                                <label className="form-label">Search and Select Area<span className="required">*</span></label>
                                <input type="text" placeholder="Enter area" className="form-input" />
                            </div>

                            <button onClick={() => setCurrentStep(currentStep + 1)}>Next</button>
                            <button
                                onClick={() => setCurrentStep(3)}
                                className="btn-link"
                            >
                                ← Back to previous step
                            </button>
                        </div>
                    )}
                    {currentStep === 5 && (
                        <div className="card">
                            <h1 className="title">Is this your Business?</h1>
                            <p className="subtitle">
                                Lorem Ipsum is a dummy or placeholder text commonly used in graphic design, publishing, and web development.
                            </p>

                            <div className="radio-group">
                                {[
                                    {
                                        name: "E2E Networks Limited",
                                        address: "Dalhousie Road, opposite canara bank, Guru Nanak Nagar, Bhadroya, Pathankot 074745 74949"
                                    },
                                    {
                                        name: "Halifax Car Cleaner",
                                        address: "Dalhousie Road, opposite canara bank, Guru Nanak Nagar, Bhadroya, Haryana 074754 74949"
                                    },
                                    {
                                        name: "E2E Networks Limited",
                                        address: "Dalhousie Road, opposite canara bank, Guru Nanak Nagar, Bhadroya, Pathankot 094171 74744"
                                    },
                                    {
                                        name: "None of these",
                                        address: ""
                                    }
                                ].map((item, index) => (
                                    <label key={index} className="radio-option-aligned">
                                        <input
                                            type="radio"
                                            name="businessMatch"
                                            value={item.name}
                                            onChange={(e) => setFormData(prev => ({ ...prev, businessMatch: e.target.value }))}
                                        />
                                        <div>
                                            <strong>{item.name}</strong><br />
                                            <span>{item.address}</span>
                                        </div>
                                    </label>
                                ))}
                            </div>

                            <button onClick={() => setCurrentStep(currentStep + 1)}>Next</button>

                            <button onClick={() => setCurrentStep(4)} className="btn-link">
                                ← Back to previous step
                            </button>
                        </div>
                    )}

                    {currentStep === 6 && (
                        <div className="card">
                            <h1 className="title">Place your Pin</h1>
                            <p className="subtitle">
                                Lorem Ipsum is a dummy or placeholder text commonly used in graphic design, publishing, and web development.
                            </p>

                            <div className="map-container" style={{ height: '300px', margin: '20px 0', borderRadius: '8px', overflow: 'hidden' }}>
                                {/* <MapContainer
                                    center={[formData.latitude || 32.2649, formData.longitude || 75.6455]}
                                    zoom={13}
                                    style={{ height: '300px', width: '100%', marginTop: '20px' }}
                                    scrollWheelZoom={false}
                                >
                                    <TileLayer
                                        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />
                                    <Marker
                                        position={[formData.latitude || 32.2649, formData.longitude || 75.6455]}
                                        draggable={true}
                                        eventHandlers={{
                                            dragend: (e) => {
                                                const lat = e.target.getLatLng().lat;
                                                const lng = e.target.getLatLng().lng;
                                                setFormData(prev => ({
                                                    ...prev,
                                                    latitude: lat,
                                                    longitude: lng,
                                                }));
                                            }
                                        }}
                                        icon={icon}
                                    />
                                </MapContainer> */}

                            </div>

                            <button className="btn-primary" onClick={() => setCurrentStep(7)}>
                                Confirm
                            </button>
                            <button onClick={() => setCurrentStep(5)} className="btn-link">
                                ← Back to previous step
                            </button>
                        </div>
                    )}

                    {currentStep === 7 && (
                        <div className="card">
                            <h1 className="title">Do you Provide Deliveries or Home and Office Visits?</h1>
                            <p className="subtitle">
                                Lorem Ipsum is a dummy or placeholder text commonly used in graphic design, publishing, and web development.
                            </p>
                            <div className="radio-group">
                                <label className="radio-item">
                                    <input
                                        type="radio"
                                        name="hasPhysicalLocation"
                                        value="yes"
                                        className="radio-input"
                                    />
                                    <span className="radio-label">Yes</span>
                                </label>

                                <label className="radio-item">
                                    <input
                                        type="radio"
                                        name="hasPhysicalLocation"
                                        value="no"
                                        className="radio-input"
                                    />
                                    <span className="radio-label">No</span>
                                </label>
                            </div>
                            <button onClick={() => setCurrentStep(currentStep + 1)}>Confirm</button>
                            <button onClick={() => setCurrentStep(6)} className="btn-link">
                                ← Back to previous step
                            </button>
                        </div>
                    )}

                    {currentStep === 8 && (
                        <div className="card">
                            <h1 className="title">What contact details do you want to show to customers?</h1>
                            <p className="subtitle">
                                Lorem Ipsum is a dummy or placeholder text commonly used in graphic design, publishing, and web development.
                            </p>
                            <div className="form-group">
                                <label className="form-label">Contact Number<span className="required">*</span></label>
                                <input type="text" placeholder="Enter area" className="form-input" />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Chat<span className="required">*</span></label>
                                <input type="text" placeholder="Enter area" className="form-input" />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Website<span className="required">*</span></label>
                                <input type="text" placeholder="Enter area" className="form-input" />
                            </div>

                            <button onClick={() => setCurrentStep(currentStep + 1)}>Next</button>
                            <button onClick={() => setCurrentStep(7)} className="btn-link">
                                ← Back to previous step
                            </button>
                        </div>
                    )}
                    {currentStep === 9 && (
                        <div className="card">

                            <h1 className="title">To Start Verification, Enter your Phone Number</h1>
                            <p className="subtitle">
                                Lorem Ipsum is a dummy or placeholder text commonly used in graphic design, publishing, and web development.
                            </p>

                            <div className="form-group">
                                <label className="form-label">Contact Number<span className="required">*</span></label>
                                <input type="text" placeholder="Enter area" className="form-input" />
                                <p>This number won't be visible to customers</p>
                            </div>
                            <div className="btn-row">
                                <button className="btn-outline">Skip</button>
                                <button onClick={() => setCurrentStep(currentStep + 1)}>Next</button>
                                <button onClick={() => setCurrentStep(8)} className="btn-link">
                                    ← Back to previous step
                                </button>
                            </div>

                        </div>
                    )}
                    {currentStep === 10 && (
                        <div className="card">

                            <h1 className="title">Enter received OTP in your Phone Number</h1>
                            <p className="subtitle">
                                Please enter your received OTP on +91XXXXXXXX46
                            </p>
                            <div className="form-group">
                                <label className="form-label">OTP<span className="required">*</span></label>
                                <input type="text" placeholder="Enter area" className="form-input" />
                            </div>

                            <button onClick={() => setCurrentStep(currentStep + 1)}>Next</button>
                            <button onClick={() => setCurrentStep(9)} className="btn-link">
                                ← Back to previous step
                            </button>
                        </div>


                    )}
                    {currentStep === 11 && (
                        <div className="card">

                            <h1 className="title">Select a way to get verified</h1>
                            <p className="subtitle">
                                Please enter your received OTP on +91XXXXXXXX46
                            </p>

                            <button onClick={() => setCurrentStep(currentStep + 1)}>Next</button>
                            <button onClick={() => setCurrentStep(10)} className="btn-link">
                                ← Back to previous step
                            </button>
                        </div>


                    )}
                    {currentStep === 12 && (
                        <div className="card">
                            <h1 className="title">Add your Services</h1>
                            <p className="subtitle">Let’s analyse the strength of your profile</p>

                            <input
                                type="text"
                                className="form-input"
                                placeholder="Select keywords"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        if (e.target.value) {
                                            setFormData(prev => ({
                                                ...prev,
                                                services: [...(prev.services || []), e.target.value],
                                            }));
                                            e.target.value = '';
                                        }
                                    }
                                }}
                            />

                            <div className="tag-container">
                                {(formData.services || []).map((service, i) => (
                                    <span key={i} className="tag">{service}</span>
                                ))}
                            </div>

                            <input
                                type="text"
                                className="form-input"
                                placeholder="Add Custom Service"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        setFormData(prev => ({
                                            ...prev,
                                            services: [...(prev.services || []), e.target.value],
                                        }));
                                        e.target.value = '';
                                    }
                                }}
                            />

                            <button onClick={() => setCurrentStep(13)} className="btn-primary">Continue</button>
                            <button onClick={() => setCurrentStep(11)} className="btn-link">
                                ← Back to previous step
                            </button>
                        </div>
                    )}



                    {currentStep === 13 && (
                        <div className="card">
                            <h1 className="title">Add Timing</h1>
                            <p className="subtitle">Lorem ipsum is a dummy or placeholder text...</p>

                            {['Open with main hours', 'Open with no main hours', 'Temporarily closed', 'Permanently closed'].map((option, i) => (
                                <div className="form-group radio-group" key={i}>
                                    <input
                                        type="radio"
                                        id={`timing-${i}`}
                                        name="businessHoursType"
                                        value={option}
                                        checked={formData.businessHoursType === option}
                                        onChange={(e) => setFormData(prev => ({ ...prev, businessHoursType: e.target.value }))}
                                    />
                                    <label htmlFor={`timing-${i}`}><strong>{option}</strong></label>
                                </div>
                            ))}

                            <button onClick={() => setCurrentStep(currentStep + 1)}>Next</button>
                            <button onClick={() => setCurrentStep(12)} className="btn-link">
                                ← Back to previous step
                            </button>
                        </div>

                    )}
                    {currentStep === 14 && (
                        <div className="card">
                            <h1 className="title">Add Timing</h1>
                            <p className="subtitle">Set your business open/close hours.</p>

                            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                                <div className="form-group" key={day}>
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={formData.timing?.[day]?.enabled || false}
                                            onChange={(e) =>
                                                setFormData(prev => ({
                                                    ...prev,
                                                    timing: {
                                                        ...prev.timing,
                                                        [day]: {
                                                            ...prev.timing?.[day],
                                                            enabled: e.target.checked,
                                                        },
                                                    },
                                                }))
                                            }
                                        />
                                        <strong>{day}</strong>
                                    </label>
                                    {formData.timing?.[day]?.enabled && (
                                        <div className="time-range">
                                            <input
                                                type="time"
                                                value={formData.timing?.[day]?.from || ''}
                                                onChange={(e) =>
                                                    setFormData(prev => ({
                                                        ...prev,
                                                        timing: {
                                                            ...prev.timing,
                                                            [day]: {
                                                                ...prev.timing?.[day],
                                                                from: e.target.value,
                                                            },
                                                        },
                                                    }))
                                                }
                                            />
                                            <input
                                                type="time"
                                                value={formData.timing?.[day]?.to || ''}
                                                onChange={(e) =>
                                                    setFormData(prev => ({
                                                        ...prev,
                                                        timing: {
                                                            ...prev.timing,
                                                            [day]: {
                                                                ...prev.timing?.[day],
                                                                to: e.target.value,
                                                            },
                                                        },
                                                    }))
                                                }
                                            />
                                        </div>
                                    )}
                                </div>
                            ))}

                            <button className="btn-primary">Save</button>
                            <button onClick={() => setCurrentStep(13)} className="btn-link">
                                ← Back to previous step
                            </button>
                        </div>
                    )}



                </div>
            </div>
            {/* </div> */}

        </Layout>

    );
};
export default VisibeenOnboarding;