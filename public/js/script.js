// Function to handle user login to Spotify
function loginWithSpotify() {
  const clientId = "c3f2317f0a1947bd819cbf6a3fa85b1b";
  const redirectUri = "https://harmonyscout.onrender.com/callback";
  const scopes = "user-read-private user-read-email";
  const authUrl = `https://accounts.spotify.com/authorize?response_type=token&client_id=${clientId}&scope=${encodeURIComponent(
    scopes
  )}&redirect_uri=${encodeURIComponent(redirectUri)}`;
  window.location.href = authUrl;
}

// Function to handle the 'Start Discovering' button click
function startDiscovering() {
  var mainContent = document.getElementById("mainContent");
  var options = document.getElementById("options");
  mainContent.style.opacity = "0";
  setTimeout(function () {
    mainContent.classList.add("hidden");
    options.classList.remove("hidden");
  }, 1000);
}

function signIn() {
  location.href = "/signin"
}

function signUp() {
  location.href = "/signup"
}