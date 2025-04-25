// Mobile menu toggle
document
  .getElementById("mobile-menu-button")
  .addEventListener("click", function () {
    const menu = document.getElementById("mobile-menu");
    menu.classList.toggle("hidden");
  });

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });

    // Close mobile menu if open
    const mobileMenu = document.getElementById("mobile-menu");
    if (!mobileMenu.classList.contains("hidden")) {
      mobileMenu.classList.add("hidden");
    }
  });
});

// GSAP animations
gsap.registerPlugin(ScrollTrigger);

// Animate elements on scroll
gsap.utils.toArray(".skill-card, .project-card").forEach((card) => {
  gsap.from(card, {
    scrollTrigger: {
      trigger: card,
      start: "top 80%",
      toggleActions: "play none none none",
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    ease: "power2.out",
  });
});

// Animate about section
gsap.from("#about .flex", {
  scrollTrigger: {
    trigger: "#about",
    start: "top 70%",
    toggleActions: "play none none none",
  },
  x: -50,
  opacity: 0,
  duration: 1,
  ease: "power2.out",
});

// Animate contact section
gsap.from("#contact .flex", {
  scrollTrigger: {
    trigger: "#contact",
    start: "top 70%",
    toggleActions: "play none none none",
  },
  y: 50,
  opacity: 0,
  duration: 1,
  ease: "power2.out",
});

// Interactive 3D cube with auto-rotation and user control
const cube = document.querySelector(".cube");
const cubeContainer = document.getElementById("cubeContainer");
let isDragging = false;
let previousMousePosition = { x: 0, y: 0 };
let cubeRotation = { x: 0, y: 0 };
let autoRotate = true;
let animationId;

// Auto-rotation animation
function autoRotateCube() {
  if (autoRotate) {
    cubeRotation.y += 0.5;
    updateCubeRotation();
  }
  animationId = requestAnimationFrame(autoRotateCube);
}

// Update cube rotation
function updateCubeRotation() {
  cube.style.transform = `rotateX(${cubeRotation.x}deg) rotateY(${cubeRotation.y}deg)`;
}

// Start auto-rotation
autoRotateCube();

// Mouse events for desktop
cubeContainer.addEventListener("mousedown", (e) => {
  isDragging = true;
  autoRotate = false;
  previousMousePosition = { x: e.clientX, y: e.clientY };
  cubeContainer.style.cursor = "grabbing";
});

document.addEventListener("mousemove", (e) => {
  if (!isDragging) return;

  const deltaX = e.clientX - previousMousePosition.x;
  const deltaY = e.clientY - previousMousePosition.y;

  cubeRotation.y += deltaX * 0.5;
  cubeRotation.x -= deltaY * 0.5;

  updateCubeRotation();
  previousMousePosition = { x: e.clientX, y: e.clientY };
});

document.addEventListener("mouseup", () => {
  if (isDragging) {
    isDragging = false;
    cubeContainer.style.cursor = "grab";
    // Restart auto-rotation after a delay
    setTimeout(() => {
      autoRotate = true;
    }, 3000);
  }
});

// Touch events for mobile
cubeContainer.addEventListener("touchstart", (e) => {
  isDragging = true;
  autoRotate = false;
  previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  e.preventDefault();
});

document.addEventListener("touchmove", (e) => {
  if (!isDragging) return;

  const deltaX = e.touches[0].clientX - previousMousePosition.x;
  const deltaY = e.touches[0].clientY - previousMousePosition.y;

  cubeRotation.y += deltaX * 0.5;
  cubeRotation.x -= deltaY * 0.5;

  updateCubeRotation();
  previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  e.preventDefault();
});

document.addEventListener("touchend", () => {
  if (isDragging) {
    isDragging = false;
    // Restart auto-rotation after a delay
    setTimeout(() => {
      autoRotate = true;
    }, 3000);
  }
});

// Clean up animation frame on unmount
window.addEventListener("beforeunload", () => {
  cancelAnimationFrame(animationId);
});

// Particle.js background
document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.createElement("canvas");
  canvas.id = "particles-canvas";
  document.querySelector(".particles").appendChild(canvas);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  // Create particles
  const particlesGeometry = new THREE.BufferGeometry();
  const particlesCount = 500;

  const posArray = new Float32Array(particlesCount * 3);

  for (let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 10;
  }

  particlesGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(posArray, 3)
  );

  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.02,
    color: 0x00b4d8,
    transparent: true,
    opacity: 0.8,
  });

  const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particlesMesh);

  camera.position.z = 5;

  function animate() {
    requestAnimationFrame(animate);

    particlesMesh.rotation.x += 0.001;
    particlesMesh.rotation.y += 0.001;

    renderer.render(scene, camera);
  }

  animate();

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
});

