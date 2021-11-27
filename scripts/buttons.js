// Boton de ataque

document.getElementById("ataquePJ").onclick = function() {hordaMobs[mob].ataquePJ(userPJ.danio)};

// Boton de heal

document.getElementById("healPJ").onclick = function() {disableHeal(pocion)};

// Boton de spell

document.getElementById("magicPJ").onclick = function() {hordaMobs[mob].lanzarSpell(spell)};

// Boton de avance

document.getElementById("avanzar").onclick = function() {avanzar (mob)};