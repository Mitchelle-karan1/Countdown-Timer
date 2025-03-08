const audioPlayer = document.getElementById("audio-player");
const playPauseBtn = document.getElementById("playPause");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const seekBar = document.getElementById("seek-bar");
const volumeBar = document.getElementById("volume-bar");
const trackTitle = document.getElementById("track-title");
const playlistItems = document.querySelectorAll(".track");

let currentTrack = 0;
const tracks = Array.from(playlistItems).map(track => track.dataset.src);

function loadTrack(index) {
    audioPlayer.src = tracks[index];
    trackTitle.textContent = playlistItems[index].textContent;
    audioPlayer.play();
    playPauseBtn.textContent = "⏸️";
}

playPauseBtn.addEventListener("click", () => {
    if (audioPlayer.paused) {
        audioPlayer.play();
        playPauseBtn.textContent = "⏸️";
    } else {
        audioPlayer.pause();
        playPauseBtn.textContent = "▶️";
    }
});

nextBtn.addEventListener("click", () => {
    currentTrack = (currentTrack + 1) % tracks.length;
    loadTrack(currentTrack);
});

prevBtn.addEventListener("click", () => {
    currentTrack = (currentTrack - 1 + tracks.length) % tracks.length;
    loadTrack(currentTrack);
});

audioPlayer.addEventListener("timeupdate", () => {
    seekBar.value = (audioPlayer.currentTime / audioPlayer.duration) * 100;
});

seekBar.addEventListener("input", () => {
    audioPlayer.currentTime = (seekBar.value / 100) * audioPlayer.duration;
});

volumeBar.addEventListener("input", () => {
    audioPlayer.volume = volumeBar.value;
});

playlistItems.forEach((item, index) => {
    item.addEventListener("click", () => {
        currentTrack = index;
        loadTrack(currentTrack);
    });
});

// Load first track
loadTrack(currentTrack);

const audio = document.getElementById("audio");
const playPauseBtn = document.getElementById("playPause");
const volumeControl = document.getElementById("volume");
const darkModeBtn = document.getElementById("darkMode");
const body = document.body;

// 🎵 Toggle Play/Pause
playPauseBtn.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
        playPauseBtn.textContent = "⏸ Pause";
    } else {
        audio.pause();
        playPauseBtn.textContent = "▶ Play";
    }
});

// 🔊 Volume Control
volumeControl.addEventListener("input", () => {
    audio.volume = volumeControl.value;
});

// 🌙 Dark Mode Toggle
darkModeBtn.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
});

const audio = document.getElementById("audio");
const playPauseBtn = document.getElementById("playPause");
const volumeControl = document.getElementById("volume");
const darkModeBtn = document.getElementById("darkMode");
const body = document.body;
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const shuffleBtn = document.getElementById("shuffle");

// 🎵 Playlist of Songs
const songs = ["song1.mp3", "song2.mp3", "song3.mp3"];
let currentIndex = 0;

// ▶ Toggle Play/Pause
playPauseBtn.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
        playPauseBtn.textContent = "⏸ Pause";
    } else {
        audio.pause();
        playPauseBtn.textContent = "▶ Play";
    }
});

// 🔊 Volume Control
volumeControl.addEventListener("input", () => {
    audio.volume = volumeControl.value;
});

// 🌙 Dark Mode Toggle
darkModeBtn.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
});

// ⏭ Next Track
nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % songs.length;
    audio.src = songs[currentIndex];
    audio.play();
    playPauseBtn.textContent = "⏸ Pause";
});

// ⏮ Previous Track
prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + songs.length) % songs.length;
    audio.src = songs[currentIndex];
    audio.play();
    playPauseBtn.textContent = "⏸ Pause";
});

// 🔀 Shuffle Tracks
shuffleBtn.addEventListener("click", () => {
    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * songs.length);
    } while (randomIndex === currentIndex);
    currentIndex = randomIndex;
    audio.src = songs[currentIndex];
    audio.play();
    playPauseBtn.textContent = "⏸ Pause";
});

shuffleBtn.addEventListener("click", () => {
    let previousIndex = currentIndex;
    while (currentIndex === previousIndex) {
        currentIndex = Math.floor(Math.random() * songs.length);
    }
    audio.src = songs[currentIndex];
    audio.play();
    playPauseBtn.textContent = "⏸ Pause";
});
