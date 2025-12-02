/* ===============================
   CONFIGURAÇÃO DO CHAT
================================ */

let ultimaRequisicao = 0;
const tempoMinimo = 5000; // 5s

function formatarMarkdown(texto) {
    return texto
        .replace(/\n/g, "<br>")
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
}

function adicionarMensagem(texto, classe, avatarSrc) {
    const mensagens = document.getElementById("mensagens");

    const container = document.createElement("div");
    container.className = `mensagem ${classe}`;

    const avatar = document.createElement("img");
    avatar.src = avatarSrc;

    const msg = document.createElement("div");
    msg.innerHTML = texto;

    container.appendChild(avatar);
    container.appendChild(msg);
    mensagens.appendChild(container);
    mensagens.scrollTop = mensagens.scrollHeight;
}

/* ===============================
   CHAMADA AO SERVIDOR LOCAL
================================ */

async function consultarBot(texto) {
    try {
        const resp = await fetch("http://localhost:3000/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ msg: texto }),
        });

        const data = await resp.json();

        if (!data || !data.resposta) {
            return "Erro: resposta indefinida do servidor";
        }

        return data.resposta;

    } catch (e) {
        console.error(e);
        return "Erro ao conectar com o servidor";
    }
}

/* ===============================
   ENVIO DE MENSAGEM DO CHAT
================================ */

async function enviarMensagem() {
    const valor = inputUsuario.value.trim();
    if (!valor) return;

    const mensagensDiv = document.getElementById("mensagens");

    // Mensagem do usuário
    mensagensDiv.innerHTML += `
        <div class="mensagem usuario">
            <img src="imgs/user.jpg" alt="Usuário">
            <div>${valor}</div>
        </div>
    `;
    mensagensDiv.scrollTop = mensagensDiv.scrollHeight;

    inputUsuario.value = "";

    // Placeholder de carregando da IA
    const divBot = document.createElement("div");
    divBot.className = "mensagem ia";
    divBot.innerHTML = `
        <img src="imgs/bot.jpg" alt="IA">
        <div class="carregando">Digitando...</div>
    `;
    mensagensDiv.appendChild(divBot);
    mensagensDiv.scrollTop = mensagensDiv.scrollHeight;

    // Consulta o servidor
    const resposta = await consultarBot(valor);

    // Atualiza a mensagem da IA com a resposta
    divBot.innerHTML = `
        <img src="imgs/bot.jpg" alt="IA">
        <div>${resposta}</div>
    `;
    mensagensDiv.scrollTop = mensagensDiv.scrollHeight;
}


const inputUsuario = document.getElementById("usuario");
const enviarBtn = document.getElementById("enviar");

enviarBtn.addEventListener("click", enviarMensagem);

inputUsuario.addEventListener("keypress", (e) => {
    if (e.key === "Enter") enviarMensagem();
});

/* ===============================
   LEITURA DE URL
================================ */

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

/* ===============================
   POPUP E NOME DO USUÁRIO
================================ */

document.addEventListener("DOMContentLoaded", () => {
    const nomeUsuario = localStorage.getItem("usuarioNome");
    const usuarioNomeElement = document.getElementById("usuarioNome");

    if (nomeUsuario && usuarioNomeElement) {
        usuarioNomeElement.textContent = `👤 ${nomeUsuario}`;
    }

    const popup = document.getElementById("popup");
    const closeBtn = document.getElementById("closeBtn");
    const openBtn = document.getElementById("openPopupBtn");

    // abre pelo URL
    if (getQueryParam("popup") === "1") {
        popup.style.display = "block";
    }

    closeBtn.addEventListener("click", () => {
        popup.style.display = "none";
        window.history.replaceState({}, document.title, window.location.pathname);
    });

    if (openBtn) {
        openBtn.addEventListener("click", (event) => {
            event.preventDefault();
            popup.style.display = "block";
        });
    }
});

/* ===============================
   HISTÓRICO DE CONVERSAS
================================ */

