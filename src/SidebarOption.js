import React from 'react';
import './SidebarOption.css';

export function SidebarOption({active, text, Icon }) {


    return (
        <div className={`SidebarOption ${active && "sidebarOption--active"}`}>
            <Icon/>
            <h2>{text}</h2>

        </div>
    )
}
