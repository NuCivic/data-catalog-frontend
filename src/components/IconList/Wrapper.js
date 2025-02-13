import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 24px 0;
  h2 {
    display: block;
    text-align: center;
    margin: 2rem 15px;
  }
  ul {
    list-style: none;
    display: flex;
    align-items: stretch;
    align-content: flex-start;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: center;
    padding: 0;
  }
  li {
    text-align: center;
    padding-left: 15px;
    padding-right: 15px;
  }
  @media screen and (min-width: 1200px) {
    li {
      max-width: 25%;
    }
  }
`;

export default Wrapper;