import { useAnimation } from "../../hooks/useAnimation"
import type { TLoopCallback } from "../../hooks/useAnimation"
export type { ILoop } from "../../hooks/useAnimation"

interface ICanvas {
  loop: TLoopCallback;
  width: number;
  height: number;
}

export const Canvas = (props: ICanvas) => {
  const canvasRef = useAnimation(props.loop);

  return (
    <canvas
      ref={canvasRef}
      width={props.width}
      height={props.height}
    >
      Seu navegador não suporta a tecnologia "canvas", por favor, atualize seu navegador.
    </canvas>
  )
}