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
    } 

// Ataque con animacion

ataqueAnim () {
    if (this.profesion.toUpperCase() === "GUERRERO") {
        $("#imgPJ > img").animate({left: "300px"}, "fast");
        $("#imgPJ > img").animate({left: "0px"}, "fast");
        $("#melee").show().delay(800).hide(0);}
        else
            if (this.profesion.toUpperCase() === "MAGO") {
                $("#imgPJ > img").animate({top: "-50px"}, "fast");
                $("#imgPJ > img").animate({top: "0px"}, "fast");
                $("#magiceff").show().delay(1300).hide(0);}
        else
            if (this.profesion.toUpperCase() === "CAZADOR") {
                $("#imgPJ > img").animate({left: "-100px"}, "fast");
                $("#imgPJ > img").animate({left: "0px"}, "fast");
                $("#arrow").show().delay(800).hide(0);}
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
        document.getElementById("imgPJ").innerHTML = "<img src='img/user/death.gif' class='img-fluid float-left' width='250' height='250'>";
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
    healEffect();
    document.getElementById("healPJ").innerHTML = (`Pocion (${p})`);
    document.getElementById("infoHP").innerHTML = `HP: ${this.vida}`;
    vidaPJBar.style.width = `${(userPJ.vida / vidaTotalPJ)*100}%`;
}

printPJ () {
    if (this.profesion.toUpperCase() === "GUERRERO") {
        document.getElementById("infoPJ").innerHTML = "Agarra tu hacha y estas pociones, te seran utiles";
        document.getElementById("imgPJ").innerHTML = "<img src='img/user/idleG.gif' id='user' class='img-fluid float-left'>";
        }
        else
            if  (this.profesion.toUpperCase() === "MAGO") {
                document.getElementById("infoPJ").innerHTML = "No te olvides tu libro y 5 pociones de mana, esos monstruos no se prenden fuego solos.";
                document.getElementById("imgPJ").innerHTML = "<img src='img/user/idleM.gif' id='user' class='img-fluid float-left' width='250' height='250'>";
        }
        else
            if (this.profesion.toUpperCase() === "CAZADOR") {
                document.getElementById("infoPJ").innerHTML = "Tantas flechas como puedas en el carcaj y este arco recien puesto a punto!";
                document.getElementById("imgPJ").innerHTML = "<img src='img/user/idleC.gif' id='user' class='img-fluid float-left' width='250' height='250'>";
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
        $("#imgPJ").prepend("<img src='img/shop/pet.gif' alt= 'imagen lobito'>");
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
        document.getElementById("infoBattle").innerHTML = (`Con esto cualquiera gana! <br>`);
    }
    else
    document.getElementById("infoBattle").innerHTML = (`No tienes suficiente oro <br>`);
}


}


// Fin constructor Personaje
