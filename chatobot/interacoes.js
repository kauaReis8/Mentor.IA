//nome no canto
document.addEventListener('DOMContentLoaded', () => {
    const nomeUsuario = localStorage.getItem('usuarioNome');
    const usuarioNomeElement = document.getElementById('usuarioNome');
    
    if (nomeUsuario && usuarioNomeElement) {
      usuarioNomeElement.textContent = `👤 ${nomeUsuario}`;
    }
  });

    window.addEventListener('DOMContentLoaded', () => {
        const popup = document.getElementById('popup');
        const closeBtn = document.getElementById('closeBtn');
        const openBtn = document.getElementById('openPopupBtn');
      
        // Mostrar pop-up se veio com ?popup=1
        if (getQueryParam('popup') === '1') {
          popup.style.display = 'block';
        }
      
        // Botão para fechar
        closeBtn.addEventListener('click', () => {
          popup.style.display = 'none';
          window.history.replaceState({}, document.title, window.location.pathname);
        });
      
        // Item da lista que reabre o pop-up
        if (openBtn) {
          openBtn.addEventListener('click', (event) => {
            event.preventDefault(); // impede comportamento padrão se for <a>
            popup.style.display = 'block';
          });
        }
      });
      
         
          
          window.addEventListener('DOMContentLoaded', () => {
            document.getElementById("novoChat").addEventListener("click", () => {
              const mensagens = document.getElementById("mensagens").innerHTML;
          
              if (mensagens.trim() !== "") {
                salvarHistorico(mensagens);  // Certifique-se que a função salvarHistorico está correta
              }
          
              document.getElementById("mensagens").innerHTML = "";  // Limpar mensagens para um novo chat
            });
          });
          
          //historico
          document.addEventListener("DOMContentLoaded", () => {

            let chatIndexParaRenomear = null;
        
            // ---------------- SALVAR HISTÓRICO ----------------
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
        
            // ---------------- CARREGAR HISTÓRICO ----------------
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
        
                    // Botão renomear
                    const btnRenomear = document.createElement("button");
                    btnRenomear.textContent = "✏️";
                    btnRenomear.className = "renameHistorico";
        
                    btnRenomear.addEventListener("click", (e) => {
                        e.stopPropagation();
                        chatIndexParaRenomear = index;
                        document.getElementById("renameInput").value = texto.textContent;
                        document.getElementById("renamePopup").style.display = "block";
                    });
        
                    // Botão excluir
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
        
            // ---------------- NOVO CHAT ----------------
            document.getElementById("novoChat").addEventListener("click", () => {
                const mensagens = document.getElementById("mensagens").innerHTML;
        
                if (mensagens.trim() !== "") {
                    salvarHistorico(mensagens);
                }
        
                document.getElementById("mensagens").innerHTML = "";
            });
        
            // ---------------- CONFIRMAR RENOMEAR ----------------
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
        
            // ---------------- FECHAR POPUP RENOMEAR ----------------
            document.getElementById("closeRenamePopup").addEventListener("click", () => {
                document.getElementById("renamePopup").style.display = "none";
            });
        
            // ---------------- INICIAR ----------------
            carregarHistoricos();
        });
      
      //hover aba esquerda
      const sidebar = document.querySelector('.sidebar');
      const logo = document.querySelector('.sidebar .logo');
      const historico = document.querySelector('.sidebar .historico-container');
      
      sidebar.addEventListener('mouseenter', () => {
          logo.style.opacity = '1';
          historico.style.opacity = '1';
      });
      
      sidebar.addEventListener('mouseleave', () => {
          logo.style.opacity = '0';
          historico.style.opacity = '0';
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

    

        
//CHAMAAA O SERVIDOR

async function consultarBot(texto) {
  try {
    const resp = await fetch("http://localhost:3000/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
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

async function enviarMensagem() {
  const valor = inputUsuario.value.trim();
  if (!valor) return;

  const mensagensDiv = document.getElementById("mensagens");

  // mensagem do usuário
  const divUser = document.createElement("div");
  divUser.className = "mensagem usuario";
  divUser.innerHTML = `<div>${valor}</div>`;
  mensagensDiv.appendChild(divUser);
  mensagensDiv.scrollTop = mensagensDiv.scrollHeight;

  inputUsuario.value = "";

  // placeholder enquanto espera IA
  const divBot = document.createElement("div");
  divBot.className = "mensagem bot";
  divBot.innerHTML = `<div class="carregando">Digitando...</div>`;
  mensagensDiv.appendChild(divBot);
  mensagensDiv.scrollTop = mensagensDiv.scrollHeight;

  // consulta IA
  const resposta = await consultarBot(valor);

  // atualiza a mensagem
  divBot.innerHTML = `<div>${resposta}</div>`;
  mensagensDiv.scrollTop = mensagensDiv.scrollHeight;
}
 
// Enviar mensagem
const inputUsuario = document.getElementById("usuario");
const enviarBtn = document.getElementById("enviar");

enviarBtn.addEventListener("click", enviarMensagem);

inputUsuario.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    enviarMensagem();
  }
});

// Novo Chat mobile
const novoChatMobile = document.getElementById("novoChatMobile");
novoChatMobile.addEventListener("click", () => {
    const mensagens = document.getElementById("mensagens").innerHTML;
    if (mensagens.trim() !== "") {
        salvarHistorico(mensagens);
    }
    document.getElementById("mensagens").innerHTML = "";
});