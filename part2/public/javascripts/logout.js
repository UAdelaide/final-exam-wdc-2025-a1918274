const logoutBtn = document.getElementById('logoutBtn');

async function logout() {
    try {
        const response = await fetch('/api/users/logout', {
            method: 'POST',
            credentials: 'include'
        });

        const result = await response.json();
    } catch(e) {

    }
}