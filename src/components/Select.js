import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import anime from "animejs/lib/anime.es.js"

const Select = (props) => {

    const navigate = useNavigate()

    function wait(ms) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            navigate('/jukebox')
            resolve(ms)
          }, ms )
        })
      }

    async function changeAlbum(title) {
        let temp = title.split(' ')
        let searchTitle = temp.join('%20')
        const data = await axios.get(`https://api.spotify.com/v1/search?q=${searchTitle}&type=album&limit=1`, {
            headers: {
                Authorization: `Bearer ${process.env.SPOTIFY_KEY}`
            }
        })
        const albumID = data.data.albums.items[0].id
        const songlist = await axios.get(`https://api.spotify.com/v1/albums/${albumID}/tracks`, {
            headers: {
                Authorization: `Bearer ${process.env.SPOTIFY_KEY}`
            }
        })
        props.setSongs(songlist.data.items)
        props.setAlbum(data.data.albums.items[0].images[0].url)
        anime({
            targets: '#select-container',
            opacity: 0,
            duration: 1000,
            easing: 'linear'
        })
        wait(1000)
    }

    return (
        <>
        <div id="select-container">
            <h1 className="title">Choose an album</h1>
            <div id="album-list">
            {props.albums?.map((album)=>
                <div value={album.name} onClick={()=>{changeAlbum(album.name)}} key={album.id} className="album-container">
                    <img src={album.img}></img>
                    <p>{album.name}</p>
                    <p>by {album.artist}</p>
                </div>
            )}
            </div>
        </div>
        </>
    )
}

export default Select