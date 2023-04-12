import React from 'react';
import toolState from "../store/toolState";

const SettingsBar = () => {
    return (
        <div className='toolbar' style={{marginTop: 50}}>
            <div className={'bar'}>
                <div className={'title'}>Line thickness</div>
                <input type={'number'} min={1} max={25} defaultValue={1}
                       onChange={e => toolState.setThickness(e.target.value)}
                />

                <div className={'title'}>Line color</div>
                <input type={'color'}  onChange={(e) =>
                    toolState.setColor(e.target.value)}/>
            </div>

        </div>
    );
};

export default SettingsBar;