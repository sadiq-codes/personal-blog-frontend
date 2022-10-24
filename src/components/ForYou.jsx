import React, { useEffect, useState } from 'react'
import Button from './Button'
import {RiHeartLine} from 'react-icons/ri'
import {FaRegComments} from 'react-icons/fa'
import {MdDateRange} from 'react-icons/md'
import Fetch from '../hooks/Fetch'
import H1 from './H1'
import ToDate from './ToDate'
import { Link } from 'react-router-dom'
import Pagination from './Pagination'
import {ImageUrl} from './ImageUrl'
import {getText} from '../services/GetText'
import {minutesRead} from '../services/MinutesRead'




 export const ForYouPost = ({ post: { author, title , created_on, body_html, comments_count, likes_count, slug, image } }) => {


  return (
    <div className='shadow-md flex sm:flex-col rounded-lg dark:bg-gray-800 '>
       <Link to={`/post/detail/${slug}`}>
        <div className='w-28 h-full sm:h-40 sm:w-full rounded-lg bg-center bg-no-repeat bg-cover transition-all hover:scale-105 hover:translate-y-1 ' style={{'backgroundImage': `url(${ImageUrl}${image})`}}>
        </div>
        </Link>
      <div className='flex flex-col my-5 gap-2 px-2 w-full'>
        <div className='flex flex-col gap-2'>
         <Link to={`/post/detail/${slug}`} > <h2 className='font-bold text-gray-900 hover:text-cyan-700 hover:underline truncate-line-clamp dark:text-white' >{title}</h2></Link> 
         <p className='text-sm leading-4 text-gray-700 max-w-[200px] sm:max-w-full truncate-line-clamp dark:text-gray-400'>{getText(body_html)}</p>
        </div>
        <div className='flex items sm:items-center justify-between sm:gap-2 mt-3 md:flex-row md:gap-0'>
            <div className='flex items-center gap-1 text-gray-500 text-[8px] sm:text-[10px] dark:text-gray-100'>
            <img className='w-10 hover:scale-105 border' src='../assets/profile-pic-4.png' alt="" />
            <div className='flex flex-col gap-1'>
                <div className='flex items-center gap-1'>
                <p>by <span className='font-bold text-gray-900 dark:text-gray-200'>{author}</span></p>-
                 <p>{`${minutesRead(body_html)} min read`}</p>
                </div>  
                <div className='text-[8px] sm:text-[8px] flex items-center gap-1'><span><MdDateRange/></span><ToDate date={created_on} /></div>
                </div>
            </div>
            <div className='flex items-center gap-2 text-[10px] sm:text-xs dark:text-gray-100'>
                <p className='flex items-center gap-2 hover:text-red-500'>
                <RiHeartLine />
                <span className=''>{likes_count}</span>

                </p>
                <p className='flex items-center gap-2 hover:text-cyan-500'>
                <FaRegComments />
                <span className=''>{comments_count}</span>
                </p>
            </div>
        </div>
    </div>

</div>
  )
}


const ForYou = () => {
    let topics = ['Javascript', 'React', 'Django', 'Python', 'SQL', 'Postgres' ]
    const [tags, setTags] = useState([])

    // useEffect(() => {
    //   const getTags  = async () => {

    //     const res  = await fetch("", {

        
    //     }).then(data => data.json()
    //     ).then(setTags)
    //     .catch(error => console.log(error))

    //   }
    //   getTags()
    // }, [])

  return (
    <div className='my-10'>
        <div className=''>
       <H1 text='Topic Match For You' />
        <div className='flex items-center flex-wrap gap-4'>
            {topics.map(topic => (
              <Link to={`/posts/tag/${topic.toLowerCase()}`}><Button key={topic} text={topic} textColor='gray' textSize='sm'/></Link>
            ))}    
        </div>
        <div>

     
       
        <Fetch
            url="posts/list"
            renderSuccess={({ data: { posts } }) => (
            <>
             <div className='grid grid-cols-1 lg:grid-cols-2  gap-4 sm:gap-6 my-5 w-full'>
            {posts.map(post => (
    
            <ForYouPost key={post.title} post={post} />
           
            ))}
             </div>
             {posts && (<div className=' text-center my-10'>
            <Pagination />

          </div>
          )
          }
            </>
            )}
            />
                        

        </div>
        </div>

    </div>
  )
}

export default ForYou