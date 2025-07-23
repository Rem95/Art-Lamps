document.addEventListener('DOMContentLoaded', () => {
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
    const collectionType = urlParams.get('type'); // Get the type parameter (e.g., 'art' or 'lamp')
    const collectionTitleElement = document.getElementById('collectionTitle');
    const imageGalleryContainer = document.getElementById('imageGallery');

    // Define art collection images data - Verified based on previous inputs
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

    // Define lamp collection images data - CRITICAL UPDATE: Ensures correct filenames and counts
   const lampCollectionImagesData = {
    'Bamboolamp': Array.from({ length: 10 }, (_, i) => `bamboolamp (${i + 1}).jpg`),
    'MiniBar': [ // <-- KEY CHANGED TO 'MiniBar' (Capital M)
        'minibar (1).jpg', 'minibar (2).jpg', 'minibar (3).jpg', 'minibar (4).jpg'
    ]
};
        // Add more lamp collections here as needed, following the exact filename conventions
        // For example:
        // 'IndustrialFloorLamp': [
        //     'IndustrialFloorLamp (1).jpg', 'IndustrialFloorLamp (2).jpg'
        // ],
        // 'AuroraStainedGlassLamp': [
        //     'AuroraStainedGlassLamp (1).jpg', 'AuroraStainedGlassLamp (2).jpg'
        // ]
    // This closing brace was misplaced. It should be after the lampCollectionImagesData object.
    // Corrected placement below.
    };


    if (collectionName && collectionTitleElement && imageGalleryContainer) {
        // Correctly format the display title (e.g., "Disney princess" becomes "Disney Princess Collection")
        const displayCollectionTitle = collectionName.split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');

        collectionTitleElement.textContent = `${displayCollectionTitle} Collection`;

        let imagesToLoad = [];
        let imageBasePath = '';

        // Determine which set of images to load based on the 'type' parameter
        if (collectionType === 'lamp') {
            imagesToLoad = lampCollectionImagesData[collectionName];
            // CORRECTED imageBasePath: Differentiate between Bamboolamp and MiniBar based on their actual folder locations
            if (collectionName === 'Bamboolamp') {
                imageBasePath = `images/lamp/`; 
            } else if (collectionName === 'MiniBar') { // Changed 'minibar' to 'MiniBar'
                imageBasePath = `images/MiniBar/`; // Changed 'minibar' to 'MiniBar'
            } else {
                // Fallback for other lamp types if they exist in subfolders under images/lamp/
                imageBasePath = `images/lamp/${collectionName.toLowerCase()}/`;
            }
        } else { // Default to art if no type or type is 'art'
            imagesToLoad = artCollectionImagesData[collectionName];
            imageBasePath = `images/Art/${collectionName}/`;
        }

        if (imagesToLoad && imagesToLoad.length > 0) { // Check if imagesToLoad array exists and is not empty
            imageGalleryContainer.innerHTML = ''; // Clear existing content
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

                // Add onerror to dynamically created images for debugging
                imgElement.onerror = function() {
                    console.error(`Failed to load image: ${this.src}`);
                    this.src = 'https://placehold.co/300x200/cccccc/333333?text=Image+Load+Error';
                    this.alt = 'Image failed to load';
                };

                artworkItem.appendChild(imgElement);
                imageGalleryContainer.appendChild(artworkItem);
            });

            // Update "Back to" button based on collection type
            const backButton = document.querySelector('.button-explore');
            if (backButton) { // Ensure button exists before trying to modify it
                if (collectionType === 'art') {
                    backButton.textContent = 'Back to Art Collections';
                    backButton.href = 'art.html';
                } else if (collectionType === 'lamp') {
                    backButton.textContent = 'Back to Lamp Collections';
                    backButton.href = 'lamps.html';
                }
            }

            initializeImageLightbox();
        } else {
            imageGalleryContainer.innerHTML = `<p>No images found for the '${collectionName}' collection or collection not defined. Please check folder and file names and script.js data.</p>`;
        }
    } else if (imageGalleryContainer && window.location.pathname.includes('gallery.html')) {
        // This block for gallery.html would need to be populated with images
        // ... (your existing gallery.html logic, if any)
    }


    // --- Lightbox Functionality for Images (from collection-details.html) ---
    let currentLightboxImageIndex = 0;
    let currentLightboxCollectionImages = []; // Stores full paths for current collection
    let currentCollectionDataSource = null; // To store which data source (art or lamp) is active

    function initializeImageLightbox() {
        const artworkItems = document.querySelectorAll('.artwork-item');
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        const closeButton = lightbox ? lightbox.querySelector('.close-button') : null;
        const prevButton = lightbox ? lightbox.querySelector('.prev-button') : null;
        const nextButton = lightbox ? lightbox.querySelector('.next-button') : null;

        if (!lightbox || !lightboxImg || !closeButton || !prevButton || !nextButton) {
            // console.warn("Image Lightbox elements not found. Image Lightbox functionality will not be active.");
            return;
        }

        artworkItems.forEach((item, index) => {
            item.addEventListener('click', function() {
                const img = this.querySelector('img');
                const collection = img.getAttribute('data-collection');
                const clickedFileName = img.getAttribute('data-filename');

                // Determine which data source to use based on the 'type' URL parameter
                const currentType = urlParams.get('type');
                let dataSource = null;
                let basePath = '';

                if (currentType === 'lamp') {
                    dataSource = lampCollectionImagesData;
                    // CORRECTED imageBasePath: Differentiate between Bamboolamp and MiniBar based on their actual folder locations
                    if (collection === 'Bamboolamp') {
                        basePath = `images/lamp/`; 
                    } else if (collection === 'MiniBar') { // Changed 'minibar' to 'MiniBar'
                        basePath = `images/MiniBar/`; // Changed 'minibar' to 'MiniBar'
                    } else {
                        // Fallback for other lamp types if they exist in subfolders under images/lamp/
                        basePath = `images/lamp/${collection.toLowerCase()}/`;
                    }
                } else {
                    dataSource = artCollectionImagesData;
                    basePath = `images/Art/${collection}/`;
                }
                currentCollectionDataSource = dataSource; // Store the active data source

                // Populate currentLightboxCollectionImages with full paths for the current collection
                currentLightboxCollectionImages = dataSource[collection].map(filename => `${basePath}${filename}`);

                // Find the index of the clicked image in the current collection
                currentLightboxImageIndex = currentLightboxCollectionImages.findIndex(src => src.includes(clickedFileName));

                showLightboxImage(currentLightboxImageIndex);

                lightbox.style.display = 'block';
                document.body.style.overflow = 'hidden'; // Prevent scrolling background
            });
        });

        function showLightboxImage(index) {
            if (currentLightboxCollectionImages.length === 0) return;

            // Adjust index for looping
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

        // Navigation buttons
        prevButton.addEventListener('click', (event) => {
            event.stopPropagation();
            showLightboxImage(currentLightboxImageIndex - 1);
        });

        nextButton.addEventListener('click', (event) => {
            event.stopPropagation();
            showLightboxImage(currentLightboxImageIndex + 1);
        });

        // Close lightbox when close button is clicked
        closeButton.addEventListener('click', function() {
            lightbox.style.display = 'none';
            document.body.style.overflow = ''; // Restore scrolling
            currentLightboxCollectionImages = []; // Clear collection on close
            currentLightboxImageIndex = 0;
            currentCollectionDataSource = null; // Clear active data source
        });

        // Close lightbox when clicking outside the image (on the overlay)
        lightbox.addEventListener('click', function(event) {
            // Only close if the click was directly on the lightbox background, not on the image or buttons
            if (event.target === lightbox) {
                lightbox.style.display = 'none';
                document.body.style.overflow = '';
                currentLightboxCollectionImages = []; // Clear collection on close
                currentLightboxImageIndex = 0;
                currentCollectionDataSource = null; // Clear active data source
            }
        });

        // Close lightbox with ESC key and navigate with arrow keys
        document.addEventListener('keydown', function(event) {
            if (lightbox.style.display === 'block') {
                if (event.key === 'Escape') {
                    lightbox.style.display = 'none';
                    document.body.style.overflow = '';
                    currentLightboxCollectionImages = [];
                    currentLightboxImageIndex = 0;
                    currentCollectionDataSource = null;
                } else if (event.key === 'ArrowLeft') {
                    showLightboxImage(currentLightboxImageIndex - 1);
                } else if (event.key === 'ArrowRight') {
                    showLightboxImage(currentLightboxImageIndex + 1);
                }
            }
        });
    }

    // --- Lightbox Functionality for Art Videos ---
    let currentArtVideoLightboxIndex = 0;
    let currentArtVideoLightboxSources = [];

    // Initialize only if on the Art Video page
    if (window.location.pathname.includes('ArtVideos.html')) {
        initializeArtVideoLightbox();
    }

    function initializeArtVideoLightbox() {
        const videoItems = document.querySelectorAll('#videoGallery .video-item');
        const videoLightbox = document.getElementById('videoLightbox');
        const lightboxVideo = document.getElementById('lightbox-video');
        const closeButton = videoLightbox ? videoLightbox.querySelector('.close-button') : null;
        const prevButton = videoLightbox ? videoLightbox.querySelector('.prev-button') : null;
        const nextButton = videoLightbox ? videoLightbox.querySelector('.next-button') : null;

        if (!videoLightbox || !lightboxVideo || !closeButton || !prevButton || !nextButton) {
            console.warn("Art Video Lightbox elements not found. Art Video Lightbox functionality will not be active.");
            return;
        }

        currentArtVideoLightboxSources = Array.from(videoItems).map(item => {
            return item.querySelector('video').getAttribute('data-video-src');
        }).filter(src => src !== null);

        videoItems.forEach((item, index) => {
            item.addEventListener('click', function() {
                const clickedSmallVideo = this.querySelector('video');
                clickedSmallVideo.pause();

                currentArtVideoLightboxIndex = index;
                showArtVideoLightboxVideo(currentArtVideoLightboxIndex);

                videoLightbox.style.display = 'block';
                document.body.style.overflow = 'hidden';
            });
        });

        function showArtVideoLightboxVideo(index) {
            if (currentArtVideoLightboxSources.length === 0) return;

            if (!lightboxVideo.paused) {
                lightboxVideo.pause();
            }

            if (index < 0) {
                currentArtVideoLightboxIndex = currentArtVideoLightboxSources.length - 1;
            } else if (index >= currentArtVideoLightboxSources.length) {
                currentArtVideoLightboxIndex = 0;
            } else {
                currentArtVideoLightboxIndex = index;
            }

            lightboxVideo.src = currentArtVideoLightboxSources[currentArtVideoLightboxIndex];
            lightboxVideo.play();
        }

        lightboxVideo.addEventListener('click', (event) => {
            event.stopPropagation();
            showArtVideoLightboxVideo(currentArtVideoLightboxIndex + 1);
        });

        prevButton.addEventListener('click', (event) => {
            event.stopPropagation();
            showArtVideoLightboxVideo(currentArtVideoLightboxIndex - 1);
        });

        nextButton.addEventListener('click', (event) => {
            event.stopPropagation();
            showArtVideoLightboxVideo(currentArtVideoLightboxIndex + 1);
        });

        closeButton.addEventListener('click', function() {
            lightbox.style.display = 'none';
            lightboxVideo.pause();
            document.body.style.overflow = '';
            document.querySelectorAll('#videoGallery .video-item video[autoplay]').forEach(video => {
                video.play();
            });
        });

        videoLightbox.addEventListener('click', function(event) {
            if (event.target === videoLightbox) {
                videoLightbox.style.display = 'none';
                lightboxVideo.pause();
                document.body.style.overflow = '';
                document.querySelectorAll('#videoGallery .video-item video[autoplay]').forEach(video => {
                    video.play();
                });
            }
        });

        document.addEventListener('keydown', function(event) {
            if (videoLightbox.style.display === 'block') {
                if (event.key === 'Escape') {
                    lightboxVideo.style.display = 'none';
                    lightboxVideo.pause();
                    document.body.style.overflow = '';
                    document.querySelectorAll('#videoGallery .video-item video[autoplay]').forEach(video => {
                        video.play();
                    });
                } else if (event.key === 'ArrowLeft') {
                    showArtVideoLightboxVideo(currentArtVideoLightboxIndex - 1);
                } else if (event.key === 'ArrowRight') {
                    showArtVideoLightboxVideo(currentArtVideoLightboxIndex + 1);
                }
            }
        });
    }

    // --- Lightbox Functionality for Lamp Videos ---
    let currentLampVideoLightboxIndex = 0;
    let currentLampVideoLightboxSources = [];

    // Initialize only if on the Lamp Videos page
    if (window.location.pathname.includes('LampVideos.html')) {
        initializeLampVideoLightbox();
    }

    function initializeLampVideoLightbox() {
        const videoItems = document.querySelectorAll('#lampVideoGallery .video-item');
        const videoLightbox = document.getElementById('videoLightbox');
        const lightboxVideo = document.getElementById('lightbox-video');
        const closeButton = videoLightbox ? videoLightbox.querySelector('.close-button') : null;
        const prevButton = videoLightbox ? videoLightbox.querySelector('.prev-button') : null;
        const nextButton = videoLightbox ? videoLightbox.querySelector('.next-button') : null;

        if (!videoLightbox || !lightboxVideo || !closeButton || !prevButton || !nextButton) {
            console.warn("Lamp Video Lightbox elements not found. Lamp Video Lightbox functionality will not be active.");
            return;
        }

        currentLampVideoLightboxSources = Array.from(videoItems).map(item => {
            return item.querySelector('video').getAttribute('data-video-src');
        }).filter(src => src !== null);

        videoItems.forEach((item, index) => {
            item.addEventListener('click', function() {
                const clickedSmallVideo = this.querySelector('video');
                clickedSmallVideo.pause();

                currentLampVideoLightboxIndex = index;
                showLampVideoLightboxVideo(currentLampVideoLightboxIndex);

                videoLightbox.style.display = 'block';
                document.body.style.overflow = 'hidden';
            });
        });

        function showLampVideoLightboxVideo(index) {
            if (currentLampVideoLightboxSources.length === 0) return;

            if (!lightboxVideo.paused) {
                lightboxVideo.pause();
            }

            if (index < 0) {
                currentLampVideoLightboxIndex = currentLampVideoLightboxSources.length - 1;
            } else if (index >= currentLampVideoLightboxSources.length) {
                currentLampVideoLightboxIndex = 0;
            } else {
                currentLampVideoLightboxIndex = index;
            }

            lightboxVideo.src = currentLampVideoLightboxSources[currentLampVideoLightboxIndex];
            lightboxVideo.play();
        }

        lightboxVideo.addEventListener('click', (event) => {
            event.stopPropagation();
            showLampVideoLightboxVideo(currentLampVideoLightboxIndex + 1);
        });

        prevButton.addEventListener('click', (event) => {
            event.stopPropagation();
            showLampVideoLightboxVideo(currentLampVideoLightboxIndex - 1);
        });

        nextButton.addEventListener('click', (event) => {
            event.stopPropagation();
            showLampVideoLightboxVideo(currentLampVideoLightboxIndex + 1);
        });

        closeButton.addEventListener('click', function() {
            lightbox.style.display = 'none';
            lightboxVideo.pause();
            document.body.style.overflow = '';
            document.querySelectorAll('#lampVideoGallery .video-item video[autoplay]').forEach(video => {
                video.play();
            });
        });

        videoLightbox.addEventListener('click', function(event) {
            if (event.target === videoLightbox) {
                videoLightbox.style.display = 'none';
                lightboxVideo.pause();
                document.body.style.overflow = '';
                document.querySelectorAll('#lampVideoGallery .video-item video[autoplay]').forEach(video => {
                    video.play();
                });
            }
        });

        document.addEventListener('keydown', function(event) {
            if (videoLightbox.style.display === 'block') {
                if (event.key === 'Escape') {
                    lightboxVideo.style.display = 'none';
                    lightboxVideo.pause();
                    document.body.style.overflow = '';
                    document.querySelectorAll('#lampVideoGallery .video-item video[autoplay]').forEach(video => {
                        video.play();
                    });
                } else if (event.key === 'ArrowLeft') {
                    showLampVideoLightboxVideo(currentLampVideoLightboxIndex - 1);
                } else if (event.key === 'ArrowRight') {
                    showLampVideoLightboxVideo(currentLampVideoLightboxIndex + 1);
                }
            }
        });
    }


    // --- Sticky Header Scroll Effect ---
    const header = document.querySelector('header');

    if (header) {
        const headerHeight = header.offsetHeight;

        window.addEventListener('scroll', () => {
            if (window.scrollY >