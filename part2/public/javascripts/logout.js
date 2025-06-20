const logoutBtn = document.getElementById('logoutBtn');

async function logout() {
    try {
        const response = await fetch('/api/users/logout', {
            method: 'POST',
            headers
        })
    } catch(e) {

    }
}