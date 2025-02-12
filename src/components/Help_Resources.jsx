import { Bug, Lightbulb } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'
import { Separator } from './ui/separator'

const Help_Resources = () => {
  const data = [
    { title: 'Report a Bug', icon: <Bug />, link: 'mailto:codingwithbilal.pro@gmail.com?subject=LeetGenius%20Bug%20Report&body=Describe%20the%20bug%20here...' },
    { title: 'Suggest a Feature', icon: <Lightbulb />, link: 'mailto:codingwithbilal.pro@gmail.com?subject=LeetGenius%Feature%20Suggestion&body=Describe%your%20Suggestion%20here...' },
  ]
  return (
    <>
      <div>
        <h4 className='my-2 font-montserrat font-medium'>Help & Resources</h4>
        <div className='flex flex-row justify-center items-center gap-3'>
          {data.map((items, key) =>
            <a href={items.link}
              className='flex flex-col justify-center items-center gap-2'
              target="_blank" key={key} rel="noopener noreferrer">
              <Button>
                {items.icon}
                <Separator orientation="vertical" />
                <p>{items.title}</p>
              </Button>
            </a>)}
        </div>
      </div>
    </>
  )
}

export default Help_Resources
