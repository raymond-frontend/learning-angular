const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    text: {
        type: String,
        required: true
    },

    firstname: {
        type: String
    },

    avatar: {
        type: String
    },

    likes: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },

        }
    ],

    comments: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },

            text: {
                type: String,
                required: true
            },
            firstname: {
                type: String
            },

            avatar: {
                type: String
            },
            date: {
                type: Date,
                default: Date.now
            },
            replies: [
                {
                    user: {
                        type: Schema.Types.ObjectId,
                        ref: 'User',
                        required: true
                    },

                    text: {
                        type: String,
                        required: true
                    },
                    firstname: {
                        type: String
                    },

                    avatar: {
                        type: String
                    },
                    date: {
                        type: Date,
                        default: Date.now
                    }
                }


            ],

            likes: [
                {
                    user: {
                        type: Schema.Types.ObjectId,
                        ref: 'User',
                        required: true
                    }
                }
            ]

        }
    ],
    date: {
        type: Date,
        default: Date.now
    }

});

const Post = mongoose.model('post', postSchema);

exports.Post = Post;