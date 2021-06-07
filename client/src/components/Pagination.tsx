import React, { useEffect } from 'react'
import useStyles from './styles'
import {Pagination, PaginationItem} from '@material-ui/lab' 
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getPosts } from '../actions/postsActions'

interface Props {
  page: any
}

const Paginate = ({page}: Props) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  // state.posts is the reducer that is going to have access to numberOfPages state
  const {numberOfPages} = useSelector((state: any) => state.posts)

  useEffect(() => {
    if(page) dispatch(getPosts(page))
  }, [dispatch, page])

  return (
    <Pagination
      classes={{ul: classes.ul}}
      count={numberOfPages}
      page={Number(page) || 1}
      variant="outlined"
      color="primary"
      renderItem={(item: any) => (
        <PaginationItem { ...item} component={Link} to={`/posts?page=${item.page}`} />
      )}
    />
  )
}

export default Paginate
