// La idea de mi proyecto final es un simulador de personaje de roll
// Empezamos creando nuestro personaje, le elegimos nombre y clase y mediante dados se calculan nuestros stats

//Variables a utilizar

let mob = 0
let pocion = 5;
let vidaTotalMob = 0;
let gold = 1000;
let spell = 0;
const URLJSON = "data/datos.json"

//Constructor de personaje

class Personaje {
    constructor(nick, profesion) {
      this.nick = nick;
      this.profesion = profesion;
      this.vida = this.vidaDados();
      this.danio = this.danioDados();
    }
// Devolver un numero entre 0 y 100:
vidaDados () {
    return Math.floor(Math.random() * (120 - 90)) + 90;
    }

danioDados() {
    return Math.floor(Math.random() * (20 - 5)) + 5;
    } 

// Sumar bonus de daño y vida
sumarBonus () {
    if (this.profesion.toUpperCase() === "GUERRERO") {
        return this.danio = this.danio + 5, this.vida = this.vida + 15}
        else
            if  (this.profesion.toUpperCase() === "MAGO") {
                return this.danio = this.danio + 15, this.vida = this.vida - 10}
        else
            if (this.profesion.toUpperCase() === "CAZADOR") {
                return this.danio = this.danio + 10, this.vida = this.vida - 5}
        else {
            if (this.profesion.toUpperCase() === "NOVATO") {
                return this.danio = this.danio - 10, this.vida = this.vida - 10}
            }
    } 
// funcion de recibir ataque del mob, donde se le pasa la variable del mob que quiere atacar y su ataque
ataqueMob (mob, atk) {
    if (Math.random() >= 0.5) {
    document.getElementById("infoBattle").innerHTML += (`${mob} ataca con ${atk} de daño <br>`);
    this.vida = this.vida - atk;
    healthChange();}
    else 
        document.getElementById("infoBattle").innerHTML += (`${mob} siente miedo y falla el ataque <br>`);
    // muerte del personaje
    if (this.vida <= 0) {
        document.getElementById("infoBattle").innerHTML = `Moriste, mejor suerte la proxima vida`;
        document.getElementById("imgPJ").innerHTML = "<img src='img/death.gif' class='img-fluid float-left' width='250' height='250'>";
        this.vida = 0;
        document.getElementById("infoHP").innerHTML = `HP: ${this.vida}`;
        healthChange();
        disableButtons();
    } else {
        document.getElementById("infoHP").innerHTML = `HP: ${this.vida}`;
        healthChange();
    }
}

// Funcion de curacion para el personaje

healPJ (p) {
    document.getElementById("infoBattle").innerHTML = (`Usas una pocion, recuperas 20 de HP <br>`);
    this.vida = this.vida + 20;
    document.getElementById("healPJ").innerHTML = (`Pocion (${p})`);
    document.getElementById("infoHP").innerHTML = `HP: ${this.vida}`;
    vidaPJBar.style.width = `${(userPJ.vida / vidaTotalPJ)*100}%`;
}

printPJ () {
    if (this.profesion.toUpperCase() === "GUERRERO") {
        document.getElementById("infoPJ").innerHTML = "Agarra tu hacha y estas pociones, te seran utiles";
        document.getElementById("imgPJ").innerHTML = "<img src='img/user/idleG.gif'  class='img-fluid float-left'>";
        }
        else
            if  (this.profesion.toUpperCase() === "MAGO") {
                document.getElementById("infoPJ").innerHTML = "No te olvides tu libro y 5 pociones de mana, esos monstruos no se prenden fuego solos.";
                document.getElementById("imgPJ").innerHTML = "<img src='img/user/idleM.gif'  class='img-fluid float-left' width='250' height='250'>";
        }
        else
            if (this.profesion.toUpperCase() === "CAZADOR") {
                document.getElementById("infoPJ").innerHTML = "Tantas flechas como puedas en el carcaj y este arco recien puesto a punto!";
                document.getElementById("imgPJ").innerHTML = "<img src='img/user/idleC.gif'  class='img-fluid float-left' width='250' height='250'>";
            }
        else {
            this.profesion = "Novato"
            document.getElementById("infoPJ").innerHTML = "Un novato por aqui?";
            document.getElementById("imgPJ").innerHTML = "<img src='img/user/idleN.gif'  class='img-fluid float-left' width='250' height='250'>";
        }
        
        document.getElementById("nickPJ").innerHTML = `${this.nick}`;

        document.getElementById("infoHP").innerHTML = `HP: ${this.vida}`;
        
        document.getElementById("infoATK").innerHTML = `ATK: ${this.danio}`;
        
        document.getElementById("title").innerHTML = `Okey ${this.nick} tu gran aventura esta por comenzar` ;
}

//Comprar mejoras en la tienda

comprarHP () {
    if (gold>=150) {
        this.vida = this.vida + 100;
        gold = gold - 150;
        updateGold(gold);
        vidaTotalPJ = this.vida;
        healthChange();
        document.getElementById("infoHP").innerHTML = `HP: ${this.vida}`;
        $("#LB").remove();
        $("#aventura").prepend("<img src='img\shop\pet.gif' alt= 'imagen lobito'>");
        document.getElementById("infoBattle").innerHTML = (`Te llevas el lobito? Lo vamos a extrañar! <br>`);
    }
    else
    document.getElementById("infoBattle").innerHTML = (`No tienes suficiente oro <br>`);
}

comprarATK () {
    if (gold>=150) {
        this.danio = this.danio + 20;
        gold = gold - 150;
        updateGold(gold);
        document.getElementById("infoATK").innerHTML = `ATK: ${this.danio}`;
        $("#AE").remove();
        // $("#aventura").prepend("<img src='img\shop\pet.gif' alt= 'imagen lobito'>");
        document.getElementById("infoBattle").innerHTML = (`Con esto cualquiera gana! <br>`);
    }
    else
    document.getElementById("infoBattle").innerHTML = (`No tienes suficiente oro <br>`);
}


}


