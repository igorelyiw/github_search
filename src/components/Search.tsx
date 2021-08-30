import React from 'react';
import styled from 'styled-components';

interface Props {
  setSearchTerm: (str: string) => void
  value: string
}

const Wrapper = styled.div`
max-width:400px;
min-width:260px;
`;
const Input = styled.input`
width:50%;
padding:5px;
outline:none;
margin-right:16px;
box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
`;
export const Button = styled.button`
width:100px;
background: linear-gradient(to right, blue, pink);
padding:5px;
color:white;
font-weight:700;
box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
`;
const Search = (props: Props) => {
  const { setSearchTerm, value } = props
  const [tempSearch, setTempSearch] = React.useState(value)
  React.useEffect(() => {
    setTempSearch(value)
  }, [value])
  return (
    <Wrapper>
      <Input placeholder="search" type="text" value={tempSearch} onChange={(e) => setTempSearch(e.currentTarget.value)} />
      {tempSearch !== value && <Button onClick={() => setSearchTerm(tempSearch)}>Find</Button>}
    </Wrapper>
  )
}

export default Search
