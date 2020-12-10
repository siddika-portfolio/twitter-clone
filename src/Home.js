import React from 'react';
import Feed from './Feed';
import Sidebar from './Sidebar';
import Widgets from './Widgets';

export function Home() {


    return (
        <div className="app">


            <Sidebar />


            <Feed />


            <Widgets />

        </div>
    )
}
