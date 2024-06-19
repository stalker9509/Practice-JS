function validateArray(arr) {
    if (arr.length === 0) {
        throw new Error('Array empty')
    }
}

try {

    const arr2 = []
    validateArray(arr2)
} catch (error) {
    console.log(error.message)
}
