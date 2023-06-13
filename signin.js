document.getElementById('signin-form').addEventListener('submit', function (event) {
    event.preventDefault();

    // Get form inputs
    const username = document.getElementById('username-input').value;
    const password = document.getElementById('password-input').value;

    // Perform sign-in logic
    console.log('Performing sign-in logic...');
    console.log('Username:', username);
    console.log('Password:', password);
});