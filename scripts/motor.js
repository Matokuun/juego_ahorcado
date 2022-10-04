var palabras= ["boca juniors", "river plate","estudiantes","independiente","racing","talleres","gimnasia","san lorenzo","real madrid","ocelote","elefante","thor","redes","patronato","equipo","cuarteto","belgrano","audi","bmw","helado","supervivencia","celular","pizarra","resto","ahorcado","cafe","montaña","playa","zorro","mouse","transparente","esdrujula","caballeria","chimpance","taquicardia","alfabeto","idioma","previsional","procesal","argentina","la plata","practica","bendicion","energia","campanas","rosario","inolvidable","asterisco","neuralgia","instituto","estadistica","impresora","antropologia","insectos","marketing","azufre","sentimiento","promocion","youtube","facebook"] //60 palabras
var caracteres_prohibidos= ['°','|','#','$','%','&','/','(',')','=','?','¡','¿',',','.','-','{','}','[',']','+','!','*','/','+','-','_',':',';','¨','*','"',"'",'á','é','í','ó','ú','Á','É','Í','Ó','Ú','\n']
var letras=['a','b','c','d','e','f','g','h','i','j','k','l','m','n','ñ','o','p','q','r','s','t','u','v','w','x','y','z']
var cantidadPalabras=60
var errores
var acertadas
var letrasErradas= ""
var palabraElegida
var letrasIngresadas=[]
var gano=false
var perdio=false

