import React from "react";
import anime from "animejs/lib/anime.es.js"

const Jukebox = (props) => {

    const [index, setIndex] = React.useState('')
    const [playing, setPlaying] = React.useState(false)

    React.useEffect(()=>{
        const audios = document.getElementsByTagName('audio')
        for (const audio of audios) {
            audio.volume = 0.1
        }
    },[])

    function wait(ms, num) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            setIndex(num)
            resolve(ms)
          }, ms )
        })
      }

    function changeSong() {
        anime({
            targets: "#coin",
            translateX: [
                {value: '15vw', duration: 400},
                {value: 0, delay: 400, duration: 100}
            ],
            easing: 'easeOutCubic',
            opacity: [
                {value: '0', duration: 100, delay: 300},
                {value: '1', delay: 400, duration: 100}
            ]
        })
        anime({
            targets: '.songs-list',
            translateY:[
                {value: '10vh', duration: 300},
                {value: 0, delay: 1000, duration: 300}
            ],
            easing: 'easeOutCubic',
            scale: [
                {value: 0.2, duration: 300},
                {value: 1, delay: 1000, duration: 300}
            ]
        })
        
        let num = Math.floor(Math.random()*props.songs.length)
        while (num == index) {
            num = Math.floor(Math.random()*props.songs.length)
        }
        wait(600, num)
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
                <div id="space-break" className={'song-container ' + (index === '' ? 'active' : 'hidden')}>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                </div>
            </div>
            <img id="jukebox" src="/jukebox.png"></img>
            <img onClick={changeSong} id="coin" src='/coin.png'></img>
        </div>
        </>
    )
}

export default Jukebox