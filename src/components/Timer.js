import React, { Component } from 'react'

export class Timer extends Component {

  startTimer = () => {
    let sec = 0;
    this.timerCount = setInterval(() => {
      sec++;
      this.props.onTimeChange(sec);
      if (sec > 998) clearInterval(this.timerCount);
    }, 1000);
  }

  stopTimer = () => {
    clearInterval(this.timerCount);
  }

  render() {
    return (
        <div id="timer"><svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 559.98 559.98"  fill="#fff" width="30px"><g><path d="M279.99,0C125.601,0,0,125.601,0,279.99c0,154.39,125.601,279.99,279.99,279.99c154.39,0,279.99-125.601,279.99-279.99    C559.98,125.601,434.38,0,279.99,0z M279.99,498.78c-120.644,0-218.79-98.146-218.79-218.79    c0-120.638,98.146-218.79,218.79-218.79s218.79,98.152,218.79,218.79C498.78,400.634,400.634,498.78,279.99,498.78z"/><path d="M304.226,280.326V162.976c0-13.103-10.618-23.721-23.716-23.721c-13.102,0-23.721,10.618-23.721,23.721v124.928    c0,0.373,0.092,0.723,0.11,1.096c-0.312,6.45,1.91,12.999,6.836,17.926l88.343,88.336c9.266,9.266,24.284,9.266,33.543,0    c9.26-9.266,9.266-24.284,0-33.544L304.226,280.326z"/></g></svg><span className="counter">{("00" + this.props.timeDisplay).slice(-3)}</span></div>
    )
  }
}

export default Timer

