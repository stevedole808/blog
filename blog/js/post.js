const API_URL = 'http://localhost:3000/api/posts/';
const API_BASE_URL = 'http://localhost:3000/';

window.onload = () => {
	getPost();
	getPostIdParam();
};

const getPostIdParam = () => {
	const qureyString = window.location.search;
	const urlParams = new URLSearchParams(qureyString);
	return urlParams.get('id');
};
const getPost = () => {
	const postId = getPostIdParam();
	const url = `${API_URL}${postId}`;
	fetch(url, {
		method: 'GET',
	})
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			buildPost(data);
		});
};

const buildPost = (blogPost) => {
	let postContent = '';
	const postDate = new Date(parseInt(blogPost.added_date)).toDateString();
	const postImage = `${API_BASE_URL}${blogPost.post_image}`;
	postContent += `
			<div class="post-container">
				<div id="individual-post-title">${blogPost.title}</div>
				<div id="individual-post-date">Published On ${postDate}</div>
				<div id="individual-post-content">
				${blogPost.content}
				</div>
			</div>`;
	document.querySelector('.post-content').innerHTML = postContent;
	document.querySelector('header').style.backgroundImage = `url(${postImage})`;
};
