
/* 
Envio de correo
*/
 
emailjs.init("JjLxS8FyYBOgVv9Dg");

const formulario = document.getElementById("formu");

const nombre = document.getElementById("nombre");
const apellido = document.getElementById("apellido");
const email = document.getElementById('email');
const telefono = document.getElementById('telefono');
const asunto = document.getElementById('asunto');
const mensaje = document.getElementById('mensaje');
const boton = document.getElementById('envio');

formulario.addEventListener("submit", function(e) {
    e.preventDefault();

    if(telefono.value.length > 10){
        telefono.setCustomValidity("Coloque un numero valido.");
        telefono.reportValidity();
    } 
    else {
        boton.textContent = 'Enviando...';
        boton.disabled = true;
        
        if(telefono.value == "") { telefono.value = "Sin numero"; }
        
        emailjs.sendForm('service_ujyw04e', 'template_i2ajg11', this)
        .then(() => {
            alert('¡Correo enviado con éxito!');
            formulario.reset();
        })
        .catch((err) => {
            alert('Error al enviar el correo. Por favor intenta de nuevo.');
            console.error('EmailJS Error:', err);
        })
        .finally(() => {
            boton.disabled = false;
            boton.textContent = 'Enviar mensaje';
        });
        telefono.value = "";
        telefono.setCustomValidity("");
    }
    
});

telefono.addEventListener('input', () => {
    telefono.setCustomValidity("");
});

/* 
Control de la barra lateral
*/

const btnMenu = document.getElementById('btnMenu');
const btnCerrar = document.getElementById('btnCerrar');
const sidebar = document.getElementById('sidebar');
const direcciones = document.querySelectorAll('.direc1');
const atras = document.getElementById("sidebar-fondo");

btnMenu.addEventListener('click', () => {
    sidebar.classList.add('activo');
    atras.classList.add('activo');
    btnMenu.classList.add('desactivado');
    btnCerrar.classList.add('activado');
    
});

btnCerrar.addEventListener('click', () => {
    sidebar.classList.remove('activo');
    atras.classList.remove('activo');
    btnMenu.classList.remove('desactivado');
    btnCerrar.classList.remove('activado');
});

for (let index = 0; index < direcciones.length; index++) {
    direcciones[index].addEventListener('click', () => {

        sidebar.classList.remove('activo');
        atras.classList.remove('activo');
        btnMenu.classList.remove('desactivado');
        btnCerrar.classList.remove('activado');

    });
}


/* Quitar el id # */


document.querySelectorAll('a[href^="#"]').forEach(enlace => {
    enlace.addEventListener('click', (e) => {
        e.preventDefault();
        const id = enlace.getAttribute('href').substring(1);
        const seccion = document.getElementById(id);

        if(seccion) {
            seccion.scrollIntoView({ behavior: 'smooth' });
        }
    });
});


/*
Funcion para copiar el contenido una etiqueta en el portapapeles
*/
const etiquetasCopiar = document.querySelectorAll('.btn-copiar');

const mostrar = document.querySelector(".notificacion");
const texto = mostrar.querySelector("p");
let bandera = null;

etiquetasCopiar.forEach(boton => {
    boton.addEventListener('click', (e) => {
        e.preventDefault();

        if (bandera) {
            clearTimeout(bandera);
        }
        
        const textoACopiar = boton.getAttribute('data');

        texto.textContent = "copiado";
        mostrar.classList.add('mostrar');

        navigator.clipboard.writeText(textoACopiar)
        .then(() => {
            bandera = setTimeout(() => {
                mostrar.classList.remove('mostrar');
            }, 2000);
        })
        .catch(err => {
            console.error("No se copio.", err);
            bandera = setTimeout(() => {
                mostrar.classList.remove('mostrar');
            }, 2000);
        });


    });
});
