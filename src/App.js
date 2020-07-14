// TO DO
// 1. Fix slow rendering
// 2. Add delay when revealing tiles and bombs
// 3. Fix timer bug
// 4. Add sass support
// 5. Introduce compoenents: Board, Cells, Timer, Dropdown



import React, { Component } from "react";
// import { Header } from "./components/Header";
import "./App.css";

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
          width: 20,
          bombs: 70,
        },
      ],
      flags: 0,
      tiles: [],
      timerCount: 0,
      isGameOver: false,
      isTimerOn: false,
      isModalOpen: false,
      isResultTimeVisible: false,
      isBombHappyFaceVisible: false,
      isBombSadFaceVisible: false,
      isContainerAnimated: false,
      isMenuVisible: false,
      timeDisplay: '000',
      finalTime: 0,
      resultMessage: '',
      numberColors: ["#8B6AF5","#74c2f9","#42dfbc","#f9dd5b","#FEAC5E","#ff5d9e","#F29FF5","#c154d8"],
      bgColors:["#b39ffd","#93c1fd","#8af1f8","#f9dd5b","#FEAC5E","#f87dae","#f6b8f8", "#f7efce",],
    }
    this.state.root = document.documentElement;
    this.state.selectedLevel = this.state.levels[0];
    this.state.flagsLeft = 0;
    this.state.flagIcon =
    '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 287.987 287.987" fill="#695ca8" style="enable-background:new 0 0 287.987 287.987;" xml:space="preserve"><g><path d="M228.702,141.029c-3.114-3.754-3.114-9.193,0-12.946l33.58-40.474c2.509-3.024,3.044-7.226,1.374-10.783   c-1.671-3.557-5.246-5.828-9.176-5.828h-57.647v60.98c0,16.618-13.52,30.138-30.138,30.138h-47.093v25.86   c0,5.599,4.539,10.138,10.138,10.138h124.74c3.93,0,7.505-2.271,9.176-5.828c1.671-3.557,1.135-7.759-1.374-10.783L228.702,141.029   z"/><path d="M176.832,131.978V25.138c0-5.599-4.539-10.138-10.138-10.138H53.37c0-8.284-6.716-15-15-15s-15,6.716-15,15   c0,7.827,0,253.91,0,257.987c0,8.284,6.716,15,15,15s15-6.716,15-15c0-6.943,0-126.106,0-130.871h113.324   C172.293,142.116,176.832,137.577,176.832,131.978z"/></g></svg>';
    this.state.bombIcon =
    '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 512 512" fill="#695ca8" ><g><path d="m411.313,123.313c6.25-6.25 6.25-16.375 0-22.625s-16.375-6.25-22.625,0l-32,32-9.375,9.375-20.688-20.688c-12.484-12.5-32.766-12.5-45.25,0l-16,16c-1.261,1.261-2.304,2.648-3.31,4.051-21.739-8.561-45.324-13.426-70.065-13.426-105.867,0-192,86.133-192,192s86.133,192 192,192 192-86.133 192-192c0-24.741-4.864-48.327-13.426-70.065 1.402-1.007 2.79-2.049 4.051-3.31l16-16c12.5-12.492 12.5-32.758 0-45.25l-20.688-20.688 9.375-9.375 32.001-31.999zm-219.313,100.687c-52.938,0-96,43.063-96,96 0,8.836-7.164,16-16,16s-16-7.164-16-16c0-70.578 57.422-128 128-128 8.836,0 16,7.164 16,16s-7.164,16-16,16z"/><path d="m459.02,148.98c-6.25-6.25-16.375-6.25-22.625,0s-6.25,16.375 0,22.625l16,16c3.125,3.125 7.219,4.688 11.313,4.688 4.094,0 8.188-1.563 11.313-4.688 6.25-6.25 6.25-16.375 0-22.625l-16.001-16z"/><path d="m340.395,75.605c3.125,3.125 7.219,4.688 11.313,4.688 4.094,0 8.188-1.563 11.313-4.688 6.25-6.25 6.25-16.375 0-22.625l-16-16c-6.25-6.25-16.375-6.25-22.625,0s-6.25,16.375 0,22.625l15.999,16z"/><path d="m400,64c8.844,0 16-7.164 16-16v-32c0-8.836-7.156-16-16-16-8.844,0-16,7.164-16,16v32c0,8.836 7.156,16 16,16z"/><path d="m496,96.586h-32c-8.844,0-16,7.164-16,16 0,8.836 7.156,16 16,16h32c8.844,0 16-7.164 16-16 0-8.836-7.156-16-16-16z"/><path d="m436.98,75.605c3.125,3.125 7.219,4.688 11.313,4.688 4.094,0 8.188-1.563 11.313-4.688l32-32c6.25-6.25 6.25-16.375 0-22.625s-16.375-6.25-22.625,0l-32,32c-6.251,6.25-6.251,16.375-0.001,22.625z"/></g></svg>';
  }

  componentDidMount() {
    this.createBackground();
    this.createBoard();
  }

  getMainColor = () => {
    const randomColor = this.state.numberColors[Math.floor(Math.random() * this.state.numberColors.length)];
    this.state.root.style.setProperty("--main-color", randomColor);
    this.state.root.style.setProperty(
      "--dark-color",
      this.lightenDarkenColor(randomColor, -50)
    );
  }

  clearBoard = () => {
    console.clear();
    if (this.state.isTimerOn) this.stopTimer();
    this.setState({ timeDisplay: '000', timerCount: 0, flags: 0, isGameOver: false, tiles: [], isResultTimeVisible: false, isBombHappyFaceVisible: false, isBombSadFaceVisible: false, isContainerAnimated: false })
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
      tiles.push({id: i, checked: false})
    }

    //add bombs
    const randomTiles = tiles.map(tile => tile.id).sort(() => Math.random() - 0.5).slice(0, this.state.selectedLevel.bombs)
    tiles.forEach((tile) =>
      randomTiles.includes(tile.id)
        ? tile.class = "has-bomb"
        : tile.class = "is-empty"
    )
    // tiles.sort((a, b) => a.id - b.id); //sort array by id again

    //add numbers
    for (let i = 0; i < tiles.length; i++) {
      let total = 0;
      const isLeftEdge = i % width === 0;
      const isRightEdge = i % width === width - 1;

      if (tiles[i].class === "is-empty") {
        if (!isLeftEdge) {
          if (tiles[i - 1] && tiles[i - 1].class === "has-bomb")
            total++;
          if (
            tiles[i - 1 + width] &&
            tiles[i - 1 + width].class === "has-bomb"
          )
            total++;
          if (
            tiles[i - 1 - width] &&
            tiles[i - 1 - width].class === "has-bomb"
          )
            total++;
        }

        if (!isRightEdge) {
          if (tiles[i + 1] && tiles[i + 1].class === "has-bomb")
            total++;
          if (
            tiles[i + 1 + width] &&
            tiles[i + 1 + width].class === "has-bomb"
          )
            total++;
          if (
            tiles[i + 1 - width] &&
            tiles[i + 1 - width].class === "has-bomb"
          )
            total++;
        }

        if (tiles[i - width] && tiles[i - width].class === "has-bomb") total++;
        if (tiles[i + width] && tiles[i + width].class === "has-bomb") total++;
        tiles[i].neighborBombs = total;
      }
    }
    this.setState({ tiles: tiles, flagsLeft: this.state.selectedLevel.bombs})
  }

  handleTileClick = (e) => {
    console.log('handle click', e.target)
    const clickedTileId = parseInt(e.target.id);
    if (!this.state.isTimerOn) this.startTimer();
    this.clickTile(clickedTileId)
  }

  //click on tile 
  clickTile = (tileId) => {
    console.log('clicked')
    const currentTile = this.state.tiles.find(tile => tile.id === tileId)

    if (this.state.isGameOver) return null;
    if (currentTile.checked || currentTile.flag) {
      return null;
    }
    if (currentTile.class === "has-bomb") {
      this.gameOver(currentTile);
    } else {
      let total = currentTile.neighborBombs ? currentTile.neighborBombs : 0;

      if (total !== 0) {
        currentTile.checked = true
        currentTile.color = this.state.numberColors[currentTile.neighborBombs - 1];
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
      console.log('processed')
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

  //game over
  gameOver = (currentTile) => {
    this.setState({ isGameOver: true, isContainerAnimated: true})
    this.stopTimer();
    let itemsProcessed = 0;

    // //show all the bombs
    const bombTiles = this.state.tiles.filter((tile) =>
      tile.class === "has-bomb"
    );
    bombTiles.forEach((tile, index) => {
      setTimeout(() => {
        currentTile.checked = true

        // tile.style.backgroundColor =
          // this.state.bgColors[Math.floor(Math.random() * this.state.bgColors.length)];
    //     tile.classList.remove("has-bomb");
        tile.checked = true
        itemsProcessed++;
        if (itemsProcessed === bombTiles.length) {
          setTimeout(() => {
              this.openModal()
              this.setState({isBombSadFaceVisible: true, resultMessaqe: 'Game Over!'})
          }, 1000);
        }
      }, 10 * index);
    });
  }

  //add Flag with right click
  addFlag = (tile) => {
    let flags = this.state.flags
    if (this.state.isGameOver) return;
    if (!tile.checked && flags < this.state.selectedLevel.bombs) {
      if (!tile.flag) {
        tile.flag = true
        // tile.innerHTML = this.state.flagIcon;
        flags++;
        const flagsLeft =  this.state.selectedLevel.bombs - flags;
        this.setState({flagsLeft, flags})
        this.checkForWin();
      } else {
        tile.flag = false
        // tile.innerHTML = "";
        flags--;
        const flagsLeft =  this.state.selectedLevel.bombs - flags;
        this.setState({flagsLeft, flags})
      }
    }
  }

  //check for win
  checkForWin = () => {
    let matches = 0;
    this.state.tiles.forEach((tile) => {
      if (tile.flag && tile.class === "has-bomb") matches++;
      if (matches === this.state.selectedLevel.bombs) {
        this.stopTimer();
        this.setState({ resultMessaqe: 'CONGRATULATIONS!', isResultTimeVisible: true, isModalOpen: true, isBombHappyFaceVisible: true, isGameOver: true })
    // reveal all remaining tiles
        if (!tile.checked) tile.checked = true;
      }
    })
  }

  replay = () => {
    if (this.state.isModalOpen) this.closeModal();
    this.clearBoard();
  }

  // timer functions
  startTimer = () => {
    this.setState({ isTimerOn: true})
    let sec = 0;
    const timerCount = setInterval(() => {
      sec++;
      const timeDisplay = ("00" + sec).slice(-3);
      this.setState({timeDisplay})
      if (sec > 998) clearInterval(timerCount);
      this.setState({finalTime: sec})
    }, 1000);
    this.setState({timerCount})
  }

  stopTimer = () => {
    console.log(this.state.timerCount)
    clearInterval(this.state.timerCount);
    this.setState({ isTimerOn: false })
    console.log('timer stopped')
    console.log(this.state.timerCount)
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

  lightenDarkenColor = (col, amt) => {
    let usePound = false;
    if (col[0] === "#") {
      col = col.slice(1);
      usePound = true;
    }
    let num = parseInt(col, 16);
    let r = (num >> 16) + amt;
    if (r > 255) r = 255;
    else if (r < 0) r = 0;
    let b = ((num >> 8) & 0x00ff) + amt;
    if (b > 255) b = 255;
    else if (b < 0) b = 0;
    let g = (num & 0x0000ff) + amt;
    if (g > 255) g = 255;
    else if (g < 0) g = 0;
    return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
  }

  onRightClick = (e) => {
    e.preventDefault();
    let target;
    if (e.target.tagName === 'svg') {
      target = e.target.parentNode.parentNode
    } else if (e.target.tagName === 'span') {
      target = e.target.parentNode
    } else {
      target = e.target
    }
    const tileId = parseInt(target.id);
    const currentTile = this.state.tiles.find(tile => tile.id === tileId)
    this.addFlag(currentTile);
  }

  // menu functions
  expandMenu = () => {
		this.setState({ isMenuVisible: true });
	}
	
	collapseMenu = () => {
		this.setState({ isMenuVisible: false });
  }
  
  handleMenuItemClick = (e) => {
    const selectedLevel = this.state.levels.find((level) => level.difficulty === e.target.innerText);
		this.setState({
			isMenuVisible: false,
			selectedLevel
    }, () => this.clearBoard())
	}
	
	toggleMenu = () => {
		this.setState({ isMenuVisible: !this.state.isMenuVisible });
  }
  
  //modal functions
	closeModal = () => { 
    this.setState({ isModalOpen: false	});
	}

	openModal = () => {
		this.setState({ isModalOpen: true });
	}

  render() {
    // console.log('RENDER')
    let grid = this.state.tiles.map((tile, index) => {
      if (tile.checked) {
        let content;
        if (tile.class === "has-bomb") {
          content = this.state.bombIcon
          const bombBgColor = this.state.bgColors[Math.floor(Math.random() * this.state.bgColors.length)]
          return (
            <div key={index} id={index} className={`tile checked ${tile.class}`} onClick={(e) => this.handleTileClick(e)} onContextMenu={(e) => this.onRightClick(e)} neighborbombs={tile.neighborBombs} style={{backgroundColor: bombBgColor}}>
              <span dangerouslySetInnerHTML={{__html: content}}/>
            </div>
          )
        } else {
          if (tile.neighborBombs !== 0) {
            const tileNumber = tile.neighborBombs !== 0 ? tile.neighborBombs : ''
            let tileNumberColor = this.state.numberColors[tile.neighborBombs - 1]
            let tileNumberShadow = "1px 1px" + this.lightenDarkenColor(tileNumberColor, -20);
            content = tileNumber
            return (
              <div key={index} id={index} className={`tile checked ${tile.class}`} onClick={(e) => this.handleTileClick(e)} onContextMenu={(e) => this.onRightClick(e)} neighborbombs={tile.neighborBombs} style={{color: tileNumberColor, textShadow: tileNumberShadow }}>
              {content}
              </div>
            )
          } else {
            return (
              <div key={index} id={index} className={`tile checked ${tile.class}`} onClick={(e) => this.handleTileClick(e)} onContextMenu={(e) => this.onRightClick(e)} neighborbombs={tile.neighborBombs}>
              </div>
            )
          }
        }
      } else {
        const content = tile.flag ? this.state.flagIcon : ''
        return (
          <div key={index} id={index} className={`tile ${tile.class}`} onClick={(e) => this.handleTileClick(e)} onContextMenu={(e) => this.onRightClick(e)} neighborbombs={tile.neighborBombs}> <span dangerouslySetInnerHTML={{__html: content}} />
          </div>
        )
      }

    })

    let dropdown;
    if (this.state.isMenuVisible) {
      dropdown = (
        <div className="menu">
          {this.state.levels.map((level) => {
              return <div onClick={(e) => { this.handleMenuItemClick(e); }} className="option" key={level.id} value={level.difficulty}>{level.difficulty}</div>;
            })}
        </div>
      );
    }

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
        <div id="modal" className={this.state.isModalOpen ? 'show' : ''}>
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
                <g id="happy-face" style={{display: this.state.isBombHappyFaceVisible ? 'block' : 'none'}}>
                  <path d="M170.4,432.1a34.6,34.6,0,0,1,69.2,0" transform="translate(0 -11.6)" fill="none" stroke="#39395b" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="17" className="bomb-stroke"/>
                  <path d="M342.5,432.1a34.6,34.6,0,0,1,69.2,0" transform="translate(0 -11.6)" fill="none" stroke="#39395b" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="17" className="bomb-stroke"/>
                  <path d="M367,481.7c0,33.7-33.4,64.1-74.6,64.1s-74.6-30.3-74.6-64.1" transform="translate(0 -11.6)" fill="none" stroke="#39395b" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="17" className="bomb-stroke"/>
                </g>
                <g id="sad-face" style={{display: this.state.isBombSadFaceVisible ? 'block' : 'none'}}>
                  <g>
                    <circle cx="377.1" cy="406" r="17.7" fill="#39395b" className="bomb-fill-dark"/>
                    <path d="M250,517.1c0-19.2,17.6-42.5,41.1-42.5s43.8,23.3,43.8,42.5" transform="translate(0 -11.6)" fill="none" stroke="#39395b" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="17" className="bomb-stroke"/>
                    <circle cx="205" cy="406" r="17.7" fill="#39395b" className="bomb-fill-dark"/>
                  </g>
                </g>
              </svg>
              <h1 id="result-message" >{this.state.resultMessaqe}</h1>
              <h2 className={`result-time ${this.state.isResultTimeVisible ? "show" : ""}`}>Your time: <span className="time-display">{this.state.finalTime}</span> seconds</h2>
            </div>
            <div id="new-game" onClick={this.replay}>
              <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 512 512" fill="#fff" width="30">
                <g>
                  <path d="M480.6,235.6c-11.3,0-20.4,9.1-20.4,20.4c0,112.6-91.6,204.2-204.2,204.2c-112.6,0-204.2-91.6-204.2-204.2   S143.4,51.8,256,51.8c61.5,0,118.5,27.1,157.1,73.7h-70.5c-11.3,0-20.4,9.1-20.4,20.4s9.1,20.4,20.4,20.4h114.6   c11.3,0,20.4-9.1,20.4-20.4V31.4c0-11.3-9.1-20.4-20.4-20.4s-20.4,9.1-20.4,20.4v59C390.7,40.1,325.8,11,256,11   C120.9,11,11,120.9,11,256c0,135.1,109.9,245,245,245s245-109.9,245-245C501,244.7,491.9,235.6,480.6,235.6z"/>
                </g>
              </svg>
              <h2>New Game</h2>
            </div>
          </div>
        </div>
        <div className={`container ${this.state.isContainerAnimated ? "shake" : ""}`}>
            <div className="header">
            <div className={`dropdown`}
            onBlur={() => {this.collapseMenu()}}>
            <div className="title" onClick={() => {this.toggleMenu()}}>
              {this.state.selectedLevel.difficulty}
            </div>
            {dropdown}
          </div>
          <div id='flag-countdown'><svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 287.987 287.987" fill="#fff" width="30"><g><path d="M228.702,141.029c-3.114-3.754-3.114-9.193,0-12.946l33.58-40.474c2.509-3.024,3.044-7.226,1.374-10.783   c-1.671-3.557-5.246-5.828-9.176-5.828h-57.647v60.98c0,16.618-13.52,30.138-30.138,30.138h-47.093v25.86   c0,5.599,4.539,10.138,10.138,10.138h124.74c3.93,0,7.505-2.271,9.176-5.828c1.671-3.557,1.135-7.759-1.374-10.783L228.702,141.029   z"/><path d="M176.832,131.978V25.138c0-5.599-4.539-10.138-10.138-10.138H53.37c0-8.284-6.716-15-15-15s-15,6.716-15,15   c0,7.827,0,253.91,0,257.987c0,8.284,6.716,15,15,15s15-6.716,15-15c0-6.943,0-126.106,0-130.871h113.324   C172.293,142.116,176.832,137.577,176.832,131.978z"/></g></svg><span id='flags-left'>{this.state.flagsLeft}</span></div>
          <div id="timer"><svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 559.98 559.98"  fill="#fff" width="30px"><g><path d="M279.99,0C125.601,0,0,125.601,0,279.99c0,154.39,125.601,279.99,279.99,279.99c154.39,0,279.99-125.601,279.99-279.99    C559.98,125.601,434.38,0,279.99,0z M279.99,498.78c-120.644,0-218.79-98.146-218.79-218.79    c0-120.638,98.146-218.79,218.79-218.79s218.79,98.152,218.79,218.79C498.78,400.634,400.634,498.78,279.99,498.78z"/><path d="M304.226,280.326V162.976c0-13.103-10.618-23.721-23.716-23.721c-13.102,0-23.721,10.618-23.721,23.721v124.928    c0,0.373,0.092,0.723,0.11,1.096c-0.312,6.45,1.91,12.999,6.836,17.926l88.343,88.336c9.266,9.266,24.284,9.266,33.543,0    c9.26-9.266,9.266-24.284,0-33.544L304.226,280.326z"/></g></svg><span className="counter">{this.state.timeDisplay}</span></div>

        </div>
        <div className="grid">{grid}</div>
        </div>
      </div>
    );
  }
}

export default App;
