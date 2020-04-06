import React from 'react';

const GameCell = ({rowIndex, colIndex, currentStatus, onSelect}) => {
  const appliedClass = currentStatus === 1 ? 'bg-red' : currentStatus === 2 ? 'bg-green' : '';

  const handleClick = () => onSelect(rowIndex, colIndex);

  return (
    <td className={appliedClass} onClick={handleClick}>
    </td>
  );
};

export default GameCell;