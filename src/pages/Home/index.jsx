import GameInfo from "../../components/GameInfo";
import Grid from '@mui/material/Unstable_Grid2';
import Box from "@mui/material/Box";

function Home() {
  return (
    <Box sx={{ flexGrow: 1 }} alignCenter>
      <Grid container spacing={2} sx={{justifyContent: 'center', margin: 0}}>
        <Grid xs={4}>
            <GameInfo />
        </Grid>
        <Grid xs={2}>
            <GameInfo />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Home; 
