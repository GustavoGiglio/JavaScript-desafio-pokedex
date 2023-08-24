const pokeApi = {}; // Cria um objeto vazio chamado pokeApi para armazenar as funções e métodos relacionados à API de Pokémon.

function convertPokeApiDetailToPokemon(pokeDetail) {    // Função que converte os detalhes da API de Pokémon em um objeto Pokémon personalizado.
  const pokemon = new Pokemon();                        // Cria uma nova instância da classe Pokemon.
  
  // Atribui informações do detalhe do Pokémon ao objeto Pokemon.
  pokemon.number = pokeDetail.id;   // Número do Pokémon.
  pokemon.name = pokeDetail.name;   // Nome do Pokémon.

  const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);  // Mapeia os tipos do Pokémon a partir dos dados do detalhe.
  const [type] = types;                                                  // Pega o primeiro tipo para uso posterior.

  pokemon.types = types;                                                  // Array de tipos do Pokémon.
  pokemon.type = type;                                                   // Tipo principal do Pokémon.
  pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;    // URL da imagem do Pokémon.

  return pokemon;   // Retorna o objeto Pokémon personalizado.
}

pokeApi.getPokemonDetail = (pokemon) => {   // Método para obter detalhes de um Pokémon específico.
  return fetch(pokemon.url)                 // Faz uma solicitação à API usando a URL do Pokémon.
    .then((response) => response.json())    // Converte a resposta em formato JSON.
    .then(convertPokeApiDetailToPokemon);   // Converte os detalhes em um objeto Pokémon personalizado.
};

pokeApi.getPokemons = (offset = 0, limit = 10) => {                                 // Método para obter uma lista de Pokémons com base no deslocamento e limite.
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;  // Monta a URL da API.
  return fetch(url)                                                                 // Faz uma solicitação à API usando a URL montada.
    .then((response) => response.json())                                            // Converte a resposta em formato JSON.
    .then((jsonBody) => jsonBody.results)                                           // Pega a matriz de resultados da resposta.
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))                     // Mapeia os detalhes de cada Pokémon.
    .then((detailRequests) => Promise.all(detailRequests))                          // Faz todas as solicitações de detalhes em paralelo.
    .then((pokemonsDetails) => pokemonsDetails);                                    // Retorna a lista de detalhes de Pokémon.
};
