import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { TextField } from '@mui/material';
import { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import SSE from '../../api/sse'
import gameService from '../../api/game.service';

function GameInfo() {
  const game = useSelector(state => state.app.game);
  const dispatch = useDispatch()
  let eventSource = {};
  const [gameId, setGameId] = useState('');
  const createGame = () => {
    const data =
      {
        "timeControl":{
          "white":"100",
          "black":"100",
          "increment":"10"
        }
      }
    gameService.create(dispatch, data);
  }

  const joinGame = () => {
    gameService.join(dispatch, gameId);
    eventSource = new SSE(gameId, dispatch);
  }

  const draw = () => {
    gameService.drawOffer(dispatch, gameId);
  }

  const resign = () => {
    gameService.resign(dispatch, gameId);
  }

  
  return (
    <>
      <Box sx={{ minWidth: 275 }}>
        {game.resourceId ?
        <Card variant="outlined">
          <Typography variant="h5" component="div">
           {game.resourceId}
          </Typography>
          <CardContent>
            <Table sx={{ Width: '100%' }} aria-label="simple table">
              <TableBody>
                <TableRow>
                  <TableCell>White Player</TableCell>
                  <TableCell align="left">{game.whitePlayer}</TableCell>
                  <TableCell align="left">{game.timeControl.white}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Black Player</TableCell>
                  <TableCell align="left">{game.blackPlayer}</TableCell>
                  <TableCell align="left">{game.timeControl.white}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>{game.status.aditionalInfo}</TableCell>
                </TableRow>
                {game.drawOffer.white?
                  <TableRow>
                    <TableCell>white Offers Draw</TableCell>
                  </TableRow>:
                  game.drawOffer.black?
                  <TableRow>
                    <TableCell>black Offers Draw</TableCell>
                  </TableRow>:
                  null
                }
              </TableBody>
            </Table>
            
          </CardContent>
        </Card>
        :null
        }
        <TextField 
            fullWidth 
            label="Game Id" 
            id="gameId" 
            value={gameId}
            onChange={(event) => {
              setGameId(event.target.value);
            }} />
            <Button variant="outlined" onClick={createGame}>
              Create Game
            </Button>
            <Button variant="outlined" onClick={joinGame}>
              Join Game
            </Button>
            <Button variant="outlined" onClick={draw}>
              Offer Draw
            </Button>
            <Button variant="outlined" onClick={resign}>
              Resign
            </Button>
      </Box>
    </>
  );
}

export default GameInfo; 
