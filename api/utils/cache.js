const { LRUCache } = require('lru-cache')

const cacheOptions = {
    max: 500, //缓存最大条数
    ttl: 1000 * 60 * 60 * 24 * 7 //缓存时间s
}

const cache = new LRUCache(cacheOptions)

// const setData = async (key, value) => {
//     cache.set(key, value)
// }


// const getData = async (key) => {
//     return cache.get(key)
// }

module.exports = cache