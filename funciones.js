function init()
{
    document.getElementById("txt_input").focus();
}
  
const cadenaTextoLimpio = document.querySelector("#txt_input");        
const mensaje = document.querySelector("#txt_output");        
var retorno = false;

function btnEncriptar() {
    const textoEncriptado = encriptarTexto(cadenaTextoLimpio.value)
    cadenaTextoLimpio.value = "";
}

function btnDesencriptar() {
    const textoEncriptado = desencriptarTexto(cadenaTextoLimpio.value)
    cadenaTextoLimpio.value = "";
}

function encriptarTexto(cadenaTextoLimpio) {
    if(cadenaTextoLimpio.trim() === ""){
        alert("NO HA ESCRITO UN MENSAJE PARA CIFRAR.")
        init();
    }else{
        cadenaTextoLimpio = cadenaTextoLimpio.toLowerCase();

        validarCaracteresEspeciales(cadenaTextoLimpio);

        if(retorno){
            document.getElementById("presentacion_inicial").style.display = "none";
            document.getElementById("txt_output").style.display = "block";
            document.getElementById("btnCopiar").style.display = "block";

            fnEncriptarTexto(cadenaTextoLimpio);
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
    let arrayCadenaEncriptar = [['e','enter'],['i','imes'],['a','ai'],['o','ober'],['u','ufat']];

        for(let i = 0; i < arrayCadenaEncriptar.length; i++){
            if(cadena.includes(arrayCadenaEncriptar[i][0])){
                cadena = cadena.replaceAll(arrayCadenaEncriptar[i][0], arrayCadenaEncriptar[i][1]);
            }
        }
        
        mensaje.value = cadena;
}   

function desencriptarTexto(cadenaTextoLimpio){
    if(cadenaTextoLimpio.trim() === ""){
        alert("NO HA ESCRITO UN MENSAJE PARA DESCIFRAR.")
        init();
    }else{    
        cadenaTextoLimpio = cadenaTextoLimpio.toLowerCase();
        fnDesencriptarTexto(cadenaTextoLimpio);
    }
}

function fnDesencriptarTexto(cadena){
    let arrayCadenaEncriptar = [['e','enter'],['i','imes'],['a','ai'],['o','ober'],['u','ufat']];
    let bandera = false;

    for(let i = 0; i < arrayCadenaEncriptar.length; i++){
        if(cadena.includes(arrayCadenaEncriptar[i][1])){
            cadena = cadena.replaceAll(arrayCadenaEncriptar[i][1], arrayCadenaEncriptar[i][0]);
            bandera = true;
        }
    }
        
    if(bandera){
        init();
        document.getElementById("presentacion_inicial").style.display = "none";
        document.getElementById("txt_output").style.display = "block";
        document.getElementById("btnCopiar").style.display = "block";
        
        mensaje.value = cadena;
    }else{
        alert("EL MENSAJE NO CONTIENE PARAMETROS DE DESENCRIPCION.")
        init();
    }
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