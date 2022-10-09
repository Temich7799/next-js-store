const { readdirSync } = require('fs')

const getDirectories = (path) =>
    readdirSync(path, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);

module.exports = getDirectories;