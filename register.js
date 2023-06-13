document.getElementById('register-form').addEventListener('submit', function (event) {
    event.preventDefault();

    // Get form inputs
    const username = document.getElementById('new-username-input').value;
    const password = document.getElementById('new-password-input').value;
    const confirmPassword = document.getElementById('confirm-password-input').value;

    // Perform registration logic
    console.log('Performing registration logic...');
    console.log('Username:', username);
    console.log('Password:', password);
    console.log('Confirm Password:', confirmPassword);
});