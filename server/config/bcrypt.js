const bcryptjs = require('bcryptjs')


const createHash = (password) => {
    return bcryptjs.hash(password, 10);
}

const compareHash = (password, hash) => {
    return bcryptjs.compare(password, hash)
}

module.exports = {
    createHash,
    compareHash
}