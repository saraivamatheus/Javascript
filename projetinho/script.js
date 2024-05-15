
function beginData(nome, senha){
    localStorage.setItem("usuario", nome);
    localStorage.setItem("senha", senha);
}
var nome = '';
var nomedigitado = '';
var senhadigitada = '';
var senhaSalva = '';
var nameSalvo = '';

function dados(){
    var nome = document.getElementById('nomeinicio').value;
    var senha = document.getElementById('senhainicio').value;
    beginData(nome, senha);
    alert('Seus dados foram cadastrados!');  
    location.href = 'index.html';
}

function verificar(){
    nomedigitado = document.getElementById('nome').value;
    senhadigitada = document.getElementById('senha').value;
    senhaSalva = localStorage.getItem("senha");
    nameSalvo = localStorage.getItem("usuario");
    if(nomedigitado.length == 0 || senhadigitada.length == 0){
        alert("Tá vazio! Coloque algo para eu verificar...");
    }else{
        if(senhadigitada == senhaSalva && nomedigitado == nameSalvo){
        alert("Ta certinha a senha... Bom trabalho");    
        location.href = 'index2.html';
        }else{
            alert("Ta tudo errado");
        }
    }
}

function registrar(){
    location.href = 'inicio.html';
}

function novasenha(){
    localStorage.removeItem("senha");
    var novasenha = document.getElementById('novasenha').value.trim();
    localStorage.setItem("senha", novasenha);
    alert('Novo dado salvo! Redirecionando para o login...');
    location.href = 'index.html';
}

var config = {
    exibenaTela:function(categoria,listaFilmes){
        var filmes = "";
        listaFilmes.map(item => {
            console.log(item);
            var container = `
                <div class="rounded-xl w-[250px] h-[200px] mx-2 my-2 bg-white flex flex-col justify-center items-center" filme="${item.title}">
                    <img src='https://image.tmdb.org/t/p/original/${item.backdrop_path}' loading="lazy" class="w-[300px] h-[150px] rounded-xl"/>
                        <h1>${item.title}</h1>
                        <p>${new Date(item.release_date).getMonth()} / ${new Date(item.release_date).getFullYear()}</p>
                </div>
            `
            filmes += container;
    
            
        });
        
    
        var categ = `
            <div class="w-full bg-slate-200 px-5 py-3">
                <div class="w-full font-extrabold text-2xl">${categoria.name}</div>
                <div filmes="" class="flex flex-wrap ">${filmes} 
                </div>    
            </div>`;
       
    
        document.getElementById('dentro').insertAdjacentHTML("beforeend", categ);
    
        },

    buscargeneros: function(){
        fetch(`https:api.themoviedb.org/3/genre/movie/list?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb`)
        .then(function (dados){
            return dados.json();
        })
        .then(function(dados){
            dados.genres.map((item) => {
                item["filmes"] = [];
                config[item.name] = item;

                fetch(`https://api.themoviedb.org/3/genre/${item.id}/movies?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb`)
                    .then(function(dados){
                        return dados.json();
                    })
                    .then(function(filme){
                        config.exibenaTela(item, filme.results);
                    })
            })
        });

    },
}

function carregar(){
    nome = localStorage.getItem("usuario");
    document.getElementById('mensagem').innerHTML = `<h2>Bem vindo, ${nome} </h2>`;
    if(senhadigitada == senhaSalva && nomedigitado == nameSalvo){    
        config.buscargeneros();
    } else{
        alert('Você não se cadastrou!');
        localStorage.clear();
        location.href = 'index.html';
    }
}

function procura(){
    var queryfilmes = document.querySelectorAll('[filme]')
    var separada = document.getElementById('procura').value;
    queryfilmes.forEach(item => {
        if(separada.includes(queryfilmes)){
        } else{
            item.style.display = "none";
        }
    })
}


/* Object.keys(filmes).map((item) => {
    var nome = filmes[item].nome;
    var duracao = filmes[item].duracao;
    document.getElementById('dentro').innerHTML += `<div style=" width: 100%; height: 800px;"><h2 style="display: block; height: 200px;">${item}</h2><div style="display: flex; width: 100%; height: 600px; justify-content: center; align-items: center; flex-wrap: nowrap;"><div><p>${nome}</p> <br><p>${duracao}</p></div></div></div>`
}) */