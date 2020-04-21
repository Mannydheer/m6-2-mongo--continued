'use strict';

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert')
require('dotenv').config()

//
const uri = `mongodb+srv://mannyDb:nbjlHmpzLMbDb9zx@cluster0-ucphp.mongodb.net/test?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

//name of db and collection.
const dbName = 'Seats'
const collection = 'ListOfSeats'
const userCollection = 'Users'

const getSeats = async (req, res) => {
    client.connect(async (err) => {
        console.log('connected inside getseats')
        try {
            const db = client.db(dbName);
            let data = await db.collection(collection)
                .find()
                .toArray()
            //Transform the data and load. (Extract transform load)
            let seats = {}
            data.forEach(item => {
                seats[item._id] = {
                    price: item.price,
                    isBooked: item.isBooked
                }
            })
            res.status(200).json({
                seats: seats,
                numOfRows: 8,
                seatsPerRow: 12,
            })
        }
        catch (err) {
            console.log(err.stack)
            res.status(500).json({ status: 500 })
        }
        //when either try ot catch finishes. Always go through.
        finally {
            // client.close();
        }
    });
};

const handleSeatBooking = async (req, res) => {

    const { seatId, creditCard, expiration, fullName, email } = req.body;

    //check credit card and expiration right away. 
    if (!creditCard || !expiration) {
        return res.status(400).json({
            status: 400,
            message: 'Please provide credit card information!',
        });
    }


    client.connect(async (err) => {
        //mongo error
        if (err) throw err;
        console.log('connected in handlebookseating')
        try {

            //specify value that you want to change.
            let newValues = { $set: { isBooked: true } }
            const db = client.db(dbName);
            //first bit represents the object that you want to update, and second is the change. 
            const r = await db.collection(collection).updateOne({ _id: seatId }, newValues)
            //matchedCount is ti ensure the object we want to update exists (1-1)
            assert.equal(1, r.matchedCount);
            //modifiedCount, after does updating, 1 has been modified.
            assert.equal(1, r.modifiedCount);
            // ---------------------------------USERS -------------------------------

            const r2 = await db.collection(userCollection).insertOne({
                fullName: fullName,
                email: email,
                seat: seatId
            })
            assert.equal(1, r2.insertedCount);
            console.log(r2, 'THIS IS R2')

            Promise.all([r, r2])
                .then(() => {
                    //all good, must send back success as the front end expects this for their condition.
                    res.status(200).json({ status: 200, success: true });
                    console.log('disconnected in try')
                })
        }
        catch (err) {
            console.log(err.stack)
            res.status(500).json({ status: 500 })
        }
        //double check.
        finally {
            console.log('disconnected in try')
            // client.close();
        }
    })
    // 


}




module.exports = { getSeats, handleSeatBooking };
