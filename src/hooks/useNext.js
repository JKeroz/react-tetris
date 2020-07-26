import { useState, useEffect } from 'react';
import { createNext } from '../gameHelpers';

export const useNext = (player, resetPlayer) => {
  const [next, setNext] = useState(createNext());

  useEffect(() => {

    const updateNext = prevNext => {
      // First flush the Next stage
      const newNext = prevNext.map(row =>
        row.map(cell => (cell[1] === 'clear' ? [0, 'clear'] : cell)),
      );

      // Then draw the tetromino
      player.tetromino.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value !== 0) {
            newNext[y + player.pos.y][x + player.pos.x] = [
              value,
              `${player.collided ? 'merged' : 'clear'}`,
            ];
          }
        });
      });
      return newNext;
    };
    setNext(prev => updateNext(prev));
  }, [player.collided, player.pos.x, player.pos.y, player.tetromino]);

  return [next, setNext];
};