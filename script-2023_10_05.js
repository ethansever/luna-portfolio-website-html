if (sessionStorage.getItem("isThemeDark")) {
    if (document.getElementById("switch").checked === false) {
        document.getElementById("switch").setAttribute("checked", "true");
    }
}

let mm = gsap.matchMedia();
gsap.registerPlugin(ScrollTrigger);

const sections = gsap.utils.toArray(".section");
let sectionsWidth = 0;
function resize() {
    sectionsWidth = 0;
    sections.forEach((section) => {
        sectionsWidth += section.offsetWidth;
    });
}

ScrollTrigger.addEventListener("refreshInit", resize);
resize();

mm.add("(min-width: 992px)", () => {
    gsap.to(".scrollable", {
        x: () => `-${sectionsWidth - window.innerWidth}`,
        ease: "none",
        scrollTrigger: {
            trigger: "#main",
            pin: true,
            scrub: 1,
            end: () => `+=${sectionsWidth - window.innerWidth}`,
            invalidateOnRefresh: true,
        },
    });
});

document
    .getElementById("wind")
    .setAttribute(
        "width",
        sectionsWidth - sections[sections.length - 1].offsetWidth
    );

document.getElementById("about-me-btn").addEventListener("click", () => {
    if (window.innerWidth >= 992) {
        window.scrollBy({
            top: sectionsWidth - window.innerWidth,
            behavior: "smooth",
        });
    } else {
        document.getElementById("about-container").scrollIntoView({
            behavior: "smooth",
        });
    }
});

document.getElementById("switch").addEventListener("change", function () {
    if (this.checked) {
        sessionStorage.setItem("isThemeDark", true);
        document.querySelector("html").setAttribute("data-theme", "dark");
    } else {
        sessionStorage.removeItem("isThemeDark");
        document.querySelector("html").removeAttribute("data-theme");
    }
});

console.log('welcome!');
