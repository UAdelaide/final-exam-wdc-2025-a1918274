document.addEventListener('DOMContentLoaded', () => {

    const logoutBtn = document.getElementById('logoutBtn');
    if(logoutBtn){
        logoutBtn.addEventListener('click')
    }
    async function logout() {
    try {
        const response = await fetch('/api/users/logout', {
            method: 'POST',
            credentials: 'include'
        });

        const result = await response.json();

        if(!response.ok) throw new Error(result.error || 'Logout failed');

console.log('Logged out!');
window.location.href = '/';

    } catch (e) {
    console.error('error for log out:', e);
}

})