// Fin constructor Personaje

// Creador de enemigos/mob

class Mob {
    constructor(propiedades) {
      this.nombre = propiedades.nombre;
      this.tipo = propiedades.tipo;
      this.vidaMob = this.vidaMob();
      this.danioMob = this.danioMob();
    }
// Devolver un numero random
vidaMob () {
    if (this.tipo == "jefazo") {
        return 200;
    }
    else {
    return Math.floor(Math.random() * (100 - 60)) + 60;
    }
}

danioMob () {
    if (this.tipo == "jefazo") {
        return 60;
    }
    else {
    return Math.floor(Math.random() * (20 - 10)) + 10;
    }
}
ataquePJ (atkPJ) {
    //posibilidad de fallo
    if (Math.random() >= 0.5) {
        this.vidaMob = this.vidaMob - atkPJ;
        document.getElementById("infoBattle").innerHTML = (`Atacas a ${this.nombre} con ${atkPJ} de ataque <br>`);
        ataqueAnim();
        userPJ.ataqueMob (this.nombre, this.danioMob);
        healthChange();
    }
    else {
        document.getElementById("infoBattle").innerHTML = (`Fallas el ataque de una manera graciosa <br>`);
        failAnim();
        userPJ.ataqueMob (this.nombre, this.danioMob);
    }
    //respuesta de curacion segun hp de mob
    if (this.vidaMob < 50) {
        if (Math.random() >= 0.9) {
            this.vidaMob = this.vidaMob + 20;
            document.getElementById("infoBattle").innerHTML += (`${this.nombre} Se cura por 20 de HP <br>`);
            healthChange();}
    }
    if (this.vidaMob <= 0) {
        this.vidaMob = 0;
        healthChange();
        this.mobKill (gold);}
    else {
        document.getElementById("infoHPM").innerHTML = `HP: ${this.vidaMob}`;
        healthChange();
    }
}

lanzarSpell (s) {
    if (s > 0) {
    this.vidaMob = this.vidaMob - 20;
    document.getElementById("infoBattle").innerHTML = (`Atacas a ${this.nombre} con 20 de magia <br>`);
    spellAnim();
    s = s - 1;
    if (s == 0){$("#magicPJ").prop("disabled", true);}
    document.getElementById("magicPJ").innerHTML = (`Magia (${s})`);}
    if (this.vidaMob <= 0) {
        this.vidaMob = 0;
        healthChange();
        this.mobKill (gold);}
    else {
        document.getElementById("infoHPM").innerHTML = `HP: ${this.vidaMob}`;
        healthChange();
    }
    return spell = s;
}

mobKill (g) {
    document.getElementById("infoBattle").innerHTML = `Has derrotado al poderoso ${this.nombre} <br>`;
    document.getElementById("imgMob").innerHTML = "<img src='img/death.gif' class='img-fluid float-rigth' width='200' height='200'>";
    document.getElementById("infoHPM").innerHTML = `HP: ${this.vidaMob}`;
    document.getElementById("avanzar").disabled = false;
    document.getElementById("avanzar").classList.add('btn-warning');
    disableButtons();
    mob = mob + 1;
    g = g + 100;
    updateGold(g);
    return gold = g;
}

}
//Fin de mob

// Funcion cuando termina el juego (deshabilitar buttons)

function disableButtons () {
    $("#ataquePJ").prop("disabled", true);
    $("#healPJ").prop("disabled", true);
    $("#magicPJ").prop("disabled", true);
    $("#1").prop("disabled", true);
    $("#2").prop("disabled", true);
    $("#3").prop("disabled", true);
    $("#4").prop("disabled", true);
}

