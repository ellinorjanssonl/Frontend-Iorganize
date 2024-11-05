import React, { useEffect, useState } from 'react';
import styles from './cookieConsent.module.css';

const CookieConsent = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [showMoreInfo, setShowMoreInfo] = useState(false);

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
                if (data.cookieConsent === "missing") {
                    setShowPopup(true); // Visa popup om inget val gjorts
                }
            } catch (error) {
                console.error("Error checking cookie consent:", error);
            }
        };

        checkCookieConsent();
    }, []);

    // Hantera accept-knappen
    const handleAccept = async () => {
        try {
            await fetch('http://localhost:3001/cookie/accept', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            setShowPopup(false); // Dölj popup efter att ha accepterat
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
            setShowPopup(false); // Dölj popup efter att ha avvisat
        } catch (error) {
            console.error("Error declining cookies:", error);
        }
    };

     if (!showPopup) return null; 

    return (
        <div className={styles.popup}>
            <div className={styles.popupContent}>
                <p>We use cookies to improve your experience. Do you accept cookies?</p>
                <button onClick={handleAccept} className={`${styles.button} ${styles.buttonAccept}`}>Accept</button>
                <button onClick={handleDecline} className={`${styles.button} ${styles.buttonDecline}`}>Decline</button>
                
                <button 
                    onClick={() => setShowMoreInfo(!showMoreInfo)} 
                    className={styles.readMore}
                >
                    Read more about our cookies and GDPR
                </button>

                {/* Extra information om cookies och GDPR */}
                {showMoreInfo && (
                    <div className={styles.moreInfo}>
                        <h4>Cookie and GDPR Information</h4>
                        <p>We use cookies to store user preferences, manage authentication, and provide secure access to our services. Some of the main uses include:</p>
                        <ul>
                            <li><strong>User Information:</strong> Cookies store essential data like user preferences and session information for a personalized experience.</li>
                            <li><strong>Authorization and Authentication:</strong> Cookies support secure logins and help protect access to your data.</li>
                            <li><strong>Permissions:</strong> Depending on your role, cookies may track permissions, like the ability to delete users or manage sensitive data.</li>
                            <li><strong>Data Security:</strong> Cookies are configured with secure settings, and sensitive information is handled according to GDPR standards.</li>
                        </ul>
                        <p>We are committed to protecting your data and only use cookies necessary for delivering our services. For more details, please refer to our privacy policy.</p>
                    </div>
                )}
            </div>
        </div>
    );
};


export default CookieConsent;
