import React from 'react'; 
import '../styles/backdrop.css'

const BackDrop = props =>(
    <div className='backdrop' onClick={props.toggleBackDrop}/>
)
export default BackDrop