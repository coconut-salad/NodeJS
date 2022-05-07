const xyz = (a, b) => {
  const promise = new Promise((resolve, reject) => {
    if (a + b > 10) {
      setTimeout(() => {
        reject('cannot calculate values');
      }, 2000);
    } else {
      setTimeout(() => {
        resolve(a + b);
      }, 2000);
    }
  });
  return promise;
};

const test = (result) => {
  console.log(result);
  return xyz(result, 2);
};

xyz(4, 3)
  .then((result) => {
    return test(result);
  })
  .then((result) => {
    return test(result);
  })
  .then((result) => {
    return test(result);
  })
  .then((endResult) => {
    console.log('ends');
  })
  .catch((e) => {
    console.log(e);
  });
