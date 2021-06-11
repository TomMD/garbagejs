const sql = "select * from * where * = ?";
let garbage;
​
garbage++;
​
const garbage = 2; //twice defined?
​
sql = 3; // can't reassign a const variable
​
console.log(garbage);
​
console.log("2" + "1");  // => "21"
console.log("2" - "1");  // => 1
​
console.log('' == 0);    // => true
​
console.log(true == []); // -> false
console.log(true == ![]); // -> false
​
function getProp(object, propertyName, defaultValue) {
  if (!object[propertyName]) {
    return defaultValue;
  }
  return object[propertyName];
}
​
const hero = {
  name: 'Batman',
  isVillian: false
};
​
console.log(getProp(hero, 'name', 'Unknown'));     // => 'Batman'
​
console.log(getProp(hero, 'isVillian', true)); // => true
​
function getPropFixed(object, propertyName, defaultValue) {
   if (object[propertyName] === undefined) {
     return defaultValue;
   }
   return object[propertyName];
}
​
const hero = {
  name: 'Batman',
  isVillian: false
};
​
console.log(getPropFixed(hero, 'isVillian', true)); // => false
​
function getPropFixedBetter(object, propertyName, defaultValue) {
   if (!(propertyName in object)) {
     return defaultValue;
   }
   return object[propertyName];
}
​
function someFunc(array) {
  var index, item, length = array.length;
  /*
   * Lots of code
   */
  for (index = 0; index < length; index++) {
    item = array[index];
    // Use `item`
  }
  return someResult;
}
​
// Bad
let message;
// ...
if (notFound) {
  message = 'Item not found';
  // Use `message`
}
​
let count;
console.log(count); // => undefined
​
const hero = {
  name: 'Batman'
};
console.log(hero.city); // => undefined
​
// Bad
const object = {
  prop: 'value'
};
if (object.nonExistingProp === undefined) {
  // ...
}
​
// Bad
function foo(param1, param2) {
  if (param2 === undefined) {
    param2 = 'Some default value';
  }
  // ...
}
