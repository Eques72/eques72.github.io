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