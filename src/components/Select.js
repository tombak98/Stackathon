import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Select = (props) => {

    const navigate = useNavigate()

    async function changeAlbum(title) {
        const data = await axios.get(`https://api.spotify.com/v1/search?q=${title}&type=album&limit=1`, {
            headers: {
                Authorization: "Bearer BQD5tEKaNQxErlLtkqcMYPMuVhBv7IudNmJYopclzrFUl8zrOs3yuFtnwT1o6LV1xQo7MMFUgKWSx3MTaGegZZANVT2dKvKUN9B9TCneRCO78EQ6ohqJ983sjXhxWkrvywv5pFLzH_MYFat1J7ZRX0n5tHPOOX-CbJWyKeFnQlkbED3jlxoYZBn6HNnFeM5TIAU"
            }
        })
        const albumID = data.data.albums.items[0].id
        const songlist = await axios.get(`https://api.spotify.com/v1/albums/${albumID}/tracks`, {
            headers: {
                Authorization: "Bearer BQD5tEKaNQxErlLtkqcMYPMuVhBv7IudNmJYopclzrFUl8zrOs3yuFtnwT1o6LV1xQo7MMFUgKWSx3MTaGegZZANVT2dKvKUN9B9TCneRCO78EQ6ohqJ983sjXhxWkrvywv5pFLzH_MYFat1J7ZRX0n5tHPOOX-CbJWyKeFnQlkbED3jlxoYZBn6HNnFeM5TIAU"
            }
        })
        props.setSongs(songlist.data.items)
        props.setAlbum(data.data.albums.items[0].images[0].url)
        navigate('/jukebox')
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