import { waveVirtual } from './wave.virtual'
import { boundsVirtual } from './bounds.virtual'
import type { IWaveVirtual, TCalc } from './wave.virtual'

type TStyle = {
  color: string;
}

type TCoord = {
  x: number;
  y: number;
}

type TBounds = {
  height: number;
}

interface IOcean {
  style: TStyle;
  position: TCoord;
  bounds: TBounds;
  wave: IWaveVirtual;
  superposition?: TCalc[];
}

export const ocean = ({ style, wave, superposition, bounds, position }: IOcean) => {
  if (superposition && superposition.length && superposition.length < 2) {
    throw new Error('Ocean: superposition must have at least 2 elements')
  }

  const superpositionCoords = superposition?.map((calc) => waveVirtual({
    calc,
    size: wave.size,
    step: wave.step,
  })) ?? []

  const waveCoords = waveVirtual(wave)
  const boundsCoords = boundsVirtual({
    rightTop: { x: waveCoords.at(-1)!.x, y: waveCoords.at(-1)!.y },
    rightBottom: { x: waveCoords.at(-1)!.x, y: bounds.height },
    leftBottom: { x: waveCoords.at(0)!.x, y: bounds.height },
    leftTop: { x: waveCoords.at(0)!.x, y: waveCoords.at(0)!.y },
  })

  const render = (ctx: CanvasRenderingContext2D, coords: TCoord[]) => {
    ctx.beginPath()

    drawLinesByCoords(coords)
    drawLinesByCoords(boundsCoords)

    ctx.fillStyle = style.color
    ctx.fill()
    ctx.closePath()

    function drawLinesByCoords(coords: TCoord[]) {
      coords.forEach(({ x, y }) => ctx.lineTo(x + position.x, y + position.y))
    }
  }

  const renderSuperpositionOcean = (ctx: CanvasRenderingContext2D) => {
    const superpositionWave = superpositionCoords[0].map((coord, i) => {

      let y = coord.y

      for (let j = 0; j < superpositionCoords.length; j++) {
        const superpositionCoord = superpositionCoords[j].at(i)

        if (superpositionCoord) {
          y += superpositionCoord.y
        }
      }

      return { x: coord.x, y }

    })

    render(ctx, superpositionWave)
  }

  const renderSingleOcean = (ctx: CanvasRenderingContext2D) => {
    render(ctx, waveCoords)
  }

  const update = (ctx: CanvasRenderingContext2D) => {
    if (superposition?.length) {
      renderSuperpositionOcean(ctx)
      return
    }

    renderSingleOcean(ctx)
  }

  return {
    update,
  }
}