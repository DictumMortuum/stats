import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import DeltaTable from './DeltaTable';
import BoardgameIcon from './BoardgameIcon';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  card: {
    minHeight: theme.spacing(70),
  },
  avatar: {
    backgroundColor: "#5e81ac",
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  table: {
    marginBottom: theme.spacing(1),
  }
}));


export default props => {
  const { boardgame, date, probability, stats } = props;
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            <BoardgameIcon boardgame={boardgame} />
          </Avatar>
        }
        title={boardgame}
        subheader={new Date(date).toLocaleDateString('el-GR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
      />
      <CardContent>
        <Typography className={classes.table} component="p">
          Outcome probability: {probability.toFixed(2)}%
        </Typography>
        <DeltaTable stats={stats} />
      </CardContent>
    </Card>
  );
}
