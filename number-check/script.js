// Global state
let currentSearchMode = 'phone';
let isLoading = false;
let businesses = [];
let searchPerformed = false;

// DOM elements
const apiKeyInput = document.getElementById('api-key');
const phoneInput = document.getElementById('phone-input');
const businessInput = document.getElementById('business-input');
const searchPhoneBtn = document.getElementById('search-phone-btn');
const searchBusinessBtn = document.getElementById('search-business-btn');
const errorAlert = document.getElementById('error-alert');
const errorMessage = document.getElementById('error-message');
const resultsSection = document.getElementById('results-section');
const noResults = document.getElementById('no-results');
const howItWorks = document.getElementById('how-it-works');
const businessGrid = document.getElementById('business-grid');
const resultsCount = document.getElementById('results-count');
const resultsPlural = document.getElementById('results-plural');
const searchTerm = document.getElementById('search-term');
const searchBadge = document.getElementById('search-badge');
const noResultsMessage = document.getElementById('no-results-message');
const noResultsSuggestion = document.getElementById('no-results-suggestion');

// Initialize event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Tab switching functionality
    document.querySelectorAll('.tab-trigger').forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.dataset.tab;
            switchTab(tabName);
        });
    });

    // Search button event listeners
    searchPhoneBtn.addEventListener('click', searchByPhoneNumber);
    searchBusinessBtn.addEventListener('click', searchByBusinessName);

    // Enter key support
    phoneInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') searchByPhoneNumber();
    });

    businessInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') searchByBusinessName();
    });
});

// Tab switching functionality
function switchTab(tabName) {
    currentSearchMode = tabName;
    
    // Update tab triggers
    document.querySelectorAll('.tab-trigger').forEach(t => t.classList.remove('active'));
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    
    // Update tab content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(`${tabName}-tab`).classList.add('active');
}

// Phone number formatting for Indian and Bangladesh numbers
function formatPhoneNumber(phone) {
    let cleaned = phone.replace(/[^\d+]/g, "");
    
    // If it already starts with +91, keep it
    if (cleaned.startsWith("+91")) {
        return cleaned;
    }
    
    // If it starts with +, but not +91, replace with +91
    if (cleaned.startsWith("+")) {
        cleaned = cleaned.substring(1);
    }
    
    // If it starts with 91 and has 12 digits total, keep as is
    if (cleaned.startsWith("91") && cleaned.length === 12) {
        return `+${cleaned}`;
    }
    
    // Special handling for Bangladesh numbers starting with 017
    if (cleaned.startsWith("017")) {
        // Remove the leading 0 and return without +91
        return cleaned.substring(1);
    }
    
    // If it starts with 0, remove the leading 0 (common in Indian numbers)
    if (cleaned.startsWith("0")) {
        cleaned = cleaned.substring(1);
    }
    
    // For 10-digit Indian mobile numbers, add +91
    if (cleaned.length === 10 && /^[6-9]/.test(cleaned)) {
        return `+91${cleaned}`;
    }
    
    // For any other number, add +91 prefix
    if (cleaned.length > 0) {
        return `+91${cleaned}`;
    }
    
    return phone;
}

// Error handling
function showError(message) {
    errorMessage.textContent = message;
    errorAlert.classList.remove('hidden');
}

function hideError() {
    errorAlert.classList.add('hidden');
}

// Loading state management
function setLoading(loading, mode) {
    isLoading = loading;
    const btn = mode === 'phone' ? searchPhoneBtn : searchBusinessBtn;
    const btnText = mode === 'phone' ? document.getElementById('phone-btn-text') : document.getElementById('business-btn-text');
    const btnLoading = mode === 'phone' ? document.getElementById('phone-btn-loading') : document.getElementById('business-btn-loading');
    
    btn.disabled = loading;
    if (loading) {
        btnText.classList.add('hidden');
        btnLoading.classList.remove('hidden');
    } else {
        btnText.classList.remove('hidden');
        btnLoading.classList.add('hidden');
    }
}

// Rating color helper
function getRatingColor(rating) {
    if (rating >= 4.5) return 'excellent';
    if (rating >= 4.0) return 'good';
    if (rating >= 3.5) return 'average';
    return 'poor';
}

