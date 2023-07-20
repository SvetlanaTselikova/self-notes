import React from 'react';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import Divider from '@mui/material/Divider';

import { DayMood, Note } from '../../redux/types';
import {format} from 'date-fns';
 
type Props = {
  note: Note
}

const IconMoodMap = {
  [DayMood.good]: <SentimentSatisfiedIcon/>,
  [DayMood.bad]: <SentimentDissatisfiedIcon/>,
  [DayMood.normal]: <SentimentNeutralIcon/>
}

export const NoteCard = (props: Props) => { 
  const {id, text, createdAt,  mood} = props.note;


  return (        <React.Fragment> <ListItem disablePadding key={id}>
    <ListItemButton>
      <ListItemIcon>
        {IconMoodMap[mood]}
      </ListItemIcon>
      <ListItemText primary={format(new Date(createdAt),'yyyy-MM-dd hh:mm')} secondary={text} />
    </ListItemButton>
  </ListItem>
  <Divider variant="inset" component="li" />
  </React.Fragment>)


} 
