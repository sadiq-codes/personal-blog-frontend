import React from 'react'
import Fetch from '../hooks/Fetch';
import { MdDateRange } from 'react-icons/md';
import {RiHeartLine} from 'react-icons/ri'
import {FaRegComments} from 'react-icons/fa'
import {H1, Button, Pagination } from '../components'
import { Link } from 'react-router-dom';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import ToDate from '../components/ToDate';
import { ImageUrl } from '../components/ImageUrl';
import MDEditor from '@uiw/react-md-editor';



const PostListData = ({ post }) => {
  
  let { tagSlug } = useParams()
  console.log(tagSlug)
  return (
    <div className='min-h-56 my-4 sm:my-6 shadow-md shadow-gray-200'>
    <div className='flex flex-col gap-6 rounded-lg h-full '>
      <div className='flex flex-col sm:flex-row gap-2 h-full'>
          <div className='flex-none h-44 w-auto sm:h-auto sm:w-48 relative'>
            <Link to={`/post/detail/${post.slug}`}><img className='inset-0 absolute w-full h-full object-cover transition-all hover:scale-105' src={`${ImageUrl}${post.image}`} alt="post image" loading='lazy' /></Link>
          </div>
          <div className='flex-auto p-2'>
              <div className='flex flex-col gap-2 h-full items-start justify-between'>
                <div className='flex flex-col gap-2'>
                  <div className='flex items-center gap-1 text-gray-500 text-xs'>
                      <img className='w-10 sm:w-12 transition-all duration-150 hover:scale-105' src="https://avatars.githubusercontent.com/u/68012668?v=4" alt="" />
                      <p>by <span className='font-bold text-gray-900'>{post.author}</span></p>-
                      <p>5 min read</p>
               </div>
               <div className='flex flex-col gap-2'>
               <Link to={`/post/detail/${post.slug}`}> <h2 className='font-bold sm:text-xl text-slate-900 hover:text-cyan-700 hover:underline capitalize cursor-pointer'>{post.title}</h2></Link>
                  <p className='text-slate-700 text-xs sm:text-sm leading-4 truncate-featured'>{post.body}</p>
                  {/* <MDEditor.Markdown source={post.body} style={{ padding: "14px" }} /> */}
              </div>
              </div>
              <div className='flex flex-col gap-2 w-full'>
              <div className='flex gap-2 flex-wrap'>
                {post.tags && post.tags.map((tag => (
                 <Link to={`/posts/tag/${tag.slug}`}><Button text={`#${tag.name}`} textSize='[10px]'/></Link>
                )))}
              </div>

              <div className='flex items-center text-gray-500 text-xs w-full justify-between'>

                <div className='flex items-center gap-1 hover:text-cyan-700'>
                <span><MdDateRange/></span><ToDate date={post.created_on}/>
                </div>

                <div className='flex items-center gap-2'>
                <p className='flex items-center gap-2 hover:text-red-500 '>
                <RiHeartLine />
                <span className='text-xs'>{post.likes_count}</span>

                </p>
                <p className='flex items-center gap-2 hover:text-cyan-500  '>
                <FaRegComments />
                <span className='text-xs'>{post.comments_count}</span>
                </p>
                </div>

                </div>


              </div>
            

              </div>
          </div>

      </div>

    </div>
  </div>

  )
}


const PostList = () => {
  
  let page = useLocation().search

  return (
      <div className='flex-auto min-h-screen sm:px-4 my-4'>
        <H1 text='All Posts'/>
      <Fetch
        url="posts/list"
        renderSuccess={({ data: { posts } }) => (
          <>
          {posts.map(post => (
          <PostListData key={post.id} post={post} />
          ))}
          
         {posts && (<div className='text-center my-10'>
            <Pagination page={page} />

          </div>
          )
          }
        </>
          )}
        />
      </div>
  )
}
export default PostList