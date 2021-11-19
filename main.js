// La idea de mi proyecto final es un simulador de personaje de roll
// Empezamos creando nuestro personaje, le elegimos nombre y clase y mediante dados se calculan nuestros stats

//Variables a utilizar

let mob = 0
let pocion = 5;
let vidaTotalMob = 0;
let gold = 0;
let spell = 0;

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
    ataquePJ.disabled = false;
    healPJ.disabled = false;

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
        ataquePJ.disabled = true;
        healPJ.disabled = true;
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

mobKill (g) {
    document.getElementById("infoBattle").innerHTML = `Has derrotado al poderoso ${this.nombre} <br>`;
    document.getElementById("imgMob").innerHTML = "<img src='img/death.gif' class='img-fluid float-rigth' width='200' height='200'>";
    document.getElementById("infoHPM").innerHTML = `HP: ${this.vidaMob}`;
    document.getElementById("avanzar").disabled = false;
    document.getElementById("ataquePJ").disabled = true;
    mob = mob + 1;
    g = g + 100;
    updateGold(g);
    return gold = g;
}

}
//Fin de mob

// Funcion cuando termina el juego (deshabilitar buttons)

function disableButtons () {
    $(button).prop('disabled', true);
}

// Activar buttons

function enableButtons () {
    $(button).prop('disabled', false);
}

// Ataque con animacion

function ataqueAnim () {
    $("#imgPJ > img").animate({left: "500px"}, "slow");
    $("#imgPJ > img").animate({left: "0px"}, "slow");
}

// Falla de ataque

function failAnim () {
    $("#imgPJ > img").animate({left: "5px"}, "fast");
    $("#imgPJ > img").animate({left: "-5px"}, "fast");
    $("#imgPJ > img").animate({left: "5px"}, "fast");
    $("#imgPJ > img").animate({left: "-5px"}, "fast");
    $("#imgPJ > img").animate({left: "5px"}, "fast");
    $("#imgPJ > img").animate({left: "-5px"}, "fast");
}


// Pociones terminadas

function disableHeal (p) {
    if (p > 0 && userPJ.vida <= 70) {
        p = p - 1;
        userPJ.healPJ(p);}
    else if (userPJ.vida > 70) {
        document.getElementById("infoBattle").innerHTML = `Tienes mucha vida, prueba arriesgandote! <br>`;}
    else {
        document.getElementById("infoBattle").innerHTML = `Te quedaste sin pociones`;
        document.getElementById("healPJ").innerHTML = (`Pocion (${p})`);
        document.getElementById("healPJ").disabled = true;
    }
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
                console.log(y);
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
        const vidaA = a.danioMob;
        const vidaB = b.danioMob;
      
        let comparison = 0;
        if (vidaB > vidaA) {
          comparison = -1;
        } else if (vidaB < vidaA) {
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
});

});
// Boton de ataque

document.getElementById("ataquePJ").onclick = function() {hordaMobs[mob].ataquePJ(userPJ.danio)};

// Boton de heal

document.getElementById("healPJ").onclick = function() {disableHeal(pocion)};

// Boton de avance

document.getElementById("avanzar").onclick = function() {avanzar (mob)};

// Funcion de avanzar

function avanzar (mob) {

    document.getElementById("ataquePJ").disabled = false;

    vidaTotalMob = hordaMobs[mob].vidaMob;

    document.getElementById("infoBattle").innerHTML += (`Un ${hordaMobs[mob].tipo} vino con ganas de pelear! <br>`);

    document.getElementById("nickMob").innerHTML = `${hordaMobs[mob].nombre}`;

    document.getElementById("infoHPM").innerHTML = `HP: ${hordaMobs[mob].vidaMob}`;

    document.getElementById("infoATKM").innerHTML = `ATK: ${hordaMobs[mob].danioMob}`;

    document.getElementById("imgMob").innerHTML = `<img src='img/mob/${hordaMobs[mob].tipo}.gif' class='img-fluid float-rigth'>`;

    document.getElementById("avanzar").disabled = true;

    healthChange ();
}


// Empieza la tienda

// Cantidad y actualizar el oro

function updateGold (gold) {
    document.getElementById("gold").innerHTML = `<img src='img/gold.gif'></img>  ${gold}`;
}

let items = [
    {
    id: 1,
    nombre: "Poción",
    descripcion: "La mejor forma de volver al juego",
    precio: 50,
    imagen: "img/shop/potion.gif"
    },
    {
    id: 2,
    nombre: "Spell",
    descripcion: "Hacer 30 de daño sin perder el turno? Me lo llevo",
    precio: 50,
    imagen: "img/shop/spell.gif",
      },
    {
    id: 3,
    nombre: `Arma especial para ${userPJ.profesion.toLowerCase()}`,
    descripcion: "Vas a necesitar esta mejora de +20 de daño",
    precio: 150,
    imagen: `img/shop/${userPJ.profesion.toUpperCase()}.gif`
    },
    {
    id: 4,
    nombre: "Lobito bonito",
    descripcion: "Mira lo tierno que es y te cubre por 100 de HP",
    precio: 150,
    imagen: "img/shop/pet.gif",
    },
    {
    id: 5,
    nombre: "Cupón fin del juego",
    descripcion: "Excelente descuento de 30% en cualquier impresion 3D en War of Roll",
    precio: 500,
    imagen: "img/shop/cupon.jpg",
    }];


const contenedor = document.getElementById("containerShop");
// contenedor.innerHTML = "";

items.forEach(item => {
    let card = document.createElement("div");
    let html = `
    <img src="${item.imagen}" alt="imagen item">
    <div class="card-body">
      <h5 class="card-title">${item.nombre}</h5>
      <h6 class="titleShop">${item.precio}</h6>
      <p class="card-text">${item.descripcion}</p>
      <button class="btn btn-primary">Comprar
    </div>
      `;
  card.innerHTML = html;
  contenedor.appendChild(card);
});

function comprarPotion (g, p) {
    if (gold>=50) {
        
    }

}