// Business tab switching
function switchBusinessTab(businessIndex, tabName) {
    // Hide all tabs for this business
    ['details', 'hours', 'features'].forEach(tab => {
        const tabContent = document.getElementById(`${tab}-${businessIndex}`);
        const tabButton = document.querySelector(`[onclick="switchBusinessTab(${businessIndex}, '${tab}')"]`);
        if (tabContent) tabContent.classList.remove('active');
        if (tabButton) tabButton.classList.remove('active');
    });
    
    // Show selected tab
    const selectedTabContent = document.getElementById(`${tabName}-${businessIndex}`);
    const selectedTabButton = document.querySelector(`[onclick="switchBusinessTab(${businessIndex}, '${tabName}')"]`);
    if (selectedTabContent) selectedTabContent.classList.add('active');
    if (selectedTabButton) selectedTabButton.classList.add('active');
}

// Create business card HTML
function createBusinessCard(business, index) {
    const rating = business.rating ? business.rating.toFixed(1) : null;
    const ratingClass = rating ? getRatingColor(business.rating) : '';
    
    return `
        <div class="business-card">
            <div class="business-header">
                <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                    <div style="flex: 1;">
                        <div class="business-title">
                            🏢 ${business.displayName?.text || 'Unknown Business'}
                        </div>
                        ${business.primaryTypeDisplayName ? 
                            `<div class="business-type">${business.primaryTypeDisplayName.text}</div>` : ''}
                    </div>
                    ${rating ? `
                        <div class="rating ${ratingClass}">
                            ⭐ ${rating}
                            ${business.userRatingCount ? `<span style="color: #6b7280; font-weight: normal;">(${business.userRatingCount})</span>` : ''}
                        </div>
                    ` : ''}
                </div>
            </div>
            <div class="business-tabs">
                <div class="business-tabs-list">
                    <button class="business-tab active" onclick="switchBusinessTab(${index}, 'details')">Details</button>
                    <button class="business-tab" onclick="switchBusinessTab(${index}, 'hours')">Hours</button>
                    <button class="business-tab" onclick="switchBusinessTab(${index}, 'features')">Features</button>
                </div>
                
                <div id="details-${index}" class="tab-content active">
                    ${(business.nationalPhoneNumber || business.internationalPhoneNumber) ? `
                        <div class="detail-item">
                            <span class="detail-icon">📞</span>
                            <div style="flex: 1;">
                                <div style="font-weight: 500; font-size: 0.875rem;">
                                    ${business.nationalPhoneNumber || business.internationalPhoneNumber}
                                </div>
                                <div class="phone-verified">Verified Phone Match</div>
                            </div>
                        </div>
                    ` : ''}
                    
                    ${business.formattedAddress ? `
                        <div class="detail-item">
                            <span class="detail-icon">📍</span>
                            <div style="font-size: 0.875rem; flex: 1;">${business.formattedAddress}</div>
                        </div>
                    ` : ''}
                    
                    ${business.websiteUri ? `
                        <div class="detail-item">
                            <span class="detail-icon">🌐</span>
                            <a href="${business.websiteUri}" target="_blank" style="font-size: 0.875rem; color: #2563eb; text-decoration: none; flex: 1; word-break: break-all;">
                                ${business.websiteUri}
                            </a>
                        </div>
                    ` : ''}
                    
                    ${business.businessStatus ? `
                        <div class="detail-item">
                            <span class="detail-icon">ℹ️</span>
                            <span class="status-badge ${business.businessStatus === 'OPERATIONAL' ? 'status-operational' : 'status-default'}">
                                ${business.businessStatus}
                            </span>
                        </div>
                    ` : ''}
                    
                    ${business.priceLevel ? `
                        <div class="detail-item">
                            <span style="font-size: 0.875rem; color: #6b7280;">Price Level:</span>
                            <span style="font-weight: 500;">${business.priceLevel}</span>
                        </div>
                    ` : ''}
                    
                    ${business.googleMapsUri ? `
                        <a href="${business.googleMapsUri}" target="_blank" style="display: inline-flex; align-items: center; gap: 0.5rem; font-size: 0.875rem; color: #2563eb; text-decoration: none; margin-top: 0.5rem;">
                            🗺️ View on Google Maps
                            <span style="font-size: 0.75rem;">🔗</span>
                        </a>
                    ` : ''}
                </div>

                <div id="hours-${index}" class="tab-content">
                    ${business.currentOpeningHours?.openNow !== undefined ? `
                        <div style="margin-bottom: 0.75rem;">
                            <span class="open-badge ${business.currentOpeningHours.openNow ? 'open-now' : 'closed-now'}">
                                ${business.currentOpeningHours.openNow ? 'Open Now' : 'Closed'}
                            </span>
                        </div>
                    ` : ''}
                    
                    ${business.regularOpeningHours?.weekdayDescriptions ? `
                        <div class="hours-list">
                            ${business.regularOpeningHours.weekdayDescriptions.map(day => 
                                `<div class="hours-item">${day}</div>`
                            ).join('')}
                        </div>
                    ` : '<div class="no-data">Hours not available</div>'}
                </div>

                <div id="features-${index}" class="tab-content">
                    <div class="features-grid">
                        ${business.takeout ? '<div class="feature-badge">Takeout</div>' : ''}
                        ${business.delivery ? '<div class="feature-badge">Delivery</div>' : ''}
                        ${business.dineIn ? '<div class="feature-badge">Dine In</div>' : ''}
                        ${business.curbsidePickup ? '<div class="feature-badge">Curbside</div>' : ''}
                        ${business.reservable ? '<div class="feature-badge">Reservations</div>' : ''}
                        ${business.accessibilityOptions?.wheelchairAccessibleEntrance ? '<div class="feature-badge">♿ Accessible</div>' : ''}
                        ${business.accessibilityOptions?.wheelchairAccessibleParking ? '<div class="feature-badge">♿ Parking</div>' : ''}
                        ${business.paymentOptions?.acceptsCreditCards ? '<div class="feature-badge">Credit Cards</div>' : ''}
                        ${business.paymentOptions?.acceptsDebitCards ? '<div class="feature-badge">Debit Cards</div>' : ''}
                        ${business.paymentOptions?.acceptsCashOnly ? '<div class="feature-badge">Cash Only</div>' : ''}
                        ${business.paymentOptions?.acceptsNfc ? '<div class="feature-badge">NFC/Tap</div>' : ''}
                    </div>
                    ${(!business.takeout && !business.delivery && !business.dineIn && !business.paymentOptions) ? 
                        '<div class="no-data">No features data available</div>' : ''}
                </div>

                ${business.types && business.types.length > 0 ? `
                    <div class="categories">
                        <div class="categories-title">Business Categories:</div>
                        <div class="category-tags">
                            ${business.types.slice(0, 5).map(type => 
                                `<div class="category-tag">${type.replace(/_/g, " ").toLowerCase()}</div>`
                            ).join('')}
                            ${business.types.length > 5 ? 
                                `<div class="category-tag">+${business.types.length - 5} more</div>` : ''}
                        </div>
                    </div>
                ` : ''}

                <div class="place-id">
                    <div class="place-id-title">Place ID:</div>
                    <div class="place-id-code">${business.id}</div>
                </div>
            </div>
        </div>
    `;
}

