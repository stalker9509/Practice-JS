function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function printNumbers() {
    for (let i = 1; i <= 10; i++) {
        console.log(i);
        await delay(1000);
    }
}
printNumbers();
