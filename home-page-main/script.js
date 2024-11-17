let hamMenuIcon = document.getElementById("ham-menu");
let navBar = document.getElementById("nav-bar");
let navLinks = navBar.querySelectorAll("li");
let scrollTopBtn = document.getElementById("scroll-top");

/* SideMenu Toggle */
hamMenuIcon.addEventListener("click", () => {
  navBar.classList.toggle("active");
  hamMenuIcon.classList.toggle("fa-times");
});
navLinks.forEach((navLinks) => {
  navLinks.addEventListener("click", () => {
    navBar.classList.remove("active");
    hamMenuIcon.classList.toggle("fa-times");
  });
});

let header = document.querySelector("header");
window.onscroll = () => {
  /* Sticky Header */
  let pos = document.documentElement.scrollTop;
  if (pos > 0) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
  /* Scroll Top Button */
  if (pos > 300) {
    scrollTopBtn.style.display = "grid";
  } else {
    scrollTopBtn.style.display = "none";
  }

  scrollTopBtn.addEventListener("click", () => {
    document.documentElement.scrollTop = 0;
  });
};

let currentIndex = 0;
const items = document.querySelectorAll('.carousel-item');
const totalItems = items.length;
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');

// Function to move the carousel
function updateCarousel() {
  // Reset all items to non-active state
  items.forEach((item, index) => {
    item.style.transform = `rotateY(${(index - currentIndex) * 90}deg)`;
    item.classList.remove('active');
    item.style.opacity = '0.8';
  });

  // Mark the current item as active
  const activeItem = items[currentIndex];
  activeItem.classList.add('active');
  activeItem.style.opacity = '1';
}

// Move to the previous item
prevButton.addEventListener('click', () => {
  currentIndex = (currentIndex === 0) ? totalItems - 1 : currentIndex - 1;
  updateCarousel();
});

// Move to the next item
nextButton.addEventListener('click', () => {
  currentIndex = (currentIndex === totalItems - 1) ? 0 : currentIndex + 1;
  updateCarousel();
});

// Initialize the carousel on load
updateCarousel();
