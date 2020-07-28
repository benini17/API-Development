import { promises as fs } from 'fs';

arrCitiesNStates();

async function arrCitiesNStates() {
  try {
    const statesData = JSON.parse(await fs.readFile('Estados.json'));
    const citiesData = JSON.parse(await fs.readFile('Cidades.json'));
    // console.log(statesData);
    // console.log(citiesData);

    let arrCities = [];

    for (let i = 0; i < statesData.length; i++) {
      for (let index = 0; index < citiesData.length; index++) {
        let city = citiesData[index];
        if (statesData[i].ID == city.Estado) {
          arrCities.push(city.Nome);
        }
      }
      console.log(arrCities);
      await JSON.stringify(
        fs.writeFile(`${createStateJSON(i)}.json`, JSON.stringify(arrCities))
      );
      arrCities = [];
    }

    function createStateJSON(i) {
      return statesData[i].Sigla;
    }
  } catch (error) {
    console.log(error);
  }
}
