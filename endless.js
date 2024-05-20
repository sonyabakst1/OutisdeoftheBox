document.addEventListener("DOMContentLoaded", function() {
  const container = document.querySelector('.section');
  const threshold = 120;

  // Define getRandomPosition right at the start so it can be used in any function below
  function getRandomPosition(container) {
      var containerRect = container.getBoundingClientRect();
      var containerWidth = containerRect.width;
      var containerHeight = containerRect.height;
      var buffer = 2000;  // Buffer to get random positions

      var posX = Math.floor(Math.random() * (containerWidth + buffer)) - buffer;
      var posY = Math.floor(Math.random() * (containerHeight + buffer)) - buffer;

      return { x: posX, y: posY };
  }

  // Initial scroll to position
  window.scrollTo(threshold, threshold);

  // Scroll event listener
  window.addEventListener('scroll', () => {
      const halfHeight = container.clientHeight / 2;
      const halfWidth = container.clientWidth / 2;

      // Vertical scrolling
      if (window.scrollY > halfHeight + threshold) {
          window.scrollTo(0, window.scrollY - halfHeight);
      } else if (window.scrollY < threshold) {
          window.scrollTo(0, halfHeight + window.scrollY);
      }

      // Horizontal scrolling
      if (window.scrollX > halfWidth + threshold) {
          window.scrollTo(window.scrollX - halfWidth, window.scrollY);
      } else if (window.scrollX < threshold) {
          window.scrollTo(halfWidth + window.scrollX, window.scrollY);
      }
  });

  // Function to clone and position pictures
  function cloneAndPositionPictures() {
      const articles = container.querySelectorAll('.article');
      const numImages = 30;

      articles.forEach(article => {
          const clonedArticle = article.cloneNode(true);
          container.appendChild(clonedArticle);

          const clonedPictures = clonedArticle.querySelectorAll('.pictures');

          for (let i = 0; i < numImages; i++) {
              clonedPictures.forEach(clonedPicture => {
                  const newPicture = clonedPicture.cloneNode(true);
                  const randomPos = getRandomPosition(container);
                  newPicture.style.position = 'absolute';
                  newPicture.style.left = randomPos.x + 'px';
                  newPicture.style.top = randomPos.y + 'px';
                  clonedArticle.appendChild(newPicture);
              });
          }
      });
  }

  function handleLoopedContainers() {
      const loopedContainers = document.querySelectorAll('.section .article:not(:first-child)');

      loopedContainers.forEach(loopedContainer => {
          const loopedPictures = loopedContainer.querySelectorAll('.pictures');
          loopedPictures.forEach(loopedPicture => {
              const randomPos = getRandomPosition(container);
              loopedPicture.style.position = 'absolute';
              loopedPicture.style.left = randomPos.x + 'px';
              loopedPicture.style.top = randomPos.y + 'px';
          });
      });
  }

  cloneAndPositionPictures();
  handleLoopedContainers();

  // Popup modal for initial introduction
  const popupModal = document.getElementById("popupModal");
  const exploreButton = document.querySelector(".explore-button");

  // Function to toggle the visibility of the popup modal
  function togglePopupModal() {
      popupModal.style.display = (popupModal.style.display === "none" || popupModal.style.display === "") ? "block" : "none";
  }

  // Show the popup modal on page load
  togglePopupModal();

  exploreButton.addEventListener("click", togglePopupModal);

  const imageModal = document.getElementById("imageModal");
  const largeImage = document.getElementById("largeImage");
  const itemName = document.getElementById("itemName");
  const imageCloseButton = document.querySelector(".image-close-button");

  // Function to open image modal and update its content
  function openImageModal(src, alt) {
      largeImage.src = src;
      largeImage.alt = alt;
      itemName.textContent = alt; // Update the modal's item name using the image's alt text

      imageModal.style.display = "block"; // Show the modal
  }

  // Add event listeners to images to open them in the modal
  document.querySelectorAll(".pictures").forEach(function(image) {
      image.addEventListener("click", function() {
          openImageModal(image.src, image.alt);
      });
  });

  // Function to close the image modal
  imageCloseButton.addEventListener("click", function() {
      imageModal.style.display = "none";
  });

  // Function to close the modal if clicking outside its content
  window.addEventListener("click", function(event) {
      if (event.target === imageModal || event.target === popupModal) {
          event.target.style.display = "none";
      }
  });
});
document.addEventListener("DOMContentLoaded", function() {
  const imageModal = document.getElementById("imageModal");
  const largeImage = document.getElementById("largeImage");
  const itemName = document.getElementById("itemName");
  const imageCloseButton = document.querySelector(".image-close-button");
  const submitButton = document.querySelector(".submit-button");
  const commentInput = document.querySelector(".comment-input");
  const commentsDisplay = document.querySelector(".comments-display");

  function openImageModal(src, alt) {
    imageModal.style.display = "block";
    largeImage.src = src;
    largeImage.alt = alt;
    itemName.textContent = alt;
  }

  document.querySelectorAll(".pictures").forEach(image => {
    image.addEventListener("click", () => openImageModal(image.src, image.alt));
  });

  imageCloseButton.addEventListener("click", () => {
    imageModal.style.display = "none";
  });

  window.addEventListener("click", event => {
    if (event.target === imageModal) {
      imageModal.style.display = "none";
    }
  });

  submitButton.addEventListener("click", () => {
    const commentText = commentInput.value.trim();
    if (commentText) {
      const commentElement = document.createElement("p");
      commentElement.textContent = commentText;
      commentsDisplay.appendChild(commentElement);
      commentInput.value = "";
    }
  });
});
