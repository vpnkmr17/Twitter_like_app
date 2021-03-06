import React,{useEffect,useState} from 'react'

import {apiTweetList} from './lookup'

import {Tweet} from './detail'


export function TweetList(props){
    const [tweetinit,setTweetInit]=useState([])
    const [tweets,setTweets]=useState([])
    const [nextUrl,setNextUrl]=useState(null)
    const [tweetDidSet,setTweetDidSet]=useState(false)
    //setTweetInit(props.new_tweet.concat(tweetinit))
    
    

    useEffect(()=>{
      //console.log("Second one call hua ")
      const final=[...props.newTweets].concat(tweetinit)
      if (final.length!==tweets.length){
        setTweets(final)
      }
    },[props.newTweets,tweets,tweetinit])

    useEffect(()=>{
        //console.log("First one call hua ")
         if (tweetDidSet===false){
           const callback=(response,status)=>{
             if (status===200){
             setNextUrl(response.next)
             setTweetInit(response.results)
             setTweetDidSet(true)
             }
           }
       
           apiTweetList(props.username,callback)
       }
         
       },[tweetinit,props.username,tweetDidSet])
  
       const handleLoadNext = (event) => {
        event.preventDefault()
        if (nextUrl !== null) {
          const handleLoadNextResponse = (response, status) =>{
            if (status === 200){
              setNextUrl(response.next)
              const newTweets = [...tweets].concat(response.results)
              setTweetInit(newTweets)
              setTweets(newTweets)
            } else {
              alert("There was an error")
            }
          }
          apiTweetList(props.username, handleLoadNextResponse, nextUrl)
        }
      }


    const handleDidRetweet = (newTweet) => {
     console.log("DidhandleTweet hai kya?")
      const updateTweetsInit = [...tweetinit]
      updateTweetsInit.unshift(newTweet)
      setTweetInit(updateTweetsInit)
      const updateFinalTweets = [...tweets]
      updateFinalTweets.unshift(tweets)
      setTweets(updateFinalTweets)
    }
  
    return <React.Fragment>{tweets.map((item,index)=>{
      return <Tweet didRetweet={handleDidRetweet} tweet={item} className="my-5 py-5 border bg-white text-dark" key={`${index}-{item.id}`} />
     })}

     { nextUrl!=null && <button onClick={handleLoadNext} className="btn btn-outline-primary">Load next </button>}

    </React.Fragment>
  
  }
