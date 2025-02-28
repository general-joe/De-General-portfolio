const sideMenu = document.querySelector("#sideMenu");
const navBar = document.querySelector("nav");
const navLinks = document.querySelector("nav ul");
function openMenu() {
  sideMenu.style.transform = "translateX(-16rem)";
}
function closeMenu() {
  sideMenu.style.transform = "translateX(16rem)";
}

window.addEventListener("scroll", () => {
  if (scrollY > 50) {
    navBar.classList.add(
      "bg-white",
      "bg-opacity-50",
      "backdrop-blur-lg",
      "shadow-sm",
      "dark:bg-darkTheme",
      "dark:shadow-white/20"
    );
    navLinks.classList.remove(
      "bg-white",
      "shadow-sm",
      "bg-opacity-50",
      "dark:border",
      "dark:border-white/50",
      "dark:bg-transparent"
    );
  } else {
    navBar.classList.remove(
      "bg-white",
      "bg-opacity-50",
      "backdrop-blur-lg",
      "shadow-sm",
      "dark:bg-darkTheme",
      "dark:shadow-white/20"
    );

    navLinks.classList.add(
      "bg-white",
      "shadow-sm",
      "bg-opacity-50",
      "dark:border",
      "dark:border-white/50",
      "dark:bg-transparent"
    );
  }
});

// light mode and dark mode

if (
  localStorage.theme === "dark" ||
  (!("theme" in localStorage) &&
    window.matchMedia("(prefers-color-scheme:dark)").matches)
) {
  document.documentElement.classList.add("dark");
} else {
  document.documentElement.classList.remove("dark");
}

function toggleTheme() {
  document.documentElement.classList.toggle("dark");

  if (document.documentElement.classList.contains("dark")) {
    localStorage.theme = "dark";
  } else {
    localStorage.theme = "light";
  }
}

//Reset form after submition and show notifications
const form = document.querySelector("form");

// Create notification elements
const notification = document.createElement("div");
notification.style.position = "fixed";
notification.style.bottom = "20px";
notification.style.right = "20px";
notification.style.padding = "15px 25px";
notification.style.borderRadius = "5px";
notification.style.display = "none";
notification.style.zIndex = "1000";
notification.style.transition = "opacity 0.5s ease-in-out";
document.body.appendChild(notification);

// Function to show notification
function showNotification(message, isSuccess) {
  notification.textContent = message;
  notification.style.display = "block";
  notification.style.opacity = "1";

  if (isSuccess) {
    notification.style.backgroundColor = "#4CAF50";
    notification.style.color = "white";
  } else {
    notification.style.backgroundColor = "#f44336";
    notification.style.color = "white";
  }

  // Hide notification after 3 seconds
  setTimeout(() => {
    notification.style.opacity = "0";
    setTimeout(() => {
      notification.style.display = "none";
    }, 500);
  }, 3000);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  // Show loading state
  const submitButton = form.querySelector("button");
  const originalButtonText = submitButton.innerHTML;
  submitButton.innerHTML =
    'Sending... <img src="./assets/right-arrow-white.png" alt="" class="w-4" />';
  submitButton.disabled = true;

  fetch(form.action, {
    method: form.method,
    body: new FormData(form),
  })
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      showNotification("Message sent successfully!", true);
      form.reset();
    })
    .catch((error) => {
      console.error("Error submitting the form:", error);
      showNotification("Failed to send message. Please try again.", false);
    })
    .finally(() => {
      // Reset button state
      submitButton.innerHTML = originalButtonText;
      submitButton.disabled = false;
    });
});
