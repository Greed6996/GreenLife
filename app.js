document.addEventListener('DOMContentLoaded', () => {

  // Force scroll to top/hero section on refresh
  if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
  }
  window.scrollTo(0, 0);
  if (window.location.hash) {
    history.replaceState(null, null, ' ');
  }

  // --- Booking State Variables ---
  let selectedPractitioner = "Dr. Ananya Sharma";
  let selectedDate = "Jun 05";
  let selectedTime = "09:00 AM";

  // --- Header Scroll Effect ---
  const header = document.getElementById('mainHeader');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // --- Mobile Navigation Drawer ---
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileNav = document.getElementById('mobileNav');
  const mobileNavClose = document.getElementById('mobileNavClose');
  const mobileOverlayBg = document.getElementById('mobileOverlayBg');
  const mobileLinks = document.querySelectorAll('.mobile-link, .mobile-sublink, #mobileBookBtn');

  function openMobileNav() {
    mobileNav.classList.add('open');
    mobileOverlayBg.classList.add('visible');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileNav() {
    mobileNav.classList.remove('open');
    mobileOverlayBg.classList.remove('visible');
    document.body.style.overflow = '';
  }

  mobileMenuBtn.addEventListener('click', openMobileNav);
  mobileNavClose.addEventListener('click', closeMobileNav);
  mobileOverlayBg.addEventListener('click', closeMobileNav);
  mobileLinks.forEach(link => link.addEventListener('click', closeMobileNav));

  // --- Scroll Animations (IntersectionObserver) ---
  const animateElements = document.querySelectorAll('.scroll-animate');
  const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        animationObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  animateElements.forEach(el => animationObserver.observe(el));

  // --- Clinical Specialties Tab Explorer ---
  const specBtns = document.querySelectorAll('#specialtiesTabs .spec-tab-btn');
  const specContents = document.querySelectorAll('.specialties-content-panel .spec-content');

  specBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      specBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const specId = btn.getAttribute('data-spec');
      specContents.forEach(content => {
        if (content.id === `spec-${specId}`) {
          content.classList.add('active');
        } else {
          content.classList.remove('active');
        }
      });
    });
  });

  // --- Treatment Showcase Tabs ---
  const tabBtns = document.querySelectorAll('#treatmentTabs .treatment-tab-btn');
  const tabContents = document.querySelectorAll('#therapies .treatment-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const tabId = btn.getAttribute('data-tab');
      tabContents.forEach(content => {
        if (content.id === `tab-${tabId}`) {
          content.classList.add('active');
        } else {
          content.classList.remove('active');
        }
      });
    });
  });

  // --- Practitioner booking triggers ---
  const practitionerPickerCards = document.querySelectorAll('#step1 .picker-card');
  const practitionerTriggerBtns = document.querySelectorAll('.book-practitioner-trigger');
  
  practitionerTriggerBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const practitionerName = btn.getAttribute('data-name');
      // Set internal selected variable
      selectedPractitioner = practitionerName;
      // Highlight in scheduler picker
      practitionerPickerCards.forEach(card => {
        if (card.getAttribute('data-value') === practitionerName) {
          card.classList.add('selected');
        } else {
          card.classList.remove('selected');
        }
      });
      // Scroll to scheduler
      document.getElementById('book').scrollIntoView({ behavior: 'smooth' });
    });
  });

  // --- Treatment booking triggers ---
  const treatmentTriggerBtns = document.querySelectorAll('.book-trigger');
  treatmentTriggerBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const treatmentName = btn.getAttribute('data-treatment');
      // Append treatment context notes
      const notesInput = document.getElementById('schedNotes');
      if (notesInput) {
        notesInput.value = `Interested in: ${treatmentName}`;
      }
      // Scroll to scheduler
      document.getElementById('book').scrollIntoView({ behavior: 'smooth' });
    });
  });

  // --- Specialties booking triggers ---
  const specBookingTriggers = document.querySelectorAll('.spec-booking-trigger');
  specBookingTriggers.forEach(btn => {
    btn.addEventListener('click', () => {
      const deptName = btn.getAttribute('data-dept');
      // Append department context notes
      const notesInput = document.getElementById('schedNotes');
      if (notesInput) {
        notesInput.value = `Consultation for: ${deptName}`;
      }
      // Scroll to scheduler
      document.getElementById('book').scrollIntoView({ behavior: 'smooth' });
    });
  });

  // --- Scheduler Interactive Multi-step Form Flow ---
  // (Booking state variables are declared at the top of the DOMContentLoaded callback)

  // Step Elements
  const step1 = document.getElementById('step1');
  const step2 = document.getElementById('step2');
  const step3 = document.getElementById('step3');
  const stepSuccess = document.getElementById('stepSuccess');

  // Indicators
  const dot1 = document.getElementById('dot1');
  const dot2 = document.getElementById('dot2');
  const dot3 = document.getElementById('dot3');

  // Interactive buttons in step 1
  practitionerPickerCards.forEach(card => {
    card.addEventListener('click', () => {
      practitionerPickerCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      selectedPractitioner = card.getAttribute('data-value');
    });
  });

  // Step 1 to Step 2
  document.getElementById('btnNext1').addEventListener('click', () => {
    step1.classList.remove('active');
    step2.classList.add('active');
    dot2.classList.add('active');
  });

  // Date and Time picker interactions
  const dateBtns = document.querySelectorAll('#dateGrid .date-btn');
  dateBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      dateBtns.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedDate = btn.getAttribute('data-date');
    });
  });

  const timeBtns = document.querySelectorAll('#timeGrid .time-btn');
  timeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      timeBtns.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedTime = btn.getAttribute('data-time');
    });
  });

  // Step 2 navigation
  document.getElementById('btnBack2').addEventListener('click', () => {
    step2.classList.remove('active');
    step1.classList.add('active');
    dot2.classList.remove('active');
  });

  document.getElementById('btnNext2').addEventListener('click', () => {
    step2.classList.remove('active');
    step3.classList.add('active');
    dot3.classList.add('active');
  });

  // Step 3 navigation & form submission
  document.getElementById('btnBack3').addEventListener('click', () => {
    step3.classList.remove('active');
    step2.classList.add('active');
    dot3.classList.remove('active');
  });

  const bookingForm = document.getElementById('step3');
  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const clientName = document.getElementById('schedName').value;
    const clientEmail = document.getElementById('schedEmail').value;

    if (!clientName || !clientEmail) {
      alert('Please fill out your name and email address.');
      return;
    }

    // Populate Success Screen details
    document.getElementById('summaryPractitioner').textContent = selectedPractitioner;
    document.getElementById('summaryDateTime').textContent = `${selectedDate} at ${selectedTime}`;

    // Switch to success view
    step3.classList.remove('active');
    stepSuccess.classList.add('active');
    
    // Hide dots on success
    document.querySelector('.step-indicator').style.display = 'none';
  });

  // Reset Booking wizard
  document.getElementById('btnResetBooking').addEventListener('click', () => {
    // Reset Form
    bookingForm.reset();
    
    // Show dots
    document.querySelector('.step-indicator').style.display = 'flex';
    dot2.classList.remove('active');
    dot3.classList.remove('active');

    // Switch panels
    stepSuccess.classList.remove('active');
    step1.classList.add('active');
  });

  // --- Clinic Tour Gallery Filter & Lightbox ---
  const galleryFilterBtns = document.querySelectorAll('.gallery-filter-btn');
  const galleryCards = document.querySelectorAll('.gallery-card');

  // Filter functionality
  galleryFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active states on buttons
      galleryFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      galleryCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          void card.offsetWidth; // trigger reflow for css transition
          card.classList.remove('filtered-out');
        } else {
          card.classList.add('filtered-out');
          // Hide display after the opacity fade transition completes
          setTimeout(() => {
            if (card.classList.contains('filtered-out')) {
              card.style.display = 'none';
            }
          }, 300);
        }
      });
    });
  });

  // Lightbox functionality
  const lightbox = document.getElementById('galleryLightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxDesc = document.getElementById('lightboxDesc');
  const lightboxIndex = document.getElementById('lightboxIndex');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');

  let currentImgIndex = 0;

  // Returns array of currently visible/filtered cards
  function getActiveCards() {
    return Array.from(galleryCards).filter(card => {
      return card.style.display !== 'none' && !card.classList.contains('filtered-out');
    });
  }

  function showLightboxImage(index) {
    const activeCards = getActiveCards();
    if (activeCards.length === 0) return;

    if (index < 0) {
      index = activeCards.length - 1;
    } else if (index >= activeCards.length) {
      index = 0;
    }

    currentImgIndex = index;
    const card = activeCards[currentImgIndex];
    const imgEl = card.querySelector('.gallery-img-wrapper img');
    const titleEl = card.querySelector('.gallery-card-content h3');
    const descEl = card.querySelector('.gallery-card-content p');

    lightboxImg.src = imgEl.src;
    lightboxImg.alt = imgEl.alt;
    lightboxTitle.textContent = titleEl.textContent;
    lightboxDesc.textContent = descEl.textContent;
    lightboxIndex.textContent = `${currentImgIndex + 1} / ${activeCards.length}`;
  }

  // Bind clicks to open lightbox
  galleryCards.forEach(card => {
    card.addEventListener('click', () => {
      const activeCards = getActiveCards();
      const index = activeCards.indexOf(card);
      if (index !== -1) {
        showLightboxImage(index);
        lightbox.style.display = 'flex';
        void lightbox.offsetWidth; // trigger reflow
        lightbox.classList.add('active');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  // Close lightbox
  function closeLightbox() {
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    // Wait for fadeout animation before setting display: none
    setTimeout(() => {
      if (!lightbox.classList.contains('active')) {
        lightbox.style.display = 'none';
        lightboxImg.src = ''; // clear image source
      }
    }, 350);
  }

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    // Close if clicked on backdrop background, not on the children elements
    if (e.target === lightbox || e.target.classList.contains('lightbox-content') || e.target.classList.contains('lightbox-img-container')) {
      closeLightbox();
    }
  });

  // Slider navigation
  lightboxPrev.addEventListener('click', (e) => {
    e.stopPropagation();
    showLightboxImage(currentImgIndex - 1);
  });

  lightboxNext.addEventListener('click', (e) => {
    e.stopPropagation();
    showLightboxImage(currentImgIndex + 1);
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;

    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowLeft') {
      showLightboxImage(currentImgIndex - 1);
    } else if (e.key === 'ArrowRight') {
      showLightboxImage(currentImgIndex + 1);
    }
  });

  // Initialize Scroll Animation Observer for the new section elements
  const newAnimateElements = document.querySelectorAll('#gallery .scroll-animate');
  if (typeof animationObserver !== 'undefined') {
    newAnimateElements.forEach(el => animationObserver.observe(el));
  } else {
    // If the animation observer in app.js is named differently, bind it manually
    const localObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          localObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });
    newAnimateElements.forEach(el => localObserver.observe(el));
  }

});
