// 마우스를 따라다니는 스포트라이트
const spotlight = document.getElementById("spotlight");

window.addEventListener("mousemove", (e) => {
  spotlight.style.setProperty("--x", `${e.clientX}px`);
  spotlight.style.setProperty("--y", `${e.clientY}px`);
});

// 현재 보고 있는 섹션에 맞춰 내비게이션 활성화
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("main .section");

function updateActiveNav() {
  const atBottom = window.innerHeight + window.scrollY >= document.body.scrollHeight - 2;
  let currentId = sections[0].id;

  if (atBottom) {
    currentId = sections[sections.length - 1].id;
  } else {
    sections.forEach((section) => {
      if (section.getBoundingClientRect().top <= window.innerHeight * 0.35) {
        currentId = section.id;
      }
    });
  }

  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${currentId}`);
  });
}

window.addEventListener("scroll", updateActiveNav, { passive: true });
updateActiveNav();

// 스크롤 시 부드럽게 등장
const fadeTargets = document.querySelectorAll(".section > p, .motto, .card, .footer");
fadeTargets.forEach((el) => el.classList.add("fade-in"));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

fadeTargets.forEach((el) => observer.observe(el));
