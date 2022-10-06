const filterData = (dataArray, filterObject) => {

    const result = [];
    const ignoreIndexes = new Set();

    Object.keys(filterObject).forEach(key => {

        dataArray.forEach((object, index) => {
            if (object[key] && object[key] !== filterObject[key]) {
                ignoreIndexes.add(index);
            }
        });
    });

    dataArray.forEach((object, index) => {
        if (!ignoreIndexes.has(index)) result.push(object);
    });

    return result
}

module.exports = filterData;