document.addEventListener('DOMContentLoaded', () => {
    // --- Hamburger Menu Logic ---
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mainNav = document.querySelector('.main-nav');
    const headerCategories = document.querySelector('.header-categories'); // Get the category links container

    if (hamburgerMenu && mainNav) {
        hamburgerMenu.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            // Optionally, if you want header-categories to also collapse/expand with main-nav
            // headerCategories.classList.toggle('active');
        });

        // Close menu if a nav link is clicked (for single-page navigation or convenience)
        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    // headerCategories.classList.remove('active'); // If you toggle it with main-nav
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
                imageBasePath = `images/minibar/`; // Corrected path to match file structure
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
            initializeImageLightbox(); // Re-initialize lightbox for newly added images
        } else {
            imageGalleryContainer.innerHTML = `<p>No images found for the '${collectionName}' collection or collection not defined. Please check folder and file names and script