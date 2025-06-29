let timer;
let remainingTime = 30 * 60; // 30 minutes in seconds
let phoneNumbers = [];

document.getElementById('addNumber').addEventListener('click', addPhoneNumber);
document.getElementById('sendMessage').addEventListener('click', sendMessage);
document.getElementById('goBack').addEventListener('click', goBack);

function startLoadingScreen() {
    document.getElementById('loadingScreen').classList.remove('hidden');
    document.getElementById('messageForm').classList.add('hidden');
    
    // Timer countdown
    timer = setInterval(function() {
        let minutes = Math.floor(remainingTime / 60);
        let seconds = remainingTime % 60;
        document.getElementById('timer').innerText = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        remainingTime--;
        
        if (remainingTime < 0) {
            clearInterval(timer);
            document.getElementById('loadingScreen').classList.add('hidden');
            document.getElementById('messageForm').classList.remove('hidden');
        }
    }, 1000);
}

function addPhoneNumber() {
    if (phoneNumbers.length >= 10) {
        alert('You can only add up to 10 numbers.');
        return;
    }

    let newInput = document.createElement('input');
    newInput.type = 'text';
    newInput.classList.add('phoneInput');
    newInput.placeholder = 'Enter another number';
    document.getElementById('phoneNumbers').appendChild(newInput);
}

function sendMessage() {
    let message = document.getElementById('message').value;
    if (!message || phoneNumbers.length === 0) {
        alert('Please enter a message and at least one phone number.');
        return;
    }

    // Collect phone numbers
    phoneNumbers = [...document.querySelectorAll('.phoneInput')].map(input => input.value.trim()).filter(num => num);

    // Show confirmation screen
    document.getElementById('messageForm').classList.add('hidden');
    document.getElementById('confirmation').classList.remove('hidden');

    // Display entered numbers
    let recipientsList = document.getElementById('recipientsList');
    recipientsList.innerHTML = '';
    phoneNumbers.forEach(num => {
        let listItem = document.createElement('li');
        listItem.textContent = num;
        recipientsList.appendChild(listItem);
    });
}

function goBack() {
    document.getElementById('confirmation').classList.add('hidden');
    document.getElementById('messageForm').classList.remove('hidden');
}

// Start loading when the page loads
startLoadingScreen();
