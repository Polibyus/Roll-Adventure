// La idea de mi proyecto final es un simulador de personaje de roll
// Empezamos creando nuestro personaje, le elegimos nombre y clase y mediante dados se calculan nuestros stats

//Variables a utilizar

let mob = 0
let pocion = 5;
let vidaTotalMob = 0;
let gold = 0;
let spell = 0;
let vidaPJBar = document.getElementById('vidaPJBar');
let vidaMobBar = document.getElementById('vidaMobBar');

// Almacenar el pj del user

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

    $("#imgMob").html(`<img src='img/mob/${hordaMobs[mob].tipo}.gif' id='mob' class='img-fluid float-rigth'>`);
    
    // Efectos de hit
    document.getElementById("imgMob").innerHTML += "<img src='img/user/spell.gif' class='img-fluid float-rigth' id='spell'>";
    document.getElementById("imgMob").innerHTML += "<img src='img/user/meleeffect.gif' class='img-fluid float-rigth' id='melee'>";
    document.getElementById("imgMob").innerHTML += "<img src='img/user/arroweffect.gif' class='img-fluid float-rigth' id='arrow'>";
    document.getElementById("imgMob").innerHTML += "<img src='img/user/magiceffect.gif' class='img-fluid float-rigth' id='magiceff'>";
    document.getElementById("imgPJ").innerHTML += "<img src='img/user/heal.gif' class='img-fluid float-rigth' id='potion'>";

    $("#start").hide();

    $("#avanzar").prop("disabled", true);

    $("#magicPJ").prop("disabled", true);

    $('#win').modal({ show: false});
});

});

// Funcion de avanzar

function avanzar (mob) {

    enableButtons();

    vidaTotalMob = hordaMobs[mob].vidaMob;

    document.getElementById("infoBattle").innerHTML += (`Un ${hordaMobs[mob].tipo} vino con ganas de pelear! <br>`);

    document.getElementById("nickMob").innerHTML = `${hordaMobs[mob].nombre}`;

    document.getElementById("infoHPM").innerHTML = `HP: ${hordaMobs[mob].vidaMob}`;

    document.getElementById("infoATKM").innerHTML = `ATK: ${hordaMobs[mob].danioMob}`;

    document.getElementById("imgMob").innerHTML = `<img src='img/mob/${hordaMobs[mob].tipo}.gif' id='mob' class='img-fluid float-rigth'>`;

    document.getElementById("avanzar").disabled = true;

    document.getElementById("avanzar").classList.remove('btn-warning');

    // Efectos de hit
    document.getElementById("imgMob").innerHTML += "<img src='img/user/spell.gif' class='img-fluid float-rigth' id='spell'>";
    document.getElementById("imgMob").innerHTML += "<img src='img/user/meleeffect.gif' class='img-fluid float-rigth' id='melee'>";
    document.getElementById("imgMob").innerHTML += "<img src='img/user/arroweffect.gif' class='img-fluid float-rigth' id='arrow'>";
    document.getElementById("imgMob").innerHTML += "<img src='img/user/magiceffect.gif' class='img-fluid float-rigth' id='magiceff'>";
    document.getElementById("imgPJ").innerHTML += "<img src='img/user/heal.gif' class='img-fluid float-rigth' id='potion'>";
    

    healthChange ();
}

