import React from 'react';
import { withRouter } from 'react-router-dom';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class PostForm extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   caption: "",
    //   photos: [],
    //   photoUrls: []
    // };
    this.state = Object.assign({}, this.props.post, { photos: {} });
    
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.removePreview = this.removePreview.bind(this);
  }

  fetchPhotosFromUrls(photoUrls) {
    photoUrls.forEach(photoUrl => {
      fetch(photoUrl)
        .then(response => response.blob())
        .then(blob => {
          let reader = new FileReader();
          reader.onloadend = () => {
            this.setState({
              photos: { ...this.state.photos, [photoUrl]: blob }
            });
          };
          reader.readAsDataURL(blob);
        });
    });
  }

  // static getDerivedStateFromProps(props, state) {
  //   if (props.post.id !== state.id) {
  //     const { id, caption, photoUrls } = props.post;

  //     let photos = {};
  //     photoUrls.forEach(photoUrl => {
  //       fetch(photoUrl)
  //         .then(response => response.blob())
  //         .then(blob => {
  //           let reader = new FileReader();
  //           reader.onloadend = () => {
  //             photos[photoUrl] = blob;
  //           };
  //           reader.readAsDataURL(blob);
  //         });
  //     });

  //     return { id, caption, photoUrls, photos };
  //   }
  //   else {
  //     return state;
  //   }
  // }
  componentDidMount() {
  // componentDidUpdate(prevProps, prevState) {
    const { photoUrls } = this.props.post;
    const { photos } = this.state;
    if (Object.keys(photos).length !== photoUrls.length) {
      this.fetchPhotosFromUrls(photoUrls);
    }
  }


  removePreview(url) {
    return e => {
      let newPhotos = Object.assign({}, this.state.photos);
      let newPhotoUrls = this.state.photoUrls.filter(item => item !== url);
      delete newPhotos[url];
      // console.log(newPhotos);
      document.getElementById("imgInput").value = "";
      // this.setState({
      //   photos: { ...this.state.photos, [photoUrl]: blob }
      // });
      this.setState({ photos: newPhotos, photoUrls: newPhotoUrls });
    }
  }

  handleDelete(e) {
    e.preventDefault();
    this.props.deletePost(this.props.post.id)
      .then(() => this.props.history.push('/'));
  }

  handleInput(type) {
    if (type == 'photos') {
      return e => {
        e.preventDefault();
        let files = Array.from(e.target.files);
        files.forEach((file) => {
          let reader = new FileReader();
          reader.onloadend = () => {
            if (!this.state.photoUrls.includes(reader.result)) {
              this.setState({
                photoUrls: [...this.state.photoUrls, reader.result],
                photos: { ...this.state.photos, [reader.result]: file }
              });
            }
          };
          reader.readAsDataURL(file);
        });
      }
    } else {
      return e => {
        this.setState({ [type]: e.target.value })
      };
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const { caption, photos } = this.state;
    const formData = new FormData();
    formData.append('post[caption]', caption);

    // console.log(photos);

    let postPhotos = Object.values(photos);
    for (let i = 0; i < postPhotos.length; i++) {
      formData.append('post[photos][]', postPhotos[i]);
    }
    // don't need to include user ID on UPDATE request
    if (!this.props.deletePost) {
      formData.append('post[author_id]', this.props.currentUserId);
    }
    this.props.submit(formData)
      .then(() => this.props.history.push('/'));
  }

  render() {
    return (
      <Form className="form-wrapper" onSubmit={this.handleSubmit}>
        {this.props.errors.map((error, idx) => <p className="post-errors text-center" key={idx}>{error}</p>)}
        
        {this.state.photoUrls.map((imagePreviewUrl, idx) => 
          <div className="img-previews" key={idx}>
            <img alt='previewImg' src={imagePreviewUrl} className="img-responsive" />
            <Button variant="light" className="img-previews-close" onClick={this.removePreview(imagePreviewUrl)}><FontAwesomeIcon icon="times" /></Button>
          </div>
        )}
        

        <Form.Group>
          <Form.Label>Images</Form.Label>
          <Form.Control
            id="imgInput"
            type="file"
            accept='image/*'
            onChange={this.handleInput('photos')}
            multiple
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Caption</Form.Label>
          <Form.Control
            type="text"
            onChange={this.handleInput('caption')}
            value={this.state.caption}
          />
        </Form.Group>

        <Button variant="success" type="submit">{this.props.deletePost ? "Edit Post" : "Create Post"}</Button>
        {this.props.deletePost ? <Button variant="danger" onClick={this.handleDelete}>Delete Post</Button> : ""}

      </Form>
    );
  }
}

export default withRouter(PostForm);