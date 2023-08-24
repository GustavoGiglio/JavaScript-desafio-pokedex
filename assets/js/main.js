const pokemonList = document.getElementById('pokemonList')        // Obtém a referência ao elemento da lista de Pokémon no HTML.
const loadMoreButton = document.getElementById('loadMoreButton')  // Obtém a referência ao botão "Load More" no HTML.
const maxRecords = 151                                            // Número máximo de registros de Pokémon a serem carregados.
const limit = 10                                                  // Quantidade de Pokémon a serem carregados por vez.
let offset = 0;                                                   // Inicializa o offset (deslocamento) para 0.

function loadPokemonItens(offset, limit) {                        // Função para carregar itens de Pokémon com base no offset e limit especificados.
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {    // Chama o método getPokemons da pokeApi, que retorna uma promessa.
    // Mapeia os pokémons retornados para uma string HTML representando cada um.
    const newHtml = pokemons.map((pokemon) =>  ` 
      <li class="pokemon ${pokemon.type}">
        <span class="number">#${pokemon.number}</span>
        <span class="name">${pokemon.name}</span>
        <div class="detail">
          <ol class="types">
            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
          </ol>
          <img src="${pokemon.photo}" alt="B${pokemon.name}"/>
        </div>
      </li>
    `).join('')
      pokemonList.innerHTML += newHtml                            // Adiciona o HTML gerado à lista de Pokémon.
  })
}

loadPokemonItens(offset, limit)                                   // Carrega os primeiros itens de Pokémon ao carregar a página.
loadMoreButton.addEventListener('click', () => {                  // Adiciona um ouvinte de evento para o botão "Load More".
  offset += limit                                                 // Incrementa o offset para a próxima página de Pokémon.
  const qtdRecordsWithNexPage = offset + limit                    // Calcula a quantidade de registros com a próxima página.
  if (qtdRecordsWithNexPage >= maxRecords) {                      // Verifica se a próxima página ultrapassaria o número máximo de registros.
    const newLimit = maxRecords - offset                          // Se sim, ajusta o limite para os últimos registros.
    loadPokemonItens(offset, newLimit)               
    loadMoreButton.parentElement.removeChild(loadMoreButton)      // Remove o botão "Load More" quando todos os registros foram carregados.
  } else {
    loadPokemonItens(offset, limit)                               // Caso contrário, carrega mais Pokémon com o limite especificado.
  }
})