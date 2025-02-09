// script.js
document.getElementById('cepForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio do formulário

    const cep = document.getElementById('cep').value;
    const url = `https://viacep.com.br/ws/${cep}/json/`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.erro) {
                document.getElementById('resultado').innerHTML = '<p>CEP não encontrado. Algúns dos motivos ou esse CEP não existe ou foi descontinuado</p>';
            } else {
                const resultado = `
                    <p><strong>CEP:</strong> ${data.cep}</p>
                    <p><strong>Logradouro:</strong> ${data.logradouro}</p>
                    <p><strong>Bairro:</strong> ${data.bairro}</p>
                    <p><strong>Cidade:</strong> ${data.localidade}</p>
                    <p><strong>Estado:</strong> ${data.uf}</p>
                `;
                document.getElementById('resultado').innerHTML = resultado;

                // Adiciona o CEP, cidade e estado ao histórico
                adicionarCepAoHistorico(data.cep, data.localidade, data.uf);
            }
        })
        .catch(error => {
            console.error('Erro ao buscar o CEP:', error);
            document.getElementById('resultado').innerHTML = '<p>Erro ao buscar o CEP: foi informado algum caractere não numérico. Tente novamente.</p>';
        });
});

function adicionarCepAoHistorico(cep, cidade, uf) {
    const listaCeps = document.getElementById('listaCeps');
    const itemLista = document.createElement('li');
    itemLista.textContent = `${cep} - ${cidade}/${uf}`;

    // Adiciona um evento de clique para preencher o CEP no campo de busca
    itemLista.addEventListener('click', function() {
        document.getElementById('cep').value = cep;
    });

    listaCeps.appendChild(itemLista);

    // Limita o histórico aos últimos 5 CEPs
    if (listaCeps.children.length > 5) {
        listaCeps.removeChild(listaCeps.firstChild);
    }
}
