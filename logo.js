document.addEventListener("DOMContentLoaded",() =>{
    // adiciona logo a todas as paginas
   let link = document.createElement("link");
   link.rel = "shortcut icon";
   link.href = "media/logo.png";
   document.head.appendChild(link)
})