function callbackBasedFunction(arg1, arg2, callback) {
    setTimeout(() => {
        const result = arg1 + arg2
        callback(null, result)
    }, 1000);
}

function promisify(originalFunction) {
    return function(...args) {
        return new Promise((resolve, reject) => {
            args.push((err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
            originalFunction(...args)
        });
    };
}

const promiseBasedFunction = promisify(callbackBasedFunction);
promiseBasedFunction(1, 2)
    .then(result => {
        console.log('Результат:', result)
    })
    .catch(err => {
        console.error('Ошибка:', err)
    });

