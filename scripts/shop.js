// Empieza la tienda

const URLJSON = "data/datos.json"

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

        $(document).ready(() => {
            $("#5").click(() => {
                    comprarCupon();
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
