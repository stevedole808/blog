const express = require('express');
const app = express();
const Post = require('./api/models/post');
const postData = new Post();

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	next();
});

app.use('/uploads', express.static('uploads'));

app.get('/api/posts', (req, res) => {
	res.status(200).send(postData.get());
});

app.get('/api/posts/:id', (req, res) => {
	const postId = req.params.id;
	const foundPost = postData.getIndividualBlog(postId);
	if (foundPost) {
		res.status(200).send(foundPost);
	} else {
		res.status(404).send('Posts Not Found');
	}
});
app.listen(3000, () => console.log('Listening on https://localhost:3000'));
