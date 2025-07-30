// Note: The full Snipcart script block (window.SnipcartSettings and the self-executing function)
// is now placed directly in your HTML files, so it's removed from here to avoid duplication.

document.addEventListener('DOMContentLoaded', () => {
    // --- Hamburger Menu Logic ---
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mainNav = document.querySelector('.main-nav');
    // const headerCategories = document.querySelector('.header-categories'); // Uncomment if you want to toggle categories visibility with main nav

    if (hamburgerMenu && mainNav) {
        hamburgerMenu.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            document.body.classList.toggle('menu-open'); // Toggle body class to prevent scroll
            // if (headerCategories) { headerCategories.classList.toggle('active'); } // Uncomment if you toggle categories visibility
        });

        // Close menu if a nav link is clicked (for single-page navigation or convenience)
        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    document.body.classList.remove('menu-open'); // Remove body class to restore scroll
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
    const productDetailsBody = document.getElementById('productDetailsBody'); // For the details table

    // Define art collection images data and example prices/details
    const artCollectionImagesData = {
        'Ballerina': {
            images: ['Ballerina (1).jpg', 'Ballerina (2).jpg', 'Ballerina (3).jpg', 'Ballerina (4).jpg'],
            price: 39.00,
            basePath: 'images/Art/Ballerina/',
            details: { // New details for the table
                "Brand": "Arts & Lamps",
                "Item no.": "ART-BAL-001",
                "Dimensions": "12x15 cm",
                "Material": "Acrylic on Wood",
                "Protection class": "(Indoor Use)"
            }
        },
        'Disney princess': {
            images: ['Disney princess (1).jpg', 'Disney princess (2).jpg', 'Disney princess (3).jpg', 'Disney princess (4).jpg'],
            price: 100.00,
            basePath: 'images/Art/Disney princess/',
            details: {
                "Brand": "Arts & Lamps",
                "Item no.": "ART-DIS-001",
                "Dimensions": "30x25 cm",
                "Material": "Acrylic on Canvas",
                "Protection class": "(Indoor Use)"
            }
        },
        'Halloween': {
            images: ['Halloween (1).jpg', 'Halloween (2).jpg'],
            price: 90.00,
            basePath: 'images/Art/Halloween/',
            details: {
                "Brand": "Arts & Lamps",
                "Item no.": "ART-HAL-001",
                "Dimensions": "30x25 cm",
                "Material": "Acrylic on Canvas",
                "Protection class": "(Indoor Use)"
            }
        },
        'Ischia': {
            images: ['Ischia (1).jpg', 'Ischia (2).jpg', 'Ischia (3).jpg', 'Ischia (4).jpg'],
            price: 79.00,
            basePath: 'images/Art/Ischia/',
            details: {
                "Brand": "Arts & Lamps",
                "Item no.": "ART-ISC-001",
                "Dimensions": "30x25 cm",
                "Material": "Acrylic on Canvas",
                "Protection class": "(Indoor Use)"
            }
        },
        'Koi Fish': {
            images: ['Koi Fish (1).jpg', 'Koi Fish (2).jpg'],
            price: 145.00,
            basePath: 'images/Art/Koi Fish/',
            details: {
                "Brand": "Arts & Lamps",
                "Item no.": "ART-KOI-001",
                "Dimensions": "30x25 cm",
                "Material": "Acrylic on Canvas",
                "Protection class": "(Indoor Use)"
            }
        },
        'Landscape': {
            images: ['Landscape (1).jpg', 'Landscape (2).jpg'],
            price: 50.00,
            basePath: 'images/Art/Landscape/',
            details: {
                "Brand": "Arts & Lamps",
                "Item no.": "ART-LAN-001",
                "Dimensions": "17.5x12 cm",
                "Material": "Acrylic on Canvas",
                "Protection class": "N/A (Indoor Use)"
            }
        },
        'Little Mermaid': {
            images: ['Little Mermaid (1).jpg', 'Little Mermaid (2).jpg'],
            price: 150.00,
            basePath: 'images/Art/Little Mermaid/',
            details: {
                "Brand": "Arts & Lamps",
                "Item no.": "ART-MER-001",
                "Dimensions": "30x25 cm",
                "Material": "Acrylic on Canvas",
                "Protection class": "(Indoor Use)"
            }
        },
        'Love at first sight': {
            images: ['Love at first sight (1).jpg'],
            price: 90.00,
            basePath: 'images/Art/Love at first sight/',
            details: {
                "Brand": "Arts & Lamps",
                "Item no.": "ART-LOV-001",
                "Dimensions": "27.5x34 cm",
                "Material": "Acrylic on Canvas",
                "Protection class": "(Indoor Use)"
            }
        },
        'Love bound': {
            images: ['Love bound (1).jpg', 'Love bound (2).jpg'],
            price: 150.00,
            basePath: 'images/Art/Love bound/',
            details: {
                "Brand": "Arts & Lamps",
                "Item no.": "ART-BOU-001",
                "Dimensions": "30x23 cm",
                "Material": "Acrylic on Canvas",
                "Protection class": "(Indoor Use)"
            }
        },
        'Love in Paris': {
            images: ['Love in Paris (1).jpg', 'Love in Paris (2).jpg'],
            price: 90.00,
            basePath: 'images/Art/Love in Paris/',
            details: {
                "Brand": "Arts & Lamps",
                "Item no.": "ART-PAR-001",
                "Dimensions": "24x18 cm",
                "Material": "Oil on Canvas",
                "Protection class": "(Indoor Use)"
            }
        },
        'Magic Koi': {
            images: ['Magic Koi (1).jpg', 'Magic Koi (2).jpg', 'Magic Koi (3).jpg', 'Magic Koi (4).jpg'],
            price: 1700.00,
            basePath: 'images/Art/Magic Koi/',
            details: {
                "Brand": "Arts & Lamps",
                "Item no.": "ART-MAG-001",
                "Dimensions": "46x35.5 cm",
                "Material": "Acrylic on Canvas",
                "Protection class": "(Indoor Use)"
            }
        },
        'Maleficent': {
            images: ['Maleficent (1).jpg', 'Maleficent (2).jpg'],
            price: 55.00,
            basePath: 'images/Art/Maleficent/',
            details: {
                "Brand": "Arts & Lamps",
                "Item no.": "ART-MAL-001",
                "Dimensions": "20x20 cm",
                "Material": "Acrylic on Canvas",
                "Protection class": "(Indoor Use)"
            }
        },
        'Night Out': {
            images: ['Night Out (1).jpg'],
            price: 220.00,
            basePath: 'images/Art/Night Out/',
            details: {
                "Brand": "Arts & Lamps",
                "Item no.": "ART-NIG-001",
                "Dimensions": "70x70 cm",
                "Material": "Acrylic on Canvas",
                "Protection class": "(Indoor Use)"
            }
        },
        'Sunflower': {
            images: ['Sunflower (1).jpg', 'Sunflower (2).jpg'],
            price:  50.00,
            basePath: 'images/Art/Sunflower/',
            details: {
                "Brand": "Arts & Lamps",
                "Item no.": "ART-SUN-001",
                "Dimensions": "20x20 cm",
                "Material": "Acrylic on Canvas",
                "Protection class": "(Indoor Use)"
            }
        },
        'Tea Time': {
            images: ['Tea Time (1).jpg', 'Tea Time (2).jpg', 'Tea Time (3).jpg'],
            price: 79.00,
            basePath: 'images/Art/Tea Time/',
            details: {
                "Brand": "Arts & Lamps",
                "Item no.": "ART-TEA-001",
                "Dimensions": "15x15 cm",
                "Material": "Acrylic on Canvas",
                "Protection class": "(Indoor Use)"
            }
        },
        'Under the sea': {
            images: ['Under the sea (1).jpg'],
            price: 200.00,
            basePath: 'images/Art/Under the sea/',
            details: {
                "Brand": "Arts & Lamps",
                "Item no.": "ART-SEA-001",
                "Dimensions": "60x80 cm",
                "Material": "Acrylic on Canvas",
                "Protection class": "(Indoor Use)"
            }
        }
    };

    // Define lamp collection images data and example prices/details
    const lampCollectionImagesData = {
        'Bamboolamp': {
            images: Array.from({ length: 10 }, (_, i) => `bamboolamp (${i + 1}).jpg`),
            price: 249.00,
            basePath: 'images/lamp/',
            details: {
                "Brand": "Arts & Lamps",
                "Item no.": "Bamboo-001",
                "Dimensions": "NA",
                "Material": "Bamboo,Wood,Leaves,Bulb",
                "Protection class": "(Indoor)",
                "Light bulb(s)": "Bulb Inclded"
            }
        },
        'MiniBar': {
            images: ['minibar (1).jpg', 'minibar (2).jpg', 'minibar (3).jpg', 'minibar (4).jpg'],
            price: 220.00,
            basePath: 'images/minibar/',
            details: {
                "Brand": "Arts & Lamps",
                "Item no.": "Mini-001",
                "Dimensions": "H: 100cm, W: 50cm",
                "Material": "Wood, Lights",
                "Protection class": "(Indoor)"
            }
        }
    };


    if (collectionName && collectionTitleElement && imageGalleryContainer) {
        const displayCollectionTitle = collectionName.split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');

        collectionTitleElement.textContent = `${displayCollectionTitle} Collection`;

        let itemData = null; // Holds the specific product's data (images, price, path, details)

        if (collectionType === 'lamp') {
            itemData = lampCollectionImagesData[collectionName];
        } else { // Default to art if no type or type is 'art'
            itemData = artCollectionImagesData[collectionName];
        }

        if (itemData && itemData.images && itemData.images.length > 0) {
            imageGalleryContainer.innerHTML = '';
            itemData.images.forEach((imageFileName, index) => {
                const imgPath = `${itemData.basePath}${imageFileName}`;
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

            // Update "Back to" button based on collection type
            const backButtonTop = document.querySelector('.back-to-collections-top'); // Select top button
            const backButtonBottom = document.querySelector('.back-to-collections-bottom'); // Select bottom button

            if (backButtonTop) {
                if (collectionType === 'art') {
                    backButtonTop.textContent = 'Back to Art Collections';
                    backButtonTop.href = 'art.html';
                } else if (collectionType === 'lamp') {
                    backButtonTop.textContent = 'Back to Lamp Collections';
                    backButtonTop.href = 'lamps.html';
                }
            }
            if (backButtonBottom) {
                if (collectionType === 'art') {
                    backButtonBottom.textContent = 'Back to Art Collections';
                    backButtonBottom.href = 'art.html';
                } else if (collectionType === 'lamp') {
                    backButtonBottom.textContent = 'Back to Lamp Collections';
                    backButtonBottom.href = 'lamps.html';
                }
            }


            initializeImageLightbox();

            // --- Snipcart Integration for collection-details.html ---
            const mainProductImage = document.querySelector('#imageGallery .artwork-item img'); // Get the first image as the product image
            const displayPriceMajor = document.getElementById('displayPriceMajor');
            const displayPriceMinor = document.getElementById('displayPriceMinor');
            const addToBasketBtn = document.querySelector('.add-to-basket-btn');
            const buyNowBtn = document.querySelector('.buy-now-btn');

            if (itemData.price && displayPriceMajor && displayPriceMinor && mainProductImage && addToBasketBtn && buyNowBtn) {
                const priceString = itemData.price.toFixed(2); // e.g., 250.00
                const [major, minor] = priceString.split('.');
                displayPriceMajor.textContent = major;
                displayPriceMinor.textContent = minor;

                const itemId = `${collectionType}-${collectionName.replace(/\s+/g, '-').toLowerCase()}`; // Unique ID for Snipcart
                const itemName = displayCollectionTitle; // Use the formatted name
                const itemImage = itemData.basePath + itemData.images[0]; // Use the main image of the collection by correctly constructing the path

                // NEW: Determine the JSON URL for validation for collection-details page buttons
                let itemUrlForSnipcartValidation;
                if (collectionType === 'lamp') {
                    itemUrlForSnipcartValidation = `/products/lamps/${collectionName.replace(/\s+/g, '-').toLowerCase()}.json`;
                } else { // Default to art
                    itemUrlForSnipcartValidation = `/products/art/${collectionName.replace(/\s+/g, '-').toLowerCase()}.json`;
                }

                // Set Snipcart data attributes for both buttons
                [addToBasketBtn, buyNowBtn].forEach(button => {
                    button.setAttribute('data-item-id', itemId);
                    button.setAttribute('data-item-price', itemData.price);
                    button.setAttribute('data-item-url', itemUrlForSnipcartValidation); // Point to the JSON file
                    button.setAttribute('data-item-name', itemName);
                    button.setAttribute('data-item-image', itemImage);
                    button.setAttribute('data-item-description', `Original ${collectionType} from ${displayCollectionTitle} collection.`); // Dynamic description
                    button.setAttribute('data-item-quantity', '1'); // Fixed quantity to 1
                    button.setAttribute('data-item-max-quantity', '1'); // Explicitly set max quantity here too
                    button.setAttribute('data-item-custom1-name', "Gift note"); // Changed to "Gift note" here
                    button.setAttribute('data-item-custom1-value', ""); // Default empty gift note
                });
            } else {
                console.warn("Snipcart elements or itemData missing or incomplete on collection-details page. Hiding product details section.");
                // Hide product details section if no data
                const productDetailsSection = document.querySelector('.product-details-section');
                if (productDetailsSection) {
                    productDetailsSection.style.display = 'none';
                }
            }

            // --- Populate Product Details Table ---
            const productDetailsSection = document.querySelector('.product-details-section'); // Ensure this is available for hiding
            if (productDetailsBody && itemData.details) {
                productDetailsBody.innerHTML = ''; // Clear existing content
                for (const key in itemData.details) {
                    if (Object.hasOwnProperty.call(itemData.details, key)) {
                        const value = itemData.details[key];
                        const row = document.createElement('tr');
                        // Use innerHTML for td to allow for HTML links (like reviews)
                        row.innerHTML = `<th>${key}</th><td>${value}</td>`;
                        productDetailsBody.appendChild(row);
                    }
                }
                 // Make sure product details section is visible if data is found
                if (productDetailsSection) {
                    productDetailsSection.style.display = 'flex'; // Or 'block' depending on its default styling
                }
            } else {
                console.warn("Product details data missing or productDetailsBody element not found. Hiding table.");
                if (productDetailsSection) {
                    productDetailsSection.style.display = 'none'; // Hide if no details
                }
            }


        } else if (imageGalleryContainer && window.location.pathname.includes('gallery.html')) {
            document.getElementById('galleryCategoryTitle').textContent = "Our Full Gallery";
            document.getElementById('galleryCategoryDescription').textContent = "Browse a selection of all our beautiful creations.";
        } else {
            console.warn("Collection name not found in URL or missing item data. Hiding product details section.");
            imageGalleryContainer.innerHTML = `<p>No images found for the '${collectionName}' collection or collection not defined. Please check folder and file names and script.js data.</p>`;
            // Hide product details section if no data
            const productDetailsSection = document.querySelector('.product-details-section');
            if (productDetailsSection) {
                productDetailsSection.style.display = 'none';
            }
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
                let dataSource = null; // Will point to artCollectionImagesData or lampCollectionImagesData
                let basePath = '';

                // Determine the correct dataSource and basePath based on type and collection
                if (currentType === 'lamp') {
                    dataSource = lampCollectionImagesData;
                } else { // Default to art
                    dataSource = artCollectionImagesData;
                }

                // Get the base path from the itemData object
                if (dataSource && dataSource[collection] && dataSource[collection].basePath) {
                    basePath = dataSource[collection].basePath;
                } else {
                    console.error("Base path not found for collection:", collection);
                    return; // Exit if base path is missing
                }

                currentLightboxCollectionImages = dataSource[collection].images.map(filename => `${basePath}${filename}`);
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
                if (event.key === "Escape") {
                    closeLightbox();
                } else if (event.key === "ArrowLeft") {
                    showLightboxImage(currentLightboxImageIndex - 1);
                } else if (event.key === "ArrowRight") {
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

        document.addEventListener('keydown', function(event) {
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