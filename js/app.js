// Constructores

function Seguro (marca, year, tipo){
    this.marca = marca
    this.year = year
    this.tipo = tipo
}

function UI(){

}
//<----Seguro prototypes ------>

Seguro.prototype.cotizarSeguro = function(){
    let cantidad;
    const base = 2000
    //leer año
    const diferencia = new Date().getFullYear()-this.year;
    switch(this.marca){
        case '1':
            cantidad = base*1.15*(1-diferencia*3/100)
            break;
        case '2':
            cantidad = base*1.05*(1-diferencia*3/100)
            break;
        case '3':
            cantidad = base*1.35*(1-diferencia*3/100)
            break;
        default:
            break;
    }

    // Cada año el costo se reduce un 3%
    if(this.tipo ==='basico'){
        cantidad *= 1.30;
    }else{
        cantidad *=1.50;
    }
    console.log(cantidad);
    return cantidad
}

//<----- UI prototype------->
//Llena las opcines de los años
UI.prototype.llenarOpciones = () =>{
    const max = new Date().getFullYear(),
          min = max - 20
    const selecYear = document.querySelector('#year')

    for (let i = max; i>min; i--){
        let option = document.createElement('option');
        option.value=i
        option.textContent= i
        selecYear.appendChild(option)
    }
}

UI.prototype.mostrarMensajes = (mensaje, tipo) =>{
    const div = document.createElement('div');
    if(tipo ==='error'){
        div.classList.add('error')
    } else{
        div.classList.add('correcto')
    }

    div.classList.add('mensaje', 'mt-10')
    div.textContent = mensaje;

    //Insertar HTML
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.insertBefore(div, document.querySelector('#resultado'))

    setTimeout(()=>{
        div.remove();
    },1000)
}

UI.prototype.mostrarResultado= (total, seguro)=>{
    //Crear resultado
    const {marca, year, tipo} = seguro
    let textoMarca 
    switch(marca){
        case '1':
            textoMarca = 'Americano'
            break;
        case '2':
            textoMarca = 'Asiatico'
            break;
        case '3':
            textoMarca = 'Europeo'
            break;
        
        
        default:
            break;
    }


    const div = document.createElement('div');
    div.classList.add('mt-10');

    div.innerHTML=`
    <p class="header">Tu resumen </p>
    <p class="font-bold">Marca: <span class='font-normal'> ${textoMarca}</span> </p>
    <p class="font-bold">Año: <span class='font-normal'> ${year}</span> </p>
    <p class="font-bold">Tipo: <span class='font-normal'> ${tipo}</span> </p>
    <p class="font-bold">Total: <span class='font-normal'> $${total}</span> </p>
    `;
    
    const resultadoDiv = document.querySelector('#resultado');
    
    //Mostrar spinner
    
    const spinner = document.querySelector('#cargando');
    spinner.style.display = 'block';//se muestra resultado
    
    setTimeout(()=>{
        spinner.style.display = 'none'// se borra spinner
        resultadoDiv.appendChild(div);
    },1000)
}

//Instanciar UI

const ui = new UI

document.addEventListener('DOMContentLoaded', ()=>{
    ui.llenarOpciones();
})

eventListeners();
function eventListeners(){

    const formulario = document.querySelector('#cotizar-seguro');
    formulario.addEventListener('submit', cotizarSeguro)
}

function cotizarSeguro(e){
    e.preventDefault();

    // Leer marca seleccionada
    const marca = document.querySelector('#marca').value;
    // console.log(marca);
    //Leer año seleccionado
    const year = document.querySelector('#year').value;
    //Leer el tipo de cobertura
    const tipo = document.querySelector('input[name="tipo"]:checked').value;
    
    if(marca ==='' || year==='' ||tipo ===''){
        ui.mostrarMensajes('Todos los campos son obligatorios', 'error')
        return
    }

        ui.mostrarMensajes('Cotizando...','exito')

        //Ocultar cotizaciones previas
        const resultados = document.querySelector('#resultado div');
        if(resultados != null){
            resultados.remove()
        }

        //Instanciar seguro
        const seguro = new Seguro(marca,year,tipo)
        // console.log(seguro);
        total = seguro.cotizarSeguro()
        ui.mostrarResultado(total, seguro)
}
