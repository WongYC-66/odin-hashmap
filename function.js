const HashMap = function () {

    this.load_factor = 0.75
    this.capacity = 16
    this.arr = Array(this.capacity).fill(null)

    this.hash = (key) => {
        let hashCode = 0;

        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % 1e9
        }

        return hashCode % this.capacity;
    }

    this.set = (key, value) => {
        let hashedKey = this.hash(key)

        this.arr[hashedKey] = [key, value]

        // check if size exceed load_factor, if so, expands
        if(this.length / this.capacity >= this.load_factor){
            this.capacity *= 2
            let newArr = Array(this.capacity).fill(null)
            for(let i = 0 ; i < this.capacity / 2 ; i++){
                if(this.arr[i] !== null){
                    newArr[i] = this.arr[i]
                }
            }

            this.arr = newArr
        }

    }

    this.get = (key) => {
        let hashedKey = this.hash(key)
        if(this.arr[hashedKey] === null) return null
        return this.arr[hashedKey][1]
    }

    this.has = (key) => {
        let hashedKey = this.hash(key)
        return this.arr[hashedKey] !== null
    }

    this.remove = (key) => {
        if (this.has(key)) {
            let hashedKey = this.hash(key)
            this.arr[hashedKey] = null
            return true
        }
        return false
    }

    this.length = () =>{
        return this.arr.filter(v => v !== null).length
    }

    this.clear = () =>{
        for(let i = 0 ; i < this.capacity ; i++){
            this.arr[i] = null
        }
    }

    this.keys = () =>{
        return this.arr.filter(el => el !== null).map(([k, v]) => k)
    }

    this.values = () =>{
        return this.arr.filter(el => el !== null).map(([k, v]) => v)
    }

    this.entries = () =>{
        return this.arr.filter(el => el !== null).map(([k, v]) => [k, v])
    }
}

module.exports = {HashMap}