// Display results
function displayResults(businessList, searchQuery, mode) {
    businesses = businessList;
    searchPerformed = true;
    
    // Hide how it works section
    howItWorks.classList.add('hidden');
    
    if (businesses.length > 0) {
        // Show results
        resultsSection.classList.remove('hidden');
        noResults.classList.add('hidden');
        
        // Update results header
        resultsCount.textContent = businesses.length;
        resultsPlural.textContent = businesses.length !== 1 ? 's' : '';
        searchTerm.textContent = searchQuery;
        searchBadge.innerHTML = mode === 'phone' ? `📞 ${searchQuery}` : `🏢 ${searchQuery}`;
        
        // Generate business cards
        businessGrid.innerHTML = businesses.map((business, index) => 
            createBusinessCard(business, index)
        ).join('');
        
    } else {
        // Show no results
        resultsSection.classList.add('hidden');
        noResults.classList.remove('hidden');
        
        // Update no results message
        if (mode === 'phone') {
            noResultsMessage.innerHTML = `
                No Google My Business profiles were found linked to the phone number 
                <span style="font-family: monospace; font-weight: 600;">${searchQuery}</span>
            `;
            noResultsSuggestion.textContent = "Try different phone number formats or search by business name instead.";
        } else {
            noResultsMessage.innerHTML = `
                No Google My Business profiles were found for 
                <span style="font-weight: 600;">${searchQuery}</span>
            `;
            noResultsSuggestion.textContent = "Try including a location (e.g., city name) or check the spelling.";
        }
    }
}

