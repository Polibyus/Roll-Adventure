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
        userPJ.ataqueAnim();
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
    if (this.tipo == "jefazo") {
        winGame();
    }
    else {
    document.getElementById("infoBattle").innerHTML = `Has derrotado al poderoso ${this.nombre} <br>`;
    document.getElementById("imgMob").innerHTML = "<img src='img/mob/death.gif' class='img-fluid float-rigth' width='200' height='200'>";
    document.getElementById("infoHPM").innerHTML = `HP: ${this.vidaMob}`;
    document.getElementById("avanzar").disabled = false;
    document.getElementById("avanzar").classList.add('btn-warning');
    disableButtons();
    mob = mob + 1;
    g = g + 100;
    updateGold(g);
    return gold = g;}
}

}
//Fin de mob

// Array de enemigos

const mob1 = new Mob ({ nombre: "Rimuru", tipo: "slime" });

const mob2 = new Mob ({ nombre: "Groot", tipo: "treant" });

const mob3 = new Mob ({ nombre: "Tortita", tipo: "fantasma" });

const mob4 = new Mob ({ nombre: "Grandote", tipo: "goblin" });

const mob5 = new Mob ({ nombre: "Batmon", tipo: "murcielago" });

const mob6 = new Mob ({nombre: "Alamuerte", tipo: "jefazo"});

const hordaMobs = [mob1, mob2, mob3, mob4, mob5, mob6];