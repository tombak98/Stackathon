import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { db } from "./firebase-config";
import { collection, getDocs, doc, setDoc } from "firebase/firestore";
import axios from "axios";
import Select from "./components/Select";
import Jukebox from "./components/Jukebox";

function Seed() {
  const albumsCollectionRef = collection(db, "albums");

  React.useEffect(() => {

    async function seed() {
        const albums = ['Frederhythm', 'Frederhythm2', 'Frederhythm3']
        let albumIDs = []
        for (let i = 0; i> albums.length; i++) {
        const data = await axios.get(
        `https://api.spotify.com/v1/search?q=${albums[i]}&type=album&limit=1`,
        {
          headers: {
            Authorization:
              "Bearer BQD5tEKaNQxErlLtkqcMYPMuVhBv7IudNmJYopclzrFUl8zrOs3yuFtnwT1o6LV1xQo7MMFUgKWSx3MTaGegZZANVT2dKvKUN9B9TCneRCO78EQ6ohqJ983sjXhxWkrvywv5pFLzH_MYFat1J7ZRX0n5tHPOOX-CbJWyKeFnQlkbED3jlxoYZBn6HNnFeM5TIAU",
          },
        }
      )
      albumIDs.push(data.albums.items[0].id)
      await setDoc(doc(db, 'test', albums[i]), {
        name: albums[i],
        artist: data.albums.items[0].artists[0].name
      })
    }
      
    //   const songlist = await axios.get(
    //     `https://api.spotify.com/v1/albums/${albumID}/tracks`,
    //     {
    //       headers: {
    //         Authorization:
    //           "Bearer BQCnYvpPjiaD6OTjzsYmGDN1plBZPX2it8xcGA6y6wtP-msrgrP79MSpwubpW79VtfOM4HKIdiR17YZIx5Ak55IT-DGFO31YvGUOlqZ_Jdvv57bZUsXzdJVA73KGKPq_4jHE60-r_A9EgPQWNvpD5mfNU_Lktf2fZj7c2YDQMgoO7PFd-vqeBXyMpE_zukCzbPc",
    //       },
    //     }
    //   );
    //   songlist.forEach((song)=>{

    //   })
    }
    seed();
  }, []);

  const testCollectionRef = collection(db, "test");

  async function searchFunc() {
    const data = await axios.get(
      "https://api.spotify.com/v1/search?q=Frederhythm2&type=album&limit=1",
      {
        headers: {
          Authorization:
            "Bearer BQCnYvpPjiaD6OTjzsYmGDN1plBZPX2it8xcGA6y6wtP-msrgrP79MSpwubpW79VtfOM4HKIdiR17YZIx5Ak55IT-DGFO31YvGUOlqZ_Jdvv57bZUsXzdJVA73KGKPq_4jHE60-r_A9EgPQWNvpD5mfNU_Lktf2fZj7c2YDQMgoO7PFd-vqeBXyMpE_zukCzbPc",
        },
      }
    );
    const albumID = data.data.albums.items[0].id;
    const songlist = await axios.get(
      `https://api.spotify.com/v1/albums/${albumID}/tracks`,
      {
        headers: {
          Authorization:
            "Bearer BQCnYvpPjiaD6OTjzsYmGDN1plBZPX2it8xcGA6y6wtP-msrgrP79MSpwubpW79VtfOM4HKIdiR17YZIx5Ak55IT-DGFO31YvGUOlqZ_Jdvv57bZUsXzdJVA73KGKPq_4jHE60-r_A9EgPQWNvpD5mfNU_Lktf2fZj7c2YDQMgoO7PFd-vqeBXyMpE_zukCzbPc",
        },
      }
    );
    return songlist.data.items[3].preview_url;
  }

  return <></>;
}

export default Seed;
