function variables(){
    var a = "Test"
    let b = 1
    const c = 1.1

    console.log(a, "В функцие")
    console.log(b, "В функцие")
    console.log(c, "В функцие")
}

variables()

console.log(a, "В не функции")
console.log(b, "В не функции")
console.log(c, "В не функции")
// вне функции данные переменные не доступны. ReferenceError: is not defined