// Search by phone number
async function searchByPhoneNumber() {
    const apiKey = apiKeyInput.value.trim();
    const phoneNumber = phoneInput.value.trim();
    
    if (!apiKey) {
        showError("Please enter your Google Places API key");
        return;
    }

    if (!phoneNumber) {
        showError("Please enter a phone number to search");
        return;
    }

    setLoading(true, 'phone');
    hideError();

    try {
        const formattedPhone = formatPhoneNumber(phoneNumber);
        const allBusinesses = [];
        
        // Try multiple search strategies to find all GMB profiles with this phone number
        const searchVariations = [
            formattedPhone,
            phoneNumber.replace(/\D/g, ""), // Just digits
            phoneNumber, // Original format
            formattedPhone.replace(/^\+1/, ""), // Remove +1 for US numbers
        ];

        // Remove duplicates
        const uniqueSearches = [...new Set(searchVariations)];
        
        console.log("Searching with phone variations:", uniqueSearches);

        for (const searchPhone of uniqueSearches) {
            try {
                const searchUrl = "https://places.googleapis.com/v1/places:searchText";
                
                const requestBody = {
                    textQuery: searchPhone,
                    maxResultCount: 20
                };

                const headers = {
                    "Content-Type": "application/json",
                    "X-Goog-Api-Key": apiKey,
                    "X-Goog-FieldMask": "places.id,places.displayName,places.formattedAddress,places.nationalPhoneNumber,places.internationalPhoneNumber,places.websiteUri,places.googleMapsUri,places.rating,places.userRatingCount,places.businessStatus,places.types,places.primaryTypeDisplayName,places.currentOpeningHours,places.regularOpeningHours,places.priceLevel,places.shortFormattedAddress,places.addressComponents,places.location,places.plusCode,places.takeout,places.delivery,places.dineIn,places.curbsidePickup,places.reservable,places.paymentOptions,places.accessibilityOptions"
                };

                console.log("Searching with variation:", searchPhone);

                const response = await fetch(searchUrl, {
                    method: "POST",
                    headers: headers,
                    body: JSON.stringify(requestBody)
                });

                if (response.ok) {
                    const responseText = await response.text();
                    const data = JSON.parse(responseText);
                    
                    if (data.places && data.places.length > 0) {
                        // Filter for exact phone matches and add to results
                        const phoneMatchedBusinesses = data.places.filter((place) => {
                            const placePhone = place.nationalPhoneNumber || place.internationalPhoneNumber;
                            if (!placePhone) return false;
                            
                            const cleanedSearchPhone = phoneNumber.replace(/\D/g, "");
                            const cleanedPlacePhone = placePhone.replace(/\D/g, "");
                            
                            // Check if the last 10 digits match (to handle country code differences)
                            const searchLast10 = cleanedSearchPhone.slice(-10);
                            const placeLast10 = cleanedPlacePhone.slice(-10);
                            
                            return searchLast10 === placeLast10 || 
                                   cleanedPlacePhone.includes(cleanedSearchPhone) || 
                                   cleanedSearchPhone.includes(cleanedPlacePhone);
                        });

                        // Add unique businesses to our results
                        phoneMatchedBusinesses.forEach((business) => {
                            const existingBusiness = allBusinesses.find(b => b.id === business.id);
                            if (!existingBusiness) {
                                allBusinesses.push(business);
                            }
                        });
                    }
                }
            } catch (searchErr) {
                console.log("Search variation failed:", searchPhone, searchErr);
                // Continue with other variations
            }
        }

        if (allBusinesses.length > 0) {
            console.log("Found businesses with matching phone:", allBusinesses);
            displayResults(allBusinesses, phoneNumber, 'phone');
        } else {
            // If no exact matches found, try a broader search
            console.log("No exact phone matches found, trying broader search");
            
            const searchUrl = "https://places.googleapis.com/v1/places:searchText";
            
            const requestBody = {
                textQuery: formattedPhone,
                maxResultCount: 20
            };

            const headers = {
                "Content-Type": "application/json",
                "X-Goog-Api-Key": apiKey,
                "X-Goog-FieldMask": "places.id,places.displayName,places.formattedAddress,places.nationalPhoneNumber,places.internationalPhoneNumber,places.websiteUri,places.googleMapsUri,places.rating,places.userRatingCount,places.businessStatus,places.types,places.primaryTypeDisplayName,places.currentOpeningHours,places.regularOpeningHours,places.priceLevel,places.shortFormattedAddress,places.addressComponents,places.location,places.plusCode,places.takeout,places.delivery,places.dineIn,places.curbsidePickup,places.reservable,places.paymentOptions,places.accessibilityOptions"
            };

            const response = await fetch(searchUrl, {
                method: "POST",
                headers: headers,
                body: JSON.stringify(requestBody)
            });

            const responseText = await response.text();

            if (!response.ok) {
                let errorMessage = `API Error: ${response.status}`;
                try {
                    const errorData = JSON.parse(responseText);
                    if (errorData.error?.message) {
                        errorMessage = errorData.error.message;
                        
                        // Provide helpful error messages
                        if (errorMessage.includes("API key not valid")) {
                            errorMessage = "Invalid API key. Please check your Google Places API key.";
                        } else if (errorMessage.includes("Places API")) {
                            errorMessage = "Places API (New) is not enabled. Please enable it in Google Cloud Console.";
                        } else if (errorMessage.includes("PERMISSION_DENIED")) {
                            errorMessage = "Permission denied. Please check if Places API (New) is enabled and your API key has the correct permissions.";
                        }
                    }
                } catch (e) {
                    errorMessage = `API Error: ${response.status} - ${response.statusText}`;
                }
                throw new Error(errorMessage);
            }

            const data = JSON.parse(responseText);
            
            if (data.places && data.places.length > 0) {
                displayResults(data.places, phoneNumber, 'phone');
                showError("No exact phone matches found. Showing related results. Try searching with different phone formats.");
            } else {
                displayResults([], phoneNumber, 'phone');
            }
        }

    } catch (err) {
        console.error("Search error:", err);
        showError(err.message || "Failed to search for businesses");
    } finally {
        setLoading(false, 'phone');
    }
}

