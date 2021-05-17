// Begin Date: 2020/05/24   Sun

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema(
    {
        
        parent: { 
            type: Schema.Types.ObjectId 
        },
        ancestors: [
            {
                type: Schema.Types.ObjectId,
            }
        ],
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            default: ""
        },
        visitCount: {
            type: Number,
            default: 0
        },
        likers: [{
            liker: {    
                type:   Schema.Types.ObjectId,
                ref:    "users"
            }
        }],
        dislikers: [{
            disliker: {    
                type:   Schema.Types.ObjectId,
                ref:    "users"
            }
        }],
        tags: [
            {
                tag: {
                    type: Schema.Types.ObjectId,
                    ref: 'tags'
                }
            }
        ],
        user: {
            type: Schema.Types.ObjectId,
            ref: 'users'
        },
    },
    {
      timestamps: true
    }
);

module.exports = Post = mongoose.model('posts', PostSchema);