const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

console.log("navigation script loaded");
console.log("sections:", sections);
console.log("navs:", navLinks);

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