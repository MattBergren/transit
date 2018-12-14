(function() {

    window.lockrRoom = {

        data: null,
        loaded: false,

        // initialization function
        getInitialStore: function(config) {

            let initial

            if (config.initialState) {
                initial = config.initialState
                // Lockr.set('$', initial)
                this.data = initial
            } else {
                console.error('Initial state not passed to getInitialStore')
            }

            this.loaded = true
            return initial
        },

        // ref
        // Returns a reference to the query's state location
        //

        ref: function(path, set = false) {
            let pathData = this.data,
            create = false,
            keyToCreate

            for (let i = 0; i < path.length; i++) {
                if (set) {
                    if (pathData[path[i]] !== undefined) {
                        pathData = pathData[path[i]]
                    } else {
                        if (i+1 === path.length) {
                            keyToCreate = path[i]
                            create = true
                        } else {
                            console.error('When using set(), you can only create a branch one level deeper than an already created branch. \nYour path fails because it contains more than one uncreated branch: \n--' + path)
                            break
                        }
                    }
                } else {
                    pathData = pathData[path[i]]
                }
            }

            if (pathData === undefined) {
                console.error('Tried to update the store in a location that does not exist: \n--' + path)
            }

            return {
                data: pathData !== undefined ? pathData : undefined,
                keyToCreate: keyToCreate !== undefined ? keyToCreate : null,
                create: create !== undefined ? create : null
            }
        },


        // persist
        // Save current store state to LocalStorage with Lockr.
        // Should only need to be used internally by API

        persist: function() {
            // dont do this for this project.
            // Lockr.set('$', this.data)
        },

        // set
        // Write or replace data to a defined path, such as product/meta/prices.
        //

        set: function(path, data) {
            // pass true as second argument to .ref() to indicate this may be referencing a new branch
            let pathData = this.ref(path, true)

            if (pathData.data === undefined) {
                console.error('Set failed.')
                return false
            } else {
                if (pathData.create) {
                    pathData.data[pathData.keyToCreate] = data
                } else {
                    if (typeof pathData.data === 'object') {
                        pathData.data = Object.assign(pathData.data, data)
                    } else {
                        pathData.data = data
                    }

                }
                this.persist()
            }
        },

        // push
        // Add to the end of a list of data. Push can only be used on an array.
        //

        push: function(path, data) {
            let pathData = this.ref(path).data

            if (pathData === undefined) {
                console.error('Push failed.')
                return false
            } else {
                if (Array.isArray(pathData)) {
                    pathData.push(data)
                    this.persist()
                } else {
                    console.error('\'Push\' can only be used on an array.')
                }
            }
        },


        // unshift
        // Add to beginning of a list of data. Unshift can only be used on an array.
        //

        unshift: function(path, data) {
            let pathData = this.ref(path).data

            if (pathData === undefined) {
                console.error('Unshift failed.')
                return false
            } else {
                if (Array.isArray(pathData)) {
                    pathData.unshift(data)
                    this.persist()
                } else {
                    console.error('\'Unshift\' can only be used on an array.')
                }
            }
        },


        //
        // remove
        // Remove data from a specific location
        // This is a curried function, so you must pass two sets of ()'s when you call it.
        // The first () contains an argument that is the key which you wish to delete, and the second () contains the path to the parent of that key.
        //

        remove: function(key) {
            return path => {
                let pathData = this.ref(path).data
                if (pathData === undefined) {
                    console.error('Remove failed.')
                    return false
                } else {
                    if (pathData[key] === undefined) {
                        console.error('Remove failed. Key not present in data path.')
                        return false
                    } else {
                        if (Array.isArray(pathData)) {
                            pathData.splice(key, 1)
                        } else {
                            delete pathData[key]
                        }
                        this.persist()
                    }
                }
            }
        }
    }

    return lockrRoom;

})()
