import React, { Component } from 'react';
import { Paper, Slide } from '@material-ui/core'
import axios from 'axios'

import { NEXT_REPORTABLE_TIME, NEXT_COMMENT_DELETE_TIME } from '../../store/actions/types'

class ActionModal extends Component {
  state = {}

  handleReportComment = async () => {
    await this.props.modalShow('', false)
    const { reporter, reported, comment } = this.props
    let lastReported = ""
    await axios.get('/users/report/' + reporter)
      .then(res => { lastReported = res.data.lastReported ? res.data.lastReported : null })
      .catch(err => { console.log(err) })
    lastReported = new Date(lastReported).getTime()
    let now_plus_time = Date.now() - NEXT_REPORTABLE_TIME * 60000 // Minute to hours
    if (now_plus_time >= lastReported || lastReported == null) {
      axios.post('/reports/new-report', { reporter, reported, comment })
      await this.props.modalShow('comment-reported', true)
    } else {
      await this.props.modalShow('comment-not-reported', true)
    }
  }

  handleDeleteComment = async () => {
    await this.props.modalShow('', false)
    const { reporter, comment, postId } = this.props
    let lastCommentDeleted = ""
    await axios.get('/users/report/' + reporter)
      .then(res => { lastCommentDeleted = res.data.lastCommentDeleted ? res.data.lastCommentDeleted : null })
    lastCommentDeleted = new Date(lastCommentDeleted).getTime()
    let now_plus_time = Date.now() - NEXT_COMMENT_DELETE_TIME * 60000 // Minute to hours
    if (now_plus_time >= lastCommentDeleted || lastCommentDeleted == null) {
      axios.post('/comments/delete', { comment, reporter })
      axios.post('/posts/delete-comment', { comment, postId })
      window.location.reload();
    } else {
      await this.props.modalShow('comment-not-deleted', true)
    }
  }

  // Renders the Report Comment Modal Window
  renderReportComment = () => {
    return (
      <Slide direction="left" in={true} mountOnEnter unmountOnExit timeout={500}>
        <div className="w-full">
          <div className="flex mb-8">
            <div className="font-semibold text-md text-tekno3">
              {this.props.username}
            </div>
            <div className="font-semibold text-md text-tekno">
              &nbsp;adlı kullanıcıyı rapor etmek istediğinize emin misiniz?
            </div>
          </div>
          <div className="flex">
            <div className="flex items-center justify-between">
              <button
                className="bg-tekno hover:bg-tekno2 text-white font-bold py-2 px-6 mr-8 rounded focus:outline-none focus:shadow-outline appearance-none"
                type="submit"
                onClick={() => this.handleReportComment()}
              >
                Evet
              </button>
              <button
                className="bg-tekno3 hover:bg-tekno4 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline appearance-none"
                type="submit"
                onClick={() => this.props.modalShow('', false)}
              >
                Hayır
              </button>
            </div>
          </div>
        </div>
      </Slide>
    );
  };

  renderCommentReported = () => {
    return (
      <Slide direction="left" in={true} mountOnEnter unmountOnExit timeout={500}>
        <div className="w-full">
          <div className="flex mb-8">
            <div className="flex items-center justify-between">
              <div className="font-semibold text-xl text-tekno3">
                Tekno Deneyim'e destek verdiğiniz için teşekkürler.
              </div>
            </div>
          </div>
          <div className="flex">
            <div className="font-semibold text-md text-tekno3">
              {this.props.username}
            </div>
            <div className="font-semibold text-md text-tekno">
              &nbsp;adlı kullanıcı başarılı bir şekilde rapor edildi...
            </div>
          </div>
        </div>
      </Slide>
    );
  };

  renderCommentNotReported = () => {
    return (
      <Slide direction="left" in={true} mountOnEnter unmountOnExit timeout={500}>
        <div className="w-full">
          <div className="flex mb-1">
            <div className="font-semibold text-xl text-tekno3">
              Bir yorumu daha raporlayabilmeniz için
            </div>
          </div>
          <div className="flex mb-8">
            <div className="font-semibold text-xl text-tekno3">
              bir süre beklemeniz gerekmektedir.
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="font-semibold text-md text-tekno">
              Tekno Deneyim'e destek verdiğiniz için teşekkürler.
            </div>
          </div>
        </div >
      </Slide >
    );
  };

  // Renders the Delete Comment Modal Window
  renderDeleteComment = () => {
    return (
      <Slide direction="left" in={true} mountOnEnter unmountOnExit timeout={500}>
        <div className="w-full">
          <div className="text-center mb-8">
            <div className="font-semibold text-md text-tekno3">
              {this.props.createdAt}
            </div>
            <div className="font-semibold text-md text-tekno">
              tarihinde paylaştığınız deneyiminizi silmek istediğinize emin misiniz?
            </div>
          </div>
          <div className="flex">
            <div className="flex items-center justify-between">
              <button
                className="bg-tekno hover:bg-tekno2 text-white font-bold py-2 px-6 mr-8 rounded focus:outline-none focus:shadow-outline appearance-none"
                type="submit"
                onClick={() => this.handleDeleteComment()}
              >
                Evet
              </button>
              <button
                className="bg-tekno3 hover:bg-tekno4 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline appearance-none"
                type="submit"
                onClick={() => this.props.modalShow('', false)}
              >
                Hayır
              </button>
            </div>
          </div>
        </div>
      </Slide>
    );
  };

  renderCannotDeleteComment = () => {
    return (
      <Slide direction="left" in={true} mountOnEnter unmountOnExit timeout={500}>
        <div className="w-full">
          <div className="flex mb-1">
            <div className="font-semibold text-xl text-tekno3">
              Bir yorumu daha silebilmeniz için
            </div>
          </div>
          <div className="flex mb-8">
            <div className="font-semibold text-xl text-tekno3">
              bir süre beklemeniz gerekmektedir.
            </div>
          </div>
        </div >
      </Slide >
    );
  };

  renderCannotSubmitComment = () => {
    return (
      <Slide direction="left" in={true} mountOnEnter unmountOnExit timeout={500}>
        <div className="w-full">
          <div className="flex mb-1">
            <div className="font-semibold text-xl text-tekno3">
              Bir yorum daha gönderebilmeniz için
            </div>
          </div>
          <div className="flex mb-8">
            <div className="font-semibold text-xl text-tekno3">
              10dk beklemeniz gerekmektedir.
            </div>
          </div>
        </div >
      </Slide >
    );
  };

  render() {
    if (this.props.modalType === 'report-comment') {
      return <Paper tabIndex={-1} className="container-prompt">{this.renderReportComment()}</Paper>;
    }
    else if (this.props.modalType === 'comment-reported') {
      return <Paper tabIndex={-1} className="container-prompt">{this.renderCommentReported()}</Paper>;
    }
    else if (this.props.modalType === 'comment-not-reported') {
      return <Paper tabIndex={-1} className="container-prompt">{this.renderCommentNotReported()}</Paper>;
    }
    else if (this.props.modalType === 'delete-comment') {
      return <Paper tabIndex={-1} className="container-prompt">{this.renderDeleteComment()}</Paper>;
    }
    else if (this.props.modalType === 'comment-not-deleted') {
      return <Paper tabIndex={-1} className="container-prompt">{this.renderCannotDeleteComment()}</Paper>;
    }
    else if (this.props.modalType === 'comment-not-submitted') {
      return <Paper tabIndex={-1} className="container-prompt">{this.renderCannotSubmitComment()}</Paper>;
    }
    else {
      return <div>Hi</div>
    }
  }
}
export default ActionModal;