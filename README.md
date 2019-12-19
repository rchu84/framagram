# Framagram

[Framagram-Heroku](https://framagram.herokuapp.com "Framagram")

Framagram, inspired by Instagram, is a social media web app that allows users to share images w/ their close friends and families that can be viewed, liked, and commented on by other users.

The web app is a single-page application, it's also responsive and fully functional with the following features.

---

# Features

### User Sign Up / Login

Users can sign up or login to see their timeline/feed of all the latest photos shared by their friends. Users would also need to login to Like or Comment on photos and follow other users.

### Photos Feed

An infinite-scroll, reverse-chronological feed of all the photos shared by people you follow.

### Create New Photo Post

Add up to 10 photos to a single post, and it'll be displayed in a carousel format in photos feed!

### Likes & Comment

Like and comment on photos from your friends!

### Follow More People

Follow more users and instantly start seeing their latest photos in your feed!

---

# Tech Stack

#### Front-End

React 16.12/Redux
Bootstrap 4.4

#### Back-end

Rails 5.2
PostgreSQL
AWS S3 (for serving photos)

---

# Technical Features & Challenges Faced

#### React State Hooks (new since React 16.8)
```javascript
const UserInfo = (props) => {
  const {
    posts,
    user,
    users,
    followUser,
    unfollowUser,
    currentUserId,
    fetchFollowing,
    fetchFollowers
  } = props;

  const [modal, setModal] = useState({
    isOpen: false,
    title: null
  });

  const toggle = (obj) => setModal({ isOpen: !modal.isOpen, title: obj.title });

  const follow = (userId) => followUser(userId);
  const unfollow = (userId) => unfollowUser(userId);

  useEffect(() => {
    if (modal.isOpen) {
      modal.title === "Following" ? 
        fetchFollowing(user.id) : 
        fetchFollowers(user.id);
    }
  }, [modal]);

```

#### Rails API Posts Controller handling image resizing and infinite scroll logic
```ruby
class Api::PostsController < ApplicationController
  skip_before_action :authenticate_user, only: [:show]

  LIMIT = 5

  def index
    followingIds = current_user.following.ids
    followingIds << current_user.id
    @posts = Post.includes(:author, :post_likes, :likers, :comments, :commenters)
      .with_attached_photos
      .where(author_id: followingIds)
      .limit(LIMIT)
      .order(created_at: :desc)
    
    @posts = @posts.where('posts.created_at < :max_created_at', max_created_at: params[:max_created_at]) if params[:max_created_at].present?

  end

  def show
    @post = Post.includes(:author, :post_likes, :likers, :comments, :commenters)
      .with_attached_photos.find(params[:id])
  end

  def create
    unless params[:post].nil? || params[:post][:photos].nil?
      post_images = { photos: [] }
      params[:post][:photos].each do |photo|
        image = MiniMagick::Image.new(photo.tempfile.path) do |b|
          b.resize "640x640^"
          b.extent "640x640"
          b.gravity "center"
        end
        post_images[:photos] << image
      end
      post_params.merge!(post_images)
    end
    @post = Post.new(post_params)
    if @post.save
      render :show
    else
      render json: @post.errors.full_messages, status: :unprocessable_entity
    end
  end
```

#### Handling multiple image previews and uploads
```javascript
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
 ```

#### Post Index Item handling like/comment states
```javascript
class PostIndexItem extends React.Component {
  constructor(props) {
    super(props);
    let postLikeByCurrentUser = this.props.postLikes.find(el => el.user_id === this.props.currentUserId);
    this.state = {
      comment: "",
      likeCount: this.props.postLikes.length,
      liked: postLikeByCurrentUser ? true : false,
      postLikeId: postLikeByCurrentUser ? postLikeByCurrentUser.id : null
    };
    this.handleLikeClick = this.handleLikeClick.bind(this);
    this.handleCommentInput = this.handleCommentInput.bind(this);
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
    this.handleCommentDelete = this.handleCommentDelete.bind(this);
    this.mouseEnter = this.mouseEnter.bind(this);
    this.mouseLeave = this.mouseLeave.bind(this);
  }

  componentDidMount() {
    if (this.props.filters) {
      this.props.fetchPost(this.props.match.params.postId)
        .then(res => {
          let postLikes = res.results.post_likes;
          let postLikeByCurrentUser = Object.values(postLikes).find(el => el.user_id === this.props.currentUserId);
          this.setState({
            likeCount: Object.keys(postLikes).length,
            liked: postLikeByCurrentUser ? true : false,
            postLikeId: postLikeByCurrentUser ? postLikeByCurrentUser.id : null
          });
        });
    }
  }
 ```

#### Single-page Routes
```javascript
const App = () => (
  <div>
    <header>
      <NavbarContainer />
    </header>

    <Switch>
      <AuthRoute path="/login" component={LoginFormContainer} />
      <AuthRoute path="/signup" component={SignupFormContainer} />
      
      <Route exact path="/p/:postId"
        render={props => <div className="posts-wrapper"><PostDetailContainer {...props} /></div>} />
      <Route exact path="/:username" component={UserContainer} />
      <ProtectedRoute exact path="/" component={PostIndexContainer} />
      <ProtectedRoute exact path="/posts/new" component={CreatePostFormContainer} />
      <ProtectedRoute exact path="/p/:postId/edit" component={EditPostFormContainer} />
    </Switch>
  </div>
);
```

---

# Testing

To test Rails models and controllers, simply run:
```
bundle install
bundle exec rspec spec
```
This will run all the tests inside the spec/ folder.

---

# Deploy and host your own photo-sharing web app!

Make sure the following versions of Node and Ruby are installed on your system:
* Node v10.13.0
* Ruby v2.5.1

Then, install the relevant node modules and ruby gems:
```
npm install
bundle install
```

Start webpack:
```
npm run webpack
```

Set up PostgreSQL DB
```
rails db:setup
rails db:migrate
```

Also need to set up your own AWS S3 bucket to upload photos:
```
bundle exec rails credentials:edit
```

Finally, start Rails server
```
rails s
```

And visit [http://localhost:3000](http://localhost:3000) to see the login screen!
