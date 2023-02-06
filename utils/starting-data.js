// username, email, and friends list
const usernameFriends = [
    { username: 'winterB', email: 'wb@test.com', friendsList: ['oliveF', 'robinB'] },
    { username: 'oliveF', email: 'of@test.com', friendsList: ['winterB', 'riverW'] },
    { username: 'robinB', email: 'rb@test.com', friendsList: ['winterB'] },
    { username: 'riverW', email: 'rw@test.com', friendsList: ['oliveF'] },
];

// users data
const usersData = usernameFriends.map((e) => {
    return {
        thoughts: [],
        friends: [],
        username: e.username,
        email: e.email,
    }
});

// thoughts data
const thoughtsData = [
    {
        thoughtText: 'It is a nice day for a walk!',
        username: 'winterB',
        reactions: [
            {
                reactionBody: "yes, it is a great day!",
                username: "oliveF"
            }
        ]
    },
    {
        thoughtText: 'When is the basketball game?',
        username: 'robinB',
        reactions: [
            {
                reactionBody: "tomorrow at 7 pm!",
                username: "winterB"
            }
        ]
    }
];

module.exports = { usersData, thoughtsData, usernameFriends };