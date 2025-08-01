// script.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth, signInAnonymously } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getFirestore, collection, onSnapshot, query, orderBy } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";


document.addEventListener('DOMContentLoaded', () => {

    // --- Firebase Initialization ---
    // Global variables provided by the environment
    const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
    const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const auth = getAuth(app);
    let userId;

    // Sign in anonymously to get a user ID
    signInAnonymously(auth).then(userCredential => {
        userId = userCredential.user.uid;
        console.log("Firebase signed in anonymously with user ID:", userId);

        // After signing in, start listening for blog posts
        setupBlogPostsListener();

    }).catch(error => {
        console.error("Error signing in anonymously:", error);
    });

    function setupBlogPostsListener() {
        const blogPostsContainer = document.querySelector('.blog-posts-container');
        if (!blogPostsContainer) {
            return;
        }

        const blogPostsCollection = collection(db, `artifacts/${appId}/public/data/blog_posts`);
        const postsQuery = query(blogPostsCollection, orderBy("createdAt", "desc"));

        onSnapshot(postsQuery, (snapshot) => {
            const posts = [];
            snapshot.forEach(doc => {
                posts.push({ id: doc.id, ...doc.data() });
            });

            // Clear existing content and render new posts
            blogPostsContainer.innerHTML = '';
            if (posts.length === 0) {
                blogPostsContainer.innerHTML = '<h2 class="text-center text-gray-500">No blog posts found.</h2>';
            } else {
                posts.forEach(post => {
                    const postCard = document.createElement('a');
                    postCard.href = '#'; // Link to a dedicated post page if you create one
                    postCard.classList.add('blog-post-card');

                    const postDate = post.createdAt ? new Date(post.createdAt.toDate()).toLocaleDateString() : 'N/A';

                    postCard.innerHTML = `
                        <img src="${post.imageUrl || 'https://placehold.co/300x200/cccccc/333333?text=No+Image'}" alt="${post.title}" onerror="this.onerror=null;this.src='https://placehold.co/300x200/cccccc/333333?text=Image+Not+Found';">
                        <div class="blog-post-card-content">
                            <h3>${post.title}</h3>
                            <p>${post.description.substring(0, 100)}...</p>
                            <div class="post-date">${postDate}</div>
                        </div>
                    `;
                    blogPostsContainer.appendChild(postCard);
                });
            }
        }, (error) => {
            console.error("Error fetching blog posts:", error);
            blogPostsContainer.innerHTML = '<h2 class="text-center text-red-500">Failed to load blog posts.</h2>';
        });
    }

    // --- YOUR ORIGINAL SCRIPT.JS CODE IS RETAINED BELOW THIS LINE ---

    // --- Hamburger Menu Logic ---
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mainNav = document.querySelector('.main-nav');

    if (hamburgerMenu && mainNav) {
        hamburgerMenu.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });

        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    document.body.classList.remove('menu-open');
                }
            });
        });
    }

    // --- Slideshow Logic for Collection Cards ---
    const collectionCards = document.querySelectorAll('.collection-card');

    collectionCards.forEach(card => {
        const images = card.querySelectorAll('.slideshow-image');
        let currentImageIndex = 0;
        let slideshowInterval;

        if (images.length > 1) {
            images.forEach((img, index) => {
                if (index === 0) {
                    img.classList.add('active');
                } else {
                    img.classList.remove('active');
                }
            });

            card.addEventListener('mouseenter', () => {
                clearInterval(slideshowInterval);
                slideshowInterval = setInterval(() => {
                    images[currentImageIndex].classList.remove('active');
                    currentImageIndex = (currentImageIndex + 1) % images.length;
                    images[currentImageIndex].classList.add('active');
                }, 1500);
            });

            card.addEventListener('mouseleave', () => {
                clearInterval(slideshowInterval);
                images[currentImageIndex].classList.remove('active');
                currentImageIndex = 0;
                images[currentImageIndex].classList.add('active');
            });
        }
    });

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
            formData.forEach((value, key) => { formObject[key] = value; });
            console.log('Form Submitted:', formObject);
            try {
                const response = await fetch(form.action, {
                    method: form.method,
                    body: formData,
                    headers: { 'Accept': 'application/json' }
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
    const comingSoonImage = document.getElementById('comingSoonImage');
    if (comingSoonImage) {
        comingSoonImage.addEventListener('click', function(event) {
            event.preventDefault();
            this.classList.add('animate-butterfly-out');
            this.addEventListener('animationend', () => { window.location.href = 'contact.html'; }, { once: true });
            setTimeout(() => { window.location.href = 'contact.html'; }, 500);
        });
    }

    if (typeof cartPaypal !== 'undefined') {
        cartPaypal.Cart({ id: "pp-view-cart" });
    }
});
