//formatando campo CPF

function formatarCPF(campo) {
    let cpf = campo.value.replace(/\D/g, ''); // remove tudo que não for número

    cpf = cpf.replace(/^(\d{3})(\d)/, '$1.$2');
    cpf = cpf.replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3');
    cpf = cpf.replace(/\.(\d{3})\.(\d{3})(\d)/, '.$1.$2-$3');

    campo.value = cpf;
}