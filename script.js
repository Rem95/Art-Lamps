// script.js

document.addEventListener('DOMContentLoaded', () => {
    // --- Hamburger Menu Logic ---
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mainNav = document.querySelector('.main-nav');

    if (hamburgerMenu && mainNav) {
        hamburgerMenu.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            document.body.classList.toggle('menu-open'); // Toggle body class to prevent scroll
        });

        // Close menu if a nav link is clicked (for single-page navigation or convenience)
        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    document.body.classList.remove('menu-open'); // Remove body class to restore scroll
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

    // --- Product Data Definition (Consolidated from your existing data and index.html) ---
    // Your PayPal Merchant ID is read from the <script src="https://www.paypalobjects.com/ncp/cart/cart.js" data-merchant-id="BBJJBURX2AEZ4"></script> in your HTML.
    // We don't need a separate constant for it here for hosted buttons.

    const productsData = [
        // --- ART COLLECTIONS ---
        {
            name: "Ballerina",
            price: "50", // Adjusted to string with .00 for consistency
            itemId: "ART-BAL-001",
            paypalButtonId: "JUHMYR8RBSW9S",
            type: "art",
            basePath: 'images/Art/Ballerina/',
            images: ['Ballerina (1).jpg', 'Ballerina (2).jpg', 'Ballerina (3).jpg', 'Ballerina (4).jpg'],
            description: "Graceful ballet-inspired artwork, perfect for adding elegance to any room.",
            details: {
                "Brand": "Arts & Lamps",
                "Item no.": "ART-BAL-001",
                "Dimensions": "12x15 cm",
                "Material": "Acrylic on Wood",
                "Protection class": "(Indoor Use)"
            }
        },
        {
            name: "Disney princess",
            price: "100", // Adjusted to string with .00 for consistency
            itemId: "ART-DIS-001",
            paypalButtonId: "YTMD95EAE27MY",
            type: "art",
            basePath: 'images/Art/Disney princess/',
            images: ['Disney princess (1).jpg', 'Disney princess (2).jpg', 'Disney princess (3).jpg', 'Disney princess (4).jpg'],
            description: "Enchanting artwork featuring beloved Disney princesses, bringing fantasy to life.",
            details: {
                "Brand": "Arts & Lamps",
                "Item no.": "ART-DIS-001",
                "Dimensions": "30x25 cm",
                "Material": "Acrylic on Canvas",
                "Protection class": "(Indoor Use)"
            }
        },
        {
            name: "Halloween",
            price: "90", // Adjusted to string with .00 for consistency
            itemId: "ART-HAL-001",
            paypalButtonId: "XPZS8MH6RQX2N",
            type: "art",
            basePath: 'images/Art/Halloween/',
            images: ['Halloween (1).jpg', 'Halloween (2).jpg'],
            description: "Spooky and fun Halloween-themed artwork, perfect for seasonal decor.",
            details: {
                "Brand": "Arts & Lamps",
                "Item no.": "ART-HAL-001",
                "Dimensions": "30x25 cm",
                "Material": "Acrylic on Canvas",
                "Protection class": "(Indoor Use)"
            }
        },
        {
            name: "Ischia",
            price: "79", // Adjusted to string with .00 for consistency
            itemId: "ART-ISC-001",
            paypalButtonId: "5NEFSHU4X2SZS",
            type: "art",
            basePath: 'images/Art/Ischia/',
            images: ['Ischia (1).jpg', 'Ischia (2).jpg', 'Ischia (3).jpg', 'Ischia (4).jpg'],
            description: "Vibrant landscape artwork inspired by the beautiful island of Ischia.",
            details: {
                "Brand": "Arts & Lamps",
                "Item no.": "ART-ISC-001",
                "Dimensions": "30x25 cm",
                "Material": "Acrylic on Canvas",
                "Protection class": "(Indoor Use)"
            }
        },
        {
            name: "Koi Fish",
            price: "145", // Adjusted to string with .00 for consistency
            itemId: "ART-KOI-001",
            paypalButtonId: "CG5DR5WZRP2WQ", // Confirmed ID
            type: "art",
            basePath: 'images/Art/Koi Fish/',
            images: ['Koi Fish (1).jpg', 'Koi Fish (2).jpg'],
            description: "Serene depiction of Koi fish, symbolizing good fortune and perseverance.",
            details: {
                "Brand": "Arts & Lamps",
                "Item no.": "ART-KOI-001",
                "Dimensions": "30x25 cm",
                "Material": "Acrylic on Canvas",
                "Protection class": "(Indoor Use)"
            }
        },
        {
            name: "Landscape",
            price: "50", // Adjusted to string with .00 for consistency
            itemId: "ART-LAN-001",
            paypalButtonId: "GHQPYUXVR66WW", // Confirmed ID
            type: "art",
            basePath: 'images/Art/Landscape/',
            images: ['Landscape (1).jpg', 'Landscape (2).jpg'],
            description: "Breathtaking landscape artwork capturing nature's beauty and tranquility.",
            details: {
                "Brand": "Arts & Lamps",
                "Item no.": "ART-LAN-001",
                "Dimensions": "17.5x12 cm",
                "Material": "Acrylic on Canvas",
                "Protection class": "N/A (Indoor Use)"
            }
        },
        {
            name: "Little Mermaid",
            price: "150", // Adjusted to string with .00 for consistency
            itemId: "ART-MER-001",
            paypalButtonId: "HCK8YCBFNQCME", // Confirmed ID
            type: "art",
            basePath: 'images/Art/Little Mermaid/',
            images: ['Little Mermaid (1).jpg', 'Little Mermaid (2).jpg'],
            description: "Magical artwork inspired by the classic tale of the Little Mermaid.",
            details: {
                "Brand": "Arts & Lamps",
                "Item no.": "ART-MER-001",
                "Dimensions": "30x25 cm",
                "Material": "Acrylic on Canvas",
                "Protection class": "(Indoor Use)"
            }
        },
        {
            name: "Love at first sight",
            price: "90", // Adjusted to string with .00 for consistency
            itemId: "ART-LOV-001",
            paypalButtonId: "RBYBNP4KMM3KJ", // Confirmed ID
            type: "art",
            basePath: 'images/Art/Love at first sight/',
            images: ['Love at first sight (1).jpg'],
            description: "Romantic artwork capturing the special moment of love at first sight.",
            details: {
                "Brand": "Arts & Lamps",
                "Item no.": "ART-LOV-001",
                "Dimensions": "27.5x34 cm",
                "Material": "Acrylic on Canvas",
                "Protection class": "(Indoor Use)"
            }
        },
        {
            name: "Love bound",
            price: "200", // Adjusted to string with .00 for consistency
            itemId: "ART-BOU-001",
            paypalButtonId: "H2LR2YB43RYEW", // Confirmed ID
            type: "art",
            basePath: 'images/Art/Love bound/',
            images: ['Love bound (1).jpg', 'Love bound (2).jpg'],
            description: "Deeply emotional artwork symbolizing unbreakable bonds of love.",
            details: {
                "Brand": "Arts & Lamps",
                "Item no.": "ART-BOU-001",
                "Dimensions": "30x23 cm",
                "Material": "Acrylic on Canvas",
                "Protection class": "(Indoor Use)"
            }
        },
        {
            name: "Love in Paris",
            price: "90",
            itemId: "ART-PAR-001",
            paypalButtonId: "WQGC2ACRNNMWA", // Confirmed ID
            type: "art",
            basePath: 'images/Art/Love in Paris/',
            images: ['Love in Paris (1).jpg', 'Love in Paris (2).jpg'],
            description: "Charming artwork depicting the romantic allure of Paris.",
            details: {
                "Brand": "Arts & Lamps",
                "Item no.": "ART-PAR-001",
                "Dimensions": "24x18 cm",
                "Material": "Oil on Canvas",
                "Protection class": "(Indoor Use)"
            }
        },
        {
            name: "Magic Koi",
            price: "2500", // Adjusted to string with .00 for consistency
            itemId: "ART-MAG-001",
            paypalButtonId: "8RHJF33AXV7F4", // Confirmed ID
            type: "art",
            basePath: 'images/Art/Magic Koi/',
            images: ['Magic Koi (1).jpg', 'Magic Koi (2).jpg', 'Magic Koi (3).jpg', 'Magic Koi (4).jpg'],
            description: "Large, intricate artwork of mystical Koi, a focal point for any grand space.",
            details: {
                "Brand": "Arts & Lamps",
                "Item no.": "ART-MAG-001",
                "Dimensions": "46x35.5 cm",
                "Material": "Acrylic on Canvas",
                "Protection class": "(Indoor Use)"
            }
        },
        {
            name: "Maleficent",
            price: "55", // Adjusted to string with .00 for consistency
            itemId: "ART-MAL-001",
            paypalButtonId: "EVN9DUFHBFBJE", // Confirmed ID
            type: "art",
            basePath: 'images/Art/Maleficent/',
            images: ['Maleficent (1).jpg', 'Maleficent (2).jpg'],
            description: "Dark and captivating artwork inspired by the iconic character Maleficent.",
            details: {
                "Brand": "Arts & Lamps",
                "Item no.": "ART-MAL-001",
                "Dimensions": "20x20 cm",
                "Material": "Acrylic on Canvas",
                "Protection class": "(Indoor Use)"
            }
        },
        {
            name: "Night Out",
            price: "220", // Adjusted to string with .00 for consistency
            itemId: "ART-NIG-001",
            paypalButtonId: "G8MKF2EZZPXW8", // Confirmed ID
            type: "art",
            basePath: 'images/Art/Night Out/',
            images: ['Night Out (1).jpg'],
            description: "Dynamic artwork capturing the vibrant energy of a night out.",
            details: {
                "Brand": "Arts & Lamps",
                "Item no.": "ART-NIG-001",
                "Dimensions": "70x70 cm",
                "Material": "Acrylic on Canvas",
                "Protection class": "(Indoor Use)"
            }
        },
        {
            name: "Sunflower",
            price: "50", // Adjusted to string with .00 for consistency
            itemId: "ART-SUN-001",
            paypalButtonId: "ZD9FGT3C2PM7W", // Confirmed ID
            type: "art",
            basePath: 'images/Art/Sunflower/',
            images: ['Sunflower (1).jpg', 'Sunflower (2).jpg'],
            description: "Bright and cheerful sunflower artwork, radiating warmth and happiness.",
            details: {
                "Brand": "Arts & Lamps",
                "Item no.": "ART-SUN-001",
                "Dimensions": "20x20 cm",
                "Material": "Acrylic on Canvas",
                "Protection class": "(Indoor Use)"
            }
        },
        {
            name: "Tea Time",
            price: "79", // Adjusted to string with .00 for consistency
            itemId: "ART-TEA-001",
            paypalButtonId: "HQ5ACHYQUJQFS", // Confirmed ID
            type: "art",
            basePath: 'images/Art/Tea Time/',
            images: ['Tea Time (1).jpg', 'Tea Time (2).jpg', 'Tea Time (3).jpg'],
            description: "Cozy and inviting artwork perfect for a relaxing tea-time ambiance.",
            details: {
                "Brand": "Arts & Lamps",
                "Item no.": "ART-TEA-001",
                "Dimensions": "15x15 cm",
                "Material": "Acrylic on Canvas",
                "Protection class": "(Indoor Use)"
            }
        },
        {
            name: "Under the sea",
            price: "200", // Adjusted to string with .00 for consistency
            itemId: "ART-UND-001",
            paypalButtonId: "MFYQPVA8L9VQC", // Confirmed ID
            type: "art",
            basePath: 'images/Art/Under the sea/',
            images: ['Under the sea (1).jpg'],
            description: "Immersive artwork transporting you to the mysterious and beautiful world under the sea.",
            details: {
                "Brand": "Arts & Lamps",
                "Item no.": "ART-SEA-001",
                "Dimensions": "60x80 cm",
                "Material": "Acrylic on Canvas",
                "Protection class": "(Indoor Use)"
            }
        },
        // --- LAMP COLLECTIONS ---
        {
            name: "Bamboolamp",
            price: "249",
            itemId: "LMP-BAM-001",
            paypalButtonId: "VZGJCD6PTUH68", // Confirmed ID
            type: "lamp",
            basePath: 'images/lamp/',
            images: Array.from({ length: 10 }, (_, i) => `bamboolamp (${i + 1}).jpg`),
            description: "Handcrafted bamboo lamp, adding a natural and serene glow to your space.",
            details: {
                "Brand": "Arts & Lamps",
                "Item no.": "LMP-BAM-001",
                "Dimensions": "NA",
                "Material": "Bamboo,Wood,Leaves,Bulb",
                "Protection class": "(Indoor)",
                "Light bulb(s)": "Bulb Included"
            }
        },
        {
            name: "MiniBar",
            price: "220", // Adjusted to string with .00 for consistency
            itemId: "LMP-MNB-001",
            paypalButtonId: "DBFSVJSPMH3YW", // Confirmed ID
            type: "lamp",
            basePath: 'images/minibar/',
            images: ['minibar (1).jpg', 'minibar (2).jpg', 'minibar (3).jpg', 'minibar (4).jpg'],
            description: "Compact and stylish mini-bar with integrated lighting, perfect for entertaining.",
            details: {
                "Brand": "Arts & Lamps",
                "Item no.": "LMP-MNB-001",
                "Dimensions": "H: 100cm, W: 50cm",
                "Material": "Wood, Lights",
                "Protection class": "(Indoor)"
            }
        }
    ];

    // --- Dynamic Content Loading for collection-details.html and PayPal Button Integration ---
    const urlParams = new URLSearchParams(window.location.search);
    const collectionName = urlParams.get('name');
    const collectionType = urlParams.get('type');
    const collectionTitleElement = document.getElementById('collectionTitle');
    const imageGalleryContainer = document.getElementById('imageGallery');
    const productDetailsBody = document.getElementById('productDetailsBody');
    const productPriceElement = document.querySelector('.product-price');
    const paypalAddToCartContainer = document.getElementById('paypalAddToCartContainer'); // The container for PayPal Add to Cart button

    // Only attempt to load details if on collection-details.html and parameters exist
    if (window.location.pathname.includes('collection-details.html') && collectionName && collectionType) {
        const currentProduct = productsData.find(product =>
            product.name.toLowerCase() === collectionName.toLowerCase() &&
            product.type === collectionType
        );

        if (currentProduct) {
            // Update Title
            const displayCollectionTitle = currentProduct.name.split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
            collectionTitleElement.textContent = `${displayCollectionTitle} Collection`;

            // Populate Image Gallery
            imageGalleryContainer.innerHTML = ''; // Clear previous images
            currentProduct.images.forEach((imgFileName, index) => {
                const imgPath = `${currentProduct.basePath}${encodeURIComponent(imgFileName)}`; // Encode URI component for image names with special characters like () or spaces
                const artworkItem = document.createElement('div');
                artworkItem.classList.add('artwork-item');

                const imgElement = document.createElement('img');
                imgElement.src = imgPath;
                imgElement.alt = `${currentProduct.name} Image ${index + 1}`;
                imgElement.setAttribute('data-fullsize', imgPath);
                imgElement.setAttribute('data-collection', currentProduct.name);
                imgElement.setAttribute('data-filename', imgFileName);

                imgElement.onerror = function() {
                    console.error(`Failed to load image: ${this.src}`);
                    this.src = 'https://placehold.co/300x200/cccccc/333333?text=Image+Load+Error';
                    this.alt = 'Image failed to load';
                };

                artworkItem.appendChild(imgElement);
                imageGalleryContainer.appendChild(artworkItem);
            });

            // Update "Back to" button based on collection type
            const backButtonTop = document.querySelector('.back-to-collections-top');
            const backButtonBottom = document.querySelector('.back-to-collections-bottom');

            if (backButtonTop) {
                backButtonTop.textContent = `Back to ${collectionType === 'art' ? 'Art' : 'Lamp'} Collections`;
                backButtonTop.href = `${collectionType}.html`;
            }
            if (backButtonBottom) {
                backButtonBottom.textContent = `Back to ${collectionType === 'art' ? 'Art' : 'Lamp'} Collections`;
                backButtonBottom.href = `${collectionType}.html`;
            }

            initializeImageLightbox(); // Re-initialize lightbox for new images

            // Display Price
            if (productPriceElement) {
                productPriceElement.innerHTML = `€${currentProduct.price} EUR`;
            }

            // Populate Product Details Table
            const productDetailsSection = document.querySelector('.product-details-section');
            if (productDetailsBody && currentProduct.details) {
                productDetailsBody.innerHTML = ''; // Clear existing content
                for (const key in currentProduct.details) {
                    if (Object.hasOwnProperty.call(currentProduct.details, key)) {
                        const value = currentProduct.details[key];
                        const row = document.createElement('tr');
                        row.innerHTML = `<th>${key}</th><td>${value}</td>`;
                        productDetailsBody.appendChild(row);
                    }
                }
                if (productDetailsSection) {
                    productDetailsSection.style.display = 'flex'; // Ensure section is visible
                }
            } else {
                console.warn("Product details data missing or productDetailsBody element not found. Hiding table.");
                if (productDetailsSection) {
                    productDetailsSection.style.display = 'none'; // Hide if no details
                }
            }

            // --- Dynamically add PayPal "Add to Cart" button using PayPal's custom element ---
            if (paypalAddToCartContainer && currentProduct.paypalButtonId) { // Check if paypalButtonId exists for this product
                paypalAddToCartContainer.innerHTML = ''; // Clear existing content

                const paypalButtonElement = document.createElement('paypal-add-to-cart-button');
                paypalButtonElement.setAttribute('data-id', currentProduct.paypalButtonId); // Use the hosted button ID
                paypalAddToCartContainer.appendChild(paypalButtonElement);

                // Initialize the PayPal AddToCart button
                // The cartPaypal.AddToCart function expects an object with 'id'
                const scriptElement = document.createElement('script');
                scriptElement.textContent = `
                    cartPaypal.AddToCart({ id: '${currentProduct.paypalButtonId}' });
                `;
                paypalAddToCartContainer.appendChild(scriptElement);
            } else {
                console.warn(`PayPal Add to Cart button not displayed for '${currentProduct.name}' because no paypalButtonId was found.`);
                if (paypalAddToCartContainer) {
                    paypalAddToCartContainer.innerHTML = ''; // Ensure container is empty if no button
                }
            }

        } else {
            // Handle case where collection/product data is not found in `productsData`
            console.warn(`Collection '${collectionName}' of type '${collectionType}' not found in productsData. Displaying error.`);
            collectionTitleElement.textContent = "Collection Not Found";
            imageGalleryContainer.innerHTML = '<p>Sorry, this collection could not be found or its data is incomplete.</p>';
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

                const currentType = urlParams.get('type'); // Get type from current URL
                let currentProductData = productsData.find(p => p.name === collection && p.type === currentType); // Find the specific product

                if (!currentProductData) {
                    console.error("Product data not found for lightbox:", collection, "Type:", currentType);
                    return;
                }

                const basePath = currentProductData.basePath;
                currentLightboxCollectionImages = currentProductData.images.map(filename => `${basePath}${encodeURIComponent(filename)}`);
                currentLightboxImageIndex = currentLightboxCollectionImages.findIndex(src => src.includes(encodeURIComponent(clickedFileName)));

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
            }
            // else, currentLightboxImageIndex is already updated
            else {
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
                    // Define closeLightbox() or use the direct close logic here
                    lightbox.style.display = 'none';
                    document.body.style.overflow = '';
                    currentLightboxCollectionImages = [];
                    currentLightboxImageIndex = 0;
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

    // Initialize PayPal Cart at the end of DOMContentLoaded
    cartPaypal.Cart({ id: "pp-view-cart" });
});