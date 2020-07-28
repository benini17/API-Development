import { promises as fs } from 'fs';

arrCitiesNStates();

async function arrCitiesNStates() {
  try {
    const statesData = JSON.parse(await fs.readFile('Estados.json'));
    const citiesData = JSON.parse(await fs.readFile('Cidades.json'));
    console.log(statesData);
    // console.log(citiesData);

    let arrCities = [];

    for (let i = 0; i < statesData.length; i++) {
      await fs.writeFile(`${createStateJSON(i)}.json`);
    }

    function createStateJSON(i) {
      return statesData[i].Sigla;
    }

    function stateReceiver() {
      citiesData.map((Nome) => Nome.Estado);
      statesData.map((Nome) => Nome.ID);

      if (Nome == Nome.Estado) {
        arrCities.push(citiesData[y].Nome);
      }
    }
    console.log(arrCities);
  } catch (error) {
    console.log(error);
  }
}
