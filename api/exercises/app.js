const express = require('express');
const app = express();
const Post = require('./api/models/post');
const postData = new Post();
var multer = require('multer');

var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './uploads');
	},
	filename: function (req, file, cb) {
		cb(null, `${file.fieldname}-${Date.now()}${getExt(file.mimetype)}`);
	},
});

const getExt = (mimeType) => {
	switch (mimeType) {
		case 'image/png':
			return '.png';
		case 'image/jpeg':
			return '.jpeg';
	}
};

var upload = multer({ storage: storage });

app.use(express.json());

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

app.post('/api/posts', upload.single('post-image'), (req, res) => {
	const newPost = {
		id: `${Date.now()}`,
		title: req.body.title,
		content: req.body.content,
		post_image: req.file.path,
		added_date: ` ${Date.now()}`,
	};
	postData.add(newPost);
	res.status(201).send(newPost);
});

app.listen(3000, () => console.log('Listening on https://localhost:3000'));