// Activar buttons

function enableButtons () {
    $("#ataquePJ").prop("disabled", false);
    if (spell > 0) {$("#magicPJ").prop("disabled", false);}
    if (pocion > 0) {$("#healPJ").prop("disabled", false);}
    $("#1").prop("disabled", false);
    $("#2").prop("disabled", false);
    $("#3").prop("disabled", false);
    $("#4").prop("disabled", false);
}

// Ataque con animacion

function ataqueAnim () {
    $("#imgPJ > img").animate({left: "250px"}, "fast");
    $("#imgPJ > img").animate({left: "0px"}, "fast");
}

// Falla de ataque

function failAnim () {
    $("#imgPJ > img").animate({left: "5px"}, "fast");
    $("#imgPJ > img").animate({left: "-5px"}, "fast");
    $("#imgPJ > img").animate({left: "5px"}, "fast");
    $("#imgPJ > img").animate({left: "-5px"}, "fast");
}

// Falla de ataque

function spellAnim () {
    $("#imgPJ > img").animate({left: "-50px"}, "fast");
    $("#imgPJ > img").animate({left: "5px"}, "fast");

}


// Pociones terminadas

function disableHeal (p) {
    if (p > 0 && userPJ.vida <= 70) {
        p = p - 1;
        if (p == 0){$("#healPJ").prop("disabled", true);}
        document.getElementById("healPJ").innerHTML = (`Pocion (${p})`);
        userPJ.healPJ(p);}
    else if (userPJ.vida > 70) {
        document.getElementById("infoBattle").innerHTML = `Tienes mucha vida, prueba arriesgandote! <br>`;}
    return pocion = p;
}

// Probando barras de vida

let vidaPJBar = document.getElementById('vidaPJBar');
let vidaMobBar = document.getElementById('vidaMobBar');

function healthChange() {
	vidaPJBar.style.width = `${(userPJ.vida / vidaTotalPJ)*100}%`;
	vidaMobBar.style.width = `${(hordaMobs[mob].vidaMob/vidaTotalMob)*100}%`;
}

// Creamos el pj con la info pedida y calculamos sus stats

$(document).ready(() => {
        $("#entrar").click(() => {
                var selector = document.getElementsByName("selector");
                let y = "";
                for (i = 0; i < selector.length; i++) {
                    if (selector[i].checked)
                        y = selector[i].value;
                }
                let x = document.getElementById("nickPJ").value;
                sessionStorage.setItem("nickPJ", x);
                sessionStorage.setItem("profesionPJ", y);
            });
    });

let nickPJ = sessionStorage.getItem("nickPJ");
let profesionPJ = sessionStorage.getItem("profesionPJ");
const userPJ = new Personaje (nickPJ, profesionPJ);

userPJ.sumarBonus();
userPJ.printPJ();
updateGold (gold);

let vidaTotalPJ = userPJ.vida;

console.log (userPJ.nick);
console.log (userPJ.profesion);
console.log (userPJ.vida);
console.log (userPJ.danio);

const mob1 = new Mob ({ nombre: "Rimuru", tipo: "slime" });

const mob2 = new Mob ({ nombre: "Groot", tipo: "treant" });

const mob3 = new Mob ({ nombre: "Tortita", tipo: "fantasma" });

const mob4 = new Mob ({ nombre: "Grandote", tipo: "goblin" });

const mob5 = new Mob ({ nombre: "Batmon", tipo: "murcielago" });

const mob6 = new Mob ({nombre: "Alamuerte", tipo: "jefazo"});

const hordaMobs = [mob1, mob2, mob3, mob4, mob5, mob6];

// Ordenar horda de menor ataque a mayor, (añade dificultad)

function ordenarHorda(a, b) {
        const danioA = a.danioMob;
        const danioB = b.danioMob;
      
        let comparison = 0;
        if (danioB > danioA) {
          comparison = -1;
        } else if (danioB < danioA) {
          comparison = 1;
        }
        return comparison;
      }

hordaMobs.sort (ordenarHorda);

// Empezar la aventura

$(document).ready(function(){

    $("#start").click(function() {

    $("#game").show();

    $("#aventura").css("background-image", "url('img/bosque.png')");

    vidaTotalMob = hordaMobs[mob].vidaMob;

    $("#nickMob").html(`${hordaMobs[mob].nombre}`);

    $("#infoHPM").html(`HP: ${hordaMobs[mob].vidaMob}`);

    $("#infoATKM").html(`ATK: ${hordaMobs[mob].danioMob}`);

    $("#infoBattle").html(`Caminas por un bosque cuando un ${hordaMobs[mob].tipo} aparece <br>`);

    $("#imgMob").html(`<img src='img/mob/${hordaMobs[mob].tipo}.gif' class='img-fluid float-rigth'>`);

    $("#start").hide();

    $("#avanzar").prop("disabled", true);

    $("#magicPJ").prop("disabled", true);
});

});
// Boton de ataque

