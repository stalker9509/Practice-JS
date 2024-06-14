function arrays(arr) {
    let sum = 0
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > 0 && arr[i] < 10) {
            sum += arr[i]
        }
    }
    return sum
}


console.log(arrays([1, 2, 3, 4, 5]))
console.log(arrays([-2, -1, 0, 1, 2, 3, 10, 11, 12]))