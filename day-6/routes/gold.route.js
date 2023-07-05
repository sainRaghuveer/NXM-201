const express = require('express');
const { goldModel } = require('../models/gold.model');
const Redis = require("ioredis");

const redis = new Redis();

const goldRouter = express.Router();

goldRouter.post("/goldprice", async (req, res) => {
    const {price} = req.body;

    if(!price) return res.status(200).send({ "msg": "Price not found" });

    try {
        const document = await goldModel.find();
        console.log(document);
        if (!document.length) {
            const response = await goldModel.create({price});
            res.status(200).send({ "msg": "Price successfully created" });
        } else {
            const id = document[0]._id;
            await goldModel.findByIdAndUpdate(id, {price}, {runValidators:true});
            res.status(200).send({ "msg": "Price successfully updated" });
        }
    } catch (error) {
        res.status(500).send({ error: error.message, error });
    }


    //1. take the price from req.body
    //2. As per Rate model, create a new rate
    //3. save it into database
    //4. send to response
});

goldRouter.get("/gold", async (req, res) => {
    try {
        // output will be 0 / 1;
        const isExists = await redis.hexists('gold', 'price');

        if (isExists) {
            console.log("Getting from redis")
            // await redis.expire('gold', 5);

            console.time("redis query");
            const price = await redis.hget('gold', 'price');
            console.timeEnd("redis query");

            return res.status(200).send({ message: 'success', price })
        }

        console.log("Defined in redis");

        console.time("DB query");
        const docs = await goldModel.find();
        console.timeEnd("DB query");

        const price = docs[0].price;

        await redis.hset('gold', { price });

        const expiryTimeInMS = getDiffTimeInMS();
        await redis.expire('gold', 5); // Expiry time

        res.status(200).send({ message: 'success', price })

    } catch (error) {
        console.log('error:', error)
        res.status(500).send({ message: error.message, error });
    }
    //1. getting from the DB should happen if the cache is given (nil)
    //1. get the updated rate from DB, take help
    //2. set it into the redis cache
    //3. if rate exists in cache send that one
    //4. otherwise get from Db and update it

});

function getDiffTimeInMS() {
    const currentTime = new Date();

    // Set the target time to 11:59 PM
    const targetTime = new Date();
    targetTime.setHours(23, 59, 59, 99); // Set hours, minutes, seconds, and milliseconds

    // Calculate the difference in milliseconds
    const differenceInMilliseconds = targetTime.getTime() - currentTime.getTime();

    return differenceInMilliseconds;
}


module.exports = {
    goldRouter
}