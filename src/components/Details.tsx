import axios from 'axios'
import React from 'react'
import styled from 'styled-components'

import { SearchUserType, UsersType } from './GitHub'
import Timer from './Timer'

interface Props {
  selectedUser: SearchUserType
}
const Wrapper = styled.div`
color:white;
display:flex;
justify-content:center;
`;
const Title = styled.h2`
color:white;
text-align:center;
`;
const Image = styled.img`
border-radius:25%;
height:350px;
`;
const Content = styled.div`
margin-top:16px;
`;
export const initialSeconds = 10;

const Details = (props: Props) => {
  const { selectedUser } = props
  const [userDetails, setUserDetails] = React.useState<null | UsersType>(null)
  const [seconds, setSeconds] = React.useState(initialSeconds)
  React.useEffect(() => {
    if (!!selectedUser) {
      axios.get<UsersType>(`https://api.github.com/users/${selectedUser.login}`)
        .then(res => {
          setSeconds(initialSeconds)
          setUserDetails(res.data)
        })
    }
  }, [selectedUser])

  React.useEffect(() => {
    if (seconds < 1) setUserDetails(null)
  }, [seconds])

  return (
    <Wrapper >
      <div>{userDetails && <div>
        <Timer seconds={seconds} timerKey={userDetails.id} onChange={setSeconds} />
        <Title>{userDetails.login}</Title>
        <Image src={userDetails.avatar_url} /><br />
        <Content>{userDetails.login} <br />  <span>Followers:{userDetails.followers}</span></Content>
      </div>}
      </div>
    </Wrapper>
  )
}

export default Details
