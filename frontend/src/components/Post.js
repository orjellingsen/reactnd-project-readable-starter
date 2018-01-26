import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import moment from 'moment'

import { removePost } from '../middleware/posts'

import { withStyles } from 'material-ui/styles'
import IconButton from 'material-ui/IconButton'
import Typography from 'material-ui/Typography'
import Card, { CardHeader, CardContent, CardActions } from 'material-ui/Card'
import ThumbDown from 'material-ui-icons/ThumbDown'
import ThumbUp from 'material-ui-icons/ThumbUp'
import Comment from 'material-ui-icons/Comment'
import Delete from 'material-ui-icons/Delete'
import Edit from 'material-ui-icons/Edit'
import Button from 'material-ui/Button'

const styles = {
  card: {
    width: '90%',
    margin: '15px auto 15px auto',
  },
  flexGrow: {
    flex: '1 1 auto',
  },
  cardHeader: {
    backgroundColor: '#9FA8DA',
  },
  hidden: {
    display: 'none',
  },
  commentIcon: {
    marginRight: '5px',
  },
  rightIcon: {
    marginLeft: '5px',
  },
  button: {
    marginRight: '10px',
  },
}

class Post extends Component {
  state = {
    redirect: false,
    edit: false,
  }

  handleDelete = (id) => {
    this.props.deletePost(id)
    this.setState({ redirect: true })
  }

  handleEdit = (post) => {
    this.setState({ edit: true })
  }

  render() {
    const { classes, post, singlePost } = this.props
    const { redirect, edit } = this.state

    if (redirect) {
      return <Redirect to='/'/>
    }

    if (edit) {
      return (
        <Redirect to={`/update/${post.id}`} />
      )
    }

    return (
      <div>
        {post?
          <Card key = {post.id} className={classes.card}>
            <CardHeader
              title={post.title}
              subheader={`Posted ${moment(post.timestamp).fromNow()} by ${post.author}`}
              className={classes.cardHeader}
              color='accent'
            />
            {singlePost?
              <CardContent>
                <Typography component='p'>{post.body}</Typography>
              </CardContent>
            : ''}

            <CardActions>
              <IconButton aria-label='Like'>
                <ThumbUp />
              </IconButton>
              <IconButton>{post.voteScore}</IconButton>
              <IconButton aria-label='Dislike'>
                <ThumbDown />
              </IconButton>
              <div className={classes.flexGrow} />
              {singlePost?
                <Button onClick={(e) => this.handleEdit(post, e)} className={classes.button} raised color='primary'>
                  Edit
                  <Edit className={classes.rightIcon} />
                </Button>
              : ''}
              {singlePost?
                <Button onClick={(e) => this.handleDelete(post.id, e)} className={classes.button} raised color='primary'>
                    Delete
                    <Delete className={classes.rightIcon} />
                </Button>
              : ''}
              <Button className={classes.button} raised color='primary'>
                Comment
                <Comment className={classes.rightIcon} />
              </Button>
            </CardActions>
          </Card>
        :
          ''
        }
      </div>
    )
  }
}

function mapStateToProps () {
  return {
  }
}
function mapDispatchToProps (dispatch) {
  return {
    deletePost: (id) => dispatch(removePost(id)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Post))