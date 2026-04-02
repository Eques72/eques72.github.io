const sections = document.querySelectorAll("section.segment");
const navLinks = document.querySelectorAll(".nav-link");

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {

            let id = entry.target.getAttribute("id");

            navLinks.forEach(link => {
                link.classList.remove("active");

                if (link.getAttribute("href") === "#" + id) {
                    link.classList.add("active");
                }
            });

        }

    });

}, {
    threshold: 0.2
});

sections.forEach(section => {
    observer.observe(section);
});

navLinks.forEach(link => 
{
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const target = document.getElementById(targetId);

        if (target) {
            const offset = target.offsetTop + target.offsetHeight * -0.5;
            window.scrollTo({
            top: offset,
            behavior: 'smooth'
        });
        }
    });
});

//mobilemenu
document.addEventListener('DOMContentLoaded', function() {
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    const mobileMenuClose = document.getElementById('mobileMenuClose');
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');
    const navLinks = document.querySelectorAll('.nav-link');

    function openMobileMenu() {
        console.log('Opening mobile menu');
        mobileToggle.classList.add('active');
        mobileMenu.classList.add('active');
        mobileMenuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMobileMenu() {
        console.log('Closing mobile menu');
        mobileToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    mobileToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        if (mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });

    mobileMenuClose.addEventListener('click', function(e) {
        e.preventDefault();
        closeMobileMenu();
    });

    mobileMenuOverlay.addEventListener('click', function() {
        closeMobileMenu();
    });

    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeMobileMenu();

            mobileMenuLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');

            const href = this.getAttribute('href');
            navLinks.forEach(navLink => {
                navLink.classList.remove('active');
                if (navLink.getAttribute('href') === href) {
                    navLink.classList.add('active');
                }
            });
        });
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeMobileMenu();
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            const href = this.getAttribute('href');
            mobileMenuLinks.forEach(mobileLink => {
                mobileLink.classList.remove('active');
                if (mobileLink.getAttribute('href') === href) {
                    mobileLink.classList.add('active');
                }
            });
        });
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar-container');
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    const floatingCircles = document.querySelectorAll('.floating-circle');
    floatingCircles.forEach(circle => {
        circle.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2)';
        });
        
        circle.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    window.addEventListener('resize', function() {
        if (window.innerWidth > 992 && mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });
});

// carousel controls
const radios = document.querySelectorAll('input[name="position"]');

function getIndex() {
  return [...radios].findIndex(r => r.checked);
}

function next() {
  let i = getIndex();
  i = (i + 1) % radios.length;
  radios[i].checked = true;
}

function prev() {
  let i = getIndex();
  i = (i - 1 + radios.length) % radios.length;
  radios[i].checked = true;
}