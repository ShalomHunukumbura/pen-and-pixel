import React , {useRef, useEffect, useState} from 'react'
import EditorJS from '@editorjs/editorjs'
import Header from "@editorjs/header"
import List from "@editorjs/list"
import ImageTool from '@editorjs/image'
import axios from 'axios'
import { div, header, image, img, p } from 'framer-motion/client'
import toast from 'react-hot-toast'

const Editor = () => {
  const editorRef = useRef(null)
  const [banner, setBanner] = useState(null) //for storing the selected banner
  const [bannerPreview, setBannerPreview] = useState(null) // for preview url

  useEffect(() =>{
    const editor = new EditorJS({
      holder: 'editorjs',
      tools: {
        header: Header,
        list: List,
        image: {
          class: ImageTool,
          config: {
            endpoints: {
              byFile: 'http://localhost:3000/api/images', 
            }
          }
        }
      },
      placeholder: 'Start writing your blog...'
    })

    editorRef.current = editor

    return () => {
      editor.destroy()
    }

  },[])

  //handle file selection
  const handleBannerupload = (event) => {
    const file = event.target.files[0]
    if (file) {
      setBanner(file) // set the selected file
      setBannerPreview( URL.createObjectURL(file)) // Generate a preview URL
    }
  }


  //handle publish blog
  const handlePublish = async () => {
    try{
      //validate input
      const title = document.getElementById('blog-title').value
      const content = await editorRef.current.save()
      console.log('blog content:',content);

      // Check if title and content are valid
      if (!title || !content.blocks || content.blocks.length === 0) {
        console.error('Please fill all fields before you publish the blog');
        return;
      }
    
       // Check if banner is uploaded
    if (!banner) {
      toast.error('Please upload a banner image');
      return;
    }

    //upload banner
    const bannerFormData = new FormData()
    bannerFormData.append('image', banner)

    const bannerResponse = await axios.post('http://localhost:3000/api/images', bannerFormData, {
      headers: { 'Content-Type': 'multipart/form-data'}
    })

    const bannerUrl = bannerResponse.data.imageURL


    const blogData = {
      title: title,
      content: content,  
      banner: bannerUrl
    }

    console.log("Blog data", blogData);
    

    //save the blog
    const response = await axios.post("http://localhost:3000/api/blogs", blogData,{
      headers: {
        'Content-Type': 'application/json'}
    }) .then(response => {
      console.log("Blog created successfully:", response.data);
  })
  .catch(error => {
    console.error("Error publishing blog:", error.response ? error.response.data : error.message);
  });

    //redirect to home page
    window.location.href = "/"
  }catch (err) {
    console.error("Error publishing blog:", err);
  }
}


  return (
    <div className='editor-container p-4'>
      <input 
        type="text" 
        id='blog-title'
        placeholder='Blog Title'
        className='border text-4xl font-medium w-full h-20 outline-none resize-none mt-10 leading-tight placeholder:opacity-40 ' 
        />
       <hr  className='w-full opacity-10 my-5'/>
      
      {/* Blog banner upload*/}
      <div
       className='w-full h-64 border rounded  flex items-center justify-center cursor-pointer bg-grey-100 mb-7'
       onClick={() => document.getElementById('banner-input').click()}> 

       {bannerPreview ? (
        <img 
          src={bannerPreview} 
          alt="Banner Preview"
          className='w-full h-full object-cover rounded' />

       ) : (
            <p className='text-grey-500'>Click to Upload a banner</p>
       ) }
      </div>
      <input 
        type="file"
        id='banner-input'
        accept='image/*'
        style={{display: 'none'}}
        onChange={handleBannerupload} />

      {/* Blog Editor */}
      <div id='editorjs' className='border mr-100 p-4 rounded  font-gelasio bg-white '>     </div>
      <button
        onClick={handlePublish}
        className='mt-4 bg-black text-white px-4 py-2 rounded hover:bg-opacity-75'>
          publish Blog
      </button>

    </div>
  )

}
export default Editor