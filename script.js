const elements = {
  pokemonID: document.getElementById('pokemon-id'),
  pokemonName: document.getElementById('pokemon-name'),
  spriteContainer: document.getElementById('sprite-container'),
  types: document.getElementById('types'),
  height: document.getElementById('height'),
  weight: document.getElementById('weight'),
  hp: document.getElementById('hp'),
  attack: document.getElementById('attack'),
  defense: document.getElementById('defense'),
  specialAttack: document.getElementById('special-attack'),
  specialDefense: document.getElementById('special-defense'),
  speed: document.getElementById('speed'),
  searchForm: document.getElementById('search-form'),
  searchInput: document.getElementById('search-input')
};

const updatePokemonDisplay = (data) => {
  elements.pokemonName.textContent = data.name.toUpperCase();
  elements.pokemonID.textContent = `#${data.id}`;
  elements.weight.textContent = `Weight: ${data.weight}`;
  elements.height.textContent = `Height: ${data.height}`;
  elements.spriteContainer.innerHTML = `<img id="sprite" src="${data.sprites.front_default}" alt="${data.name}">`;

  const stats = ['hp', 'attack', 'defense', 'specialAttack', 'specialDefense', 'speed'];
  stats.forEach((stat, index) => {
    elements[stat].textContent = data.stats[index].base_stat;
  });

  elements.types.innerHTML = data.types
    .map(obj => `<span class="type ${obj.type.name}">${obj.type.name}</span>`)
    .join('');
};

const resetDisplay = () => {
  elements.pokemonName.textContent = '';
  elements.pokemonID.textContent = '';
  elements.types.innerHTML = '';
  elements.height.textContent = '';
  elements.weight.textContent = '';
  elements.hp.textContent = '';
  elements.attack.textContent = '';
  elements.defense.textContent = '';
  elements.specialAttack.textContent = '';
  elements.specialDefense.textContent = '';
  elements.speed.textContent = '';
  const sprite = document.getElementById('sprite');
  if (sprite) sprite.remove();
};

const getPokemon = async () => {
  const pokemonName = elements.searchInput.value.trim().toLowerCase();
  if (!pokemonName) return;

  try {
    const response = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${pokemonName}`);
    if (!response.ok) throw new Error('Pokemon not found');
    const data = await response.json();
    updatePokemonDisplay(data);
  } catch (err) {
    resetDisplay();
    alert('Pokémon not found');
    console.error(err);
  }
};

elements.searchForm.addEventListener('submit', e => {
  e.preventDefault();
  resetDisplay();
  getPokemon();
});
