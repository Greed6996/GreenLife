document.addEventListener('DOMContentLoaded', () => {

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
  const mobileLinks = document.querySelectorAll('.mobile-link, #mobileBookBtn');

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

  // --- Journey Card Category Filters ---
  const filterBtns = document.querySelectorAll('#journeyFilters .filter-btn');
  const journeyCards = document.querySelectorAll('#journeysGrid .journey-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active button style
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      // Filter cards
      journeyCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          // Force a tiny reflow for fade-in animations to re-trigger
          card.style.animation = 'none';
          card.offsetHeight; /* trigger reflow */
          card.style.animation = 'fadeIn 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // --- Treatment Showcase Tabs ---
  const tabBtns = document.querySelectorAll('#treatmentTabs .treatment-tab-btn');
  const tabContents = document.querySelectorAll('#treatments .treatment-content');

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

  // --- Journey Details Modal Dynamic Population ---
  const journeyDetailsData = {
    revive: {
      title: 'Follicle Revive Journey',
      badge: 'Growth Focus',
      badgeClass: 'revive',
      duration: '6 Weeks Program',
      img: 'assets/journey_revive.png',
      desc: 'A concentrated program designed specifically for thinning crown lines and early-stage alopecia. This journey focuses heavily on mechanical stimulation, traditional scalp activation formulations, and herbal supplements to nourish underlying roots.',
      steps: [
        'Week 1-2: Intensive scalp exfoliation with warm Neem & Amla pastes to unclog dormant follicle tracts.',
        'Week 3-4: Daily Shiroabhyanga marma point pressure massage combined with warm pure Bhringraj leaf oil.',
        'Week 5-6: Cold-pressed infusion therapy to lock in moisture and nourish newly emerging hair shafts.'
      ]
    },
    nourish: {
      title: 'Scalp Nourish Journey',
      badge: 'Scalp Care',
      badgeClass: 'nourish',
      duration: '4 Weeks Program',
      img: 'assets/journey_nourish.png',
      desc: 'Formulated to target flaky, irritated, dry, or excessively oily scalps. This journey focuses on restoration of pH balance and resolving inflammation, constructing an optimal foundation for hair shaft retention.',
      steps: [
        'Week 1-2: Soothing Lepa treatments made from organic aloe, neem, and sandalwood paste to eliminate dryness.',
        'Week 3: Clarifying warm herbal rinses to sweep away built-up sebum, scale, and environmental toxins.',
        'Week 4: Mild essential oil scalp sealing session with organic coconut and tea tree infusions.'
      ]
    },
    calm: {
      title: 'Stress Harmony Journey',
      badge: 'Mind & Root Harmony',
      badgeClass: 'calm',
      duration: '8 Weeks Program',
      img: 'assets/journey_calm.png',
      desc: 'For stress-induced hair loss (Telogen Effluvium). By combining traditional Shirodhara with meditative nervous-system support, we lower systemic cortisol levels to prevent hair follicles from prematurely entering the shedding phase.',
      steps: [
        'Week 1-3: Weekly Shirodhara oil streams paired with calm diaphragmatic breathing instruction.',
        'Week 4-6: Gentle neck, head, and shoulder marma pressure massage to promote lymphatic drainage.',
        'Week 7-8: Tailored lifestyle consulting, Ayurvedic nutrition guidance, and cooling herbal home scalp rinses.'
      ]
    }
  };

  const journeyModal = document.getElementById('journeyModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalImg = document.getElementById('modalImg');
  const modalBadge = document.getElementById('modalBadge');
  const modalTitle = document.getElementById('modalTitle');
  const modalDurationVal = document.getElementById('modalDurationVal');
  const modalDesc = document.getElementById('modalDesc');
  const modalStepList = document.getElementById('modalStepList');
  const modalCta = document.getElementById('modalCta');

  document.querySelectorAll('.journey-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const journeyId = link.getAttribute('data-journey');
      const data = journeyDetailsData[journeyId];

      if (data) {
        modalTitle.textContent = data.title;
        modalBadge.textContent = data.badge;
        
        // Dynamic class for badge
        modalBadge.className = 'modal-badge';
        modalBadge.style.backgroundColor = journeyId === 'revive' ? '#e2ede0' : (journeyId === 'nourish' ? '#f7ede8' : '#e3ecf5');
        modalBadge.style.color = journeyId === 'revive' ? '#2e4a2a' : (journeyId === 'nourish' ? '#c87a53' : '#555e72');
        
        modalDurationVal.textContent = data.duration;
        modalDesc.textContent = data.desc;
        modalImg.src = data.img;

        // Clear and populate steps
        modalStepList.innerHTML = '';
        data.steps.forEach(step => {
          const li = document.createElement('li');
          li.textContent = step;
          modalStepList.appendChild(li);
        });

        // Configure modal CTA destination
        modalCta.href = '#book';
        modalCta.addEventListener('click', () => {
          journeyModal.classList.remove('visible');
          document.body.style.overflow = '';
        });

        // Open modal
        journeyModal.classList.add('visible');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeJourneyModal() {
    journeyModal.classList.remove('visible');
    document.body.style.overflow = '';
  }

  modalCloseBtn.addEventListener('click', closeJourneyModal);
  journeyModal.addEventListener('click', (e) => {
    if (e.target === journeyModal) {
      closeJourneyModal();
    }
  });

  // --- Practitioner booking triggers ---
  const practitionerPickerCards = document.querySelectorAll('#step1 .picker-card');
  const practitionerTriggerBtns = document.querySelectorAll('.book-practitioner-trigger');
  
  practitionerTriggerBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const practitionerName = btn.getAttribute('data-name');
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
    });
  });

  // --- Scheduler Interactive Multi-step Form Flow ---
  let selectedPractitioner = "Dr. Ananya Sharma";
  let selectedDate = "Jun 05";
  let selectedTime = "09:00 AM";

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

});
