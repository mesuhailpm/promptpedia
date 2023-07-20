'use client'
import React from 'react'
import {MagnifyingGlass, InfinitySpin, Oval, Comment} from 'react-loader-spinner'

const Loading = ({type,width, color, secondaryColor}) => {

    const defaultLoading = () =>{
        return (<>Wait, we are Loading...</>)
    }

    let Component;

    switch (type) {
        case 'MagnifyingGlass':
            Component = MagnifyingGlass
            break;
        case 'InfinitySpin':
            Component = InfinitySpin;
            break;
        case 'Oval':
            Component = Oval;
            break;
        case 'Comment':
            Component = Comment;
            break;
    
        default:
            Component = defaultLoading;
            break;

    }
    
    return Component ? <Component 
                            width = {width && width} 
                            color={color && color} 
                            secondaryColor = { secondaryColor && secondaryColor }
                        /> 
                    : null
}

export default Loading