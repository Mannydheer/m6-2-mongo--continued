'use strict';


const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://mannyDb:nbjlHmpzLMbDb9zx@cluster0-ucphp.mongodb.net/test?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const assert = require('assert')

const dbName = 'Seats';
const collection = 'ListOfSeats'

const seatBatchImports = async (req, res) => {

    // Code that is generating the seats.
    // ----------------------------------
    const seats = [];
    const row = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    for (let r = 0; r < row.length; r++) {
        for (let s = 1; s < 13; s++) {
            seats.push({
                _id: `${row[r]}-${s}`,
                price: 225,
                isBooked: false,
            });
        }
    }
    // ----------------------------------

    //this error is from MongoClient.
    client.connect(async (err) => {

        //if any error with MongoDb Client
        if (err) {
            throw err;
        }
        console.log('connected')
        try {
            const db = client.db(dbName);
            //insert the array of seats made above.
            r = await db.collection(collection).insertMany(seats)
            assert.equal(seats.length, r.insertedCount);
            res.status(201).json({ data: seats, message: "Successfully inserted all seats into DB." })
            console.log('disconnected')
            client.close();
        }
        //more of a javascript error - code in js fails
        catch (err) {
            console.log(err.stack)
            res.status(500).json({ status: 500, data: seats, message: err.message })
            console.log('disconnected')
            client.close();
        }

    });
}

seatBatchImports();


