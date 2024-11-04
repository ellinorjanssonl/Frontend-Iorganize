import React, { useEffect, useState } from 'react';
import styles from './cookieConsent.module.css';

const CookieConsent = () => {
    const [showPopup, setShowPopup] = useState(false);

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
            </div>
        </div>
    );
};

export default CookieConsent;
