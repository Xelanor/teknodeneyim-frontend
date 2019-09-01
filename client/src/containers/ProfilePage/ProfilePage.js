import React, { Component } from 'react';
import { connect } from "react-redux";

class ProfilePage extends Component {
  state = {

  }
  render() {
    let { user } = this.props.auth
    return (
      <div>
        <img src={user.avatar} alt={user.name} title={user.name}
          className="Image"
          style={{ width: '150px', marginRight: '5px', borderRadius: '50%', float: 'left', padding: '30px' }} />
        <h3 style={{ padding: '50px', float: 'left' }}>{user.username}</h3>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(ProfilePage);