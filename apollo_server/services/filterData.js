const filterData = (dataArray, filterObject) => {
    
    const result = [];
    const ignoreIndexes = new Set();

    dataArray.forEach((object, index) => {
        checkObjectByFilterFields(object, index, filterObject);
    });

    dataArray.forEach((object, index) => {
        if (!ignoreIndexes.has(index)) result.push(object);
    });

    return result;

    function checkObjectByFilterFields(objectToCheck, index, filterObject, filterMode = 'exclude') {

        Object.entries(filterObject).forEach(([filterField, filterValue]) => {

            Array.isArray(filterValue)
                ? filterMode === 'include'
                    ? !filterValue.includes(objectToCheck[filterField]) && ignoreIndexes.add(index)
                    : filterValue.includes(objectToCheck[filterField]) && ignoreIndexes.add(index)
                : typeof filterValue === 'object'
                && checkObjectByFilterFields(objectToCheck[filterField] ? objectToCheck[filterField] : objectToCheck, index, filterValue, filterField === 'include' ? 'include' : filterMode)
        });
    }
}

module.exports = filterData;