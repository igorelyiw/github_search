import axios from 'axios';
import React from 'react'
import s from './GitHub.module.css'

import { SearchResult, SearchUserType } from './GitHub';
import styled from 'styled-components';
import Paginator from './Paginator';
import Preloader from './Preloader';

interface Props {
  searchTerm: string
  selectedUser: string
  setSelectedUser: (user: string) => void
}

const Wrapper = styled.div`
width:400px;
color:white;
margin-top:16px;
`;
const CustomList = styled.ul`
list-style:none;
width:300px;
min-height:300px;
`;
const Icon = styled.img`
width:50px;
border-radius:50%;
margin-right:16px;
`;
interface IBtn {
  selectedItem: boolean
}
const ListItem = styled.li<IBtn>`
margin-bottom:16px;
padding-bottom:5px;
border-bottom:${(props: any) => props.selectedItem ? '2px solid white' : ''};

`;
const ListContainer = (props: any) => {
  const { selectedUser, setSelectedUser, searchTerm } = props
  const [users, setUsers] = React.useState<SearchUserType[]>([]);
  const [isLoading, setIsLoading] = React.useState(false)
  const [currentPage, setCurrentPage] = React.useState(1)
  const usersPerPage = 7

  React.useEffect(() => {
    setIsLoading(true)
    axios.get<SearchResult>(`https://api.github.com/search/users?q=${searchTerm}`)
      .then(res => setUsers(res.data.items))
      .then(res => setIsLoading(false))
  }, [searchTerm])

  const lastUserIndex = currentPage * usersPerPage
  const firstUsersIndex = lastUserIndex - usersPerPage
  let currentUsers = [...users].slice(firstUsersIndex, lastUserIndex)
  return (
    <Wrapper>
      {isLoading ? <Preloader size={100} /> : null}
      <CustomList>
        {currentUsers
          .map(el =>
            <ListItem key={el.id} selectedItem={selectedUser === el} onClick={() => setSelectedUser(el)}>
              <Icon src={el.avatar_url} />{el.login}
            </ListItem>)}
      </CustomList>
      <Paginator current={currentPage} total={users.length} pageSize={usersPerPage} onChange={(page) => setCurrentPage(page)} />
    </Wrapper>
  )
}

export default ListContainer
