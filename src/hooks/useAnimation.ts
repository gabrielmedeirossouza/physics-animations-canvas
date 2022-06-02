import { useLayoutEffect, useRef } from "react";

export interface ILoop {
  ctx: CanvasRenderingContext2D;
  deltaTime: number;
  currentTime: number;
}

export type TLoopCallback = (props: ILoop) => void;

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

export const useAnimation = (loop: TLoopCallback) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const oldTime = useRef(0);

  const clearCanvas = (ctx: CanvasRenderingContext2D) => {
    ctx.beginPath()
    ctx.clearRect(-WIDTH, -HEIGHT, WIDTH * 2, HEIGHT * 2)
    ctx.closePath()
  }

  const beforeLoop = (time: number) => {
    if (!canvasRef.current) return;

    const ctx = canvasRef.current.getContext("2d")!;
    const currentTime = time / 1000;
    const deltaTime = currentTime - oldTime.current;

    oldTime.current = currentTime;

    clearCanvas(ctx);
    loop({ ctx, deltaTime, currentTime });
    requestAnimationFrame(beforeLoop)
  }

  useLayoutEffect(() => {
    requestAnimationFrame(beforeLoop)
  }, [])

  return canvasRef;
}