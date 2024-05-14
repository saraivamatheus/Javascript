var setup = {
   buscargeneros:() => {
      fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb')
      .then(function (dados){
         return dados.json();
      })
      .then(function (dados){
         dados.genres.map((item) => {
            filmes = []; 
            setup[item.name] = item;
            //será que é para fazer o fetch dos filmes agr e dps chamar o exibenatela?
         })
      })

   },
   exibenatela: () => {

   } 

}




















function procurar(ev){
   if (ev.key == 'enter') {
      var pesquisa = document.getElementById('procura').value;
      var divs = document.querySelectorAll("[titulo]");
      divs.forEach(item => {
         var titulo = item.getAttibute("titulo");
         if(pesquisa == ""){
            item.style.display = "block"
         }else{
            if(item.includes(titulo)){
               item.style.display = "block"
            } else{
               item.style.display = "none"
            }
         } 
      })
   }
}