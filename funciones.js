function init()
{
    document.getElementById("txt_input").focus();
}

var cadenaTextoLimpio;          
var retorno = false;

function encriptarTexto() {
    init();
    var arrayCadenaEncriptar = [];
    cadenaTextoLimpio = document.getElementById("txt_input").value;

    if(cadenaTextoLimpio.trim() === ""){
        alert("NO HA ESCRITO UN MENSAJE PARA CIFRAR.")
    }else{
        cadenaTextoLimpio = cadenaTextoLimpio.toLowerCase();
        arrayCadenaEncriptar = cadenaTextoLimpio.split("");

        validarCaracteresEspeciales(arrayCadenaEncriptar);

        if(retorno){
            document.getElementById("presentacion_inicial").style.display = "none";
            document.getElementById("txt_output").style.display = "block";
            document.getElementById("btnCopiar").style.display = "block";

            fnEncriptarTexto(arrayCadenaEncriptar);
        }
    }
}

function validarCaracteresEspeciales(caracteres){

    var replacements = ['á', 'é', 'í', 'ó', 'ú'];

    for(var i = 0; i < replacements.length; i++){
        if(caracteres.includes(replacements[i])){
            alert("NO SE PERMITEN PALABRAS ACENTUADAS.");
            retorno = false;
            break;
        }else{
            retorno = true;
        }
    }
    return retorno;
}

function fnEncriptarTexto(cadena){
        for(i = 0; i < cadena.length; i ++){
            if(cadena[i] == 'a'){
                cadena.splice(i, 1, 'ai');
            }else if(cadena[i] == 'e'){
                cadena.splice(i, 1, 'enter');
            }else if(cadena[i] == 'i'){
                cadena.splice(i, 1, 'imes');
            }else if(cadena[i] == 'o'){
                cadena.splice(i, 1, 'ober');
            }else if(cadena[i] == 'u'){
                cadena.splice(i, 1, 'ufat');
            }
        }
        mostrarTextoEncriptado(cadena)
}

function mostrarTextoEncriptado(cadena){
    cadena = cadena.toString();

    let textoArea = document.querySelector("#txt_output")
    textoArea.innerText = cadena.replace(/,/g, "");
}

function desencriptarTexto(){
    init();
    cadenaTextoLimpio = document.getElementById("txt_input").value;

    if(cadenaTextoLimpio.trim() === ""){
        alert("NO HA ESCRITO UN MENSAJE PARA DESCIFRAR.")
    }else{    
        cadenaTextoLimpio = cadenaTextoLimpio.toLowerCase();
        fnDesencriptarTexto(cadenaTextoLimpio);
    }
}

function fnDesencriptarTexto(cadena){
    var bandera = false;

    if(cadena.includes('ai')){
        bandera = true;
        const re = /ai/gi;
        cadena = cadena.replace(re, 'a'); 
    }
    if(cadena.includes('enter')){
        bandera = true;
        const re = /enter/gi;
        cadena = cadena.replace(re, 'e');
    }
    if(cadena.includes('imes')){
        bandera = true;
        const re = /imes/gi;
        cadena = cadena.replace(re, 'i');
    }
    if(cadena.includes('ober')){
        bandera = true;
        const re = /ober/gi;
        cadena = cadena.replace(re, 'o');
    }
    if(cadena.includes('ufat')){
        bandera = true;
        const re = /ufat/gi;
        cadena = cadena.replace(re, 'u');
    } 

    if(bandera){
        document.getElementById("presentacion_inicial").style.display = "none";
        document.getElementById("txt_output").style.display = "block";
        document.getElementById("btnCopiar").style.display = "block";
        
        mostrarTextoDesencriptado(cadena);
    }else{
        alert("EL MENSAJE NO CONTIENE PARAMETROS DE DESENCRIPCION.")
    }
}

function mostrarTextoDesencriptado(cadena){

    let textoArea = document.querySelector("#txt_output")
    textoArea.innerText = cadena;
}

document.getElementById("btnCopiar").onclick = function() {
    init();
    var text = document.getElementById("txt_output").value;

    navigator.clipboard.writeText(text)
    .then(() => {
        console.log('Text copied to clipboard');
    })
    .catch(err => {
        console.error('Error in copying text: ', err);
    });
}

