type TCoord = {
  x: number;
  y: number;
}

export interface IBoundsVirtual {
  leftTop: TCoord;
  rightTop: TCoord;
  leftBottom: TCoord;
  rightBottom: TCoord;
}

export const boundsVirtual = ({ leftTop, rightTop, leftBottom, rightBottom }: IBoundsVirtual) => {
  const coords = [
    {
      x: rightTop.x,
      y: rightTop.y
    },

    {
      x: rightBottom.x,
      y: rightBottom.y
    },

    {
      x: leftBottom.x,
      y: leftBottom.y
    },

    {
      x: leftTop.x,
      y: leftTop.y
    }
  ]

  return coords
}