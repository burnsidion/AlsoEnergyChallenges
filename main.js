/*****************************************************************************************
* Part 2
****************************************************************************************/
let arr = [
  {
    first: "Amanda",
    last: "Byron",
    group: "Sales"
  }, {
    first: "Ye",
    last: "Xia",
    group: "Receiving",
    nameOrder: "reverse"
  }, {
    first: "Miltiades",
    last: "Crescens",
    group: "Sales"
  },
  /* ...don't foget to account for other entries of the same form, but with different group names..... */
];

// Part 2 Answer Here
function objectify(arr){
  //create accumulator object
  let obj = {};
  //create key variable
  let key;
  //loop over arr
  for (let i = 0; i < arr.length; i++) {
    //create fullName variable to be equal to each persons first name and last name
    let fullName = `${arr[i].first} ${arr[i].last}`;
    //set the key to be the name of each persons group
    key = arr[i].group;
    //logic to check if employee object contains "nameOrder", if so reverse fullName
    if (arr[i].nameOrder && arr[i].nameOrder.toLowerCase() === 'reverse') {
      fullName = `${arr[i].last} ${arr[i].first}`;
    }
    //logic to check if persons' group already exists, if so, push fullName object into array
    if (obj[key]) {
      obj[key].push({name: fullName})
    } else {
      obj[key] = [
        {
          name: fullName
        }
      ]
    }
  }
  //return finalized accumulator object
  return obj;
}
//line below is for testing with node.js
console.log(objectify(arr))
/*****************************************************************************************
* Bonus
****************************************************************************************/

// Bonus Anwser Here
