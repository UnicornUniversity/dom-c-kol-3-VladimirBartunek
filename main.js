// ----------------------------------------
// DATA ARRAYS
// ----------------------------------------

// female first names
let femaleFirstnames = ["Anna", "Marie", "Eliška", "Adéla", "Tereza", "Lucie", "Natálie", "Sofie", "Karolína", "Veronika",
  "Jana", "Petra", "Kristýna", "Barbora", "Alena", "Monika", "Lenka", "Ivana", "Zuzana", "Markéta",
  "Hana", "Simona", "Michaela", "Lucie", "Věra", "Jitka", "Renata", "Eva", "Dáša", "Radka"];

// male first names
let maleFirstnames = ["Jan", "Jakub", "Tomáš", "Martin", "Lukáš", "Petr", "David", "Michal", "Filip", "Adam",
  "Vojtěch", "Matěj", "Šimon", "Ondřej", "Vladislav", "Marek", "Stanislav", "Jaroslav", "Karel", "František",
  "Václav", "Roman", "Zdeněk", "Pavel", "Jiří", "Ladislav", "Vít", "Milan", "Radek", "Vladislav"];

// female surnames
let femaleSurnames = ["Nováková", "Svobodová", "Novotná", "Dvořáková", "Černá", "Procházková", "Kučerová", "Veselá", "Horáková", "Němcová",
  "Pokorná", "Benešová", "Fialová", "Krejčíová", "Růžičková", "Jelínková", "Králová", "Šimková", "Adamová", "Zelenková",
  "Vávrová", "Marešová", "Křížová", "Doležalová", "Čechová", "Bartošová", "Sýkorová", "Konečná", "Vondráčková", "Kubíčková"];

// male surnames
let maleSurnames = ["Novák", "Svoboda", "Novotný", "Dvořák", "Černý", "Procházka", "Kučera", "Veselý", "Horák", "Němec",
  "Pokorný", "Beneš", "Fiala", "Krejčí", "Růžička", "Jelínek", "Král", "Šimek", "Adam", "Zelenka",
  "Vávra", "Mareš", "Kříž", "Doležal", "Čech", "Bartoš", "Sýkora", "Konečný", "Vondráček", "Kubíček"];

// possible workloads
let workload = [10, 20, 30, 40];


// ----------------------------------------
// HELPER FUNCTIONS
// ----------------------------------------

// returns a random element from an array
function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}


// generates a birthdate based on age range
function generateBirthdate(minAge, maxAge) {

  // number of milliseconds in one day
  const MS_PER_DAY = 24 * 60 * 60 * 1000;

  // average number of days per year
  const AVG_DAYS_PER_YEAR = 365.25;

  // current date
  const today = new Date();

  let minDays;
  let maxDays;

  // special case when minAge === maxAge
  if (minAge === maxAge) {
    // create a small interval around that exact age
    minDays = Math.floor((minAge * AVG_DAYS_PER_YEAR) - 1);
    maxDays = Math.floor((maxAge * AVG_DAYS_PER_YEAR) + 1);
  } else {
    // standard case:
    // youngest person = minAge + 1 day
    minDays = Math.floor((minAge * AVG_DAYS_PER_YEAR) + 1);

    // oldest person = maxAge - 1 day
    maxDays = Math.floor((maxAge * AVG_DAYS_PER_YEAR) - 1);
  }

  // validate range
  if (minDays > maxDays) {
    throw new Error("Invalid age range");
  }

  // generate random number of days within the range
  const randomDays =
    Math.floor(Math.random() * (maxDays - minDays + 1)) + minDays;

  // subtract days from today's date to get birthdate
  const birthdate = new Date(today.getTime() - randomDays * MS_PER_DAY);

  // return ISO string format (required by tests)
  return birthdate.toISOString();
}


// ----------------------------------------
// MAIN FUNCTION
// ----------------------------------------

/**
 * Main function that generates employees
 * @param {object} dtoIn contains:
 *  - count → number of employees to generate
 *  - age → { min, max } age range
 * @returns {Array} list of employees
 */
export function main(dtoIn) {
  const result = [];

  // loop to generate required number of employees
  for (let i = 0; i < dtoIn.count; i++) {

    // randomly assign gender
    const gender = Math.random() < 0.5 ? "male" : "female";

    // select name and surname based on gender
    const name =
      gender === "male"
        ? getRandom(maleFirstnames)
        : getRandom(femaleFirstnames);

    const surname =
      gender === "male"
        ? getRandom(maleSurnames)
        : getRandom(femaleSurnames);

    // create employee object
    result.push({
      gender,
      name,
      surname,
      workload: getRandom(workload),
      birthdate: generateBirthdate(dtoIn.age.min, dtoIn.age.max),
    });
  }

  // return final array of employees
  return result;
}
