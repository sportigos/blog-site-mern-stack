// Begin Date: 2020/05/24	Sun
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CommentSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'users'
        },
        content: {
        	type: String
        },
        visitCount: {
        	type:       Number,
        	default:    0
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
        post: { 
        	type:   Schema.Types.ObjectId ,
            ref:    "posts"
        },
        parent: { 
        	type: Schema.Types.ObjectId 
        },
        ancestors: [
            {
                type: Schema.Types.ObjectId,
            }
        ]
    },
    {
      timestamps: true
    }
);

module.exports = Comment = mongoose.model('comments', CommentSchema);