import React, { Component } from 'react'
import Utils from '../utils'

export class Tile extends Component {
  state = {
    numberColors: ["#8B6AF5","#74c2f9","#42dfbc","#f9dd5b","#FEAC5E","#ff5d9e","#F29FF5","#c154d8"],
    flagIcon:
    '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 287.987 287.987" fill="#695ca8" style="enable-background:new 0 0 287.987 287.987;" xml:space="preserve"><g><path d="M228.702,141.029c-3.114-3.754-3.114-9.193,0-12.946l33.58-40.474c2.509-3.024,3.044-7.226,1.374-10.783   c-1.671-3.557-5.246-5.828-9.176-5.828h-57.647v60.98c0,16.618-13.52,30.138-30.138,30.138h-47.093v25.86   c0,5.599,4.539,10.138,10.138,10.138h124.74c3.93,0,7.505-2.271,9.176-5.828c1.671-3.557,1.135-7.759-1.374-10.783L228.702,141.029   z"/><path d="M176.832,131.978V25.138c0-5.599-4.539-10.138-10.138-10.138H53.37c0-8.284-6.716-15-15-15s-15,6.716-15,15   c0,7.827,0,253.91,0,257.987c0,8.284,6.716,15,15,15s15-6.716,15-15c0-6.943,0-126.106,0-130.871h113.324   C172.293,142.116,176.832,137.577,176.832,131.978z"/></g></svg>',
    bombIcon:
    '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 512 512" fill="#695ca8" ><g><path d="m411.313,123.313c6.25-6.25 6.25-16.375 0-22.625s-16.375-6.25-22.625,0l-32,32-9.375,9.375-20.688-20.688c-12.484-12.5-32.766-12.5-45.25,0l-16,16c-1.261,1.261-2.304,2.648-3.31,4.051-21.739-8.561-45.324-13.426-70.065-13.426-105.867,0-192,86.133-192,192s86.133,192 192,192 192-86.133 192-192c0-24.741-4.864-48.327-13.426-70.065 1.402-1.007 2.79-2.049 4.051-3.31l16-16c12.5-12.492 12.5-32.758 0-45.25l-20.688-20.688 9.375-9.375 32.001-31.999zm-219.313,100.687c-52.938,0-96,43.063-96,96 0,8.836-7.164,16-16,16s-16-7.164-16-16c0-70.578 57.422-128 128-128 8.836,0 16,7.164 16,16s-7.164,16-16,16z"/><path d="m459.02,148.98c-6.25-6.25-16.375-6.25-22.625,0s-6.25,16.375 0,22.625l16,16c3.125,3.125 7.219,4.688 11.313,4.688 4.094,0 8.188-1.563 11.313-4.688 6.25-6.25 6.25-16.375 0-22.625l-16.001-16z"/><path d="m340.395,75.605c3.125,3.125 7.219,4.688 11.313,4.688 4.094,0 8.188-1.563 11.313-4.688 6.25-6.25 6.25-16.375 0-22.625l-16-16c-6.25-6.25-16.375-6.25-22.625,0s-6.25,16.375 0,22.625l15.999,16z"/><path d="m400,64c8.844,0 16-7.164 16-16v-32c0-8.836-7.156-16-16-16-8.844,0-16,7.164-16,16v32c0,8.836 7.156,16 16,16z"/><path d="m496,96.586h-32c-8.844,0-16,7.164-16,16 0,8.836 7.156,16 16,16h32c8.844,0 16-7.164 16-16 0-8.836-7.156-16-16-16z"/><path d="m436.98,75.605c3.125,3.125 7.219,4.688 11.313,4.688 4.094,0 8.188-1.563 11.313-4.688l32-32c6.25-6.25 6.25-16.375 0-22.625s-16.375-6.25-22.625,0l-32,32c-6.251,6.25-6.251,16.375-0.001,22.625z"/></g></svg>'
  }

  onRightClick = (e) => {
    e.preventDefault();
    const tileId = parseInt(e.target.id);
    this.props.onAddFlag(tileId);
  }

  render() {
    const tile = this.props.tile;

    let tileClass;
    if (tile.checked) {
      if (tile.hasBomb) tileClass = " checked has-bomb"
      else tileClass = " checked"
    } else {
      tileClass = ''
    }

    let content;
    if (tile.checked) {
      if (tile.hasBomb) {
        content = this.state.bombIcon
      } else {
        if (tile.neighborBombs !== 0) {
          content = tile.neighborBombs
        } else {
          content = null
        }
      }
    } else {
      if (tile.flag) {
        content = this.state.flagIcon
      } else {
        content = null
      }
    }

    let tileStyle;
    if (tile.checked && tile.hasBomb && tile.bgColor) {
      tileStyle= {backgroundColor: tile.bgColor}
    } else if (tile.checked && !tile.hasBomb && tile.neighborBombs !== 0) {
      const tileNumberColor = this.state.numberColors[tile.neighborBombs - 1];
      const tileNumberShadow = "1px 1px" + Utils.lightenDarkenColor(tileNumberColor, -20);
      tileStyle= {color: tileNumberColor, textShadow: tileNumberShadow }
    } else {
      tileStyle = null
    }


    return (
      <div id={this.props.id} className={`tile${tileClass}`} onClick={(e) => this.props.onTileClick(e)} onContextMenu={(e) => this.onRightClick(e)} neighborbombs={tile.neighborbombs} style={tileStyle}><div className="tile-container" dangerouslySetInnerHTML={{__html: content}} /></div>
    )
  }
}

export default Tile

