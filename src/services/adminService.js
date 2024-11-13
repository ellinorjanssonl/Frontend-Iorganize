// src/services/adminService.js
const API_URL = 'http://localhost:3002'; 

export const fetchUserData = async (token, csrfToken) => {
    const response = await fetch(`${API_URL}/gdpr/request-data`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Authorization': `Bearer ${token}`,
            'x-csrf-token': csrfToken, // Lägg till CSRF-token i headern om den krävs
            'Content-Type': 'application/json',
        },
    });
    return response.json();
};

export const deleteUserData = async (token, csrfToken) => {
    const response = await fetch(`${API_URL}/gdpr/request-delete`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            'Authorization': `Bearer ${token}`,
            'x-csrf-token': csrfToken, // Lägg till CSRF-token i headern om den krävs
            'Content-Type': 'application/json',
        },
    });
    return response.json();
};
