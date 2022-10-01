import React from "react";

const Jukebox = (props) => {

    const [index, setIndex] = React.useState(0)
    const [playing, setPlaying] = React.useState(false)

    React.useEffect(()=>{
        const audios = document.getElementsByTagName('audio')
        for (const audio of audios) {
            audio.volume = 0.1
        }
    },[])

    function changeSong() {
        let num = Math.floor(Math.random()*props.songs.length)
        while (num == index) {
            num = Math.floor(Math.random()*props.songs.length)
        }
        setIndex(num)
        const audios = document.getElementsByTagName('audio')
        for (const audio of audios) {
            audio.pause()
            audio.load()
            setPlaying(false)
        }
    }

    function playSong(event) {
        event.preventDefault()
        const name = event.target.getAttribute('value')
        const audio = document.getElementById(name)
        console.log(audio)
        if (playing) {
            setPlaying(false)
            audio.pause()
        } else {
            setPlaying(true)
            audio.play()
        }
    }

    return (
        <>
        <div id="jukebox-container">
            <img id="album-cover" src={props.album}></img>
            <div className='songs-list'>
                {props.songs.map((song, idx) => 
                <div className={`song-container `+ (idx===index ? 'active' : 'hidden')} key={song.id}>
                    <p>{song.name}</p>
                    <div onClick={playSong} value={song.name} className={playing ? 'fa fa-pause-circle' : 'fa fa-play-circle'}>
                        <audio id={song.name} preload="auto">
                            <source src={song.preview_url}/>
                        </audio>
                    </div>
                </div>
                )}
            </div>
            <img src="/jukebox.png"></img>
            <button onClick={changeSong}>Change Song</button>
        </div>
        </>
    )
}

export default Jukebox