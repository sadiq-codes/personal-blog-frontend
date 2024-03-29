import React from 'react'
import { Link } from 'react-router-dom'
import Fetch from '../hooks/Fetch'
import Button from './Button'
import { getText } from '../services/services'
import { useFeaturedArticleData } from '../hooks/FetchData'
import { FeaturedPostSkeleton } from './Skeleton'



const FeaturedPost = ({ post: {slug, title, body_html, image } }) => {
  return (
 
    <div className='max-h-96 sm:my-5 rounded-lg bg-cover bg-no-repeat bg-center flex drop-shadow-xl drop-shadow-gray-300 bg-gradient-to-t from-black/75 via-black/0' style={{'backgroundImage': `url(${image})`}}>

        <div className='flex flex-col gap-4 p-4 sm:basis-1/2 justify-between'>
          <div className='w-full'>
          <h1 className=' text-2xl sm:text-4xl text-white tracking-wide font-bold leading-6 my-10 drop-shadow-lg truncate-featured'>{title}</h1>
        <p className='text-slate-300 text-xs sm:text-sm leading-4 drop-shadow-lg truncate-line-clamp '>{getText(body_html)}</p>
          </div>
         <div>
        <Link to={`/posts/detail/${slug}`}><Button text='Read Now' bgColor='' textColor='white' textSize='md' /></Link>
       </div>
        </div>
        <div>
        </div>
    </div>
  )
}


const Featured = () => {
  const {isLoading, data, error, isError} = useFeaturedArticleData()

  if (isLoading){
    return <FeaturedPostSkeleton/>
  }

  if (isError) {
    return <div>{error.message}</div>
  }

  return (
      <FeaturedPost post={data?.data}/> 
  )
}

export default Featured