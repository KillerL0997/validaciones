// const inputNacimiento = document.querySelector("#birth");

// inputNacimiento.addEventListener("blur", (evento) =>{
//     validarNacimiento(evento.target);
// })
export function valida (input){
    const tipoDeInput = input.dataset.tipo;
    if(validadores[tipoDeInput]){
        validadores[tipoDeInput](input);
    }
    if(input.validity.valid){
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = "";
    } else {
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeInput,input);
    }
}

const mensajeDeError = {
    nombre : {
        valueMissing : "El campo nombre no puede estar vacio"
    },
    email : {
        valueMissing : "El campo correo no puede estar vacio",
        typeMismatch : "El correo no es valido"
    },
    password : {
        valueMissing : "El campo contraseña no puede estar vacio",
        patternMismatch : "Entre 6 y 12 caracteres, al menos una letra mayuscula y minuscula, un numero y sin caracteres especiales"
    },
    nacimiento : {
        valueMissing : "El campo fecha no puede estar vacio",
        custumError : "Debes tener al menos 18 años"
    },
    numero: {
        valueMissing : "El campo numero no puede estar vacio",
        patternMismatch : "El formato requerido es XXXXXXXXXX",
    },
    direccion: {
        valueMissing : "El campo direccion no puede estar vacio",
        patternMismatch : "Debe tener entre 10 y 40 caracteres"
    },
    ciudad: {
        valueMissing : "El campo ciudad no puede estar vacio",
        patternMismatch : "Debe tener entre 10 y 40 caracteres"
    },
    provincia: {
        valueMissing : "El campo provincia no puede estar vacio",
        patternMismatch : "Debe tener entre 10 y 40 caracteres"
    },
}

const tipoDeErrores = ["valueMissing","typeMismatch","patternMismatch","custumError"]

const validadores = {
    nacimiento: (input) => validarNacimiento(input), 
}

function mostrarMensajeDeError(tipoDeInput,input){
    let mensaje = "";
    tipoDeErrores.forEach(error =>{
        if(input.validity[error]){
            mensaje = mensajeDeError[tipoDeInput][error];
        }
    })
    return mensaje;
}

function validarNacimiento(input){
    const fechaCliente = new Date(input.value);
    let mensaje = "";
    if(!mayorDeEdad(fechaCliente)){
        mensaje = "Debes tener al menos 18 años";
    }
    console.log(mensaje);
    input.setCustomValidity(mensaje);
}

function mayorDeEdad(fecha){
    const fechaActual = new Date();
    const diferenciaFechas = new Date(
        fecha.getUTCFullYear() + 18,
        fecha.getUTCMonth(),
        fecha.getUTCDate());
    return diferenciaFechas < fechaActual;
}