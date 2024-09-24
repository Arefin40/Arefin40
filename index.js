const sections = document.querySelectorAll(".section");
const navigationLinks = document.querySelectorAll("[data-link]");
let currentSection = "home";

const updateActiveNavigation = () => {
   navigationLinks.forEach((linkElement) => {
      linkElement.getAttribute("data-link") === currentSection
         ? linkElement.classList.add("text-sky-600")
         : linkElement.classList.remove("text-sky-600");
   });
};

const setCurrentSection = (sectionName) => {
   if (currentSection !== sectionName) {
      currentSection = sectionName;
      updateActiveNavigation();
   }
};

document.addEventListener("DOMContentLoaded", () => {
   // Update active navigation link on scroll
   const lenis = new Lenis({ smoothWheel: false });

   lenis.on("scroll", () => {
      sections.forEach((section) => {
         const scrollY = window.scrollY;
         const offsetTop = section.offsetTop;
         const height = section.getBoundingClientRect().height;

         if (scrollY >= offsetTop && scrollY < offsetTop + height) {
            setCurrentSection(section.id);
         }
      });
   });

   // Request animation frame for smooth scrolling
   function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
   }
   requestAnimationFrame(raf);

   // listen for navigation link click event
   navigationLinks.forEach((linkElement) => {
      linkElement.addEventListener("click", () => {
         document.getElementById(linkElement.getAttribute("data-link")).scrollIntoView();
      });
   });
});
