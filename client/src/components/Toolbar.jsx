import React from 'react';
import '../styles/Toolbar.scss';

const Toolbar = () => {
    return (
        <div className={'toolbar'} >
            <div className='buttons brush'/>
            <div className='buttons rect'/>
            <div className='buttons circle'/>
            <div className='buttons eraser'/>
            <div className='buttons line'/>
            <div className='buttons redo'/>
            <div className='buttons undo'/>
            <div className='buttons save'/>
        </div>
    );
};

export default Toolbar;