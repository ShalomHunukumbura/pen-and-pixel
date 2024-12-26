import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/blogs");
                setBlogs(response.data);
            } catch (error) {
                console.error("Error fetching blogs", error);
            }
        };
        fetchBlogs();
    }, []);

    const renderContentPreview = (content) => {
        if (!content || !content.blocks) return '';
        // Find the first paragraph block
        const firstParagraph = content.blocks.find(block => block.type === 'paragraph');
        if (!firstParagraph) return ''; // If no paragraph is found, return an empty string.

        // Split the paragraph into sentences using a regular expression (splitting by period + space).
        const sentences = firstParagraph.data.text.split('. ');

        // Get the first two sentences and join them with a period and space.
        const preview = sentences.slice(0, 1).join('. ') + (sentences.length > 1 ? '...' : '');

        return preview;
    };

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4'>
            {blogs.map((blog) => (
                <Link key={blog._id} to={`/blog/${blog._id}`} className='group'>
                    <div className='max-w-sm rounded overflow-hidden shadow-lg bg-white border border-gray-200 hover:scale-105 transition-all duration-200'>
                        <img
                            className='w-full h-48 object-cover rounded-lg shadow-lg group-hover:shadow-xl'
                            src={blog.bannerURL}
                            alt={blog.title}
                        />
                        <div className='px-6 py-4'>
                            <div className='font-bold text-xl mb-2'>{blog.title}</div>
                            <p className='text-grey-700 text-base'>
                                {renderContentPreview(blog.content)}...
                            </p>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
};


export default Home;