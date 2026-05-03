function scrollToDemo() {
    document.getElementById('demo').scrollIntoView({ behavior: 'smooth' });
}

function simulateAccess(isValid) {
    const statusText = document.getElementById('status-text');
    const terminalBody = document.getElementById('terminal-body');
    const scanner = document.getElementById('scanner-line');
    const door = document.getElementById('door');
    
    // Reiniciar estado
    door.classList.remove('open');
    terminalBody.innerHTML += `<br>> Iniciando escaneo de código QR...`;
    scanner.style.display = 'block';
    scanner.style.animation = 'scanAnim 1.5s infinite';
    statusText.innerText = "ESCANEANDO...";

    setTimeout(() => {
        // Detener escaneo
        scanner.style.display = 'none';
        
        if (isValid) {
            statusText.innerText = "ACCESO PERMITIDO";
            statusText.style.color = "#2ecc71";
            terminalBody.innerHTML += `<br><span style="color:#2ecc71">> Validación exitosa: Nivel Bodega OK.</span>`;
            terminalBody.innerHTML += `<br>> Enviando pulso de apertura...`;
            
            // Abrir puerta
            door.classList.add('open');
            
            setTimeout(() => {
                terminalBody.innerHTML += `<br>> Puerta cerrada automáticamente.`;
                door.classList.remove('open');
                statusText.innerText = "ESPERANDO SCAN...";
                statusText.style.color = "";
            }, 3000);
            
        } else {
            statusText.innerText = "ACCESO DENEGADO";
            statusText.style.color = "#e74c3c";
            terminalBody.innerHTML += `<br><span style="color:#e74c3c">> ERROR: Nivel de usuario insuficiente para esta puerta.</span>`;
            terminalBody.innerHTML += `<br><span style="color:#e74c3c">> ALERTA: Intento fraudulento registrado en DB.</span>`;
            terminalBody.innerHTML += `<br>> Notificando a central de monitoreo...`;
            
            // Efecto visual de error
            const frame = document.getElementById('door-frame');
            frame.style.animation = 'shake 0.3s 3';
            setTimeout(() => {
                frame.style.animation = '';
                statusText.innerText = "ESPERANDO SCAN...";
                statusText.style.color = "";
            }, 1000);
        }
        
        // Auto scroll terminal
        terminalBody.scrollTop = terminalBody.scrollHeight;
    }, 1500);
}

// Agregar animación de vibración al CSS dinámicamente si falla
const style = document.createElement('style');
style.innerHTML = `
    @keyframes shake {
        0% { transform: translateX(0); }
        25% { transform: translateX(8px); border-color: #e74c3c; }
        50% { transform: translateX(-8px); }
        100% { transform: translateX(0); }
    }
`;
document.head.appendChild(style);


const modal = document.getElementById("contactModal");
const openBtns = document.querySelectorAll(".open-modal");
const closeBtn = document.querySelector(".close-modal");
const captchaQuestion = document.getElementById("captcha-question");
const captchaAnswer = document.getElementById("captcha-answer");
const modalOptions = document.getElementById("modal-options");
const captchaError = document.getElementById("captcha-error");

let correctAnswer;

// Función para generar nueva suma
function generateCaptcha() {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    correctAnswer = num1 + num2;
    captchaQuestion.innerText = `¿Cuánto es ${num1} + ${num2}?`;
    captchaAnswer.value = "";
    modalOptions.style.display = "none";
    captchaError.style.display = "none";
}

openBtns.forEach(btn => {
    btn.onclick = function(e) {
        e.preventDefault();
        generateCaptcha(); // Generamos una suma nueva cada vez que abren el modal
        modal.style.display = "flex";
    }
});

// Validar respuesta en tiempo real
captchaAnswer.oninput = function() {
    if (parseInt(captchaAnswer.value) === correctAnswer) {
        modalOptions.style.display = "flex";
        captchaError.style.display = "none";
        document.querySelector('.captcha-box').style.borderColor = "#25D366";
    } else if (captchaAnswer.value.length >= 2) {
        captchaError.style.display = "block";
    }
}

closeBtn.onclick = () => modal.style.display = "none";
window.onclick = (event) => { if (event.target == modal) modal.style.display = "none"; }
