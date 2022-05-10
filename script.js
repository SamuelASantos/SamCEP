// REQUISIÇÃO
async function btn() {
    let cep = document.querySelector("#cep");
    // SOMENTE DÍGITOS
    cep = cep.value.replace(/\D/g, '');
    // VERIFICA SE CAMPO POSSUI VALOR INFORMADO
    if (cep != "") {
        // EXPRESSÃO PARA VALIDAR O CEP
        let validaCep = /^[0-9]{8}$/;
        // VALIDA O FORMATO DO CEP
        if (validaCep.test(cep)) {
            let api = await fetch("https://viacep.com.br/ws/"+cep+"/json/");
            let json = await api.json();
            montarBusca(json);
        } else {
            // FORMATO DE CEP INVÁLIDO
            alert("Formato de CEP inválido.")
        }
    } else {
        // FORMATO DE CEP INVÁLIDO
        alert("Informe somente números.");
    }  
}

function montarBusca(info) {
    // VERIFICAÇÃO DE ERRO
    if (!("erro" in info)) {
        // RESETA O ATRIBUTO PARA HIDDEN
    document.querySelector(".bd-end").setAttribute("hidden", "hidden");
        // POSICIONA AS INFORMAÇÕES
    document.querySelector("#info-cep").innerHTML = info.cep;
    document.querySelector("#info-logradouro").innerHTML = info.logradouro;
    document.querySelector("#info-bairro").innerHTML = info.bairro;
    document.querySelector("#info-cidade").innerHTML = info.localidade+" - "+info.uf;
    document.querySelector("#cep").value = "";
    document.querySelector(".bd-end").toggleAttribute("hidden");
    } else {
        // CEP NÃO ENCONTRADO
        alert("Cep não encontrado.");
    }    
}