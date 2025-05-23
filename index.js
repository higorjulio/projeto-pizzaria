document.addEventListener("DOMContentLoaded",() =>{
    // adiciona logo a todas as paginas
   let link = document.createElement("link");
   link.rel = "shortcut icon";
   link.href = "media/logo.png";
   document.head.appendChild(link)


})
let botaotopo = document.getElementById("topo")
window.addEventListener("scroll", () => {
    if(window.scrollY > 1000){
        botaotopo.classList.add("show")
    }else{
        botaotopo.classList.remove("show")
    }
})

   botaotopo.addEventListener("click", () =>{
   window.scrollTo({
    top: 0
   })
})
// Menu mobile toggle
const menuBtn = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav.nav-links');

menuBtn.addEventListener('click', () => {
  nav.classList.toggle('open');
});

// Fecha menu ao clicar num link
document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
  });
});

// Botão "voltar ao topo"
document.getElementById("topo").addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Animações com scroll
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.menu-item, .hero, .menu-section h2').forEach(el => {
  el.classList.add('hidden');
  observer.observe(el);
});
