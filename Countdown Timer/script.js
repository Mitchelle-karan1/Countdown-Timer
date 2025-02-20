const alarmSound = new Audio('alarm.mp3'); // Make sure to add an "alarm.mp3" file in the project

let countdown;
let timeLeft = 0;
let isPaused = false;

// Function to start the countdown
function startCountdown() {
    const input = document.getElementById('timeInput');
    const display = document.getElementById('display');

    // Get the time from input field
    if (!isPaused) {
        timeLeft = parseInt(input.value, 10);
    }

    if (isNaN(timeLeft) || timeLeft <= 0) {
        alert('Please enter a valid number of seconds.');
        return;
    }

    clearInterval(countdown);

    countdown = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(countdown);
            display.textContent = 'Time\'s up!';
        } else {
            timeLeft--;
            display.textContent = formatTime(timeLeft);
        }
    }, 1000);

    isPaused = false;
}

// Function to pause the countdown
function pauseCountdown() {
    clearInterval(countdown);
    isPaused = true;
}

// Function to reset the countdown
function resetCountdown() {
    clearInterval(countdown);
    timeLeft = 0;
    isPaused = false;
    document.getElementById('display').textContent = '00:00';
    document.getElementById('timeInput').value = '';
}

// Helper function to format time in MM:SS
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

// Event listeners for buttons
document.getElementById('startBtn').addEventListener('click', startCountdown);
document.getElementById('pauseBtn').addEventListener('click', pauseCountdown);
document.getElementById('resetBtn').addEventListener('click', resetCountdown);

countdown = setInterval(() => {
    if (timeLeft <= 0) {
        clearInterval(countdown);
        display.textContent = "Time's up!";
        alarmSound.play();  // Play alarm sound
    } else {
        timeLeft--;
        display.textContent = formatTime(timeLeft);
        updateProgressBar(totalTime, timeLeft);
    }
}, 1000);

document.getElementById('darkModeToggle').addEventListener('change', function() {
    document.body.classList.toggle('dark-mode');
});

const progressBar = document.getElementById('progressBar');

function updateProgressBar(totalTime, timeLeft) {
    const progress = ((totalTime - timeLeft) / totalTime) * 100;
    progressBar.value = progress;
}
function startCountdown() {
    const minutes = parseInt(document.getElementById('minutesInput').value, 10) || 0;
    const seconds = parseInt(document.getElementById('secondsInput').value, 10) || 0;
    
    timeLeft = minutes * 60 + seconds;
    totalTime = timeLeft;
    
    if (timeLeft <= 0) {
        alert('Please enter a valid time.');
        return;
    }

    clearInterval(countdown);
    updateProgressBar(totalTime, timeLeft);

    countdown = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(countdown);
            display.textContent = "Time's up!";
            alarmSound.play();
            navigator.vibrate(1000); // Vibrates for 1 second
        } else {
            timeLeft--;
            display.textContent = formatTime(timeLeft);
            updateProgressBar(totalTime, timeLeft);
            updateProgressBar(totalTime, timeLeft);
            updateTabTitle(timeLeft);
        }
    }
, 1000);
}
document.getElementById('pauseBtn').addEventListener('click', () => {
    isPaused = !isPaused;
    document.getElementById('pauseBtn').textContent = isPaused ? "Resume" : "Pause";
});
document.getElementById('resetBtn').addEventListener('click', () => {
    clearInterval(countdown);
    timeLeft = 0;
    display.textContent = "00:00";
    updateProgressBar(1, 1);
    document.getElementById('pauseBtn').textContent = "Pause"; 
    isPaused = false;
    document.title = "Countdown Timer"; // Reset title
});
document.getElementById('alarmSoundSelect').addEventListener('change', function() {
    alarmSound.src = this.value;
});
function updateTabTitle(timeLeft) {
    document.title = timeLeft > 0 ? `⏳ ${formatTime(timeLeft)} - Countdown Timer` : "⏰ Time's up!";
}
