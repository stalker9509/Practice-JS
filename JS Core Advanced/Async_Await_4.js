const usersDatabase = {
    1: { id: 1, name: "John"},
    2: { id: 2, name: "Jane"},
    3: { id: 3, name: "Sam",},
};

async function fetchUserData(userId) {
    const userData = usersDatabase[userId];
    if (!userData) {
        throw new Error(`User with ID ${userId} not found.`);
    }
    return userData;
}

fetchUserData(1)
    .then(user => console.log(user))
    .catch(error => console.error(error));