document.getElementById("ataquePJ").onclick = function() {hordaMobs[mob].ataquePJ(userPJ.danio)};

// Boton de heal

document.getElementById("healPJ").onclick = function() {disableHeal(pocion)};

// Boton de spell

document.getElementById("magicPJ").onclick = function() {hordaMobs[mob].lanzarSpell(spell)};

// Boton de avance

document.getElementById("avanzar").onclick = function() {avanzar (mob)};

// Funcion de avanzar

function avanzar (mob) {

    enableButtons();

    vidaTotalMob = hordaMobs[mob].vidaMob;

    document.getElementById("infoBattle").innerHTML += (`Un ${hordaMobs[mob].tipo} vino con ganas de pelear! <br>`);

    document.getElementById("nickMob").innerHTML = `${hordaMobs[mob].nombre}`;

    document.getElementById("infoHPM").innerHTML = `HP: ${hordaMobs[mob].vidaMob}`;

    document.getElementById("infoATKM").innerHTML = `ATK: ${hordaMobs[mob].danioMob}`;

    document.getElementById("imgMob").innerHTML = `<img src='img/mob/${hordaMobs[mob].tipo}.gif' class='img-fluid float-rigth'>`;

    document.getElementById("avanzar").disabled = true;

    document.getElementById("avanzar").classList.remove('btn-warning');

    healthChange ();
}


// Empieza la tienda

// Cantidad y actualizar el oro

function updateGold (gold) {
    document.getElementById("gold").innerHTML = `<img src='img/gold.gif'></img>  ${gold}`;
}

// Intercambiar info con json

const itemVar = {
    id: 3,
    nombre: `Arma especial para ${userPJ.profesion.toLowerCase()}`,
    descripcion: "Vas a necesitar esta mejora de +20 de daño",
    precio: 150,
    imagen: `img/shop/${userPJ.profesion.toUpperCase()}.gif`,
    index: "AE",
}

// $.post(URLJSON, itemVar);

$.get(URLJSON, function (respuesta, estado) {
    if(estado === "success"){
        let items = respuesta;
        const contenedor = document.getElementById("containerShop");
        items.forEach(item => {
            let card = document.createElement("div");
            let html = `
            <div id="${item.index}" class="card-body">
                <img src="${item.imagen}" alt="imagen item">
                <h5 class="card-title">${item.nombre}</h5>
                <h6 class="titleShop">${item.precio}</h6>
                <p class="card-text">${item.descripcion}</p>
                <button id="${item.id}" class="btn btn-primary">Comprar
            </div>
            `;
        card.innerHTML = html;
        contenedor.appendChild(card);
        });
        $(document).ready(() => {
            $("#1").click(() => {
                    comprarPocion();
            });
                });
            
        $(document).ready(() => {
            $("#2").click(() => {
                    comprarSpell();
            });
                });
        
        $(document).ready(() => {
            $("#3").click(() => {
                    userPJ.comprarATK();
            });
                });
        
        $(document).ready(() => {
            $("#4").click(() => {
                    userPJ.comprarHP();
            });
                });
    }
});

// Abrir tienda

$(document).ready(() => {
    $("#abrirTienda").click(() => {
        $("#tienda").toggle();
        document.getElementById("infoBattle").innerHTML = (`Bienvenid@ a Shop of Roll <br>`);
});
});

// Funciones de compra

function comprarPocion () {
    if (gold>=50) {
        pocion++;
        gold = gold - 50;
        document.getElementById("healPJ").innerHTML = (`Pocion (${pocion})`);
        updateGold(gold);
        document.getElementById("infoBattle").innerHTML = (`Compras una pocion, muchas gracias! <br>`);
        $("#healPJ").prop("disabled", false);
    }
    else
    document.getElementById("infoBattle").innerHTML = (`No tienes suficiente oro <br>`);
}

function comprarSpell () {
    if (gold>=50) {
        spell++;
        gold = gold - 50;
        document.getElementById("magicPJ").innerHTML = (`Magia (${spell})`);
        updateGold(gold);
        document.getElementById("infoBattle").innerHTML = (`Compras un pergamino de hechizo, no lo uses en tu casa! <br>`);
        $("#magicPJ").prop("disabled", false);
    }
    else
    document.getElementById("infoBattle").innerHTML = (`No tienes suficiente oro <br>`);
}

        /*id: 3,
        nombre: `Arma especial para ${userPJ.profesion.toLowerCase()}`,
        descripcion: "Vas a necesitar esta mejora de +20 de daño",
        precio: 150,
        imagen: `img/shop/${userPJ.profesion.toUpperCase()}.gif`,
        index: "AE",
        }, */