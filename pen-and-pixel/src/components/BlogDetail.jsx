import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const BlogDetail = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/blogs/${id}`);
                setBlog(response.data);
            } catch (error) {
                console.error("Error fetching blog", error);
            }
        };
        fetchBlog();
    }, [id]);

    if (!blog) {
        return <div>Loading...</div>;
    }

    const renderContent = (content) => {
        if (!content || !content.blocks) return null;

        return content.blocks.map((block, index) => {
            switch (block.type) {
                case 'header':
                    return <h2 key={index}>{block.data.text}</h2>;
                case 'paragraph':
                    return <p key={index}>{block.data.text}</p>;
                default:
                    return null;
            }
        });
    };

    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleString(); // Customize this format as needed
    };

    return (
        <div className='max-w-4xl mx-auto p-4'>
            <div className='mb-6'>
                <img className='w-full h-80 object-cover rounded' src={blog.bannerURL} alt={blog.title} />
            </div>
            <h1 className='text-4xl font-bold mb-4'>{blog.title}</h1>
            <div className='text-lg text-gray-700'>{renderContent(blog.content)}</div>
            <div className='mt-6 text-gray-500'>
                <p>Published on: {formatTime(blog.content.time)}</p>
                <p>Version: {blog.content.version}</p>
            </div>
        </div>
    );
};

export default BlogDetail;
