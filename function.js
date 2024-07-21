var mmh3 = require('murmurhash3');

const HashMap = function () {

    this.load_factor = 0.75
    this.capacity = 16
    this.arr = Array(this.capacity).fill(undefined)
    this.length = 0

    this.hash = (key) => {

        // return hashCode % this.capacity;
        return mmh3.murmur32Sync(key) % this.capacity
    }

    this.set = (key, value) => {
        let hashedKey = this.hash(key)
        console.log("adding: ", { key, hashedKey })


        // If bucket is empty, initialize it as an array
        if (this.arr[hashedKey] == undefined) {
            this.arr[hashedKey] = [];
        }

        // Check if key already exists in the bucket
        for (let i = 0; i < this.arr[hashedKey].length; i++) {
            if (this.arr[hashedKey][i][0] === key) {
                this.arr[hashedKey][i][1] = value; // Update value if key exists
                return;
            }
        }

        // Otherwise, add new key-value pair to the bucket
        this.arr[hashedKey].push([key, value]);

        // check if size exceed load_factor, if so, expands
        if (this.length / this.capacity >= this.load_factor) {
            console.log("expanding array")
            this.capacity *= 2
            let newArr = Array(this.capacity).fill(undefined)

            // Rehash all existing key-value pairs into the new array
            for (let i = 0; i < this.capacity / 2; i++) {
                if (this.arr[i] !== undefined) {
                    for (let j = 0; j < this.arr[i].length; j++) {
                        let [k, v] = this.arr[i][j]
                        let newHashKey = this.hash(k)

                        // If bucket is empty, initialize it as an array
                        if (newArr[newHashKey] == undefined) {
                            newArr[newHashKey] = [];
                        }

                        newArr[newHashKey].push([k, v])
                    }
                }
            }

            this.arr = newArr
        }

        this.length += 1

    }

    this.get = (key) => {
        let hashedKey = this.hash(key)
        if (this.arr[hashedKey] === undefined) return undefined

        let subArr = this.arr[hashedKey]

        for (let i = 0; i < subArr.length; i++) {
            let [k, v] = subArr[i]
            if (k === key)
                return v
        }

        return undefined
    }

    this.has = (key) => {
        return this.get(key) !== undefined
    }

    this.remove = (key) => {
        if (this.has(key)) {
            let hashedKey = this.hash(key)
            let subArr = this.arr[hashedKey]

            this.arr[hashedKey] = subArr.filter(([k, v]) => k !== key)

            return true
        }

        return false
    }

    // this.length = () => {
    //     return this.arr.filter(v => v !== null).length
    // }

    this.clear = () => {
        for (let i = 0; i < this.capacity; i++) {
            this.arr[i] = undefined
        }
    }

    this.keys = () => {
        let res = []

        for (let i = 0; i < this.capacity; i++) {
            if (this.arr[i] === undefined)
                continue
            let subArr = this.arr[i]
            for (let j = 0; j < subArr.length; j++) {
                res.push(subArr[j][0])
            }
        }

        return res
    }

    this.values = () => {
        let res = []

        for (let i = 0; i < this.capacity; i++) {
            if (this.arr[i] === undefined)
                continue
            let subArr = this.arr[i]
            for (let j = 0; j < subArr.length; j++) {
                res.push(subArr[j][1])
            }
        }

        return res
    }

    this.entries = () => {
        let res = []

        for (let i = 0; i < this.capacity; i++) {
            if (this.arr[i] === undefined)
                continue
            let subArr = this.arr[i]
            for (let j = 0; j < subArr.length; j++) {
                res.push(subArr[j])
            }
        }

        return res
    }
}

module.exports = { HashMap }