import { promises as fs } from 'fs';
import { error } from 'console';

arrCitiesNStates();

async function arrCitiesNStates() {
  try {
    const statesData = JSON.parse(await fs.readFile('Estados.json'));
    const citiesData = JSON.parse(await fs.readFile('Cidades.json'));
    // console.log(statesData);
    // console.log(citiesData);

    let arrCities = [];

    // await fs.stat('./States/');
    // if (!error) {
    //   console.log('file or directory exists');
    // } else if (error.code === 'ENOENT') {
    // }
    fs.mkdir('./States/');

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

      await getNumberOfCities(statesData[i].Sigla);
    }

    // findBiggestStates();
    // findSmallestStates();
    // biggestCityLength();
    smallestCityLength();

    function createStateJSON(i) {
      return statesData[i].Sigla;
    }
  } catch (error) {
    console.log(error);
  }
}

async function getNumberOfCities(state) {
  try {
    let abrevState = state;
    // console.log('test -> state', state);

    const statesData = JSON.parse(await fs.readFile('Estados.json'));
    let cities = JSON.parse(await fs.readFile(`./States/${abrevState}.json`));

    let numberOfCities = cities.length;
    // console.log('test -> numberOfCities', numberOfCities);
    return numberOfCities;
  } catch (error) {
    console.log('test -> error', error);
  }
}

async function findBiggestStates() {
  try {
    const statesData = JSON.parse(await fs.readFile('Estados.json'));

    let fiveBiggestStatesAnswer = [];
    let arrNumbers = [];
    let arrStatesAndNumbers = [];
    for (let index = 0; index < statesData.length; index++) {
      let eachState = statesData[index].Sigla;

      let abrevState = eachState;

      let cities = JSON.parse(await fs.readFile(`./States/${abrevState}.json`));
      let numberOfCities = cities.length;
      arrNumbers.push(numberOfCities);
      arrStatesAndNumbers.push(abrevState, numberOfCities);
    }

    let fiveBiggestNumbersSorted = arrNumbers.sort((a, b) => b - a).slice(0, 5);

    for (let index = 0; index < fiveBiggestNumbersSorted.length; index++) {
      const biggestNumber = fiveBiggestNumbersSorted[index];
      let state =
        arrStatesAndNumbers[arrStatesAndNumbers.indexOf(biggestNumber) - 1];
      let cities =
        arrStatesAndNumbers[arrStatesAndNumbers.indexOf(biggestNumber)];

      console.log('findBiggestStates -> state', state);
      console.log('findBiggestStates -> cities', cities);
      fiveBiggestStatesAnswer.push(`${state}-${cities}`);
    }

    console.log(
      'findBiggestStates -> fiveBiggestStatesAnswer',
      fiveBiggestStatesAnswer
    );
  } catch (error) {
    console.log('findBiggestStates -> error', error);
  }
}

async function findSmallestStates() {
  try {
    const statesData = JSON.parse(await fs.readFile('Estados.json'));

    let fiveSmallestStatesAnswer = [];
    let arrNumbers = [];
    let arrStatesAndNumbers = [];
    for (let index = 0; index < statesData.length; index++) {
      let eachState = statesData[index].Sigla;

      let abrevState = eachState;

      let cities = JSON.parse(await fs.readFile(`./States/${abrevState}.json`));
      let numberOfCities = cities.length;
      arrNumbers.push(numberOfCities);
      arrStatesAndNumbers.push(abrevState, numberOfCities);
    }

    let fiveSmallestNumbersSorted = arrNumbers
      .sort((a, b) => a - b)
      .slice(0, 5);

    for (let index = 0; index < fiveSmallestNumbersSorted.length; index++) {
      const smallestNumber = fiveSmallestNumbersSorted[index];
      let state =
        arrStatesAndNumbers[arrStatesAndNumbers.indexOf(smallestNumber) - 1];
      let cities =
        arrStatesAndNumbers[arrStatesAndNumbers.indexOf(smallestNumber)];

      console.log('findBiggestStates -> state', state);
      console.log('findBiggestStates -> cities', cities);
      fiveSmallestStatesAnswer.push(`${state}-${cities}`);
    }

    console.log(
      'findBiggestStates -> fiveSmallestStatesAnswer',
      fiveSmallestStatesAnswer
    );
  } catch (error) {
    console.log('findSmallestStates -> error', error);
  }
}

async function biggestCityLength() {
  try {
    const statesData = JSON.parse(await fs.readFile('Estados.json'));
    const citiesData = JSON.parse(await fs.readFile('Cidades.json'));

    for (let index = 0; index < statesData.length; index++) {
      const stateData = statesData[index].Sigla;

      let readStateData = JSON.parse(
        await fs.readFile(`./States/${stateData}.json`)
      );

      console.log('biggestCityLength -> readStateData', readStateData);
      //FIXME:
      let sortedArray = readStateData
        .map((city) => city.length)
        .sort((a, b) => b - a)
        .slice(0, 20);

      console.log('biggestCityLength -> sortedArray', sortedArray);

      let maxValue = Math.max(...sortedArray);
      console.log('biggestCityLength -> maxValue', maxValue);

      let newCheck = readStateData.find((city) => {
        if (city.length == maxValue) {
          console.log('chegou aqui');
          console.log('biggestCityLength -> city', city);
          return city;
        }
      });

      let correctAnswer = `${newCheck}-${stateData}`;
      console.log('biggestCityLength -> newCheck', newCheck);
      console.log('biggestCityLength -> correctAnswer', correctAnswer);
    }
  } catch (error) {
    console.log('biggestCityLength -> error', error);
  }
}

async function smallestCityLength() {
  try {
    const statesData = JSON.parse(await fs.readFile('Estados.json'));

    for (let index = 0; index < statesData.length; index++) {
      const stateData = statesData[index].Sigla;

      let readStateData = JSON.parse(
        await fs.readFile(`./States/${stateData}.json`)
      );

      console.log('smallestCityLength -> readStateData', readStateData);
      //FIXME:
      let sortedArray = readStateData
        .map((city) => city.length)
        .sort((a, b) => a - b)
        .slice(0, 20);

      console.log('smallestCityLength -> sortedArray', sortedArray);

      let minValue = Math.min(...sortedArray);
      console.log('smallestCityLength -> minValue', minValue);

      let newCheck = readStateData.find((city) => {
        if (city.length == minValue) {
          console.log('chegou aqui');
          console.log('smallestCityLength -> city', city);
          return city;
        }
      });

      let correctAnswer = `${newCheck}-${stateData}`;
      console.log('smallestCityLength -> newCheck', newCheck);
      console.log('smallestCityLength -> correctAnswer', correctAnswer);
    }
  } catch (error) {
    console.log('findSmallestStates -> error', error);
  }
}
