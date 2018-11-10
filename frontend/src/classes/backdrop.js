import React from 'react'; 
import '../styles/backdrop.css'

//component that is used to dim screen
const BackDrop = props =>(
    <div className='backdrop' onClick={props.toggleBackDrop}/>
)
export default BackDrop