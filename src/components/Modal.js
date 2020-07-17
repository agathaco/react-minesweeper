import React  from 'react'

const Modal = (props) => {

    let resultMessage;
    if (props.gameResult === 'won') {
      resultMessage = 'CONGRATULATIONS!'
    } else if (props.gameResult) {
      resultMessage =  'GAME OVER!'
    }

    return (
        <div>
        <div id="modal" className={props.show ? 'show' : ''}>
        <div id="result-box">
          <div id="result-top">
            <svg id="bomb" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 774.7 676.2">
              <path d="M427.4,144.2l40.7-41.8a23.1,23.1,0,0,1,32.5,0l72.8,72.8a23.1,23.1,0,0,1,0,32.5l-37.4,37.4" transform="translate(0 -11.6)" fill="#8b6af5" stroke="#39395b" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="17" className="bomb-stroke bomb-fill"/>
              <circle cx="291.1" cy="385.2" r="282.6" fill="#8b6af5" stroke="#39395b" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="17" className="bomb-stroke bomb-fill"/>
              <path d="M540.2,141.2l15.4-20.5c12.6-16.8,30.4-17.7,43.6-2.4l0.3,0.3c11.8,13.7,31.3,22.6,48.3,11.4,6.1-4,20.7-20.5,20.7-20.5" transform="translate(0 -11.6)" fill="none" stroke="#39395b" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="17" className="bomb-stroke"/>
              <line x1="701.7" y1="63.3" x2="742" y2="23.1" fill="none" stroke="#39395b" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="17" className="bomb-stroke"/>
              <line x1="713.2" y1="107.4" x2="766.2" y2="128.2" fill="none" stroke="#39395b" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="17" className="bomb-stroke"/>
              <line x1="654.5" y1="60.2" x2="630.8" y2="8.5" fill="none" stroke="#39395b" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="17" className="bomb-stroke"/>
              <path d="M82,396.8c0-118.4,95.9-214.3,214.3-214.3" transform="translate(0 -11.6)" fill="none" stroke="#fff" strokeLinecap="round" strokeMiterlimit="10" strokeOpacity="0.45" strokeWidth="17"/>
              <g id="happy-face" style={{display: props.gameResult === "won" ? 'block' : 'none'}}>
                <path d="M170.4,432.1a34.6,34.6,0,0,1,69.2,0" transform="translate(0 -11.6)" fill="none" stroke="#39395b" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="17" className="bomb-stroke"/>
                <path d="M342.5,432.1a34.6,34.6,0,0,1,69.2,0" transform="translate(0 -11.6)" fill="none" stroke="#39395b" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="17" className="bomb-stroke"/>
                <path d="M367,481.7c0,33.7-33.4,64.1-74.6,64.1s-74.6-30.3-74.6-64.1" transform="translate(0 -11.6)" fill="none" stroke="#39395b" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="17" className="bomb-stroke"/>
              </g>
              <g id="sad-face" style={{display: props.gameResult === "lost" ? 'block' : 'none'}}>
                <g>
                  <circle cx="377.1" cy="406" r="17.7" fill="#39395b" className="bomb-fill-dark"/>
                  <path d="M250,517.1c0-19.2,17.6-42.5,41.1-42.5s43.8,23.3,43.8,42.5" transform="translate(0 -11.6)" fill="none" stroke="#39395b" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="17" className="bomb-stroke"/>
                  <circle cx="205" cy="406" r="17.7" fill="#39395b" className="bomb-fill-dark"/>
                </g>
              </g>
            </svg>
            <h1 id="result-message">{resultMessage}</h1>
            <h2 className={`result-time ${props.gameResult === "won" ? "show" : ""}`}>Your time: <span className="time-display">{props.timeDisplay}</span> seconds</h2>
          </div>
          <div id="new-game" onClick={props.onReplay}>
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 512 512" fill="#fff" width="30">
              <g>
                <path d="M480.6,235.6c-11.3,0-20.4,9.1-20.4,20.4c0,112.6-91.6,204.2-204.2,204.2c-112.6,0-204.2-91.6-204.2-204.2   S143.4,51.8,256,51.8c61.5,0,118.5,27.1,157.1,73.7h-70.5c-11.3,0-20.4,9.1-20.4,20.4s9.1,20.4,20.4,20.4h114.6   c11.3,0,20.4-9.1,20.4-20.4V31.4c0-11.3-9.1-20.4-20.4-20.4s-20.4,9.1-20.4,20.4v59C390.7,40.1,325.8,11,256,11   C120.9,11,11,120.9,11,256c0,135.1,109.9,245,245,245s245-109.9,245-245C501,244.7,491.9,235.6,480.6,235.6z"/>
              </g>
            </svg>
            <h2>New Game</h2>
          </div>
        </div>
      </div>
        </div>
    )
}

export default Modal

