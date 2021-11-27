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

// Falla de ataque

function failAnim () {
    $("#imgPJ > img").animate({left: "5px"}, "fast");
    $("#imgPJ > img").animate({left: "-5px"}, "fast");
    $("#imgPJ > img").animate({left: "5px"}, "fast");
    $("#imgPJ > img").animate({left: "-5px"}, "fast");
}

// Efecto magia

function spellAnim () {
    $("#imgPJ > img").animate({top: "-50px"}, "fast");
    $("#imgPJ > img").animate({top: "0px"}, "fast");
    $("#spell").show().delay(1300).hide(0);
}

// Efecto heal

function healEffect () {
    $("#potion").show().delay(1500).hide(0);
}

// Funcion de ganar el game ¡Muy bieeenn!

function winGame () {
    $("#game").hide();
    $("#win").modal("show");
    document.getElementById("title").innerHTML = "GANASTE!!!";
    document.getElementById("infoPJ").innerHTML = "Disfruta tu beneficio y estate atent@ a nuevas aventuras";
}

// Funciones de comprar
// Pocion
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
// Spell
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
// Cupon
function comprarCupon () {
    if (gold>=500) {
        winGame();
    }
    else
    document.getElementById("infoBattle").innerHTML = (`No tienes suficiente oro <br>`);
}

// Redireccionar

$(document).ready(() => {
    $("#redirect").click(() => {
        const url = "https://polibyus.github.io/War-of-Roll/"
        window.location.replace(url);
    });
});

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

function healthChange() {
	vidaPJBar.style.width = `${(userPJ.vida / vidaTotalPJ)*100}%`;
	vidaMobBar.style.width = `${(hordaMobs[mob].vidaMob/vidaTotalMob)*100}%`;
}

// Creador del pj con la info pedida y calculamos sus stats
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

// Cantidad y actualizar el oro

function updateGold (gold) {
    document.getElementById("gold").innerHTML = `<img src='img/gold.gif'></img>  ${gold}`;
}