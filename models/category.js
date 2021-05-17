// Begin Date: 2020/05/24   Sun

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CategorySchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        parent: { type: Schema.Types.ObjectId },
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

module.exports = Category = mongoose.model('categories', CategorySchema);