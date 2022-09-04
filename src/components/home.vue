<script lang="ts">
  import { Chessground } from 'chessground';
  import type { Config } from 'chessground/config'
  import type { Api } from "chessground/api";
  import { Chess, type ChessInstance, SQUARES, type Square } from 'chess.js'
  import { onMounted, reactive, ref } from 'vue';
  import type { Color, Key } from 'chessground/types';

  export function makeMove(cg:Api, moveFrom:Key, moveTo:Key) {
    cg.move(moveFrom,  moveTo);
  }
  function closeSseConnection(es:EventSource) {
    if(es){
      es.close();
    }
  }
  export function toDests(chess: ChessInstance): Map<Key, Key[]> {
    const dests = new Map();
    SQUARES.forEach(s => {
      const ms = chess.moves({square: s, verbose: true});
      if (ms.length) dests.set(s, ms.map(m => m.to));
    });
    return dests;
  }
  
  export default {
    name: "chessBoard",
    setup() {
      var eventSource:EventSource;

      const board = ref();
      const data = reactive({
        id:'',
        blackPlayer:'',
        whitePlayer:'',
        status:'',
        turn:'',
        fen:'',
        drawOffer:'',
      });

      const config:Config = {
        fen: '8/8/8/8/8/8/8/8 w - - 0 1',
        viewOnly: true,
        animation: {
          duration: 100
        },
        movable: {
          free: false
        },
        drawable: {
          visible: false
        }
      };

      const sseConnect = async (cg:Api, id:string) => {
        closeSseConnection(eventSource);
        eventSource = new EventSource('http://localhost:3000/games/'+id+'/sse');
        eventSource.onmessage = (e) => {
          const event = JSON.parse(e.data);
          if(event.type === 'move'){
            const from = event.game.history.slice(-1)[0].move.from;
            const to = event.game.history.slice(-1)[0].move.to;
            makeMove(cg, from, to);
          }else if(event.type === 'join'){
            data.blackPlayer = event.game.blackPlayer;
            data.whitePlayer = event.game.whitePlayer;
            data.status = event.game.status.aditionalInfo;   
          }else if(event.type === 'resign'){
            data.status = event.game.status.aditionalInfo;
          }else if(event.type === 'drawOffer' || event.type === 'drawCancel'){
            if(event.game.drawOffer.white === event.game.drawOffer.black === true){
              data.drawOffer = 'Draw accepted';
              data.status = event.game.status.aditionalInfo;
            }else{
            (event.game.drawOffer.white === true)?data.drawOffer = 'Whites offer a draw':data.drawOffer = '';
            (event.game.drawOffer.black === true)?data.drawOffer = 'Black offers a draw':data.drawOffer = data.drawOffer;
          }
        }
       }
      }

      const joinGame = async () => {
        fetch(`http://localhost:3000/games/${data.id}/join`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          credentials: 'include',
        }).then(res => res.json()).then(res => {
          data.id = res.resourceId;
          data.blackPlayer = res.blackPlayer;
          data.whitePlayer = res.whitePlayer;
          data.status = res.status.aditionalInfo;
          data.turn = res.turn;
          data.fen = res.FEN;
          const cg = Chessground(board.value, config);
          cg.set({fen: data.fen});
          sseConnect(cg,data.id);
        }).catch(err => console.log(err));
      }

      const createGame = async () => {
        fetch('http://localhost:3000/games', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          credentials: 'include',
          body: JSON.stringify({
            'timeControl':{
              'white':'100',
              'black':'100',
              'increment':'10'
            }
          })
        }).then(res => res.json()).then(res => {
          data.id = res.resourceId;
          data.blackPlayer = res.blackPlayer;
          data.whitePlayer = res.whitePlayer;
          data.status = res.status.aditionalInfo;
          data.turn = res.turn;
          data.fen = res.FEN;
          const cg = Chessground(board.value, config);
          cg.set({fen: data.fen});
          sseConnect(cg,data.id);
        }).catch(err => console.log(err));
      }

      onMounted(() => {
        Chessground(board.value, config);
      })
      return {createGame, joinGame, data, board}
    }
  }
</script>

<style>
  @import "@/assets/board.css";
  .info-table{
    max-width: 400px;
  };
</style>

<template>
  <div class="align-items-center d-flex flex-row justify-content-center" >
    <div class="blue merida">
      <div ref="board" class="cg-board-wrap"></div>
    </div>
    <div class="d-flex flex-column align-items-center" style="margin-left: 25px;" >
      <div class="row row-cols-lg-auto g-3 align-items-center">
        <div class="col-12">
          <label class="visually-hidden" for="inlineFormInputGroupGameId">Game ID</label>
          <div class="input-group">
            <div class="input-group-text">ID</div>
            <input v-model="data.id" type="text" class="form-control" id="inlineFormInputGroupGameId" placeholder="painful-pink-pawn-c2">
            <button type="submit" class="btn btn-outline-primary" @click="joinGame">Join game</button>
          </div>
        </div>
      </div>
      <h5> OR </h5>
      <button type="button" class="btn btn-outline-success" @click="createGame">Create game</button>
      <table class="table info-table ml-5">
        <tbody>
          <tr>
            <td>id:</td>
            <td>{{data.id}}</td>
          </tr>
          <tr>
            <td>black player:</td>
            <td>{{data.blackPlayer}}</td>
          </tr>
          <tr>
            <td>white player:</td>
            <td>{{data.whitePlayer}}</td>
          </tr>
          <tr>
            <td>status:</td>
            <td>{{data.status}}</td>
          </tr>
          <tr>
            <td>turn:</td>
            <td>{{data.turn}}</td>
          </tr>
          <tr>
            <td>fen:</td>
            <td>{{data.fen}}</td>
          </tr>
          <tr>
            <td>drawOffer:</td>
            <td>{{data.drawOffer}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>