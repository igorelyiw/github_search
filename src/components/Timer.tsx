import React from 'react'
import styled from 'styled-components';

interface Props {
  seconds: number
  timerKey: number
  onChange: (seconds: number) => void
}
const Wrapper = styled.div`
color:white;
font-weight:700;
font-size:24px;
`;
const Timer = (props: Props) => {
  const { seconds, timerKey, onChange } = props
  const [state, setState] = React.useState(seconds)
  React.useEffect(() => {
    const interval = setInterval(() => {
      setState(state => state - 1)
    }, 1000);
    return () => {
      clearInterval(interval)
    }
  }, [timerKey])
  React.useEffect(() => {
    setState(seconds)
  }, [seconds])
  React.useEffect(() => {
    onChange(state)
  }, [state])

  return (
    <Wrapper>
      {state}
    </Wrapper>
  )
}

export default Timer
