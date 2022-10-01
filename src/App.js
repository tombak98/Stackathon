import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { db } from "./firebase-config";
import { collection, getDocs, doc, addDoc } from "firebase/firestore";
import axios from "axios";
import Select from "./components/Select";
import Jukebox from "./components/Jukebox";

function App() {
  const [albums, setAlbums] = React.useState([]);
  const [album, setAlbum] = React.useState("");
  const [albumName, setAlbumName] = React.useState('');
  const [songs, setSongs] = React.useState([]);
  const [audio, setAudio] = React.useState("");
  const [artist, setArtist] = React.useState("");
  const [render, setRender] = React.useState(true)
  const albumsCollectionRef = collection(db, "albums")

  const getAlbums = async () => {
    const data = await getDocs(albumsCollectionRef);
    setAlbums(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  React.useEffect(() => {
    getAlbums();
  }, []);

  React.useEffect(()=> {
    getAlbums();
  }, [render])

  async function searchFunc() {
    const data = await axios.get(
      "https://api.spotify.com/v1/search?q=Frederhythm2&type=album&limit=1",
      {
        headers: {
          Authorization: `Bearer ${process.env.SPOTIFY_KEY}`,
        },
      }
    );
    // console.log(data.data)
    const albumID = data.data.albums.items[0].id;
    const songlist = await axios.get(
      `https://api.spotify.com/v1/albums/${albumID}/tracks`,
      {
        headers: {
          Authorization: `Bearer ${process.env.SPOTIFY_KEY}`,
        },
      }
    );
    // console.log(songlist)
    // setSongs(songlist)
    // console.log(songlist.data.items[0].preview_url)
    // setAudio(songlist.data.items[0].preview_url)
    return songlist.data.items[3].preview_url;
  }

  return (
    <>
      <Routes>
        <Route
          index
          element={
            <Select albums={albums} setSongs={setSongs} setAlbum={setAlbum} setAlbumName={setAlbumName} setArtist={setArtist} setRender={setRender} render={render}/>
          }
        />
        <Route
          path="/jukebox"
          element={<Jukebox songs={songs} album={album} albumName={albumName} artist={artist}/>}
        />
      </Routes>
      {audio !== "" ? (
        <audio controls>
          <source src={audio} />
        </audio>
      ) : (
        <div></div>
      )}
    </>
  );
}

export default App;
