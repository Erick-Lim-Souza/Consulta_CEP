// script.js
document.getElementById('cepForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio do formulário

    const cep = document.getElementById('cep').value;
    const url = `https://viacep.com.br/ws/${cep}/json/`;

    console.log("Fazendo requisição para:", url); // Verifica a URL da requisição

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log("Dados retornados:", data); // Verifica os dados retornados

            if (data.erro) {
                document.getElementById('resultado').innerHTML = '<p>CEP não encontrado.</p>';
            } else {
                const resultado = `
                    <p><strong>CEP:</strong> ${data.cep}</p>
                    <p><strong>Logradouro:</strong> ${data.logradouro}</p>
                    <p><strong>Bairro:</strong> ${data.bairro}</p>
                    <p><strong>Cidade:</strong> ${data.localidade}</p>
                    <p><strong>Estado:</strong> ${data.uf}</p>
                `;
                document.getElementById('resultado').innerHTML = resultado;

                // Adiciona o CEP pesquisado ao histórico
                adicionarCepAoHistorico(data.cep);
            }
        })
        .catch(error => {
            console.error('Erro ao buscar o CEP:', error);
            document.getElementById('resultado').innerHTML = '<p>Erro ao buscar o CEP. Tente novamente.</p>';
        });
});

function adicionarCepAoHistorico(cep) {
    const listaCeps = document.getElementById('listaCeps');
    const itemLista = document.createElement('li');
    itemLista.textContent = cep;

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