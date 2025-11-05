
        // Initialize particles
        function createParticles() {
            const particlesContainer = document.querySelector('.particles');
            const particleCount = 50;
            
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.width = (Math.random() * 3 + 1) + 'px';
                particle.style.height = particle.style.width;
                particle.style.animationDelay = Math.random() * 8 + 's';
                particle.style.animationDuration = (Math.random() * 3 + 5) + 's';
                particlesContainer.appendChild(particle);
            }
        }

        // Mobile menu toggle
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');

        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const headerOffset = 100;
                    const elementPosition = target.offsetTop;
                    const offsetPosition = elementPosition - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Scroll indicator
        function updateScrollIndicator() {
            const scrolled = window.pageYOffset;
            const maxHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = scrolled / maxHeight;
            const indicator = document.querySelector('.scroll-indicator');
            indicator.style.transform = `scaleX(${scrollPercent})`;
        }

        // Header background change on scroll
        window.addEventListener('scroll', () => {
            const header = document.querySelector('.header');
            updateScrollIndicator();
            
            if (window.scrollY > 100) {
                header.style.background = 'rgba(12, 12, 12, 0.95)';
                header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
            } else {
                header.style.background = 'rgba(12, 12, 12, 0.8)';
                header.style.boxShadow = 'none';
            }
        });

        // Gallery modal functionality
        const modal = document.getElementById('imageModal');
        const modalImg = document.getElementById('modalImage');
        const closeModal = document.querySelector('.close');

        function openModal(element) {
            const img = element.querySelector('img');
            modal.style.display = 'block';
            modalImg.src = img.src;
            modalImg.alt = img.alt;
            document.body.style.overflow = 'hidden';
        }

        closeModal.addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });

        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });

        // Enhanced video handling
        document.addEventListener('DOMContentLoaded', () => {
            const videos = document.querySelectorAll('video');
            
            videos.forEach((video, index) => {
                // Disable autoplay on mobile devices
                if (window.innerWidth <= 768) {
                    video.removeAttribute('autoplay');
                    video.preload = 'none';
                }
                
                // Add loading states
                video.addEventListener('loadstart', () => {
                    video.style.opacity = '0.7';
                    video.style.filter = 'blur(2px)';
                });
                
                video.addEventListener('canplay', () => {
                    video.style.opacity = '1';
                    video.style.filter = 'none';
                });
                
                // Pause other videos when one starts playing
                video.addEventListener('play', () => {
                    videos.forEach(otherVideo => {
                        if (otherVideo !== video) {
                            otherVideo.pause();
                        }
                    });
                });

                // Add custom play button
                const playButton = document.createElement('div');
                playButton.innerHTML = '<i class="fas fa-play"></i>';
                playButton.style.cssText = `
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 80px;
                    height: 80px;
                    background: rgba(0, 212, 255, 0.8);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-size: 2rem;
                    cursor: pointer;
                    opacity: 0;
                    transition: all 0.3s ease;
                    backdrop-filter: blur(10px);
                `;

                const videoContainer = video.parentElement;
                videoContainer.style.position = 'relative';
                videoContainer.appendChild(playButton);

                videoContainer.addEventListener('mouseenter', () => {
                    if (video.paused) {
                        playButton.style.opacity = '1';
                    }
                });

                videoContainer.addEventListener('mouseleave', () => {
                    playButton.style.opacity = '0';
                });

                playButton.addEventListener('click', () => {
                    video.play();
                    playButton.style.opacity = '0';
                });

                video.addEventListener('play', () => {
                    playButton.style.opacity = '0';
                });

                video.addEventListener('pause', () => {
                    playButton.style.opacity = '1';
                });
            });
        });

        // Advanced scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('loaded');
                    }, index * 100);
                }
            });
        }, observerOptions);

        // Observe elements for animation
        document.querySelectorAll('.loading').forEach(el => {
            observer.observe(el);
        });

        // Enhanced contact button interactions
        document.querySelectorAll('.contact-btn').forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                btn.style.transform = 'translateY(-5px) scale(1.02)';
            });

            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translateY(0) scale(1)';
            });

            btn.addEventListener('click', (e) => {
                // Create ripple effect
                const rect = btn.getBoundingClientRect();
                const ripple = document.createElement('span');
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255,255,255,0.6);
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                `;
                
                btn.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });

        // Add dynamic ripple animation
        const rippleStyle = document.createElement('style');
        rippleStyle.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
            .contact-btn {
                position: relative;
                overflow: hidden;
            }
        `;
        document.head.appendChild(rippleStyle);

        // Parallax effect for background
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.animated-bg');
            
            parallaxElements.forEach(element => {
                const speed = 0.5;
                element.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });

        // Initialize everything
        window.addEventListener('load', () => {
            createParticles();
            document.body.classList.add('loaded');
            
            // Staggered animations for gallery items
            const galleryItems = document.querySelectorAll('.gallery-item');
            galleryItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.transform = 'translateY(0)';
                    item.style.opacity = '1';
                }, index * 100);
            });
        });

        // Add keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.style.display === 'block') {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });

        // Performance optimization: Intersection Observer for expensive animations
        if ('IntersectionObserver' in window) {
            const expensiveAnimationObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.animationPlayState = 'running';
                    } else {
                        entry.target.style.animationPlayState = 'paused';
                    }
                });
            });

            document.querySelectorAll('.animated-bg, .particle').forEach(el => {
                expensiveAnimationObserver.observe(el);
            });
        }
