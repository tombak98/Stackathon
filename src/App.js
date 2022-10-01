import React from "react";
import {Link, Routes, Route} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {db} from './firebase-config'
import {collection, getDocs, doc} from 'firebase/firestore'
import axios from "axios";
import Select from "./components/Select";
import Jukebox from "./components/Jukebox";

function App(){

    const [albums, setAlbums] = React.useState([])
    const [album, setAlbum] = React.useState('')
    const [songs, setSongs] = React.useState([])
    const [audio, setAudio] = React.useState('')
    const [title, setTitle] = React.useState("")
    const albumsCollectionRef = collection(db, "albums")

    React.useEffect(()=>{
        const getAlbums = async () => {
            const data = await getDocs(albumsCollectionRef)
            setAlbums(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
        }

        getAlbums()
    },[])

    async function searchFunc() {
        const data = await axios.get('https://api.spotify.com/v1/search?q=Frederhythm2&type=album&limit=1', {
            headers: {
                Authorization: "Bearer BQCnYvpPjiaD6OTjzsYmGDN1plBZPX2it8xcGA6y6wtP-msrgrP79MSpwubpW79VtfOM4HKIdiR17YZIx5Ak55IT-DGFO31YvGUOlqZ_Jdvv57bZUsXzdJVA73KGKPq_4jHE60-r_A9EgPQWNvpD5mfNU_Lktf2fZj7c2YDQMgoO7PFd-vqeBXyMpE_zukCzbPc"
            }
        })
        // console.log(data.data)
        const albumID = data.data.albums.items[0].id
        const songlist = await axios.get(`https://api.spotify.com/v1/albums/${albumID}/tracks`, {
            headers: {
                Authorization: "Bearer BQCnYvpPjiaD6OTjzsYmGDN1plBZPX2it8xcGA6y6wtP-msrgrP79MSpwubpW79VtfOM4HKIdiR17YZIx5Ak55IT-DGFO31YvGUOlqZ_Jdvv57bZUsXzdJVA73KGKPq_4jHE60-r_A9EgPQWNvpD5mfNU_Lktf2fZj7c2YDQMgoO7PFd-vqeBXyMpE_zukCzbPc"
            }
        })
        // console.log(songlist)
        // setSongs(songlist)
        // console.log(songlist.data.items[0].preview_url)
        // setAudio(songlist.data.items[0].preview_url)
        return songlist.data.items[3].preview_url
    }

    return(
        <>
        <Routes>
            <Route index element={<Select albums={albums} setSongs={setSongs} setAlbum={setAlbum}/>}/>
            <Route path="/jukebox" element={<Jukebox songs={songs} album={album}/>}/>
        </Routes>
        {audio !== '' ? <audio controls>
            <source src={audio}/>
        </audio> : <div></div>}
        </>

    )
}

export default App;