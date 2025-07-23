document.addEventListener('DOMContentLoaded', () => {
    // --- Hamburger Menu Logic ---
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mainNav = document.querySelector('.main-nav');
    // const headerCategories = document.querySelector('.header-categories'); // Uncomment if you want to toggle categories visibility with main nav

    if (hamburgerMenu && mainNav) {
        hamburgerMenu.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            // if (headerCategories) { headerCategories.classList.toggle('active'); } // Uncomment if you toggle categories visibility
        });

        // Close menu if a nav link is clicked (for single-page navigation or convenience)
        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    // if (headerCategories) { headerCategories.classList.remove('active'); } // Uncomment if you toggle categories visibility
                }
            });
        });
    }


    // --- Slideshow Logic for Collection Cards (index.html, art.html, lamps.html) ---
    const collectionCards = document.querySelectorAll('.collection-card');

    collectionCards.forEach(card => {
        const images = card.querySelectorAll('.slideshow-image');
        let currentImageIndex = 0;
        let slideshowInterval;

        if (images.length > 1) { // Only enable slideshow if there's more than one image
            // Ensure only the first image is visible initially
            images.forEach((img, index) => {
                if (index === 0) {
                    img.classList.add('active');
                } else {
                    img.classList.remove('active');
                }
            });

            card.addEventListener('mouseenter', () => {
                // Stop any existing interval to prevent multiple slideshows
                clearInterval(slideshowInterval);

                // Start slideshow on hover
                slideshowInterval = setInterval(() => {
                    images[currentImageIndex].classList.remove('active');
                    currentImageIndex = (currentImageIndex + 1) % images.length;
                    images[currentImageIndex].classList.add('active');
                }, 1500); // Change image every 1.5 seconds
            });

            card.addEventListener('mouseleave', () => {
                // Stop slideshow and reset to the first image
                clearInterval(slideshowInterval);
                images[currentImageIndex].classList.remove('active');
                currentImageIndex = 0;
                images[currentImageIndex].classList.add('active'); // Ensure first image is active again
            });
        }
    });

    // --- Dynamic Image Loading for collection-details.html ---
    const urlParams = new URLSearchParams(window.location.search);
    const collectionName = urlParams.get('name');
    const collectionType = urlParams.get('type');
    const collectionTitleElement = document.getElementById('collectionTitle');
    const imageGalleryContainer = document.getElementById('imageGallery');

    // Define art collection images data
    const artCollectionImagesData = {
        'Ballerina': [
            'Ballerina (1).jpg', 'Ballerina (2).jpg', 'Ballerina (3).jpg', 'Ballerina (4).jpg',
        ],
        'Disney princess': [
            'Disney princess (1).jpg', 'Disney princess (2).jpg', 'Disney princess (3).jpg', 'Disney princess (4).jpg'
        ],
        'Halloween': [
            'Halloween (1).jpg', 'Halloween (2).jpg',
        ],
        'Ischia': [
            'Ischia (1).jpg', 'Ischia (2).jpg', 'Ischia (3).jpg', 'Ischia (4).jpg'
        ],
        'Koi Fish': [
            'Koi Fish (1).jpg', 'Koi Fish (2).jpg',
        ],
        'Landscape': [
            'Landscape (1).jpg', 'Landscape (2).jpg'
        ],
        'Little Mermaid': [
            'Little Mermaid (1).jpg', 'Little Mermaid (2).jpg'
        ],
        'Love at first sight': [
            'Love at first sight (1).jpg',
        ],
        'Love bound': [
            'Love bound (1).jpg', 'Love bound (2).jpg',
        ],
        'Love in Paris': [
            'Love in Paris (1).jpg', 'Love in Paris (2).jpg'
        ],
        'Magic Koi': [
            'Magic Koi (1).jpg', 'Magic Koi (2).jpg', 'Magic Koi (3).jpg', 'Magic Koi (4).jpg'
        ],
        'Maleficent': [
            'Maleficent (1).jpg', 'Maleficent (2).jpg'
        ],
        'Night Out': [
            'Night Out (1).jpg',
        ],
        'Sunflower': [
            'Sunflower (1).jpg', 'Sunflower (2).jpg',
        ],
        'Tea Time': [
            'Tea Time (1).jpg', 'Tea Time (2).jpg', 'Tea Time (3).jpg',
        ],
        'Under the sea': [
            'Under the sea (1).jpg',
        ]
    };

    // Define lamp collection images data
    const lampCollectionImagesData = {
        'Bamboolamp': Array.from({ length: 10 }, (_, i) => `bamboolamp (${i + 1}).jpg`),
        'MiniBar': [
            'minibar (1).jpg', 'minibar (2).jpg', 'minibar (3).jpg', 'minibar (4).jpg'
        ]
    };


    if (collectionName && collectionTitleElement && imageGalleryContainer) {
        const displayCollectionTitle = collectionName.split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');

        collectionTitleElement.textContent = `${displayCollectionTitle} Collection`;

        let imagesToLoad = [];
        let imageBasePath = '';

        if (collectionType === 'lamp') {
            imagesToLoad = lampCollectionImagesData[collectionName];
            if (collectionName === 'Bamboolamp') {
                imageBasePath = `images/lamp/`;
            } else if (collectionName === 'MiniBar') {
                imageBasePath = `images/minibar/`;
            } else {
                imageBasePath = `images/lamp/${collectionName.toLowerCase()}/`;
            }
        } else { // Default to art if no type or type is 'art'
            imagesToLoad = artCollectionImagesData[collectionName];
            imageBasePath = `images/Art/${collectionName}/`;
        }

        if (imagesToLoad && imagesToLoad.length > 0) {
            imageGalleryContainer.innerHTML = '';
            imagesToLoad.forEach((imageFileName, index) => {
                const imgPath = `${imageBasePath}${imageFileName}`;
                const artworkItem = document.createElement('div');
                artworkItem.classList.add('artwork-item');

                const imgElement = document.createElement('img');
                imgElement.src = imgPath;
                imgElement.alt = `${collectionName} Image ${index + 1}`;
                imgElement.setAttribute('data-fullsize', imgPath);
                imgElement.setAttribute('data-collection', collectionName);
                imgElement.setAttribute('data-filename', imageFileName);

                imgElement.onerror = function() {
                    console.error(`Failed to load image: ${this.src}`);
                    this.src = 'https://placehold.co/300x200/cccccc/333333?text=Image+Load+Error';
                    this.alt = 'Image failed to load';
                };

                artworkItem.appendChild(imgElement);
                imageGalleryContainer.appendChild(artworkItem);
            });

            const backButton = document.querySelector('.button-explore');
            if (backButton) {
                if (collectionType === 'art') {
                    backButton.textContent = 'Back to Art Collections';
                    backButton.href = 'art.html';
                } else if (collectionType === 'lamp') {
                    backButton.textContent = 'Back to Lamp Collections';
                    backButton.href = 'lamps.html';
                }
            }

            initializeImageLightbox();
        } else if (imageGalleryContainer && window.location.pathname.includes('gallery.html')) {
            document.getElementById('galleryCategoryTitle').textContent = "Our Full Gallery";
            document.getElementById('galleryCategoryDescription').textContent = "Browse a selection of all our beautiful creations.";
        } else {
            imageGalleryContainer.innerHTML = `<p>No images found for the '${collectionName}' collection or collection not defined. Please check folder and file names and script.js data.</p>`;
        }
    }


    // --- Lightbox Functionality for Images (from collection-details.html and gallery.html) ---
    let currentLightboxImageIndex = 0;
    let currentLightboxCollectionImages = [];

    function initializeImageLightbox() {
        const artworkItems = document.querySelectorAll('.artwork-item');
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        const closeButton = lightbox ? lightbox.querySelector('.close-button') : null;
        const prevButton = lightbox ? lightbox.querySelector('.prev-button') : null;
        const nextButton = lightbox ? lightbox.querySelector('.next-button') : null;

        if (!lightbox || !lightboxImg || !closeButton || !prevButton || !nextButton) {
            return;
        }

        artworkItems.forEach((item, index) => {
            item.addEventListener('click', function() {
                const img = this.querySelector('img');
                const collection = img.getAttribute('data-collection');
                const clickedFileName = img.getAttribute('data-filename');

                const currentType = urlParams.get('type');
                let dataSource = null;
                let basePath = '';

                if (currentType === 'lamp') {
                    dataSource = lampCollectionImagesData;
                    if (collection === 'Bamboolamp') {
                        basePath = `images/lamp/`;
                    } else if (collection === 'MiniBar') {
                        basePath = `images/minibar/`;
                    } else {
                        basePath = `images/lamp/${collection.toLowerCase()}/`;
                    }
                } else {
                    dataSource = artCollectionImagesData;
                    basePath = `images/Art/${collection}/`;
                }

                currentLightboxCollectionImages = dataSource[collection].map(filename => `${basePath}${filename}`);
                currentLightboxImageIndex = currentLightboxCollectionImages.findIndex(src => src.includes(clickedFileName));

                showLightboxImage(currentLightboxImageIndex);

                lightbox.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            });
        });

        function showLightboxImage(index) {
            if (currentLightboxCollectionImages.length === 0) return;

            if (index < 0) {
                currentLightboxImageIndex = currentLightboxCollectionImages.length - 1;
            } else if (index >= currentLightboxCollectionImages.length) {
                currentLightboxImageIndex = 0;
            } else {
                currentLightboxImageIndex = index;
            }

            lightboxImg.src = currentLightboxCollectionImages[currentLightboxImageIndex];
        }

        lightboxImg.addEventListener('click', (event) => {
            event.stopPropagation();
            showLightboxImage(currentLightboxImageIndex + 1);
        });

        prevButton.addEventListener('click', (event) => {
            event.stopPropagation();
            showLightboxImage(currentLightboxImageIndex - 1);
        });

        nextButton.addEventListener('click', (event) => {
            event.stopPropagation();
            showLightboxImage(currentLightboxImageIndex + 1);
        });

        closeButton.addEventListener('click', function() {
            lightbox.style.display = 'none';
            document.body.style.overflow = '';
            currentLightboxCollectionImages = [];
            currentLightboxImageIndex = 0;
        });

        lightbox.addEventListener('click', function(event) {
            if (event.target === lightbox) {
                lightbox.style.display = 'none';
                document.body.style.overflow = '';
                currentLightboxCollectionImages = [];
                currentLightboxImageIndex = 0;
            }
        });

        document.addEventListener('keydown', function(event) {
            if (lightbox.style.display === 'flex') {
                if (event.key === 'Escape') {
                    lightbox.style.display = 'none';
                    document.body.style.overflow = '';
                    currentLightboxCollectionImages = [];
                    currentLightboxImageIndex = 0;
                } else if (event.key === 'ArrowLeft') {
                    showLightboxImage(currentLightboxImageIndex - 1);
                } else if (event.key === 'ArrowRight') {
                    showLightboxImage(currentLightboxImageIndex + 1);
                }
            }
        });
    }

    // --- Video Lightbox Functionality (Centralized) ---
    function setupVideoLightbox(galleryId) {
        const videoLightbox = document.getElementById("videoLightbox");
        const lightboxVideo = document.getElementById("lightbox-video");
        const closeButton = videoLightbox ? videoLightbox.querySelector(".close-button") : null;
        const prevButton = videoLightbox ? videoLightbox.querySelector(".prev-button") : null;
        const nextButton = videoLightbox ? videoLightbox.querySelector(".next-button") : null;
        const videoItems = document.querySelectorAll(`#${galleryId} .video-item`);
        let currentVideoIndex = 0;
        let videos = [];

        if (!videoLightbox || !lightboxVideo || !closeButton || !prevButton || !nextButton || videoItems.length === 0) {
            // console.warn(`Video Lightbox elements for ${galleryId} not found or no videos. Functionality will not be active.`);
            return;
        }

        videos = Array.from(videoItems).map(item => ({
            src: item.querySelector("video").getAttribute("data-video-src"),
            poster: item.querySelector("video").getAttribute("poster")
        }));

        videoItems.forEach((item, index) => {
            const videoElement = item.querySelector("video");
            videoElement.addEventListener('play', function() {
                item.classList.add('playing');
            });
            videoElement.addEventListener('pause', function() {
                item.classList.remove('playing');
            });
            videoElement.addEventListener('ended', function() {
                item.classList.remove('playing');
                this.currentTime = 0;
                this.play();
            });

            // Click listener for the entire video item to open lightbox
            item.addEventListener("click", () => {
                currentVideoIndex = index;
                openVideoLightbox(videos[currentVideoIndex].src);
            });
        });

        function openVideoLightbox(videoSrc) {
            document.querySelectorAll('.video-wrapper video').forEach(video => {
                video.pause();
            });

            lightboxVideo.src = videoSrc;
            videoLightbox.style.display = "flex";
            setTimeout(() => {
                videoLightbox.classList.add("active");
                lightboxVideo.play();
            }, 10);
        }

        function closeVideoLightbox() {
            videoLightbox.classList.remove("active");
            setTimeout(() => {
                videoLightbox.style.display = "none";
                lightboxVideo.pause();
                lightboxVideo.currentTime = 0;
                lightboxVideo.src = "";
                document.body.style.overflow = '';

                document.querySelectorAll(`#${galleryId} .video-item video`).forEach(video => {
                    video.play().catch(e => console.log("Autoplay on grid prevented:", e));
                });
            }, 300);
        }

        function showVideoInLightbox(index) {
            lightboxVideo.pause();

            if (index < 0) {
                currentVideoIndex = videos.length - 1;
            } else if (index >= videos.length) {
                currentVideoIndex = 0;
            } else {
                currentVideoIndex = index;
            }
            lightboxVideo.src = videos[currentVideoIndex].src;
            lightboxVideo.play();
        }

        closeButton.addEventListener("click", closeVideoLightbox);
        prevButton.addEventListener("click", () => showVideoInLightbox(currentVideoIndex - 1));
        nextButton.addEventListener("click", () => showVideoInLightbox(currentVideoIndex + 1));

        lightboxVideo.addEventListener("click", (event) => {
            event.stopPropagation(); // Prevent closing lightbox when clicking video
            showVideoInLightbox(currentVideoIndex + 1);
        });

        videoLightbox.addEventListener("click", (event) => {
            if (event.target === videoLightbox) {
                closeVideoLightbox();
            } else if (event.target === closeButton || event.target === prevButton || event.target === nextButton) {
                event.stopPropagation(); // Prevent this click from bubbling up to the lightbox handler
            }
        });

        document.addEventListener("keydown", (event) => {
            if (videoLightbox.style.display === "flex") {
                if (event.key === "Escape") {
                    closeVideoLightbox();
                } else if (event.key === "ArrowLeft") {
                    showVideoInLightbox(currentVideoIndex - 1);
                } else if (event.key === "ArrowRight") {
                    showVideoInLightbox(currentVideoIndex + 1);
                }
            }
        });

        document.querySelectorAll(`#${galleryId} .video-item video`).forEach(video => {
            video.play().catch(e => console.log("Autoplay on grid prevented:", e));
        });
    }

    // Initialize the appropriate video lightbox based on the page
    if (window.location.pathname.includes('ArtVideos.html')) {
        setupVideoLightbox('videoGallery');
    } else if (window.location.pathname.includes('LampVideos.html')) {
        setupVideoLightbox('lampVideoGallery');
    }


    // --- Sticky Header Scroll Effect ---
    const header = document.querySelector('header');

    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // --- Contact Form Submission ---
    const contactForm = document.getElementById('contactForm');
    const thankYouModal = document.getElementById('thankYouModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const formFeedback = document.getElementById('formFeedback');

    if (contactForm) {
        function openModal() {
            if (thankYouModal) {
                thankYouModal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            }
        }

        function closeModal() {
            if (thankYouModal) {
                thankYouModal.style.display = 'none';
                document.body.style.overflow = '';
            }
        }

        function showFeedback(message, type) {
            if (formFeedback) {
                formFeedback.textContent = message;
                formFeedback.className = 'form-feedback-message ' + type;
                formFeedback.classList.add('show');
                setTimeout(() => {
                    formFeedback.classList.remove('show');
                }, 5000);
            }
        }

        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', closeModal);
        }
        window.addEventListener('click', (event) => {
            if (event.target == thankYouModal) {
                closeModal();
            }
        });

        contactForm.addEventListener('submit', async function(event) {
            event.preventDefault();

            const form = event.target;
            const formData = new FormData(form);

            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            console.log('Form Submitted:', formObject);

            try {
                const response = await fetch(form.action, {
                    method: form.method,
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    openModal();
                    form.reset();
                    // Optional: show a small success message below form too
                    // showFeedback('Your message has been sent successfully!', 'success');
                } else {
                    const data = await response.json();
                    console.error('Formspree Error:', data);
                    console.error('Formspree raw response status:', response.status, response.statusText);
                    showFeedback('Oops! There was a problem sending your message. Please try again.', 'error');
                }
            } catch (error) {
                console.error('Network or submission error:', error);
                showFeedback('A network error occurred. Please check your internet connection and try again.', 'error');
            }
        });
    }

    // --- Coming Soon Page Image Animation ---
    const comingSoonImage = document.getElementById('comingSoonImage');

    if (comingSoonImage) {
        comingSoonImage.addEventListener('click', function(event) {
            event.preventDefault();

            this.classList.add('animate-butterfly-out');

            this.addEventListener('animationend', () => {
                window.location.href = 'contact.html';
            }, { once: true });

            setTimeout(() => {
                window.location.href = 'contact.html';
            }, 500);
        });
    }

});