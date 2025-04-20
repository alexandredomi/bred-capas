//formatando campo CPF

function formatarCPF(campo) {
    let cpf = campo.value.replace(/\D/g, ''); // remove tudo que não for número

    cpf = cpf.replace(/^(\d{3})(\d)/, '$1.$2');
    cpf = cpf.replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3');
    cpf = cpf.replace(/\.(\d{3})\.(\d{3})(\d)/, '.$1.$2-$3');
    campo.value = cpf;
};


//formatando campo data
const inputData = document.getElementById('dataDeNascimento');
inputData.addEventListener('input', function () {
   // Remove tudo que não for número
    let valor = inputData.value.replace(/\D/g, '');
  // Limita a 8 dígitos
    valor = valor.slice(0, 8);
  // Adiciona as barras
    if (valor.length > 4) {
    valor = valor.replace(/^(\d{2})(\d{2})(\d{1,4})/, '$1/$2/$3');
    } else if (valor.length > 2) {
    valor = valor.replace(/^(\d{2})(\d{1,2})/, '$1/$2');
    }
    inputData.value = valor;
});


//formata cep

const inputCEP = document.getElementById('cep');
inputCEP.addEventListener('input', function () {
  let valor = inputCEP.value.replace(/\D/g, ''); // Remove tudo que não for número
  // Limita a 8 dígitos
    valor = valor.slice(0, 8);
  // Adiciona o traço
    if (valor.length > 5) {
    valor = valor.replace(/^(\d{5})(\d{1,3})/, '$1-$2');
    }
    inputCEP.value = valor;
});


//formatar nome so para letra
const inputNome = document.getElementById('nome');

inputNome.addEventListener('input', function () {
    let valor = inputNome.value.replace(/[^A-Za-zÀ-ÿ\s]/g, '');
    inputNome.value = valor;
});

//formatar codigo do vendedor so para numeros
const inputNumero = document.getElementById('numero');

inputNumero.addEventListener('input', function () {
  // Remove tudo que não for número
    let valor = inputNumero.value.replace(/\D/g, '');
    inputNumero.value = valor;
});

//formata numero de telefone 
const inputTelefone = document.getElementById('telefone');

inputTelefone.addEventListener('input', function () {
  let valor = inputTelefone.value.replace(/\D/g, ''); // Remove tudo que não é número

  // Limita a 11 dígitos
    valor = valor.slice(0, 11);

  // Aplica a máscara
    if (valor.length <= 10) {
    // Formato fixo: (99) 9999-9999
    valor = valor.replace(/^(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    } else {
    // Formato celular: (99) 99999-9999
    valor = valor.replace(/^(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
    }

    inputTelefone.value = valor;
});

//mover e formatar o exto certo para o text area

function moverTexto() {
    const valorInputNome = document.getElementById('nome').value;
    const valorInputTelefone = document.getElementById('telefone').value;
    const valorInputCpf = document.getElementById('cpf').value;
    const valorInputDataDeNascimento = document.getElementById('dataDeNascimento').value;
    const valorInputProduto = document.getElementById('produto').value;
    const valorInputNumeroDoVendedor = document.getElementById('numero').value;
    const campoTexto = document.getElementById('campoTexto');
    
    campoTexto.innerHTML = 
    `<strong>Nome completo:</strong> ${valorInputNome}<br>` +
    `<strong>Telefone:</strong> ${valorInputTelefone}<br>` +
    `<strong>CPF:</strong> ${valorInputCpf}<br>` +
    `<strong>Data de nascimento:</strong> ${valorInputDataDeNascimento}<br>` +
    `<strong>Produto:</strong> ${valorInputProduto}<br>` +
    `<strong>Código do vendedor:</strong> ${valorInputNumeroDoVendedor}`};

// nao recarregar a pagina ao enviar o formulario
const formulario = document.getElementById('formulario');

formulario.addEventListener('submit', function(event) {
  event.preventDefault(); // Impede o recarregamento da página

  moverTexto(); // Executa a função que preenche o campo de texto
});

const texto = document.getElementById('campoTexto').innerText;

function enviarParaWhatsApp() {
    const numeroTelefone = '555399999999'; // Troca pelo teu número
    const mensagem = document.getElementById('campoTexto').innerText; // ou .value se for textarea
    const mensagemCodificada = encodeURIComponent(mensagem);
    
    const link = `https://wa.me/${numeroTelefone}?text=${mensagemCodificada}`;
    
    window.open(link, '_blank'); // abre em nova aba
    }