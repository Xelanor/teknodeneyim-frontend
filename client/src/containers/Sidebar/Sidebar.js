import React, { Component } from 'react';
import { connect } from 'react-redux'
import { CSSTransition } from 'react-transition-group';
import './Sidebar.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import MediaQuery from 'react-responsive'

import PostsList from '../../components/PostsList/PostsList'
import Loading from '../../components/UI/Loading/SideLoading/SideLoading'

import { fetchSidePosts } from '../../store/actions/fetchActions'

class Sidebar extends Component {
  state = {
    displaySidebar: true,
  }

  componentDidMount() {
    this.props.fetchSidePosts()
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
    } else {
      posts = <div>
        <div className="flex justify-between">
          <div className="mb-4 font-semibold text-base text-gray-900">
            En Popüler Deneyimler
                  </div>
        </div>
        {Array(6).fill().map(Math.random).map(a => {
          return <Loading />
        })}
      </div>

    }
    return (
      <div className="lg:w-3/12 px-4 pb-4 lg:p-4 border-r-2 border-gray-200">
        <button onClick={this.toggleSidebar} className="bg-tekno lg:hidden hover:bg-tekno mb-2 text-white font-bold h-12 w-full rounded focus:outline-none focus:shadow-outline appearance-none" type="submit">
          <div className="font-semibold text-base text-white">
            En Popüler Deneyimler
          </div>
          {this.state.displaySidebar ? <FontAwesomeIcon icon={faChevronDown} /> : <FontAwesomeIcon icon={faChevronUp} />}
        </button>
        <div>
          <MediaQuery maxWidth={1024}>
            <CSSTransition
              in={!this.state.displaySidebar}
              timeout={300}
              classNames="alert"
              unmountOnExit
            >
              <>
                {posts}
              </>
            </CSSTransition>
          </MediaQuery>
          <MediaQuery minWidth={1024}>
            {posts}
          </MediaQuery>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  posts: state.posts.sidebarposts
})

export default connect(mapStateToProps, { fetchSidePosts })(Sidebar);