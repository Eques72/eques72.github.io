const sections = document.querySelectorAll("section.segment");
const navLinks = document.querySelectorAll(".nav-link");

const observer = new IntersectionObserver(entries => {
    console.log("obs fired");
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