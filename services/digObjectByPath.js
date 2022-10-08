const digObjectByPath = (pathArray, obj) => {
    return pathArray.length >= 1
        ? digObjectByPath(pathArray.slice(1), obj[pathArray[0]])
        : obj;
}

module.exports = digObjectByPath;