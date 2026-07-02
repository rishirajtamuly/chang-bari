console.log("NEW SCRIPT LOADED");

const form = document.getElementById("contactForm");

form.addEventListener("submit", async function (e) {

    console.log("1. Submit clicked");

    e.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    console.log("2. Data =", data);

    try {

        console.log("3. Sending fetch...");

        const response = await fetch("/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        console.log("4. Response status:", response.status);

        const result = await response.text();

        console.log("5. Server says:", result);

        alert(result);

    } catch (err) {

        console.error("FETCH ERROR:", err);

    }

});
