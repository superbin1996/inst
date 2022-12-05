const txt = "https://3asd@google.com/image"
a = "google.com"
// let pattern = 
x = (new RegExp(`.*\\b${a}\\b`)).exec(txt)
console.log(`${x[0]}/`);

// let inputString = "I'm John, or johnny, but I prefer john.";
// let replaceThis = "John";
// let re = new RegExp(`\\b${replaceThis}\\b`, 'gi');
// console.log(inputString.replace(re, "Jack"));