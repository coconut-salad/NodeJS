const age = 11;
const name = 'ritu';

const occupation = {
  firstJob: 'one',
  secondJob: 'two',
};

const person = {
  ...occupation,
  name,
  age,
};

console.log(person);

const person2 = {
  name: name,
  age: age,
};
