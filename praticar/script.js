function setarlocal(user,senha){
   localStorage.setItem("user", user);
   localStorage.setItem("senha", senha);
}

function registrar(){
   var user = document.getElementById('user').value;
   var senha = document.getElementById('senha').value;
   setarlocal(user, senha);
   alert("Você foi registrado!");
   location.href = 'login.html';
}

function login(){
   var userdigitado = localStorage.getItem('user');
   var senhadigitada = localStorage.getItem('senha');
   var loginuser = document.getElementById('loginuser').value;
   var loginsenha = document.getElementById('loginsenha').value;
   if (loginuser == userdigitado && loginsenha == senhadigitada && userdigitado != "" && senhadigitada != ""){
      alert("Tudo certo!");
      location.href = 'index.html';
   } else {
      if(userdigitado == "" || senhadigitada == ""){
         alert("Você não se registrou ainda");
         location.href = 'registrar.html';
      }else{
         alert("Dados inválidos");
      }
   }
}

function esquecer(){
   var user = localStorage.getItem('user');
   var senha = localStorage.getItem('senha');
   if(user == ""){
      alert("Você ainda não se registrou!");
      location.href = 'registrar.html';
   }
   localStorage.clear("senha");
   var novasenha = document.getElementById('novasenha');
   localStorage.setItem("senha", novasenha);
   if(senha == novasenha){
      alert("Você colocou a mesma senha, mude-a");
   } else{
   alert("Senha redefinida!");
   location.href = 'login.html';
   }
}

var setup = {
   buscargeneros:() => {
      fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb')
      .then(function (dados){
         return dados.json();
      })
      .then(function (dados){
         dados.genres.map((item) => {
            item['filmes'] = []; 
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