//FUNCION PARA DIBUJAR CABEZA
function dibujarCabeza(){
    var pantalla= document.querySelector("canvas")
    var pincel= pantalla.getContext("2d")
    pincel.beginPath() /*cabeza*/
    pincel.fillStyle= "black"
    pincel.strokeStyle = "cyan"
    pincel.lineWidth = 5
    pincel.arc(345,160,35,0,Math.PI*2)
    pincel.fill()
    pincel.stroke()
}
//FUNCION PARA DIBUJAR CUERPO
function dibujarCuerpo(){
    var pantalla= document.querySelector("canvas")
    var pincel= pantalla.getContext("2d")
    pincel.fillStyle= "cyan" /*cuerpo */
    pincel.fillRect(343,195,5,100)
}
//FUNCION PARA DIBUJAR BRAZOS
function dibujarBrazo(x,y){
    var pantalla= document.querySelector("canvas")
    var pincel= pantalla.getContext("2d")
    pincel.fillRect(x,y,50,5)
}
//FUNCION PARA DIBUJAR PIERNA IZQUIERDA
function dibujarPiernaIzquierda(){
    var pantalla= document.querySelector("canvas")
    var pincel= pantalla.getContext("2d")
    pincel.beginPath()
    pincel.moveTo(347, 294);
    pincel.lineTo(293, 345);
    pincel.stroke()
}
//FUNCION PARA DIBUJAR PIERNA DERECHA
function dibujarPiernaDerecha(){
    var pantalla= document.querySelector("canvas")
    var pincel= pantalla.getContext("2d")
    pincel.beginPath()
    pincel.moveTo(343, 294);
    pincel.lineTo(397, 345);
    pincel.stroke()
}
//FUNCION PARA CALCULAR X, PARA LAS LINEAS Y LETRAS
function calcularX(tamanho){
    var caracteresDetrasMedio= Math.floor(tamanho / 2)
    var x
    if(tamanho % 2 == 0){ //es par
        x= 285 - 35* caracteresDetrasMedio
    }
    else{ //es impar. Son distintos calculos ya que si la palabra es par o impar puede quedar dispareja en el canvas
        x= 282 - 35* caracteresDetrasMedio
    }
    return x
}
//FUNCION PARA DIBUJAR AHORCADO Y LINEAS
function dibujar(){
    var pantalla= document.querySelector("canvas")
    var pincel= pantalla.getContext("2d")
    pincel.fillStyle= "cyan"
    pincel.fillRect(47,395,501,5) /* x donde arranca, y donde arranca , ancho, altura */
    pincel.fillRect(147,95,5,300)
    pincel.fillRect(147,95,201,5)
    pincel.fillRect(343,95,5,50)
    var tamanho= palabraElegida.length
    var x= calcularX(tamanho)
    var y= 545
    for (var i=0;i<tamanho;i++){
        if(palabraElegida[i] != " "){
            pincel.fillRect(x,y,30,5)
        }
        console.log(i,": ", palabraElegida[i])
        x+=35
    }
}
//FUNCION PARA BORRAR LA PANTALLA DEL JUEGO ANTERIOR
function borrar(){
    var pantalla= document.querySelector("canvas")
    var pincel= pantalla.getContext("2d")
    pincel.fillStyle= "black"
    pincel.fillRect(0,0,595,690)
}
//FUNCION PARA VOLVER AL MENU PRINCIPAL DESDE NUEVA PALABRA
function volverDesdeNuevaPalabra(){
    console.log("volviendo al menu!")
    document.getElementById("container_nueva_palabra").style.display="none"
    document.getElementById("container_menu").style.display="block"
    var texto= document.querySelector('textarea').value
    document.querySelector('textarea').value= ""
}
//FUNCION PARA PROBAR SI LA LETRA INGRESADA ES CORRECTA O INCORRECTA
function probarLetra(letra){
    console.log(letra)
    var pantalla= document.querySelector("canvas")
    var pincel= pantalla.getContext("2d")
    if(!letrasIngresadas.includes(letra)){ //mira que no se haya escrito ya la letra
        if((palabraElegida.includes(letra))&&(!perdio)&&(!gano)){
            letrasIngresadas.push(letra)
            for(var i=0; i< palabraElegida.length;i++){
                if(palabraElegida[i]==letra){
                    pincel.fillStyle= "cyan"
                    pincel.textAlign= "start"
                    pincel.font= "40px sans-serif"
                    var x= calcularX(palabraElegida.length)
                    x+=35*i
                    if(letra=='i'){
                        x+=10
                    }
                    acertadas++
                    pincel.fillText(letra.toUpperCase(),x,540)
                }
                if(acertadas==palabraElegida.length){
                    pincel.fillStyle= "green"
                    pincel.textAlign= "center"
                    pincel.font= "40px sans-serif"
                    pincel.fillText("GANASTE!", 297, 50)
                    gano=true
                    window.removeEventListener(`keyup`, capturarComprobar);
                    break
                }
            }
        }
        else{
            if((!perdio)&&(!gano)){
                letrasIngresadas.push(letra)
                switch (errores){
                    case 0: dibujarCabeza()
                        letrasErradas= letra.toUpperCase()
                        dibujarLetrasErradas(letrasErradas)
                    break
                    case 1: dibujarCuerpo()
                        letrasErradas= letrasErradas + " - " +letra.toUpperCase()  
                        dibujarLetrasErradas(letrasErradas)
                    break
                    case 2: dibujarBrazo(293,235)
                        letrasErradas= letrasErradas + " - " +letra.toUpperCase()
                        dibujarLetrasErradas(letrasErradas)
                    break
                    case 3: dibujarBrazo(348,235)
                        letrasErradas= letrasErradas + " - " +letra.toUpperCase()
                        dibujarLetrasErradas(letrasErradas)
                    break
                    case 4: dibujarPiernaIzquierda()
                        letrasErradas= letrasErradas + " - " +letra.toUpperCase()
                        dibujarLetrasErradas(letrasErradas)
                    break
                    case 5: dibujarPiernaDerecha()
                        letrasErradas= letrasErradas + " - " +letra.toUpperCase()
                        dibujarLetrasErradas(letrasErradas)
                        pincel.fillStyle= "red"
                        pincel.textAlign= "center"
                        pincel.font= "23px sans-serif"
                        pincel.fillText("PERDISTE! LA RESPUESTA ERA: "+ palabraElegida.toUpperCase(), 297, 50)
                        perdio=true
                        window.removeEventListener(`keyup`, capturarComprobar);
                    break
                }
            }
        }
    }
    function dibujarLetrasErradas(letrasErradas){
        pincel.fillStyle= "cyan"
        pincel.font= "25px sans-serif"
        pincel.textAlign= "start"
        pincel.fillText(letrasErradas, 47, 650)
        errores++
    }

}
//FUNCION PARA VOLVER AL MENU PRINCIPAL DESDE EL JUEGO
function volverDesdeJuego(){
    document.getElementById("container_juego").style.display="none"
    document.getElementById("container_menu").style.display="block"
    window.removeEventListener(`keyup`, capturarComprobar);
}
//FUNCION PARA CREAR NUEVO JUEGO
function nuevoJuego(){
    var numero = Math.round(Math.random()*100) % cantidadPalabras
    console.log(numero, "= ", palabras[numero], ", caracteres= ", palabras[numero].length)
    palabraElegida= palabras[numero]
    errores= 0
    if(palabraElegida.includes(" ")){
        acertadas= 1
    }else{
        acertadas= 0
    }
    gano=false
    perdio=false
    letrasErradas= ""
    letrasIngresadas=[]
    borrar()
    dibujar(palabraElegida)
    window.addEventListener(`keyup`, capturarComprobar);
    window.scroll(0, 0)
}
//FUNCION PARA JUGAR DESDE MENU PRINCIPAL
function jugar(){
    console.log("a jugar!")
    document.getElementById("container_menu").style.display="none"
    document.getElementById("container_juego").style.display="block"
    nuevoJuego()
}
//FUNCION PARA AGREGAR PALABRA
function agregar(){
    console.log("agregar palabra!")
    document.getElementById("container_menu").style.display="none"
    document.getElementById("container_nueva_palabra").style.display="block"
}
//FUNCION PARA CREAR PALABRA NUEVA
function crearPalabra(){
    var texto= document.querySelector('textarea').value
    var estaMal= false;
    console.log("caracteres de ", texto,":", texto.length)
    if(texto.length > 14 || texto.length == 0){
        estaMal= true;
    }
    for (let c of caracteres_prohibidos){
        if ((texto.includes(c))||(estaMal)){
            estaMal= true
            break
        }
    }
    if(estaMal){
        alert('Tuviste un error por una de estas opciones: \n -Usaste carácteres especiales. \n -Usaste más de 14 carácteres. \n -No ingresaste nada')
    }
    else{
        document.getElementById("container_nueva_palabra").style.display="none"
        document.getElementById("container_juego").style.display="block"
        palabras.push(texto.toLowerCase());
        console.log("Palabra creada: ", texto, "!")
        cantidadPalabras++
        nuevoJuego()
        document.querySelector('textarea').value= ""
    }
}
function capturarComprobar(teclaPresionada) {
    var tecla = (teclaPresionada.key).toLowerCase();
    if (letras.includes(tecla)) {
        probarLetra(tecla)
    }
}