

function chunk(array = [], chunkSize = 0) {
    const clone = array.slice();
    const chunks = [];
    while (clone.length) chunks.push(clone.splice(0, chunkSize));
    return chunks;
}

const array = [1,3,2,5,6,2,6,2,6,1,7,1,6,1,8,37,2,4,1,6,2,7,2];
const size = 5;

const result = chunk(array, size);

console.log(result);