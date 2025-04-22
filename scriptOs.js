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