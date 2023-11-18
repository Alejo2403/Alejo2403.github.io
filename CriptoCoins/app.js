const criptomonedasSelect = document.querySelector('#criptomoneda');
const coinSelect = document.querySelector('#criptomoneda');
const monedaSelect = document.querySelector('#divisa')
const formulario = document.querySelector('#formulario-coins');
const resultados = document.querySelector('#resultado-coins');
const cantidadCoins = document.querySelector('#cantidad')

const objBusqueda = {
    divisa: '',
    criptomoneda: '',
    cantidad: ''
}

//PROMISE
const obtenerCoins = criptomonedas => new Promise( resolve => {
    resolve(criptomonedas)
});

document.addEventListener('DOMContentLoaded', () => {
    consultarCoins();

    formulario.addEventListener('submit', submitFormulario);

    coinSelect.addEventListener('change', leerValor);
    monedaSelect.addEventListener('change', leerValor);
    cantidadCoins.addEventListener('change', leerValor);
})

function consultarCoins(){
    const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

    fetch(url)
        .then ( respuesta => respuesta.json())
        .then ( resultado => obtenerCoins(resultado.Data) )
        .then ( criptomonedas => selectCriptomonedas(criptomonedas) )
}

function selectCriptomonedas(criptomonedas) {
    criptomonedas.forEach(cripto => {       
        const { FullName, Name } = cripto.CoinInfo;

        const option = document.createElement('option')
        option.value = Name;
        option.textContent = FullName;
        criptomonedasSelect.appendChild(option)
    })
}

function leerValor (e) {
    objBusqueda[e.target.name] = e.target.value;
    console.log(objBusqueda)
}

function submitFormulario (e) {
    e.preventDefault()

    //VALIDACION
    const { divisa, criptomoneda } = objBusqueda;

    if(divisa === ''  || criptomoneda === '') {
        mostarAlerta('Los dos campos son obligatorios')
        return;
    }

    //CONSULTAR Y MOSTRAR API
    consultarAPI();

}

function mostarAlerta(msg) {

    const existeError = document.querySelector('.error');

    if(!existeError) {

        const divMensaje = document.createElement('div');
        divMensaje.classList.add('error')

        divMensaje.textContent = msg;

        formulario.appendChild(divMensaje);

        setTimeout(() => {
            divMensaje.remove();
        }, 4000);
    }   
}

function consultarAPI() {
    const { divisa , criptomoneda } = objBusqueda;
    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${divisa}`;
    
    mostrarSpinner();

    fetch(url)
        .then ( respuesta => respuesta.json())
        .then ( cotizacion => {
            mostrarCotizacion(cotizacion.DISPLAY[criptomoneda][divisa]);
        })
}

function mostrarCotizacion(cotizacion) {
    
    console.log(cotizacion);

    limpiarHTML();

    const { PRICE, LASTUPDATE, HIGHDAY, LOWDAY } = cotizacion;

    console.log(cotizacion);

    console.log(typeof PRICE);

    const { cantidad } = objBusqueda;

    const precio = document.createElement('p');
    precio.classList.add('resultado-item');
    precio.innerHTML = `El precio es: <span>${PRICE}</sapn>`;

    const actualizado = document.createElement('p');
    actualizado.classList.add('resultado-item');
    actualizado.innerHTML = `Ultima actualizacion de datos: <span>${LASTUPDATE}</sapn>`;

    const mayorPrecio = document.createElement('p');
    mayorPrecio.classList.add('resultado-item');
    mayorPrecio.innerHTML = `Precio mas alto del dia <span>${HIGHDAY}</sapn>`;

    const bajoPrecio = document.createElement('p');
    bajoPrecio.classList.add('resultado-item');
    bajoPrecio.innerHTML = `Precio mas bajo del dia <span>${LOWDAY}</sapn>`
/*
    const cantidadPrecio = document.createElement('p');
    cantidadPrecio.classList.add('resultado-item');
    var calculo = cantidad * PRICE;
    console.log(calculo)
*/
    resultados.appendChild(precio);
    resultados.appendChild(actualizado);
    resultados.appendChild(mayorPrecio);
    resultados.appendChild(bajoPrecio);
}

function limpiarHTML () {
    while(resultados.firstChild) {
        resultados.removeChild(resultados.firstChild);
    }
}

function mostrarSpinner(){
    limpiarHTML();

    const spinner = document.createElement('div');
    spinner.classList.add('spinner');

    spinner.innerHTML = `
        <div class="double-bounce1"></div>
        <div class="double-bounce2"></div>
    `;

    resultados.appendChild(spinner);
}