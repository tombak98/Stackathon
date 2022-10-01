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
  const [songs, setSongs] = React.useState([]);
  const [audio, setAudio] = React.useState("");
  const [title, setTitle] = React.useState("");
  const albumsCollectionRef = collection(db, "albums")

  React.useEffect(() => {
    const getAlbums = async () => {
      // await addDoc(albumsCollectionRef, {artist: 'ATLAS', img:'https://i.scdn.co/image/ab67616d0000b2732a061f8cc383443cbb46adf6', name: "PERSONA5 ORIGINAL SOUNDTRACK"})
      const data = await getDocs(albumsCollectionRef);
      setAlbums(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getAlbums();
  }, []);

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
            <Select albums={albums} setSongs={setSongs} setAlbum={setAlbum} />
          }
        />
        <Route
          path="/jukebox"
          element={<Jukebox songs={songs} album={album} />}
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
