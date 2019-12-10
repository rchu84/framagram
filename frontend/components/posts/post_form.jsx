import React from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class PostForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      caption: "",
      photos: [],
      photoUrls: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
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
              photos: [...this.state.photos, file],
              photoUrls: [...this.state.photoUrls, reader.result]
            });
          }
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
    for (let i = 0; i < photos.length; i++) {
      formData.append('post[photos][]', photos[i]);
    }
    formData.append('post[author_id]', this.props.currentUserId);

    //const bench = Object.assign({}, this.state);
    this.props.createPost(formData)
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
            name={this.state.photos.toString()}
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

        {/* <label>Images
          <input
            type="file"
            accept='image/*'
            onChange={this.handleInput('photos')}
            name={this.state.photos.toString()}
            multiple
          />
        </label>

        <label>Caption
          <input
            type="text"
            onChange={this.handleInput('caption')}
            value={this.state.caption}
          />
        </label> */}

        <Button variant="success" type="submit">Create Post</Button>
      </Form>
    );
  }
}

export default PostForm;