import * as React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

const NavBar = ({ controls }: { controls: JSX.Element[] }) => (
  <div className="navbar navbar-light bg-faded">
    <Link to="/" className="navbar-brand">Annot</Link>

    <ul className="nav navbar-nav pull-xs-right">
      { controls.map((element, index) => (
          <li className="nav-item" key={ index }>
            { element }
          </li>
        )) }
    </ul>
  </div>
)

const mapStateToProps = ({ controls }: { controls: JSX.Element[] }) => {
  return { controls: controls || [] }
}

export default connect(mapStateToProps)(NavBar)
