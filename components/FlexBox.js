import styled from "styled-components";

const direction = ({ direction }) =>
  direction && `flex-direction: ${direction};`;

const align = ({ align }) => align && `align-items: ${align};`;
const justify = ({ justify }) => justify && `justify-content: ${justify};`;
const wrap = ({ fwrap }) => fwrap && `flex-wrap : wrap`;
const center = ({ center }) =>
  center && `align-items: center; justify-content: center;`;

const FlexBoxContainer = styled.div`
  flex: 1,
  position: relative;
  ${direction}
  ${align}
  ${justify}
  ${center}
  ${wrap}
`;

const FlexBox = ({ align, direction, justify, center, wrap }) => {
  return <FlexBoxContainer></FlexBoxContainer>;
};

export default FlexBox;
