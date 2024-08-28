const decryptArea__init = document.querySelector (".decryptArea__init");
const decryptArea__final = document.querySelector(".decryptArea__final");
const copyBtn = document.getElementById("copyBtn");

//Encriptando
function encryptText(input) {
    let encryptedText = "";

    for (let i = 0; i < input.length; i++) {
        let charCode = input.charCodeAt(i);

            if (charCode === 32) {
                encryptedText += String.fromCharCode(charCode);
            } else if (charCode >= 97 && charCode <= 108) {
                encryptedText += String.fromCharCode(charCode + 13);
            } else if (charCode >= 109 && charCode <= 121) {
                encryptedText += String.fromCharCode(charCode - 12);
            } else {
                encryptedText += String.fromCharCode(charCode + 1);
            }
    }
    return encryptedText;
}

//Desencriptado 
function decryptText(output) {
    let decryptedText__step1 = "";

    // Primer paso de desencriptado.
    for (let i = 0; i < output.length; i++) {
        let charCode = output.charCodeAt(i);

        if (charCode === 32) {
            decryptedText__step1 += String.fromCharCode(charCode);
        } else if (charCode >= 97 && charCode <= 108) {
            decryptedText__step1 += String.fromCharCode(charCode + 13);
        } else if (charCode >= 109 && charCode <= 121) {
            decryptedText__step1 += String.fromCharCode(charCode - 12);
        } else {
            decryptedText__step1 += String.fromCharCode(charCode);
        }
    }

    // Segundo paso de desencriptado.
    let decryptedText__step2 = "";
    for (let j = 0; j < decryptedText__step1.length; j++) {

        let charCode = decryptedText__step1.charCodeAt(j);

        if (charCode === 32) {
            decryptedText__step2 += String.fromCharCode(charCode);
        } else if (charCode === 97) {
            decryptedText__step2 += String.fromCharCode(charCode = 121);
        } else {
            decryptedText__step2 += String.fromCharCode(charCode - 1);
        }
    }
    return decryptedText__step2;
}

// Función para copiar el texto desencriptado.
function copyText() {
    let copyText = document.getElementById("resultText").innerText;

    navigator.clipboard.writeText(copyText).then(() => {
        encryptionAlerts("info", "Listo!", "El texto ha sido copiado");
    }).then(() => {
        changeToRestart();
    });
}

// Función para cambiar el botón de copiar a reiniciar.
function changeToRestart() {
    const copyBtn = document.getElementById("copyBtn");
    copyBtn.innerText = "Reiniciar";
    copyBtn.removeEventListener("click", copyText);
    copyBtn.addEventListener("click", resetPage); 
}

// Función para reiniciar la página despues de copiar.
function resetPage() {
    const copyBtn = document.getElementById("copyBtn");
    copyBtn.innerText = "Copiar";
    copyBtn.removeEventListener("click", resetPage);
    copyBtn.addEventListener("click", copyText);

    decryptArea__final.style.display = "none";
    decryptArea__init.style.display = "block";

    document.getElementById("resultText").innerText = "";
    document.getElementById("inputText").value = "";

    document.getElementById("decryptBtn").disabled = false;
    document.getElementById("encryptBtn").disabled = false;
}

// Event listeners para los botones.
document.getElementById("encryptBtn").addEventListener("click", function() {
    let input = document.getElementById("inputText").value;
    if (input.trim() === "") {
        emptyInputAlerts("Por favor introduce el texto a quieres encriptar");
        decryptArea__init.style.display = "block";
    } else {
        encryptionAlerts("texto ha sido encriptado ");
        decryptArea__init.style.display = "none";
        decryptArea__final.style.display = "block";
        document.getElementById("resultText").innerText = encryptText(input);

        document.getElementById("decryptBtn").disabled = true;
    }
});

document.getElementById("decryptBtn").addEventListener("click", function() {
    let output = document.getElementById("inputText").value;
    if (output.trim() === "") {
        emptyInputAlerts("warning", "Lo siento!", "No hay ningún texto para desencriptar!");
    } else {
        encryptionAlerts("success", "Excelente!", "El texto ha sido descifrado de manera exitosa.");
        decryptArea__init.style.display = "none";
        decryptArea__final.style.display = "block";
        document.getElementById("resultText").innerText = decryptText(output);

        document.getElementById("encryptBtn").disabled = true;
    }
});

// Retorno del event listener para copiar.
document.getElementById("copyBtn").addEventListener("click", copyText);