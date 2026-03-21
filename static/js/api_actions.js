async function loadCount() {
    const res = await fetch("/api/count");
    const count = await res.json();

    document.getElementById("visitor-count").textContent = count;
}

const eventSource = new EventSource("/api/count_stream");
eventSource.onmessage = (event) => {
    console.log(event.data);
    document.getElementById("visitor-count").textContent = event.data;
};

loadCount();
