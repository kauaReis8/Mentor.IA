//  LÓGICA DE ALTERNÂNCIA DA INTERFACE 
const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});


//  FUNÇÕES DE AUTENTICAÇÃO FIREBASE 
// A variável 'auth' é definida em firebase.js

// 1. FUNÇÃO DE REGISTRO (SIGN UP)
function registrar() {
    const nome = document.getElementById('regNome').value;
    const email = document.getElementById('regEmail').value;
    const senha = document.getElementById('regSenha').value;
    const mensagemElement = document.getElementById('regMensagem');

    mensagemElement.textContent = 'Registrando...';
    mensagemElement.style.color = '#512da8';




    auth.createUserWithEmailAndPassword(email, senha)
        .then((userCredential) => {
            // Sucesso no registro
            const user = userCredential.user;

            // Atualiza o nome de exibição (DisplayName) do usuário
            return user.updateProfile({
                displayName: nome
            });
        })
        .then(() => {
            // Sucesso na atualização do perfil
            mensagemElement.textContent = '✅ Cadastro realizado com sucesso!';
            mensagemElement.style.color = 'green';

            // Opcional: Redirecionar para o login após um tempo
            setTimeout(() => {
                mensagemElement.textContent = '';
                container.classList.remove("active"); // Alterna para a tela de login
            }, 1500);

        })
        .catch((error) => {
            // Tratamento de erros
            let mensagemErro = 'Erro ao cadastrar. Tente novamente.';
            if (error.code === 'auth/weak-password') {
                mensagemErro = 'A senha deve ter pelo menos 6 caracteres.';
            } else if (error.code === 'auth/email-already-in-use') {
                mensagemErro = 'Este e-mail já está em uso.';
            } else if (error.code === 'auth/invalid-email') {
                mensagemErro = 'O formato do e-mail é inválido.';
            }

            console.error("Erro de Cadastro:", error.message);
            mensagemElement.textContent = `❌ Erro: ${mensagemErro}`;
            mensagemElement.style.color = 'red';
        });
}


// 2. FUNÇÃO DE LOGIN (SIGN IN)
function login() {
    const email = document.getElementById('loginEmail').value;
    const senha = document.getElementById('loginSenha').value;
    const mensagemElement = document.getElementById('loginMensagem');

    mensagemElement.textContent = 'Verificando credenciais...';
    mensagemElement.style.color = '#512da8';

    auth.signInWithEmailAndPassword(email, senha)
        .then((userCredential) => {
             
            // Sucesso no login
            const user = userCredential.user;
            // Salva o nome do usuário no localStorage
localStorage.setItem('usuarioNome', user.displayName || user.email);
            const nomeUsuario = user.displayName || user.email; // Pega o nome ou o e-mail
            
            mensagemElement.textContent = `🎉 Bem-vindo(a), ${nomeUsuario}! Redirecionando...`;
            mensagemElement.style.color = 'green';

            // Seleciona elementos do popup
const popup = document.getElementById('popupBoasVindas');
const nomePopup = document.getElementById('nomeUsuarioPopup');
const fecharPopup = document.getElementById('fecharPopup');

auth.signInWithEmailAndPassword(email, senha)
    .then((userCredential) => {
        const user = userCredential.user;
        const nomeUsuario = user.displayName || user.email;

        // Salva no localStorage
        localStorage.setItem('usuarioNome', nomeUsuario);

        // Mostra popup
        const popup = document.getElementById('popupBoasVindas');
        const nomePopup = document.getElementById('nomeUsuarioPopup');
        const fecharPopup = document.getElementById('fecharPopup');

        nomePopup.textContent = `🎉 Bem-vindo(a), ${nomeUsuario}!`;
        popup.classList.add('show');

        // REMOVE redirecionamento automático! Apenas fecha popup ao clicar
        fecharPopup.addEventListener('click', () => {
            popup.classList.remove('show');
            // Agora redireciona somente quando o usuário clicar
            
            
        });

        // Limpa a mensagem do login (opcional)
        const mensagemElement = document.getElementById('loginMensagem');
        mensagemElement.textContent = '';
    })
    .catch((error) => {
        let mensagemErro = 'Erro ao fazer login. Tente novamente.';
        if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
            mensagemErro = 'E-mail ou senha inválidos.';
        } else if (error.code === 'auth/invalid-email') {
            mensagemErro = 'O formato do e-mail é inválido.';
        }

        const mensagemElement = document.getElementById('loginMensagem');
        mensagemElement.textContent = `❌ Erro: ${mensagemErro}`;
        mensagemElement.style.color = 'red';
    });




            
            // Redireciona para a página principal 
            setTimeout(() => {
                window.location.href = '../chatobot/index2.html?popup=1'; // Usando o mesmo redirecionamento que você tinha
            }, 1000);

        })
        .catch((error) => {
            // Tratamento de erros
            let mensagemErro = 'Erro ao fazer login. Tente novamente.';
            if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
                mensagemErro = 'E-mail ou senha inválidos.';
            } else if (error.code === 'auth/invalid-email') {
                mensagemErro = 'O formato do e-mail é inválido.';
            }

            console.error("Erro de Login:", error.message);
            mensagemElement.textContent = `❌ Erro: ${mensagemErro}`;
            mensagemElement.style.color = 'red';
        });
}

// 3. (OPCIONAL) FUNÇÃO DE VERIFICAÇÃO DE AUTENTICAÇÃO (para proteger outras páginas)
// Se você for usar este script em outras páginas (como ../home/index.html), mantenha a verificação:
/*
auth.onAuthStateChanged((user) => {
    // Verifica se estamos em uma página que precisa de proteção (ex: home/index.html)
    if (window.location.pathname.includes("index.html") && !window.location.pathname.includes("login.html")) {
        if (user) {
            // Usuário logado - exibe o conteúdo
            if (document.querySelector('.conteudo')) {
                document.querySelector('.conteudo').style.display = 'block';
            }
        } else {
            // Usuário NÃO logado - redireciona para o login
            window.location.href = 'login.html'; 
        }
    }
});
*/