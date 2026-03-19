const sections = document.querySelectorAll("section.segment");
const navLinks = document.querySelectorAll(".nav-link");

const observer = new IntersectionObserver(entries => {
    // console.log("obs fired");
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

// TO DO - To separate script
async function loadCount() {
    const res = await fetch("/api/count");
    const count = await res.json();

    document.getElementById("visitor-count").textContent = count;
}

loadCount();

const eventSource = new EventSource("/api/count_stream");
eventSource.onmessage = (event) => {
    console.log(event.data);
    document.getElementById("visitor-count").textContent = event.data;
};


const elements = document.querySelectorAll('.fade-in');

const observer_fade = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.15
});

elements.forEach(el => observer_fade.observe(el));