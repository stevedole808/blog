const PATH = './data.json';
const { raw } = require('express');
const fs = require('fs');

class Post {
	get() {
		// Get Posts
		return this.readData();
	}

	getIndividualBlog(postId) {
		const posts = this.readData();
		const foundPost = posts.find((post) => post.id == postId);
		return foundPost;
	}
	add(newPost) {
		const currentPosts = this.readData();
		currentPosts.unshift(newPost);
		this.storeData(currentPosts);
	}
	readData() {
		let rawdata = fs.readFileSync(PATH);
		let parsedData = JSON.parse(rawdata);
		console.log(parsedData);
		return parsedData;
	}
	storeData(rawdata) {
		let data = JSON.stringify(rawdata);
		fs.writeFileSync(PATH, data);
	}
}

module.exports = Post;
