// function gerarResumo(event) {
//     event.preventDefault();
    
// }
// function gerarResumo() {
//     // Pega os dados básicos
//     const nome = document.getElementById("inputNome").value;
//     const modelo = document.getElementById("inputModelo").value;
//     const cor = document.getElementById("inputCor").value;
//     const imei = document.getElementById("inputImei").value;
//     const defeito = document.getElementById("inputDefeito").value;

//     let texto = `📱 DADOS DO APARELHO\n`;
//     texto += `Marca: ${nome}\n`;
//     texto += `Modelo: ${modelo}\n`;
//     texto += `Cor: ${cor}\n`;
//     texto += `IMEI: ${imei}\n`;
//     texto += `Defeito relatado: ${defeito}\n\n`;

//     texto += `ESTADO DO APARELHO\n`;

//     // Seleciona todas as linhas da tabela (exceto o cabeçalho)
//     const linhas = document.querySelectorAll("form:nth-of-type(2) table tr");

//     linhas.forEach((linha, index) => {
//         if (index === 0) return; // Pula o cabeçalho

//         const item = linha.children[0]?.textContent;
//         const checkboxes = linha.querySelectorAll('input[type="checkbox"]:checked');
//         const obs = linha.querySelector('input[type="text"]')?.value;

//         const situacoes = Array.from(checkboxes).map(cb => cb.parentElement.textContent.trim());

//         texto += `🔹 ${item}:\n`;

//         if (situacoes.length > 0) {
//             texto += `  - Situação: ${situacoes.join(', ')}\n`;
//         }

//         if (obs) {
//             texto += `  - Observações: ${obs}\n`;
//         }

//         texto += '\n';
//     });

//     // Exibe o resultado
//     document.getElementById("campoTexto").innerHTML = texto;
// }

// function copiarTexto() {
//     // Seleciona a div
//     const div = document.getElementById('campoTexto');
    
//     // Cria um elemento de texto temporário
//     const tempInput = document.createElement('textarea');
//     tempInput.value = div.textContent;
    
//     // Adiciona ao body e seleciona o texto
//     document.body.appendChild(tempInput);
//     tempInput.select();
//     tempInput.setSelectionRange(0, 99999); // Para dispositivos móveis
    
//     document.execCommand('copy');
    
//     document.body.removeChild(tempInput);
    
//     alert("Texto copiado!");
    
//     }

    function gerarResumo() {
        const nome = document.getElementById('inputNome').value;
        const modelo = document.getElementById('inputModelo').value;
        const cor = document.getElementById('inputCor').value;
        const imei = document.getElementById('inputImei').value;
        const defeito = document.getElementById('inputDefeito').value;
        
        const campoTexto = document.getElementById('campoTexto');
        
        let resumo = `
        <strong>Marca:</strong> ${nome}<br>
        <strong>Modelo:</strong> ${modelo}<br>
        <strong>Cor:</strong> ${cor}<br>
        <strong>IMEI:</strong> ${imei}<br>
        <strong>Defeito relatado:</strong> ${defeito}<br><br>
        `;
        
        // Estado do aparelho
        const tabelas = document.querySelectorAll("table");
        const estadoAparelho = tabelas[1]; // 2ª tabela é o estado do aparelho
        resumo += `<strong>Estado do Aparelho:</strong><br>`;
        
        const linhasEstado = estadoAparelho.querySelectorAll("tr");
        linhasEstado.forEach((linha, i) => {
          if (i === 0) return; // Pular o cabeçalho

            const item = linha.children[0].textContent;
            const checkboxes = linha.children[1].querySelectorAll("input[type='checkbox']");
            const observacao = linha.children[2].querySelector("input").value;

            const marcados = [];
            checkboxes.forEach((checkbox, i) => {
                if (checkbox.checked) {
                const label = checkbox.parentElement.textContent.trim();
                marcados.push(label);
            }
            });

            resumo += `• ${item}: ${marcados.join(", ") || "Sem marcação"}${observacao ? " (" + observacao + ")" : ""}<br>`;
        });
        
        // Acessórios
        resumo += `<br><strong>Acessórios Entregues:</strong><br>`;
        const acessorios = tabelas[2].querySelectorAll("tr");
        
        acessorios.forEach((linha, i) => {
          if (i === 0 || i === acessorios.length - 4) return; // Ignorar cabeçalho e botão
            const nomeItem = linha.children[0].textContent.trim();
            const entregou = linha.children[1].querySelector("input").checked ? "Sim" : "Não";
            const obs = linha.children[2].querySelector("input").value;
            
            resumo += `• ${nomeItem}: ${entregou}${obs ? " (" + obs + ")" : ""}<br>`;
        });
        
        campoTexto.innerHTML = resumo;
        }

        function copiarTexto() {
        const texto = document.getElementById('campoTexto').innerText;
        navigator.clipboard.writeText(texto)
            .then(() => alert('Texto copiado para a área de transferência!'))
            .catch(() => alert('Erro ao copiar texto.'));
        }
        
        function enviarParaWhatsApp() {
        const numeroTelefone = '555333075545'; // Seu número com DDI e DDD
        const mensagem = document.getElementById('campoTexto').innerText;
        const mensagemCodificada = encodeURIComponent(mensagem);
        const link = `https://wa.me/${numeroTelefone}?text=${mensagemCodificada}`;
        window.open(link, '_blank');
        }