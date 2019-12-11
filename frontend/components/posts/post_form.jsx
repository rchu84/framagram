import React from 'react';
import { withRouter } from 'react-router-dom';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

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
  }

  componentDidUpdate(prevProps) {
    // for editing

    if (this.props.post !== prevProps.post) {
      const { caption, photoUrls } = this.props.post;
      photoUrls.forEach(photoUrl => {
        fetch(photoUrl)
          .then(response => response.blob())
          .then(blob => {
            let reader = new FileReader();
            reader.onloadend = () => {
              this.setState({
                photos: { [photoUrl]: blob }
              });
            };
            reader.readAsDataURL(blob);
          });
      });

      this.setState({ caption, photoUrls });
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
            this.setState({
              photoUrls: [...this.state.photoUrls, reader.result],
              photos: { [reader.result]: file }
            });
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
    //Sumbit handler
    // e.preventDefault();
    // const formData = new FormData();
    // formData.append('image', this.state.file);
    // axios.get('/api/upload', formData)
    //   .then(response => { console.log(response) });


    e.preventDefault();
    const { caption, photos } = this.state;
    const formData = new FormData();
    formData.append('post[caption]', caption);

    let differences = this.state.photoUrls.filter(x => !this.props.post.photoUrls.includes(x));
    console.log(differences);

    // let postPhotos = Object.values(photos);
    for (let i = 0; i < differences.length; i++) {
      formData.append('post[photos][]', photos[differences[i]]);
    }
    if (!this.props.deletePost) {
      formData.append('post[author_id]', this.props.currentUserId);
    }

    //const bench = Object.assign({}, this.state);
    this.props.submit(formData)
      .then(() => this.props.history.push('/'));
  }

  render() {
    return (
      <Form className="form-wrapper" onSubmit={this.handleSubmit}>

        <div className="img-previews">
        {this.state.photoUrls.map((imagePreviewUrl, idx) => 
          <img key={idx} alt='previewImg' src={imagePreviewUrl} className="img-responsive" />
        )}
        </div>

        <Form.Group>
          <Form.Label>Images</Form.Label>
          <Form.Control
            type="file"
            accept='image/*'
            onChange={this.handleInput('photos')}
            name={Object.values(this.state.photos).toString()}
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