import { Canvas } from './components/Canvas'
import { ocean } from './canvas/ocean'
import type { ILoop } from './components/Canvas'

const WIDTH = window.innerWidth
const HEIGHT = window.innerHeight

function App() {
  const loop = ({ ctx, deltaTime, currentTime }: ILoop) => {
    const ocean1 = ocean({
      style: {
        color: "#2351b6"
      },
      position: {
        x: 0,
        y: 400
      },
      bounds: {
        height: HEIGHT
      },
      wave: {
        size: WIDTH + 200,
        step: 5,
        calc: {
          amplitude: 10,
          omega: 0.1,
          phi: currentTime
        }
      },
      superposition: [
        {
          amplitude: 5,
          omega: 0.02,
          phi: currentTime * 4
        },
        {
          amplitude: 10,
          omega: 0.01,
          phi: -currentTime * 3
        }
      ]
    })

    ocean1.update(ctx)
  }

  return <Canvas loop={loop} width={WIDTH} height={HEIGHT} />
}

export default App
