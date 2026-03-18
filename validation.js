const nome = document.getElementById('nome');
const email = document.getElementById('email');
const senha = document.getElementById('senha');
const confirmar = document.getElementById('confirmar');
const form = document.getElementById('cadastroForm');
const btn = document.getElementById('btn');

// Eventos
nome.addEventListener('blur', () => validarCampo(nome, validarNome));
email.addEventListener('blur', () => validarCampo(email, validarEmail));
senha.addEventListener('input', () => validarCampo(senha, validarSenha));
confirmar.addEventListener('blur', () => validarCampo(confirmar, validarConfirmar));

// Função genérica
function validarCampo(input, funcao) {
  const erro = document.getElementById(input.id + '-error');
  const resultado = funcao(input.value);

  if (!resultado.valido) {
    input.classList.add('error');
    input.classList.remove('success');
    erro.textContent = resultado.mensagem;
  } else {
    input.classList.remove('error');
    input.classList.add('success');
    erro.textContent = '';
  }
}

// Validações
function validarNome(valor) {
  if (valor.trim() === '') return { valido: false, mensagem: 'Nome obrigatório' };
  if (valor.length < 3) return { valido: false, mensagem: 'Mínimo 3 caracteres' };
  return { valido: true };
}

function validarEmail(valor) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!valor) return { valido: false, mensagem: 'E-mail obrigatório' };
  if (!regex.test(valor)) return { valido: false, mensagem: 'E-mail inválido' };
  return { valido: true };
}

function validarSenha(valor) {
  if (valor.length < 8) return { valido: false, mensagem: 'Mínimo 8 caracteres' };
  if (!/[A-Z]/.test(valor)) return { valido: false, mensagem: '1 letra maiúscula' };
  if (!/[0-9]/.test(valor)) return { valido: false, mensagem: '1 número' };
  return { valido: true };
}

function validarConfirmar(valor) {
  if (valor !== senha.value) {
    return { valido: false, mensagem: 'Senhas não coincidem' };
  }
  return { valido: true };
}

// Submit
form.addEventListener('submit', function(e) {
  e.preventDefault();

  validarCampo(nome, validarNome);
  validarCampo(email, validarEmail);
  validarCampo(senha, validarSenha);
  validarCampo(confirmar, validarConfirmar);

  if (document.querySelectorAll('.error').length === 0) {

    btn.disabled = true;
    btn.innerHTML = "⏳ Enviando...";

    setTimeout(() => {
      form.innerHTML = `
        <h2 style="text-align:center; color: green;">
          ✅ Conta criada com sucesso!
        </h2>
      `;
    }, 2000);
  }
});