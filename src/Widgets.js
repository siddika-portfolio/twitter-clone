import React from 'react';
import './Widgets.css';
import {TwitterTimelineEmbed, TwitterShareButton, TwitterTweetEmbed } from "react-twitter-embed";
import SearchIcon from '@material-ui/icons/Search';

 function Widgets() {
    
    return (
        <div className="Widgets">
            <div className="widgets__input">
                <SearchIcon className="Widgets__searchIcon"/>
                <input placeholder="Search Twitter" type="text"/>
            </div>
            <div className="widgets__widgetContainer">
            <h2>what's happening</h2>
            <TwitterTweetEmbed tweetId="1334399619191590914"/>
            <TwitterTimelineEmbed
                sourceType="profile"
                screenName="siddika"
                option={{height: 400}}
            />
            <TwitterShareButton
            url={"https://www.facebook.com/siddika.akhter.3720/"}
            options={{ text: "#reactjs is awesome", via: "cleverqazi" }}
            />
            </div>
        </div>
    )
}

export default Widgets;