document.addEventListener("DOMContentLoaded", () => {
    let chatIndexParaRenomear = null;

    function salvarHistorico(mensagens) {
        let historicos = JSON.parse(localStorage.getItem("historicos")) || [];

        historicos.push({
            data: new Date().toLocaleString(),
            conteudo: mensagens,
            nome: null
        });

        localStorage.setItem("historicos", JSON.stringify(historicos));
        carregarHistoricos();
    }

    function carregarHistoricos() {
        const historicosDiv = document.getElementById("historicos");
        historicosDiv.innerHTML = "";

        let historicos = JSON.parse(localStorage.getItem("historicos")) || [];

        historicos.forEach((h, index) => {
            const div = document.createElement("div");
            div.className = "historico";

            const texto = document.createElement("span");
            texto.textContent = h.nome || `Chat em ${h.data}`;
            texto.style.flex = "1";

            // renomear
            const btnRenomear = document.createElement("button");
            btnRenomear.textContent = "✏️";
            btnRenomear.className = "renameHistorico";

            btnRenomear.addEventListener("click", (e) => {
                e.stopPropagation();
                chatIndexParaRenomear = index;
                document.getElementById("renameInput").value = texto.textContent;
                document.getElementById("renamePopup").style.display = "block";
            });

            // excluir
            const btnExcluir = document.createElement("button");
            btnExcluir.textContent = "X";
            btnExcluir.className = "deleteHistorico";

            btnExcluir.addEventListener("click", (e) => {
                e.stopPropagation();
                historicos.splice(index, 1);
                localStorage.setItem("historicos", JSON.stringify(historicos));
                carregarHistoricos();
            });

            div.addEventListener("click", () => {
                document.getElementById("mensagens").innerHTML = h.conteudo;
            });

            div.appendChild(texto);
            div.appendChild(btnRenomear);
            div.appendChild(btnExcluir);
            historicosDiv.appendChild(div);
        });
    }

    document.getElementById("novoChat").addEventListener("click", () => {
        const mensagens = document.getElementById("mensagens").innerHTML;

        if (mensagens.trim() !== "") salvarHistorico(mensagens);

        document.getElementById("mensagens").innerHTML = "";
    });

    document.getElementById("confirmRename").addEventListener("click", () => {
        let historicos = JSON.parse(localStorage.getItem("historicos")) || [];
        const novoNome = document.getElementById("renameInput").value.trim();

        if (novoNome && chatIndexParaRenomear !== null) {
            historicos[chatIndexParaRenomear].nome = novoNome;
            localStorage.setItem("historicos", JSON.stringify(historicos));
            carregarHistoricos();
        }

        document.getElementById("renamePopup").style.display = "none";
    });

    document.getElementById("closeRenamePopup").addEventListener("click", () => {
        document.getElementById("renamePopup").style.display = "none";
    });

    carregarHistoricos();
});

/* ===============================
   SIDEBAR (hover + mobile)
================================ */

const sidebar = document.querySelector(".sidebar");
const logo = document.querySelector(".sidebar .logo");
const historico = document.querySelector(".sidebar .historico-container");

sidebar.addEventListener("mouseenter", () => {
    logo.style.opacity = "1";
    historico.style.opacity = "1";
});

sidebar.addEventListener("mouseleave", () => {
    logo.style.opacity = "0";
    historico.style.opacity = "0";
});

document.addEventListener("DOMContentLoaded", () => {
    const menuBtn = document.getElementById("menuBtn");
    const overlay = document.getElementById("overlay");

    function toggleMenu() {
        document.body.classList.toggle("sidebar-open");
    }

    menuBtn.addEventListener("click", toggleMenu);
    overlay.addEventListener("click", toggleMenu);
});

/* ===============================
   BOTÃO "NOVO CHAT" MOBILE
================================ */

const novoChatMobile = document.getElementById("novoChatMobile");
novoChatMobile.addEventListener("click", () => {
    const mensagens = document.getElementById("mensagens").innerHTML;
    if (mensagens.trim() !== "") salvarHistorico(mensagens);
    document.getElementById("mensagens").innerHTML = "";
});
