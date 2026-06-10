// ==========================================================================
// MOBILE MENU TOGGLE
// ==========================================================================
const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");

menuBtn.addEventListener("click", (e) => {
    navLinks.classList.toggle("open");

    const isOpen = navLinks.classList.contains("open");
    menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
});

navLinks.addEventListener("click", (e) => {
    navLinks.classList.remove("open");
    menuBtnIcon.setAttribute("class", "ri-menu-line");
});

// ==========================================================================
// NAVBAR — SCROLL SHADOW & SHRINK
// Nagdadagdag ng shadow at nagpalit ng padding kapag nag-scroll na
// ==========================================================================
const navbar = document.querySelector("nav");

window.addEventListener("scroll", () => {
    if (window.scrollY > 80) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

// ==========================================================================
// ACTIVE NAV LINK — nagiging highlighted ang link ng current section
// ==========================================================================
const sections = document.querySelectorAll("section[id], header[id]");
const navItems = document.querySelectorAll(".nav__links a");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 120;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    navItems.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }
    });
});

// ==========================================================================
// BOOKING FORM — DATE VALIDATION
// Hindi pwedeng pumili ng nakaraang petsa; departure dapat laging > arrival
// ==========================================================================
const arrivalInput = document.getElementById("arrival");
const departureInput = document.getElementById("departure");
const bookingForm = document.querySelector(".booking__container form");

// I-set ang minimum na petsa sa today
const today = new Date().toISOString().split("T")[0];
arrivalInput.setAttribute("min", today);
departureInput.setAttribute("min", today);

// Kapag binago ang arrival, i-update ang min ng departure
arrivalInput.addEventListener("change", () => {
    departureInput.setAttribute("min", arrivalInput.value);

    // I-clear ang departure kung mas maaga pa ito kaysa bagong arrival
    if (departureInput.value && departureInput.value <= arrivalInput.value) {
        departureInput.value = "";
    }
});

// Form submit — basic validation with toast notification
bookingForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const arrival = arrivalInput.value;
    const departure = departureInput.value;
    const guests = document.getElementById("guests").value;

    if (!arrival || !departure || !guests) {
        showToast("Please fill in all fields.", "error");
        return;
    }

    if (departure <= arrival) {
        showToast("Departure date must be after arrival date.", "error");
        return;
    }

    // Calculate number of nights
    const nights = Math.ceil(
        (new Date(departure) - new Date(arrival)) / (1000 * 60 * 60 * 24)
    );

    showToast(`Checking availability for ${nights} night${nights > 1 ? "s" : ""} · ${guests} guest${guests > 1 ? "s" : ""}...`, "success");
});

// ==========================================================================
// TOAST NOTIFICATION
// Nagpapakita ng maliit na notification sa ibaba ng screen
// ==========================================================================
function showToast(message, type = "success") {
    // Alisin ang existing toast kung mayroon
    const existing = document.querySelector(".toast");
    if (existing) existing.remove();

    const toast = document.createElement("div");
    toast.className = `toast toast--${type}`;
    toast.innerHTML = `
        <i class="${type === "success" ? "ri-check-line" : "ri-error-warning-line"}"></i>
        <span>${message}</span>
    `;
    document.body.appendChild(toast);

    // Mag-animate papasok
    setTimeout(() => toast.classList.add("toast--show"), 10);

    // Mag-disappear pagkatapos ng 3 segundo
    setTimeout(() => {
        toast.classList.remove("toast--show");
        setTimeout(() => toast.remove(), 400);
    }, 3500);
}

// ==========================================================================
// BACK TO TOP BUTTON
// Lumalabas kapag nag-scroll na pababa, bumabalik sa taas kapag na-click
// ==========================================================================
const backToTop = document.createElement("button");
backToTop.className = "back-to-top";
backToTop.innerHTML = '<i class="ri-arrow-up-line"></i>';
document.body.appendChild(backToTop);

window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
        backToTop.classList.add("visible");
    } else {
        backToTop.classList.remove("visible");
    }
});

backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// ==========================================================================
// ROOM CARD — BOOK BUTTON FEEDBACK
// Nagpapakita ng toast kapag na-click ang Book button sa rooms
// ==========================================================================
document.querySelectorAll(".room__card").forEach((card) => {
    card.addEventListener("click", (e) => {
        if (e.target.classList.contains("btn--room") || e.target.closest(".btn--room")) {
            e.preventDefault();
            const roomName = card.querySelector("h4").textContent;
            const price = card.querySelector(".room__price")?.textContent || "";

            showToast(`Redirecting to book: ${roomName} ${price}/night`, "success");

            // I-scroll pataas sa booking form
            setTimeout(() => {
                document.querySelector(".booking").scrollIntoView({ behavior: "smooth" });
            }, 1200);
        }
    });
});

// ==========================================================================
// SCROLL REVEAL ANIMATIONS
// ==========================================================================
const scrollRevealOption = {
    distance: "50px",
    origin: "bottom",
    duration: 1000,
};

ScrollReveal().reveal(".header__container .section__subheader", {
    ...scrollRevealOption,
});

ScrollReveal().reveal(".header__container h1", {
    ...scrollRevealOption,
    delay: 500,
});

ScrollReveal().reveal(".header__container .btn", {
    ...scrollRevealOption,
    delay: 1000,
});

ScrollReveal().reveal(".room__card", {
    ...scrollRevealOption,
    interval: 500,
});

ScrollReveal().reveal(".feature__card", {
    ...scrollRevealOption,
    interval: 500,
});

ScrollReveal().reveal(".news__card", {
    ...scrollRevealOption,
    interval: 500,
});

// Dagdag na reveal animations sa ibang sections
ScrollReveal().reveal(".about__card", {
    ...scrollRevealOption,
    interval: 300,
});

ScrollReveal().reveal(".about__image", {
    ...scrollRevealOption,
    origin: "left",
    interval: 300,
});

ScrollReveal().reveal(".pillar__card", {
    ...scrollRevealOption,
    interval: 200,
});

ScrollReveal().reveal(".facility__card", {
    ...scrollRevealOption,
    interval: 200,
});

ScrollReveal().reveal(".dish__card", {
    ...scrollRevealOption,
    interval: 150,
});

ScrollReveal().reveal(".stat", {
    ...scrollRevealOption,
    origin: "bottom",
    interval: 200,
});

ScrollReveal().reveal(".about__content", {
    ...scrollRevealOption,
    origin: "right",
    delay: 200,
});

ScrollReveal().reveal(".intro__content", {
    ...scrollRevealOption,
    origin: "left",
});

ScrollReveal().reveal(".intro__video", {
    ...scrollRevealOption,
    origin: "right",
    delay: 300,
});