// Language switcher functionality
const languageBtn = document.getElementById("languageBtn");
const mobileLanguageBtn = document.getElementById("mobileLanguageBtn");
const languageDropdown = document.getElementById("languageDropdown");
const currentLanguage = document.getElementById("currentLanguage");
const currentFlag = document.getElementById("currentFlag");
const mobileCurrentFlag = document.getElementById("mobileCurrentFlag");

// Translations
const translations = {
  en: {
    "nav-home": "Home",
    "nav-about": "About",
    "nav-skills": "Skills",
    "nav-projects": "Projects",
    "nav-contact": "Contact",
    "hero-title": "Hi, I'm",
    "hero-subtitle": "Web Developer & UI/UX Enthusiast",
    "hero-description":
      "I create beautiful, functional, and user-friendly web experiences with modern technologies and innovative solutions.",
    "contact-btn": "Get In Touch",
    "projects-btn": "View Work",
    "about-title": "About",
    "about-me": "Me",
    "about-who": "Who am I?",
    "about-description":
      "I'm Hossein Fallah, a passionate web developer with over 5 years of experience in creating modern, responsive, and user-friendly websites and web applications. I specialize in front-end development but also have strong back-end skills, making me a versatile full-stack developer.",
    "skill1-title": "Web Development",
    "skill1-desc":
      "Building responsive and interactive websites with modern technologies.",
    "skill2-title": "Mobile Responsive",
    "skill2-desc":
      "Creating designs that work perfectly on all devices and screen sizes.",
    "skill3-title": "Fast Performance",
    "skill3-desc":
      "Optimized websites for blazing fast loading speeds and smooth interactions.",
    "skill4-title": "SEO Friendly",
    "skill4-desc":
      "Implementing best practices to ensure your site ranks well in search engines.",
    "cv-btn": "Download CV",
    "hire-btn": "Hire Me",
    "my-skills-title": "My",
    "skills-title": "Skills",
    "frontend-title": "Frontend Development",
    "backend-title": "Backend Development",
    "other-title": "Other Skills",
    "my-projects-title": "My",
    "projects-title": "Projects",
    "project1-title": "E-commerce Platform",
    "project1-desc":
      "A full-featured e-commerce platform with product listings, cart functionality, and secure checkout process.",
    "project2-title": "Task Management App",
    "project2-desc":
      "A productivity application for managing tasks with drag-and-drop functionality and team collaboration features.",
    "project3-title": "Social Media Dashboard",
    "project3-desc":
      "A comprehensive dashboard for managing multiple social media accounts with analytics and scheduling capabilities.",
    "view-project": "View Project",
    "view-all": "View All Projects",
    "get-in": "Get In",
    touch: "Touch",
    "contact-title": "Let's talk about your project",
    "contact-desc":
      "Have a project in mind or want to discuss potential opportunities? Feel free to reach out using the contact form or through any of my social media profiles. I'm always open to new challenges and collaborations.",
    "follow-me": "Follow Me",
    "name-label": "Your Name",
    "email-label": "Your Email",
    "subject-label": "Subject",
    "message-label": "Message",
    "send-message": "Send Message",
    "footer-title": "Web Developer & UI/UX Enthusiast",
    "rights-reserved": "All rights reserved.",
    "privacy-policy": "Privacy Policy",
    "terms-service": "Terms of Service",
  },
  fa: {
    "nav-home": "خانه",
    "nav-about": "درباره من",
    "nav-skills": "مهارت‌ها",
    "nav-projects": "پروژه‌ها",
    "nav-contact": "تماس",
    "hero-title": "سلام، من",
    "hero-subtitle": "توسعه دهنده وب و علاقه مند به UI/UX",
    "hero-description":
      "من تجربیات وب زیبا، کاربردی و کاربرپسند را با فناوری‌های مدرن و راه‌حل‌های نوآورانه ایجاد می‌کنم.",
    "contact-btn": "تماس با من",
    "projects-btn": "نمونه کارها",
    "about-title": "درباره",
    "about-me": "من",
    "about-who": "من کیستم؟",
    "about-description":
      "من حسین فلاح هستم، یک توسعه دهنده وب پرشور با بیش از 5 سال تجربه در ایجاد وب سایت‌ها و برنامه‌های کاربردی مدرن، واکنش‌گرا و کاربرپسند. من در توسعه فرانت‌اند تخصص دارم اما همچنین مهارت‌های قوی در بک‌اند دارم که من را به یک توسعه دهنده فول استک همه‌کاره تبدیل می‌کند.",
    "skill1-title": "توسعه وب",
    "skill1-desc": "ساخت وب سایت‌های واکنش‌گرا و تعاملی با فناوری‌های مدرن.",
    "skill2-title": "واکنش‌گرا موبایل",
    "skill2-desc":
      "ایجاد طرح‌هایی که به طور کامل در تمام دستگاه‌ها و اندازه‌های صفحه نمایش کار می‌کنند.",
    "skill3-title": "عملکرد سریع",
    "skill3-desc":
      "وب سایت‌های بهینه‌شده برای سرعت بارگذاری فوق‌العاده و تعاملات روان.",
    "skill4-title": "بهینه‌سازی برای موتورهای جستجو",
    "skill4-desc":
      "اجرای بهترین روش‌ها برای اطمینان از رتبه‌بندی خوب سایت شما در موتورهای جستجو.",
    "cv-btn": "دانلود رزومه",
    "hire-btn": "استخدام من",
    "my-skills-title": "مهارت‌های",
    "skills-title": "من",
    "frontend-title": "توسعه فرانت‌اند",
    "backend-title": "توسعه بک‌اند",
    "other-title": "سایر مهارت‌ها",
    "my-projects-title": "پروژه‌های",
    "projects-title": "من",
    "project1-title": "پلتفرم تجارت الکترونیک",
    "project1-desc":
      "یک پلتفرم تجارت الکترونیک کامل با لیست محصولات، عملکرد سبد خرید و فرآیند پرداخت امن.",
    "project2-title": "برنامه مدیریت وظایف",
    "project2-desc":
      "یک برنامه بهره‌وری برای مدیریت وظایف با قابلیت کشیدن و رها کردن و ویژگی‌های همکاری تیمی.",
    "project3-title": "داشبورد شبکه‌های اجتماعی",
    "project3-desc":
      "یک داشبورد جامع برای مدیریت چندین حساب شبکه‌های اجتماعی با قابلیت‌های تحلیل و زمان‌بندی.",
    "view-project": "مشاهده پروژه",
    "view-all": "مشاهده همه پروژه‌ها",
    "get-in": "در",
    touch: "تماس باشید",
    "contact-title": "بیایید در مورد پروژه شما صحبت کنیم",
    "contact-desc":
      "آیا پروژه‌ای در ذهن دارید یا می‌خواهید در مورد فرصت‌های احتمالی بحث کنید؟ از طریق فرم تماس یا هر یک از پروفایل‌های شبکه‌های اجتماعی من با من تماس بگیرید. من همیشه برای چالش‌ها و همکاری‌های جدید آماده هستم.",
    "follow-me": "من را دنبال کنید",
    "name-label": "نام شما",
    "email-label": "ایمیل شما",
    "subject-label": "موضوع",
    "message-label": "پیام",
    "send-message": "ارسال پیام",
    "footer-title": "توسعه دهنده وب و علاقه مند به UI/UX",
    "rights-reserved": "تمامی حقوق محفوظ است.",
    "privacy-policy": "حریم خصوصی",
    "terms-service": "شرایط استفاده",
  },
};

