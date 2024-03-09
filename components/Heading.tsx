import React from 'react'

interface HeadingProps{
    title:string;
    description:string;
}

const Heading:React.FC<HeadingProps> = ({title,description}) => {
  return (
    <div>
        <div className='lg:text-3xl text-xl font-bold'>
            {title}
        </div>
        <div className='text-muted-foreground text-sm'>
            {description}
        </div>
    </div>
  )
}

export default Heading