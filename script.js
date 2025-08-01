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

    // --- Dynamic Content Loading for collection-details.html and PayPal Button Integration ---
    const urlParams = new URLSearchParams(window.location.search);
    const collectionName = urlParams.get('name');
    const collectionType = urlParams.get('type');
    const collectionTitleElement = document.getElementById('collectionTitle');
    const imageGalleryContainer = document.getElementById('imageGallery');
    const productDetailsBody = document.getElementById('productDetailsBody');
    const productPriceElement = document.querySelector('.product-price');
    const paypalAddToCartContainer = document.getElementById('paypalAddToCartContainer');

    // ... (Your existing productsData and collection-details.html logic here) ...
    // Note: The original productsData variable is quite long, so I'm omitting it for brevity,
    // but you should keep it in your final script.js file.
    // The rest of the logic for the collection-details page is also kept intact.

    // --- BLOG POST LOADING LOGIC ---
    const blogPostsContainer = document.querySelector('.blog-posts-container');
    const githubRepo = 'rem95/Art-Lamps'; // Your repository name from config.yml

    // This function will fetch a single blog post's content
    async function fetchBlogPost(postPath) {
        try {
            const response = await fetch(`https://api.github.com/repos/${githubRepo}/contents/${postPath}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            const content = atob(data.content); // Decode the base64 content
            return content;
        } catch (error) {
            console.error('Error fetching blog post:', error);
            return null;
        }
    }

    // This function will fetch the list of blog posts
    async function fetchBlogPostsList() {
        try {
            // This path needs to match the 'folder' property in your config.yml
            const response = await fetch(`https://api.github.com/repos/${githubRepo}/contents/_posts`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data.filter(file => file.type === 'dir'); // Return subdirectories (e.g., /blog)
        } catch (error) {
            console.error('Error fetching blog posts list:', error);
            return [];
        }
    }

    // This function renders the blog posts on the page
    async function renderBlogPosts() {
        if (!blogPostsContainer) {
            return; // Exit if we are not on the blog page
        }

        blogPostsContainer.innerHTML = '<h2>Loading blog posts...</h2>'; // Add a loading state

        try {
            // First, get the list of subfolders (e.g., 'blog' folder)
            const postFolders = await fetchBlogPostsList();
            const blogFolder = postFolders.find(folder => folder.name === 'blog');

            if (!blogFolder) {
                blogPostsContainer.innerHTML = '<h2>No blog posts found.</h2>';
                return;
            }

            // Now, get the list of actual markdown files inside the 'blog' folder
            const blogPostsResponse = await fetch(blogFolder.url);
            const blogPostFiles = await blogPostsResponse.json();

            // Filter for markdown files and sort them by date (newest first)
            const posts = blogPostFiles
                .filter(file => file.name.endsWith('.md'))
                .sort((a, b) => new Date(b.name.substring(0, 10)) - new Date(a.name.substring(0, 10)));


            if (posts.length === 0) {
                blogPostsContainer.innerHTML = '<h2>No blog posts found.</h2>';
                return;
            }

            blogPostsContainer.innerHTML = ''; // Clear the loading state

            for (const post of posts) {
                const postContent = await fetchBlogPost(post.path);
                if (postContent) {
                    // Extract metadata from the Markdown file (frontmatter)
                    const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
                    const match = postContent.match(frontmatterRegex);

                    if (match && match.length === 3) {
                        const frontmatterString = match[1];
                        const body = match[2];
                        let frontmatter = {};
                        frontmatterString.split('\n').forEach(line => {
                            if (line.trim()) {
                                const [key, value] = line.split(':');
                                frontmatter[key.trim()] = value.trim().replace(/^['"](.*)['"]$/, '$1');
                            }
                        });

                        // Create the blog post card element
                        const card = document.createElement('a');
                        card.href = `#`; // You would link to a dedicated post page here
                        card.classList.add('blog-post-card');

                        // Create the inner HTML for the card using extracted data
                        card.innerHTML = `
                            <img src="${frontmatter.image ? frontmatter.image : 'https://placehold.co/300x200/cccccc/333333?text=No+Image'}" alt="${frontmatter.title} Featured Image">
                            <div class="blog-post-card-content">
                                <h3>${frontmatter.title}</h3>
                                <p>...</p> <!-- You can generate a summary of the body text here -->
                                <div class="post-date">${new Date(frontmatter.date).toLocaleDateString()}</div>
                            </div>
                        `;
                        
                        // Append the new card to the container
                        blogPostsContainer.appendChild(card);
                    } else {
                        console.error('Could not parse frontmatter for post:', post.name);
                    }
                }
            }
        } catch (error) {
            console.error('Error rendering blog posts:', error);
            blogPostsContainer.innerHTML = '<h2>Failed to load blog posts. Please check the repository settings.</h2>';
        }
    }

    // Call the function to render the blog posts on page load
    renderBlogPosts();


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
    if (typeof cartPaypal !== 'undefined') {
        cartPaypal.Cart({ id: "pp-view-cart" });
    }
});

// A new variable is added in your existing script.js to dynamically load blog posts on blog.html.
// This new variable will check if the blogPostsContainer element exists and then fetch the blog posts
// from your GitHub repository using the GitHub API. It will parse the Markdown files and
// create a blog post card for each one, using your existing CSS classes.
