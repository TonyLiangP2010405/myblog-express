const Blog = require('../models/blog');


const Homepage = async (req, res) => {
    try {
        res.status(200).json({message: 'This is homePage'})
    }
    catch(error) {
        res.status(500).json({message: 'Something went wrong'})
    }
}

const createBlog = async (req, res) => {
    try {
        const {title, content} = req.body;
        const blog = Blog.createBlog(title, content);
        res.status(201).json(blog);
    }
    catch (error) {
        res.status(500).json({error: error.message});
    }
}


const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.getAllBlogs()
        if (blogs.length === 0) {
            return res.status(404).json({message: '没有博客内容'})
        }
        res.status(200).json(blogs)
    }
    catch(error) {
        res.status(500).json({error: error.message});
    }
}

const getBlogByTitle = async (req, res) => {
    try {
        const { title } = req.params;
        const blog = await Blog.getBlogByTitle(title)
        if (blog.length === 0) {
            return res.status(404).json({message: `No blogs found`})
        }
        res.status(200).json(blog)
    }
    catch(error) {
        res.status(500).json({error: error.message});
    }
}

const getBlogByContent = async (req, res) => {
    try {
        const { content } = req.params;
        const blog = await Blog.getBlogByContent(content)
        if (blog.length === 0) {
            return res.status(404).json({message: `No blogs found`})
        }
        res.status(200).json(blog)
    }
    catch (error) {
        res.status(500).json({error: error.message});
    }
}

const updateBlog = async (req, res) => {
    try {
        const {id} = req.params
        const {title, content} = req.body;
        const blog = Blog.getBlogById(id);
        if (blog.length === 0) {
            return res.status(404).json({message: `No blogs found`})
        }
        const updateBlog = await Blog.updateBlogById(id, title, content)
        res.status(200).json(updateBlog);
    }
    catch (error) {
        res.status(500).json({error: error.message});
    }
}

const deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = Blog.getBlogById(id);
        if (blog.length === 0) {
            return res.status(404).json({message: `No blogs found`})
        }
        const delete_user = await Blog.deleteBlogById(id)
        res.status(200).json(delete_user);
    }
    catch (error) {
        res.status(500).json({error: error.message});

    }
}

module.exports = {
    Homepage,
    getAllBlogs,
    getBlogByTitle,
    getBlogByContent,
    updateBlog,
    deleteBlog,
    createBlog,
}