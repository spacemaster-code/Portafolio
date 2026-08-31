
/* Envio de correos */
 
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
    boton.textContent = 'Enviando...';
    boton.disabled = true;

    if(telefono.value == null){
        telefono.value = "Sin numero";
    } 

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
        boton.textContent = 'Enviar';
    });
});


/* Barra lateral */

const btnMenu = document.getElementById('btnMenu');
const btnCerrar = document.getElementById('btnCerrar');
const sidebar = document.getElementById('sidebar');

const direcciones = document.querySelectorAll('.direc1');

console.log(direcciones);

btnMenu.addEventListener('click', () => {
    sidebar.classList.add('activo');
    btnMenu.classList.add('desactivado');
    console.log("abrir");
    btnCerrar.classList.add('activado');
    console.log("abrir2");
});

btnCerrar.addEventListener('click', () => {
    sidebar.classList.remove('activo');
    btnMenu.classList.remove('desactivado');

    btnCerrar.classList.remove('activado');
    console.log("cerrar");
});

for (let index = 0; index < direcciones.length; index++) {
    console.log(direcciones[index]);
    direcciones[index].addEventListener('click', () => {

    
        sidebar.classList.remove('activo');
        btnMenu.classList.remove('desactivado');
        console.log("enlace");
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


/* Copiado */
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

       /*  bandera = setTimeout(() => {
            mostrar.classList.remove('mostrar');   
        }, 2000); */

    });
});
