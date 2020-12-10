import { Avatar, Button } from '@material-ui/core';
import React, { useState } from 'react';
import "./TweetBox.css";
import db from './firebase';


function TweetBox() {
    const [tweetMessage, setTweetMessage] = useState("");
    const [tweetImage, setTweetImage] = useState("");
    const sendTweet = e => {
        e.preventDefault();

        db.collection("posts").add({
            displayName: "Siddika Akhter",
            username: "SiddikaAkhter1",
            verified: true,
            text: tweetMessage,
            image: tweetImage,
            avatar: "https://scontent.fdac14-1.fna.fbcdn.net/v/t1.0-9/123072084_358626925410612_7380517860240740234_o.jpg?_nc_cat=101&ccb=2&_nc_sid=09cbfe&_nc_ohc=XZJM2-mCT7AAX-gd8O-&_nc_ht=scontent.fdac14-1.fna&oh=b3c5199c8f3ad828352d590dd8fba8ff&oe=5FEC5CBA"
        })

        setTweetMessage("");
        setTweetImage("");
    }

    return (
        <div className="tweetBox">
            <form>
                <div className="tweetBox__input">
                    <Avatar alt="Remy Sharp" src="https://scontent.fdac14-1.fna.fbcdn.net/v/t1.0-9/123072084_358626925410612_7380517860240740234_o.jpg?_nc_cat=101&ccb=2&_nc_sid=09cbfe&_nc_ohc=XZJM2-mCT7AAX-gd8O-&_nc_ht=scontent.fdac14-1.fna&oh=b3c5199c8f3ad828352d590dd8fba8ff&oe=5FEC5CBA" />
                    <input
                        onChange={(e) => setTweetMessage(e.target.value)}
                        value={tweetMessage}
                        placeholder="What's happening" type="text" />
                </div>
                <input className="tweetBox__imageInput"
                    value={tweetImage}
                    onChange={(e) => setTweetImage(e.target.value)}
                    placeholder="Enter image URL" type="text" />

                <Button onClick={sendTweet} className="tweetBox__tweetButton">Tweet</Button>
            </form>
        </div>
    )
}

export default TweetBox;
