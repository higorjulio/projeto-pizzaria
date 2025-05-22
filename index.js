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