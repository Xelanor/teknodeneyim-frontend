import React, { Component } from 'react';
import { Paper, Slide, Grid, Typography, TextField, Button } from '@material-ui/core'
import axios from 'axios'
class ActionModal extends Component {
  state = {

  }

  handleReportComment = async () => {
    await this.props.modalShow('', false)
    const { reporter, reported, comment } = this.props
    axios.post('/reports/new-report', { reporter, reported, comment })
    await this.props.modalShow('comment-reported', true)
  }

  handleDeleteComment = async () => {
    await this.props.modalShow('', false)
    const { comment } = this.props
    axios.post('/comments/delete', { comment })
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


  render() {
    if (this.props.modalType === 'report-comment') {
      return <Paper tabIndex={-1} className="container-prompt">{this.renderReportComment()}</Paper>;
    }
    else if (this.props.modalType === 'comment-reported') {
      return <Paper tabIndex={-1} className="container-prompt">{this.renderCommentReported()}</Paper>;
    }
    else if (this.props.modalType === 'delete-comment') {
      return <Paper tabIndex={-1} className="container-prompt">{this.renderDeleteComment()}</Paper>;
    }
    else {
      return <div>Hi</div>
    }
  }
}
export default ActionModal;