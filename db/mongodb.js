"use strict"

const mongoose = require("mongoose")

class db {
    constructor(link, name) {
        this.link = link
        this.name = name

    }
    start() {
        mongoose.connect(this.link, function(err) {
            if (err) {
                console.error('mongodb connection error', err);
                throw err
            }
            console.log(`mongodb connected`);
        });
    }
    print() {
        console.log(this)
    }
}

module.exports = db