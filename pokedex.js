// Función para mayúscula:
function capitalFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
// Función para cambiar la imagen:
const pokeImage = (url) => {
    const pokeImg = document.getElementById("pokeImg");
    pokeImg.src = url;
  
}
// Función para cambiar el nombre:
const pokeNombre = (pokemon) => {
    let nombre = capitalFirst(pokemon);
    document.getElementById("pokeNombre").innerHTML = `${nombre}`;
    
}


// Busca los datos en API tomando del input:
const fetchPokemon = () => {
    // Tomar el input y meter en una variable:
    const pokeName = document.getElementById("pokeName");
    // Obtenemos el valor de la variable del input y lo transformamos a minúsculas:
    let pokeInput = pokeName.value.toLowerCase();
    // Hacer la petición a la API:
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeInput}`;
    fetch(url).then((res) => {
        if (res.status != "200") {
            document.getElementById("pokeNumero").innerHTML = ``;
            document.getElementById("pokeNombre").innerHTML = `¡Ese no es un pokemón!`;
            pokeImage("./pikachu-laugh.gif")
        }
        else {
            return res.json(); 
        }
    }).then((data) => {
        let pokeImg = data.sprites.other.home.front_default;
        console.log(pokeImg);
        pokeImage(pokeImg); 
        let pokeNom = data.name; 
        let pokeId = data.id;
        let pokeTipo = data.types[0].type.name;
        let tipo = capitalFirst(pokeTipo);
        
        if (data.types.length == 2) {
            let pokeTipo2 = data.types[1].type.name;
            let tipo2 = capitalFirst(pokeTipo2);
            
            document.getElementById("pokeTipo2").innerHTML = `${tipo2}`;
        }
        else document.getElementById("pokeTipo2").innerHTML = `-`;

        pokeNombre(pokeNom);
        document.getElementById("pokeNumero").innerHTML = `${pokeId}`;
        document.getElementById("pokeTipo").innerHTML = `${tipo}`;
        
        let pokeStats = [data.stats[0].base_stat, data.stats[1].base_stat, data.stats[2].base_stat, data.stats[3].base_stat, data.stats[4].base_stat, data.stats[5].base_stat];
        document.getElementById("stat1").innerHTML = `${pokeStats[0]}`;
        document.getElementById("stat2").innerHTML = `${pokeStats[1]}`;
        document.getElementById("stat3").innerHTML = `${pokeStats[2]}`;
        document.getElementById("stat4").innerHTML = `${pokeStats[3]}`;
        document.getElementById("stat5").innerHTML = `${pokeStats[4]}`;
        document.getElementById("stat6").innerHTML = `${pokeStats[5]}`;

        console.log(pokeStats);
        /* Map crea un nuevo array con los resultados de la llamada a la función indicada
         aplicados a cada uno de sus elementos. En este caso, imprimir movimientos en consola */
        let movimientos = data.moves.map(mov => mov.move.name); 
        console.log(movimientos);
    })
}