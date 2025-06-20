async function logout() {
    try {
        const response = await fetch('/api/users/logout', {
            method: 'POST',
            credentials: 'include'
        });

        const result = await response.json();

        if (!response.ok) throw new Error(result.error || 'Logout failed');

        alert('Logged out!');
        window.location.href = '/';
    } catch (e) {
        alert('error for log out:', e);
    }
}
