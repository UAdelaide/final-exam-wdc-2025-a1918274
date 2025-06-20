const logoutBtn = document.getElementById('logoutBtn');

async function logout() {
    try {
        const response = await fetch('/api/users/logout', {
            method: 'POST',
            credentials: 'include'
        });

        const result = await response.json();

        if(!response.ok) return new Error(result.error || 'Logout failed');

        alert('Logged out!');
        window.location.h
    } catch(e) {

    }
}