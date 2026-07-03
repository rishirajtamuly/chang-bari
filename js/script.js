console.log("script.js loaded");

// No form submission code here anymore
// Netlify Forms handles the contact form automatically


// const form = document.getElementById("contactForm");

// form.addEventListener("submit", async function (e) {
//     e.preventDefault();

//     const formData = new FormData(form);
//     const data = Object.fromEntries(formData);

//     try {
//         const response = await fetch("https://chang-bari.onrender.com/contact", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify(data)
//         });

//         const result = await response.text();
//         alert(result);

//     } catch (err) {
//         console.error("FETCH ERROR:", err);
//     }
// });
