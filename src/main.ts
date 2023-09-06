const generarNumeroAleatorio = (): number => Math.floor(Math.random() * 101);

const numeroParaAcertar: number = generarNumeroAleatorio();

// enum Estados {
//  NO_ES_UN_NUMERO,
//  EL_NUMERO_ES_MAYOR,
//  EL_NUMERO_ES_MENOR,
//  ES_EL_NUMERO_SECTRETO,
//  GAME_OVER_MAXIMO_INTENTOS,
// }

// const estado : Estado = Estados.EL_NUMERO_ES_MAYOR //this is bad practice

type Estado = 
"NO_ES_UN_NUMERO";
"EL_NUMERO_ES_MAYOR";
"EL_NUMERO_ES_MENOR";
"ES_EL_NUMERO_SECTRETO";
"GAME_OVER_MAXIMO_INTENTOS";

const MAXIMO_INTENTOS: number = 5;
let numeroDeIntentos: number = 0;

const hasSuperadoElNumeroMaximoDeIntentos = (): boolean =>
  numeroDeIntentos >= MAXIMO_INTENTOS;

const muestraNumeroDeIntentos = () => {
  const elementoIntentos = document.getElementById("intentos");

  if (elementoIntentos) {
    //if eleme... existe..
    elementoIntentos.innerHTML = `${numeroDeIntentos} de ${MAXIMO_INTENTOS}`;
  } else {
    console.error("no se ha encontrado el elemento con id intentos....");
  }
};

document.addEventListener("DOMContentLoaded", muestraNumeroDeIntentos);

const gestionarGameOver = (estado: Estado) => {
  if (estado === "GAME_OVER_MAXIMO_INTENTOS") {
    const elementoComprobar = document.getElementById("comprobar");
    if (elementoComprobar && elementoComprobar instanceof HTMLButtonElement) {
      elementoComprobar.disabled = true;
    } else {
      console.error('no se ha encontrado el elemento con id intentos...');
    }
  }
};

const muestraMensajeComprobacion = (texto: string, estado: Estado) => {
  let mensaje = "";

  switch (estado) {
    case "NO_ES_UN_NUMERO":
      mensaje = `${texto} no es un numero, prueba otra vez`;
      break;
    case "EL_NUMERO_ES_MAYOR":
      mensaje = `UYY ! El numero ${texto} es MAYOR que el numero secreto`;
      break;
    case "EL_NUMERO_ES_MENOR":
      mensaje = `UYY ! El numero ${texto} es MENOR que el numero secreto`;
      break;
    // case NO_ES_EL_NUMERO_SECRETO:
    //    mensaje = `lo siento ${texto}, el numero no es correcto, preuba de nuevo`;
    //    break;
    case "ES_EL_NUMERO_SECTRETO":
      mensaje = "Has acertado el numero";
      break;
    case "GAME_OVER_MAXIMO_INTENTOS":
      mensaje = "has llegado al limite de intentos";
      break;
    default:
      mensaje = "Yo que se lo que ha pasado";
      break;
  }

  const elementoResultado = document.getElementById("resultado");
  if (elementoResultado) {
    elementoResultado.innerHTML = mensaje;
  } else {
    console.error("no se ha encontrado el elemento...");
  }
};

const comprobarNumero = (texto : string) : Estado => {
  const numero = parseInt(texto);
  const esUnNumero = !isNaN(numero);

  if (!esUnNumero) {
    //no its not not a number (its a number)
    return 'NO_ES_UN_NUMERO';
  }

  if (numero === numeroParaAcertar) {
    //no its not the secret number
    return 'ES_EL_NUMERO_SECTRETO';
  }

  if (hasSuperadoElNumeroMaximoDeIntentos()) {
    return 'GAME_OVER_MAXIMO_INTENTOS';
  }

  return numero > numeroParaAcertar //yes its mayor/menor
    ? 'EL_NUMERO_ES_MAYOR'
    : 'EL_NUMERO_ES_MENOR';
};

const handleCompruebaClick = () => {
  let texto : string = "";
  const inputElement = document.getElementById('numero');

  if (inputElement && inputElement instanceof HTMLInputElement) {
    texto = inputElement.value;
  }
  // const texto : string = document.getElementById("numero")?.value;
  const estado : Estado = comprobarNumero(texto);
  // const maximoNumIntentos = maximoIntenos(numeroDeIntentos);
  muestraMensajeComprobacion(texto, estado);
  numeroDeIntentos++;
  muestraNumeroDeIntentos();
  gestionarGameOver(estado);
  // gameover();
};

const botonComprobar = document.getElementById("comprobar");
botonComprobar?.addEventListener("click", handleCompruebaClick); //the ? means dont exe if element is null