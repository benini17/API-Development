import { promises as fs } from 'fs';

arrCitiesNStates();

async function arrCitiesNStates() {
  try {
    const statesData = JSON.parse(await fs.readFile('Estados.json'));
    const citiesData = JSON.parse(await fs.readFile('Cidades.json'));
    // console.log(statesData);
    // console.log(citiesData);

    let arrCities = [];

    await fs.mkdir('./States/');

    for (let i = 0; i < statesData.length; i++) {
      for (let index = 0; index < citiesData.length; index++) {
        let city = citiesData[index];
        if (statesData[i].ID == city.Estado) {
          arrCities.push(city.Nome);
        }
      }
      // console.log(arrCities);
      await JSON.stringify(
        fs.writeFile(
          `./States/${createStateJSON(i)}.json`,
          JSON.stringify(arrCities)
        )
      );
      arrCities = [];

      // setTimeout(test(statesData[i].Sigla), 4000);
      await test(statesData[i].Sigla);
    }

    function createStateJSON(i) {
      return statesData[i].Sigla;
    }
  } catch (error) {
    console.log(error);
  }
}

async function test(state) {
  try {
    let abrevState = state;
    console.log('test -> state', state);

    const statesData = JSON.parse(await fs.readFile('Estados.json'));
    let cities = JSON.parse(await fs.readFile(`./States/${abrevState}.json`));

    let numberOfCities = cities.length;
    console.log('test -> numberOfCities', numberOfCities);
  } catch (error) {
    console.log('test -> error', error);
  }
}
