import React, { useEffect, useState } from 'react';
import styles from './cookieConsent.module.css';

const CookieConsent = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [showMoreInfo, setShowMoreInfo] = useState(false); // Track if 'read more' is clicked

    useEffect(() => {
        const checkCookieConsent = async () => {
            try {
                const response = await fetch('http://localhost:3001/cookie/check', {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const data = await response.json();
                if (!data.consentGiven) {
                    setShowPopup(true); // Visa popup om inget val gjorts
                }
            } catch (error) {
                console.error("Error checking cookie consent:", error);
            }
        };

        checkCookieConsent();
    }, []);

    const handleAccept = async () => {
        try {
            await fetch('http://localhost:3001/cookie/accept', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            setShowPopup(false); 
        } catch (error) {
            console.error("Error accepting cookies:", error);
        }
    };

    const handleDecline = async () => {
        try {
            await fetch('http://localhost:3001/cookie/decline', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            setShowPopup(false); 
        } catch (error) {
            console.error("Error declining cookies:", error);
        }
    };

    if (!showPopup) return null;

    return (
        <div className={styles.popup}>
            <div className={styles.popupContent}>
                <p>We use cookies to improve your experience. Do you accept cookies?</p>
                <div className={styles.buttonContainer}>
                    <button onClick={handleAccept} className={`${styles.button} ${styles.buttonAccept}`}>Accept</button>
                    <button onClick={handleDecline} className={`${styles.button} ${styles.buttonDecline}`}>Decline</button>
                </div>
                <button 
                    onClick={() => setShowMoreInfo(!showMoreInfo)} 
                    className={styles.readMore}
                >
                    Read more about our cookies
                </button>
                
                {/* Additional information about cookies */}
                {showMoreInfo && (
                    <div className={styles.moreInfo}>
                        <p><strong>What are cookies?</strong></p>
                        <p>Cookies are small text files stored on your device to improve site functionality and user experience. Common types include:</p>
                        <ul>
                            <li><strong>Essential Cookies:</strong> Required for core site functionality, such as logging in and managing sessions.</li>
                        </ul>
                        <p><strong>GDPR Compliance</strong></p>
                        <p>We handle cookies in compliance with GDPR to ensure your data privacy. You can manage your cookie preferences at any time.</p>
                        <p>Cookies are not used for marketing or tracking purposes.</p>

                    </div>
                )}
            </div>
        </div>
    );
};

export default CookieConsent;
