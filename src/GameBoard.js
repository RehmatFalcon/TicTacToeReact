import React from 'react';
import GameCell from './GameCell';

const GameBoard = ({gameMatrix, onCellSelect}) => {
  return (
    <table>
      <tbody>
        {
          gameMatrix.map( (row, rowIndex) => {
            return (
              <tr>
              {
                row.map( (col, colIndex) => {
                  return (
                    <GameCell 
                      colIndex={colIndex} 
                      rowIndex={rowIndex} 
                      currentStatus={col} 
                      onSelect={onCellSelect}
                      />
                  );
                } )
              }            
              </tr>
            );
          })
        }
      </tbody>
    </table>
  );
};
export default GameBoard;