// Toggle language dropdown
languageBtn.addEventListener("click", () => {
  languageDropdown.classList.toggle("show");
});

// Close dropdown when clicking outside
document.addEventListener("click", (e) => {
  if (!languageBtn.contains(e.target)) {
    languageDropdown.classList.remove("show");
  }
});

// Mobile language switcher
mobileLanguageBtn.addEventListener("click", () => {
  const currentLang = document.body.classList.contains("rtl") ? "fa" : "en";
  switchLanguage(currentLang === "en" ? "fa" : "en");
});

// Language selection
document.querySelectorAll(".language-option").forEach((option) => {
  option.addEventListener("click", () => {
    const lang = option.getAttribute("data-lang");
    switchLanguage(lang);
    languageDropdown.classList.remove("show");
  });
});

// Switch language function
function switchLanguage(lang) {
  // Update UI elements
  if (lang === "fa") {
    document.body.classList.add("rtl");
    currentLanguage.textContent = "فارسی";
    currentFlag.src = "https://flagcdn.com/w20/ir.png";
    mobileCurrentFlag.src = "https://flagcdn.com/w20/ir.png";
  } else {
    document.body.classList.remove("rtl");
    currentLanguage.textContent = "English";
    currentFlag.src = "https://flagcdn.com/w20/gb.png";
    mobileCurrentFlag.src = "https://flagcdn.com/w20/gb.png";
  }

  // Update all translatable elements
  const elements = translations[lang];
  for (const key in elements) {
    const elementsToUpdate = document.querySelectorAll(
      `[data-i18n="${key}"], #${key}`
    );
    elementsToUpdate.forEach((element) => {
      element.textContent = elements[key];
    });
  }
}

// Initialize with English
switchLanguage("en");
