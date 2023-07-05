//literal syntax
//===> (.)
// const regularExpression =/./  //any single character atleast once

// const regularExpression =/../

// const regularExpression =/a.b/

// const regularExpression =/ab./

// const regularExpression =/ab../

// const regularExpression =/ab.../

// const string ="";

// const string ="ab";

// const string ="abc";

// const string ="abc";

// const string ="xyzabc";

// const string ="xyzabcd";

// const result = regularExpression.test(string);
// console.log(result); //it will give boolean

// const match = string.match(regularExpression);

// console.log(match); //it will return only matched  value



// ===> star (*)

//  const regularExpression =/xa*by/  //Zero or more repetitions of preceding/before character

// // const string ="xaby";
// const string ="xabby";

// const result = regularExpression.test(string);
// console.log(result); //it will give boolean

// const match = string.match(regularExpression);

// console.log(match); //it will return only matched  value


// ===> plus (+)

// const regularExpression =/xa+by/  //one or more repetitions of preceding/before character

// const string ="xaaaaby";
// // const string ="xby";
// // const string ="xaby";
// // const string ="xabby";

// const result = regularExpression.test(string);
// console.log(result); //it will give boolean

// const match = string.match(regularExpression);

// console.log(match); //it will return only matched  value


// // ===> power (^)  //start with

// // const regularExpression =/^x/  

// const regularExpression =/^x.b+y*/


// // const string ="xby";
// const string ="xbbyyyyy";
// // // const string ="xaby";
// // // const string ="xabby";

// const result = regularExpression.test(string);
// console.log(result); //it will give boolean

// const match = string.match(regularExpression);

// console.log(match); //it will return only matched  value



// ===> dollar ($)  //ended with

// const regularExpression =/x$/  

// const regularExpression =/y$/   //ending with y

// const regularExpression =/x+b*y$/  //false

// const regularExpression =/x+b*y*y$/   //true




// const string ="xby";
const string ="xbbyyyyy";
// // const string ="xaby";
// // const string ="xabby";

const result = regularExpression.test(string);
console.log(result); //it will give boolean

const match = string.match(regularExpression);

console.log(match); //it will return only matched  value
