import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { MoreHoriz } from '@material-ui/icons'
import { Tooltip, IconButton, Zoom, MenuItem, Popover, Modal } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandshake } from '@fortawesome/free-solid-svg-icons'
import { faHandshake as farHandshake } from '@fortawesome/free-regular-svg-icons'

import ActionsModal from '../../../containers/Modals/ActionsModal'
import './Comment.css'
import timeAgo from '../../../utils/timeAgo'

const StyledMenuItem = withStyles(theme => ({
  root: {
    minHeight: '10px',
    fontSize: '0.8rem',
  },
}))(MenuItem);

function Comment(props) {

  // Local state
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState('');
  const [commentSettings, setCommentSettings] = useState(null)

  const handleCommentSettingsClick = (e) => {
    setCommentSettings(e.currentTarget)
  }

  const handleClose = () => {
    setCommentSettings(null)
  }

  const handleModalShow = (modalType, show) => {
    setModalType(modalType);
    setModalVisible(show);
  };

  return (
    <div className="mb-16">
      {props.target ? <div className="flex mb-4">
        <Link to={`/post/${props.target.slug}`}>
          <div className="font-semibold text-2xl text-tekno">
            {props.target.content}
          </div>
        </Link>
      </div> : null}
      <div className="flex">
        <div className="flex whitespace-pre-line font-normal text-md text-black">
          {props.content}
        </div>
      </div>
      <div className="flex items-center float-right">
        {props.user !== "" && !props.profile ? <Tooltip TransitionComponent={Zoom} title="Yorum Ayarları" key="yorum-ayarlari" placement="left">
          <IconButton onClick={handleCommentSettingsClick} size="small">
            <MoreHoriz />
          </IconButton>
        </Tooltip> : null}
        {!props.profile ? <div onClick={() => props.commentLike(props.id)} className="LikeBtn Btn items-center cursor-pointer ml-4 mr-3">
          <span className="BtnWrapper items-center">
            <span className="Count mr-1">{props.likes.length}</span>
            {props.likes.includes(props.user) ? <FontAwesomeIcon icon={faHandshake} className="text-tekno" /> : <FontAwesomeIcon icon={farHandshake} className="hover:text-tekno" />}
          </span>
        </div> : null }
        <div className="font-bold text-sm text-purple-900">
          {timeAgo(new Date(props.createdAt).getTime())}
        </div>
        <Link to={`/profil/${props.username.username}`}>
          <div className="ml-4 font-normal text-sm text-black">
            {props.username.username}
          </div>
        </Link>
        <Link to={`/profil/${props.username.username}`}>
          <img
            src={props.username.avatar}
            alt={props.username.username}
            title={props.username.username}
            className="w-10 h-10 rounded-full ml-4"
          />
        </Link>
      </div>
      <Popover
        id="yorum-ayarlari-menusu"
        anchorEl={commentSettings}
        open={Boolean(commentSettings)}
        onClick={handleClose}
        onClose={handleClose}
      >
        {props.user !== props.username._id ? <StyledMenuItem onClick={() => handleModalShow('report-comment', true)}>Rapor Et</StyledMenuItem> : null}
        {props.user === props.username._id ? <StyledMenuItem onClick={() => handleModalShow('delete-comment', true)}>Yorumu Sil</StyledMenuItem> : null}
      </Popover>

      <Modal
        open={modalVisible}
        aria-labelledby="comment report modal"
        aria-describedby="report a comment"
        className="modal-wrapper"
        onClose={() => setModalVisible(false)}
      >
        <ActionsModal
          modalShow={handleModalShow}
          modalType={modalType}
          username={props.username.username}
          reporter={props.user}
          reported={props.username._id}
          comment={props.id}
          createdAt={new Date(props.createdAt).toLocaleString()}
          postId={props.postId}
        />
      </Modal>

    </div >
  );
}

export default Comment;