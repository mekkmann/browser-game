Array.prototype.parse2D = function () {
  const rows = [];
  for (let i = 0; i < this.length; i += 16) {
    rows.push(this.slice(i, i + 16));
  }

  return rows;
};

Array.prototype.createObjectsFrom2DArray = function () {
  const objects = [];
  this.forEach((row, rowIndex) => {
    row.forEach((symbol, colIndex) => {
      if (symbol === 292) {
        objects.push(
          new CollisionBlock({
            position: {
              x: colIndex * 64,
              y: rowIndex * 64,
            },
          })
        );
      }
    });
  });

  return objects;
};
