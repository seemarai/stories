var mongoose = require('mongoose');

const StorySchema = mongoose.Schema({

	title: String,
	story: String,
	createDate:{
		type:Date,
		default: Date.now
	}
});

module.exports = mongoose.model('Stories', StorySchema)