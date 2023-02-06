const { usersData, thoughtsData, usernameFriends } = require('./starting-data');
const Users = require('../models/user');
const Thoughts = require('../models/thought');
const connection = require('../config/connection');

// connection
// any errors
// open - add data
connection.on('error', (e) => e).once('open', async () => {
    await Users.deleteMany({});
    await Thoughts.deleteMany({});

    // insertMany - users and thoughts data
    await Users.insertMany(usersData);
    await Thoughts.insertMany(thoughtsData);

    // Users find
    // usernames and ids
    const dataUsers = await Users.find({}).exec();
    const idNames = dataUsers.map((e) => {
        return {
            username: e.username,
            _id: e._id
        }
    })

    // add ids (friends) to friend list
    for (let i = 0; i < idNames.length; i++) {
        const index = usernameFriends.findIndex((e) => e.username == idNames[i].username);
        const list = usernameFriends[index].friendsList;
        // ids (friends)
        let friendsId = idNames.filter((e) => list.includes(e.username)).map((e) => e._id);
        // find one and update
        // $push
        await Users.findOneAndUpdate(
            { _id: idNames[i]._id },
            { $push: { friends: friendsId } }
        )
    }

    // add ids (thoughts) to thoughts (user)
    const dataThoughts = await Thoughts.find({}).exec();
    const thoughtsList = dataThoughts.map((e) => {
        return {
            username: e.username,
            _id: e._id
        }
    })
    for (let j = 0; j < idNames.length; j++) {
        let thoughtsId = thoughtsList.filter((e) => e.username == idNames[j].username).map((e) => e._id);
        // find one and update
        // $push
        await Users.findOneAndUpdate(
            { _id: idNames[j]._id },
            { $push: { thoughts: thoughtsId } }
        )
    }
    console.log('starting data - added');
    process.exit(0);
})