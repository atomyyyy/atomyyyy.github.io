import React from 'react';
import styled from 'styled-components';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

// component
import EducationRecord from './ResumeRecord';

// data
import EducationData from '../data/EducationData';

const SectionWrapper = styled.section`
  width: 100%;
  background-color: white;
  display:inline-flex;
  align-items:center;
  justify-content:center;
`;

const StyledGridContainer = styled(Grid)`
  width: 100%;
  color: black;
  max-width: calc(60%, 220px);
  min-width: 220px;
  max-width: 700px;
  padding: 30px;
`

const StyledTitle = styled(Typography)`
  text-decoration: underline;
  text-underline-offset: 2px;
  text-decoration-color: #E7D1FF;
`

const Education = () => (
  <SectionWrapper id='education'>
    <StyledGridContainer container justifyContent='space-between' spacing={1}>
      <Grid item xs={12}>
        <StyledTitle align={'center'} variant='h4'>
          <b>Education</b>
        </StyledTitle>
      </Grid>
      {
        EducationData.map((data, ix) => (
          <Grid item xs={12} key={`${data.name}-education-${ix}`}>
            <EducationRecord {...data} />
          </Grid>
        ))
      }
    </StyledGridContainer>
  </SectionWrapper>
)

export default Education;
