import React, { Component } from 'react'

export class Dropdown extends Component {

  state = {
    isMenuVisible: false
  }

  handleMenuItemClick = (e) => {
    const selectedLevel = this.props.levels.find((level) => level.difficulty === e.target.innerText);
    this.setState({ isMenuVisible: false })
    this.props.onLevelChange(selectedLevel)
	}

	toggleMenu = () => {
		this.setState({ isMenuVisible: !this.state.isMenuVisible });
  }

  closeMenu = () => {
    this.setState({ isMenuVisible: false })
  }

  render() {

    let dropdown;
    if (this.state.isMenuVisible) {
      dropdown = (
        <div className="menu">
          {this.props.levels.map((level) => {
              return <div onClick={(e) => { this.handleMenuItemClick(e) }} className="option" key={level.id} value={level.difficulty}>{level.difficulty}</div>;
            })}
        </div>
      );
    }
    return (
        <div>
          <div className="dropdown" onBlur={() => {this.closeMenu()}}>
              <div className="title" onClick={() => {this.toggleMenu()}}>
                {this.props.selectedLevel.difficulty}
              </div>
              {dropdown}
          </div>
        </div>
    )
  }
}

export default Dropdown

