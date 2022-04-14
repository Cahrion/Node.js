// Rest Parameters

// ES5

function sumES5(){
    let arr = Array.prototype.slice.call(arguments);

    let result = 0;

    arr.forEach(function(item){
        result+= item;
    });
    return result;
}
console.log(sumES5(10,20,30));

// ES6

function sumES6(...arr){
    let result = 0;

    arr.forEach(item => result+= item );
    return result;
}

console.log(sumES6(10,20,30));

function isDriver(age,...years){
    years.forEach(year=> console.log(2021-year>=age));
}

isDriver(18,1990,2002,1983,2005,2003,2004);
