const input1 = document.querySelector('.login_input1');
const input2 = document.querySelector('.login_input2');
const button = document.querySelector('.login_button');
const form = document.querySelector('.login-form');

const validateInput = ({ target }) => {
    if (target.value.length > 2) {
        button.removeAttribute('disabled');
        return;
    }
    button.setAttribute('disabled', '');
}

const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem('jogador1', input1.value);
    localStorage.setItem('jogador2', input2.value);
    window.location = 'jogoDaVelha.html';
}

input1.addEventListener('input', validateInput);
input2.addEventListener('input', validateInput);
form.addEventListener('submit', handleSubmit);