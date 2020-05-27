const deleteElementFromArrayJSON = function (arr, key) {
    return arr.filter((item) => { return item !== key });
};
const data = {
    arr: [
        "a",
        "b",
        "c",
        "d",
    ]
}
const results = deleteElementFromArrayJSON(data.arr, 'c');