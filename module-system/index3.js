// const add = (...args) => {
//   console.log(args);
// };

// add(1, 2, 3, 4, 5, 6, 7);

// destructuring in objects and arrays

const data = {
  name: 'Ritu',
  age: 15,
};

// const name = data.name;
// const age = data.age;

const { name, age } = data;

// console.log(name, age);

const arr = [2, 5, 1, 6, 5, 7];

const [first, , , third] = arr;

console.log(first, third);
