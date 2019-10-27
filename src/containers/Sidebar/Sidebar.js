import React, { Component } from 'react';
import { connect } from 'react-redux'
import { CSSTransition } from 'react-transition-group';
import './Sidebar.css'

import PostsList from '../../components/PostsList/PostsList'

import { fetchSidePosts } from '../../store/actions/fetchActions'

class Sidebar extends Component {
  state = {
    displaySidebar: true,
  }

  componentDidMount() {
    this.props.fetchSidePosts()
    console.log(process.env.REACT_APP_API_URL)
  }

  toggleSidebar = () => {
    this.setState({ displaySidebar: !this.state.displaySidebar })
  }

  render() {
    let posts
    if (this.props.posts) {
      posts =
        <div>
          <div className="flex justify-between">
            <div className="mb-4 font-semibold text-base text-gray-900">
              En Popüler Deneyimler
            </div>
          </div>
          <PostsList posts={this.props.posts} />
        </div>
    }
    return (
      <div className="md:w-3/12 px-4 pb-4 lg:p-4 border-r-2 border-gray-200">
        <button onClick={this.toggleSidebar} className="bg-tekno lg:hidden hover:bg-tekno mb-2 text-white font-bold h-6 w-full rounded focus:outline-none focus:shadow-outline appearance-none" type="submit">
          <i className="fas fa-chevron-down"></i>
        </button>
        <div>
          <CSSTransition
            in={this.state.displaySidebar}
            timeout={300}
            classNames="alert"
            unmountOnExit
          >
            <>
              {posts}
            </>
          </CSSTransition>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  posts: state.posts.sidebarposts
})

export default connect(mapStateToProps, { fetchSidePosts })(Sidebar);