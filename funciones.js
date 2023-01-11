var cadenaTextoLimpio;          
var retorno = false;

function encriptarTexto() {
    document.getElementById("presentacion_inicial").style.display = "none";
    document.getElementById("txt_output").style.display = "block";
    document.getElementById("btnCopiar").style.display = "block";

    var arrayCadenaEncriptar = [];
    cadenaTextoLimpio = document.getElementById("txt_input").value;
    cadenaTextoLimpio = cadenaTextoLimpio.toLowerCase();
    arrayCadenaEncriptar = cadenaTextoLimpio.split("");

    validarCaracteresEspeciales(arrayCadenaEncriptar);

    if(retorno){
        fnEncriptarTexto(arrayCadenaEncriptar);
    }
}

function validarCaracteresEspeciales(caracteres){

    var replacements = ['@', '/', '+', '-', '*', ':', '.', ',', ';', '_'];

    replacements.forEach(function(element){
        if(caracteres.includes(element)){
            alert("Pailas");
        }else
            return retorno = true;
    });
}

function desencriptarTexto(){
    document.getElementById("presentacion_inicial").style.display = "none";
    document.getElementById("txt_output").style.display = "block";
    document.getElementById("btnCopiar").style.display = "block";
    
    cadenaTextoLimpio = document.getElementById("txt_input").value;

    fnDesencriptarTexto(cadenaTextoLimpio);
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

function fnDesencriptarTexto(cadena){
    var cadenaDesencriptada;

    if(cadena.includes('ai')){
        const re = /ai/gi;
        cadenaDesencriptada = cadena.replace(re, 'a'); 
    }
    if(cadena.includes('enter')){
        const re = /enter/gi;
        cadenaDesencriptada = cadenaDesencriptada.replace(re, 'e');
    }
    if(cadena.includes('imes')){
        const re = /imes/gi;
        cadenaDesencriptada = cadenaDesencriptada.replace(re, 'i');
    }
    if(cadena.includes('ober')){
        const re = /ober/gi;
        cadenaDesencriptada = cadenaDesencriptada.replace(re, 'o');
    }
    if(cadena.includes('ufat')){
        const re = /ufat/gi;
        cadenaDesencriptada = cadenaDesencriptada.replace(re, 'u');
    } 

    mostrarTextoDesencriptado(cadenaDesencriptada);
}

function mostrarTextoDesencriptado(cadena){

    let textoArea = document.querySelector("#txt_output")
    textoArea.innerText = cadena;
}

document.getElementById("btnCopiar").onclick = function() {
    var text = document.getElementById("txt_output").value;

    navigator.clipboard.writeText(text)
    .then(() => {
        console.log('Text copied to clipboard');
    })
    .catch(err => {
        console.error('Error in copying text: ', err);
    });
}