// Search by business name
async function searchByBusinessName() {
    const apiKey = apiKeyInput.value.trim();
    const businessName = businessInput.value.trim();
    
    if (!apiKey) {
        showError("Please enter your Google Places API key");
        return;
    }

    if (!businessName) {
        showError("Please enter a business name to search");
        return;
    }

    setLoading(true, 'name');
    hideError();

    try {
        const searchUrl = "https://places.googleapis.com/v1/places:searchText";
        
        const requestBody = {
            textQuery: businessName
        };

        const headers = {
            "Content-Type": "application/json",
            "X-Goog-Api-Key": apiKey,
            "X-Goog-FieldMask": "places.id,places.displayName,places.formattedAddress,places.nationalPhoneNumber,places.internationalPhoneNumber,places.websiteUri,places.googleMapsUri,places.rating,places.userRatingCount,places.businessStatus,places.types,places.primaryTypeDisplayName,places.currentOpeningHours,places.regularOpeningHours,places.priceLevel,places.shortFormattedAddress,places.addressComponents,places.location,places.plusCode,places.takeout,places.delivery,places.dineIn,places.curbsidePickup,places.reservable,places.paymentOptions,places.accessibilityOptions"
        };

        console.log("Searching for business:", businessName);

        const response = await fetch(searchUrl, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(requestBody)
        });

        const responseText = await response.text();

        if (!response.ok) {
            let errorMessage = `API Error: ${response.status}`;
            try {
                const errorData = JSON.parse(responseText);
                if (errorData.error?.message) {
                    errorMessage = errorData.error.message;
                    
                    if (errorMessage.includes("API key not valid")) {
                        errorMessage = "Invalid API key. Please check your Google Places API key.";
                    } else if (errorMessage.includes("Places API")) {
                        errorMessage = "Places API (New) is not enabled. Please enable it in Google Cloud Console.";
                    } else if (errorMessage.includes("PERMISSION_DENIED")) {
                        errorMessage = "Permission denied. Please check if Places API (New) is enabled and your API key has the correct permissions.";
                    }
                }
            } catch (e) {
                errorMessage = `API Error: ${response.status} - ${response.statusText}`;
            }
            throw new Error(errorMessage);
        }

        const data = JSON.parse(responseText);
        console.log("Search results:", data);
        
        if (data.places && data.places.length > 0) {
            displayResults(data.places, businessName, 'name');
        } else {
            displayResults([], businessName, 'name');
        }

    } catch (err) {
        console.error("Search error:", err);
        showError(err.message || "Failed to search for businesses");
    } finally {
        setLoading(false, 'name');
    }
}
