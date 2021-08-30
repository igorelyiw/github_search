import axios from 'axios'
import React from 'react'
import styled from 'styled-components'
import s from './GitHub.module.css'

import Details from './Details'
import ListContainer from './ListContainer'
import Search, { Button } from './Search'

export type SearchUserType = {
  login: string
  id: number
  avatar_url?: string
}
export type SearchResult = {
  items: SearchUserType[]
}
export type UsersType = {
  login: string
  id: number
  avatar_url: string
  followers: number
}

const Wrapper = styled.div`
display:flex;
justify-content:center;
background-image:url(https://cdn.pizap.com/pizapfiles/images/photo_backgrounds_textures_app04.jpg);
background-repeat:no-repeat;
background-size:cover;
width:100%;
min-height:100vh;
padding:32px;
`;
const ListWrapper = styled.div`
width:30%;
display:flex;
flex-direction:column;
`;
const ButtonReset = styled(Button)`
margin-top:8px;
`;
const DetailsWrapper = styled.div`
width:30%;
`;
const inititialTerm = "it-kamasutra"
const GitHub = () => {
  const [selectedUser, setSelectedUser] = React.useState<SearchUserType | null>(null)
  const [searchTerm, setSearchTerm] = React.useState(inititialTerm);
  React.useEffect(() => {
    console.log('SYNC TAB TITLE');
    if (!!selectedUser) {
      document.title = selectedUser.login
    }
  }, [selectedUser]);

  return (
    <Wrapper >
      <ListWrapper>
        <Search value={searchTerm} setSearchTerm={(e) => setSearchTerm(e)} />
        <ButtonReset onClick={() => setSearchTerm(inititialTerm)}>Reset</ButtonReset>
        <ListContainer
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
          searchTerm={searchTerm}
        />
      </ListWrapper>
      <DetailsWrapper>
        {selectedUser && <Details selectedUser={selectedUser} />}
      </DetailsWrapper>
    </Wrapper>
  )
}

export default GitHub
