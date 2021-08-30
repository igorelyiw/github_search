import React from 'react'
import preloader from './assets/preloader.svg'
interface Props{
  size:number
}
const Preloader = (props:Props) => {
  const{size}=props
  return (
    <>
    <img src={preloader} style={{height:size}} />
    </>
  )
}

export default Preloader
