// TO DO
// 1. Add delay when revealing tiles and bombs
// 2. Fix bug when clicking on flag
// 3. Hide Modal before removing elements

import React, { Component } from "react";
import { Timer } from "./components/Timer";
import { Dropdown } from "./components/Dropdown";
import { Tile } from "./components/Tile";
import Modal from "./components/Modal";
import Utils from './utils'


import "./styles.scss";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      levels: [
        { id: 0,
          difficulty: "Easy",
          width: 10,
          bombs: 15,
        },
        { id: 1,
          difficulty: "Medium",
          width: 15,
          bombs: 30,
        },
        { id: 2,
          difficulty: "Hard",
          width: 18,
          bombs: 70,
        },
      ],
      tiles: [],
      isGameOver: false,
      gameResult: '',
      isTimerOn: false,
      isModalOpen: false,
      isContainerAnimated: false,
      timeDisplay: 0,
      mainColors: ["#8B6AF5","#74c2f9","#42dfbc","#f9dd5b","#FEAC5E","#ff5d9e","#F29FF5","#c154d8"],
      bgColors:["#b39ffd","#93c1fd","#8af1f8","#f9dd5b","#FEAC5E","#f87dae","#f6b8f8", "#f7efce"],
    }
    this.state.root = document.documentElement;
    this.state.selectedLevel = this.state.levels[0];
    this.state.flagsLeft = this.state.selectedLevel.bombs;
  }

  componentDidMount() {
    this.createBackground();
    this.createBoard();
  }

  getMainColor = () => {
    const randomColor = this.state.mainColors[Math.floor(Math.random() * this.state.mainColors.length)];
    this.state.root.style.setProperty("--main-color", randomColor);
    this.state.root.style.setProperty(
      "--dark-color",
      Utils.lightenDarkenColor(randomColor, -50)
    );
  }

  clearBoard = () => {
    console.clear();
    if (this.state.isTimerOn) this.refs.timer.stopTimer();
    this.setState({ timeDisplay: 0, isGameOver: false, tiles: [], gameResult: '',  isContainerAnimated: false, isTimerOn: false})
    this.createBoard();
  }

  createBoard = () => {
    this.getMainColor();
    const width = this.state.selectedLevel.width;
    const tileWidth = parseInt(
      getComputedStyle(this.state.root).getPropertyValue("--tile-width")
    );
    this.state.root.style.setProperty("--grid-width", width * tileWidth);

    const tiles = []
    for (let i = 0; i < width * width; i++) {
      tiles.push({ id: i, checked: false, hasBomb: false })
    }

    //add bombs
    const randomTiles = tiles.map(tile => tile.id).sort(() => Math.random() - 0.5).slice(0, this.state.selectedLevel.bombs)
    tiles.forEach((tile) => {
      if (randomTiles.includes(tile.id)) {
        tile.hasBomb = true
        tile.bgColor = this.state.bgColors[Math.floor(Math.random() * this.state.bgColors.length)];
      }
    })

    //add numbers
    for (let i = 0; i < tiles.length; i++) {
      let total = 0;
      const isLeftEdge = i % width === 0;
      const isRightEdge = i % width === width - 1;

      if (!tiles[i].hasBomb) {
        if (!isLeftEdge) {
          if (tiles[i - 1] && tiles[i - 1].hasBomb)
            total++;
          if (
            tiles[i - 1 + width] &&
            tiles[i - 1 + width].hasBomb
          )
            total++;
          if (
            tiles[i - 1 - width] &&
            tiles[i - 1 - width].hasBomb
          )
            total++;
        }

        if (!isRightEdge) {
          if (tiles[i + 1] && tiles[i + 1].hasBomb)
            total++;
          if (
            tiles[i + 1 + width] &&
            tiles[i + 1 + width].hasBomb
          )
            total++;
          if (
            tiles[i + 1 - width] &&
            tiles[i + 1 - width].hasBomb
          )
            total++;
        }

        if (tiles[i - width] && tiles[i - width].hasBomb) total++;
        if (tiles[i + width] && tiles[i + width].hasBomb) total++;
        tiles[i].neighborBombs = total;
      }
    }
    this.setState({ tiles, flagsLeft: this.state.selectedLevel.bombs })
  }

  handleTileClick = (e) => {
    const clickedTileId = parseInt(e.target.id);
    if (!this.state.isTimerOn) this.refs.timer.startTimer();
    this.setState({ isTimerOn: true})
    this.clickTile(clickedTileId)
  }

  // click on tile
  clickTile = (tileId) => {
    const currentTile = this.state.tiles.find(tile => tile.id === tileId)

    if (this.state.isGameOver) return null;
    if (currentTile.checked || currentTile.flag) {
      return null;
    }
    if (currentTile.hasBomb) {
      this.gameOver(currentTile);
    } else {
      let total = currentTile.neighborBombs ? currentTile.neighborBombs : 0;

      if (total !== 0) {
        currentTile.checked = true
        currentTile.color = this.state.mainColors[currentTile.neighborBombs - 1];
        return
      }
    }
    currentTile.checked = true
    this.checktile(tileId);
      const tiles = [...this.state.tiles]
      tiles.forEach(tile => {
        if (tile.id === tileId) tile.checked = true
      })
      this.setState({tiles})
  }

  //check neighboring tiles once tile is clicked
  checktile = (tileId) => {
    const width = this.state.selectedLevel.width;
    const isLeftEdge = tileId % width === 0;
    const isRightEdge = tileId % width === width - 1;
    const tiles = this.state.tiles;

    const loopThroughtiles = (tile) => {
      this.clickTile(tile.id);
    }

    // setTimeout(() => {
      if (!isRightEdge) {
        if (tiles[tileId + 1 - width])
          loopThroughtiles(tiles[tileId + 1 - width]);
        if (tiles[tileId + 1]) loopThroughtiles(tiles[tileId + 1]);
        if (tiles[tileId + 1 + width])
          loopThroughtiles(tiles[tileId + 1 + width]);
      }
      if (!isLeftEdge) {
        if (tiles[tileId - 1]) loopThroughtiles(tiles[tileId - 1]);
        if (tiles[tileId - 1 - width])
          loopThroughtiles(tiles[tileId - 1 - width]);
        if (tiles[tileId - 1 + width])
          loopThroughtiles(tiles[tileId - 1 + width]);
      }
      if (tiles[tileId - width]) loopThroughtiles(tiles[tileId - width]);
      if (tiles[tileId + width]) loopThroughtiles(tiles[tileId + width]);
    // }, 50);
  }

  gameOver = (currentTile) => {
    this.setState({ isGameOver: true, isContainerAnimated: true, isTimerOn: false, gameResult: 'lost'})
    this.refs.timer.stopTimer()
    let itemsProcessed = 0;

    // //show all the bombs
    const bombTiles = this.state.tiles.filter((tile) =>
      tile.hasBomb
    );
    bombTiles.forEach((tile) => {
      // setTimeout(() => {
        currentTile.checked = true
        tile.checked = true
        itemsProcessed++;
        if (itemsProcessed === bombTiles.length) {
          setTimeout(() => {
              this.openModal()
          }, 1000);
        }
      // }, 10 );
    });
  }

  //add Flag with right click
  addFlag = (tileId) => {
    const tile = this.state.tiles.find(tile => tile.id === tileId)
    console.log(tileId, tile)

    if (this.state.isGameOver) return;
    let flags = 0;
    if (!tile.checked && flags < this.state.selectedLevel.bombs) {
      if (!tile.flag) {
        tile.flag = true
        flags++;
        const flagsLeft =  this.state.selectedLevel.bombs - flags;
        this.setState({flagsLeft})
        this.checkForWin();
      } else {
        tile.flag = false
        flags--;
        const flagsLeft =  this.state.selectedLevel.bombs - flags;
        this.setState({flagsLeft})
      }
    }
    console.log(tile)
    const tiles = [...this.state.tiles]
    tiles.forEach(tile => {
      if (tile.id === tileId) tile.flag = true
    })
    this.setState({tiles})
  }

  updateFlagCount = () => {

  }

  //check for win
  checkForWin = () => {
    let matches = 0;
    this.state.tiles.forEach((tile) => {
      if (tile.flag && tile.hasBomb) matches++;
      if (matches === this.state.selectedLevel.bombs) {
        this.setState({ gameResult: 'won', isModalOpen: true, isGameOver: true, isTimerOn: false })
        this.refs.timer.stopTimer()
        if (!tile.checked) tile.checked = true;
      }
    })
  }

  replay = () => {
    if (this.state.isModalOpen) this.closeModal();
    this.clearBoard();
  }

  updateLevel = (level) => {
    this.setState({selectedLevel: level }, () => this.clearBoard())
  }

  //modal functions
	closeModal = () => { 
    this.setState({ isModalOpen: false });
	}

	openModal = () => {
		this.setState({ isModalOpen: true });
  }

  getTime = (time) => {
    this.setState({ timeDisplay: time })
  }

  addElement = (x, y) => {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
    use.setAttributeNS(
      "http://www.w3.org/1999/xlink",
      "xlink:href",
      "#bomb-svg"
    );
    svg.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
    svg.setAttribute("style", "top: " + y + "px; left: " + x + "px");
    svg.appendChild(use);
    this.background.appendChild(svg);
  }

  createBackground = () => {
    const spacing = 60;
    const w = window.innerWidth;
    const h = window.innerHeight;
    for (let y = 0; y <= h; y += spacing) {
      if (y % (spacing * 2) === 0) {
        for (let x = 0; x <= w; x += spacing) {
          this.addElement(x, y);
        }
      } else {
        for (let x = -(spacing / 2); x <= w; x += spacing) {
          this.addElement(x, y);
        }
      }
    }
  }

  render() {
    let grid = this.state.tiles.map((tile, index) => {
      return (
        <Tile key={index} id={index} tile={tile} onTileClick={this.handleTileClick} onAddFlag={this.addFlag}/>
      )
    })

    return (
      <div>
        <svg id="main" className="hide">
          <symbol id="bomb-svg" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 786.7 687.8" width="50px">
            <path d="M427.4,144.2l40.7-41.8a23.1,23.1,0,0,1,32.5,0l72.8,72.8a23.1,23.1,0,0,1,0,32.5l-37.4,37.4" transform="translate(0 -11.6)" fill="none" stroke="#39395b" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="17"/>
            <circle cx="291.1" cy="385.2" r="282.6" fill="none" stroke="#39395b" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="17"/>
            <path d="M540.2,141.2l15.4-20.5c12.6-16.8,30.4-17.7,43.6-2.4l0.3,0.3c11.8,13.7,31.3,22.6,48.3,11.4,6.1-4,20.7-20.5,20.7-20.5" transform="translate(0 -11.6)" fill="none" stroke="#39395b" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="17"/>
            <line x1="701.7" y1="63.3" x2="742" y2="23.1" fill="none" stroke="#39395b" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="17"/>
            <line x1="713.2" y1="107.4" x2="766.2" y2="128.2" fill="none" stroke="#39395b" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="17"/>
            <line x1="654.5" y1="60.2" x2="630.8" y2="8.5" fill="none" stroke="#39395b" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="17"/>
            <path d="M82,396.8c0-118.4,95.9-214.3,214.3-214.3" transform="translate(0 -11.6)" fill="none" stroke="#39395b" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="17"/>
            <g id="Happy_face" data-name="Happy face">
              <path d="M170.4,432.1a34.6,34.6,0,0,1,69.2,0" transform="translate(0 -11.6)" fill="none" stroke="#39395b" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="17"/>
              <path d="M342.5,432.1a34.6,34.6,0,0,1,69.2,0" transform="translate(0 -11.6)" fill="none" stroke="#39395b" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="17"/>
              <path d="M367,481.7c0,33.7-33.4,64.1-74.6,64.1s-74.6-30.3-74.6-64.1" transform="translate(0 -11.6)" fill="none" stroke="#39395b" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="17"/>
            </g>
          </symbol>
        </svg>
        <div id="background" ref={(el) => this.background = el}></div>
        <Modal gameResult={this.state.gameResult} show={this.state.isModalOpen} onReplay={this.replay}/>
        <div className={`container ${this.state.isContainerAnimated ? "shake" : ""}`}>
          <div className="header">
            <Dropdown onLevelChange={this.updateLevel} levels={this.state.levels} selectedLevel={this.state.selectedLevel}/>
            <div id='flag-countdown'><svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 287.987 287.987" fill="#fff" width="30"><g><path d="M228.702,141.029c-3.114-3.754-3.114-9.193,0-12.946l33.58-40.474c2.509-3.024,3.044-7.226,1.374-10.783   c-1.671-3.557-5.246-5.828-9.176-5.828h-57.647v60.98c0,16.618-13.52,30.138-30.138,30.138h-47.093v25.86   c0,5.599,4.539,10.138,10.138,10.138h124.74c3.93,0,7.505-2.271,9.176-5.828c1.671-3.557,1.135-7.759-1.374-10.783L228.702,141.029   z"/><path d="M176.832,131.978V25.138c0-5.599-4.539-10.138-10.138-10.138H53.37c0-8.284-6.716-15-15-15s-15,6.716-15,15   c0,7.827,0,253.91,0,257.987c0,8.284,6.716,15,15,15s15-6.716,15-15c0-6.943,0-126.106,0-130.871h113.324   C172.293,142.116,176.832,137.577,176.832,131.978z"/></g></svg><span id='flags-left'>{this.state.flagsLeft} </span></div>
            <Timer ref="timer" onTimeChange={this.getTime} timeDisplay={this.state.timeDisplay}/>

        </div>
        <div className="grid">{grid}</div>
        </div>
      </div>
    );
  }
}

export default App;
