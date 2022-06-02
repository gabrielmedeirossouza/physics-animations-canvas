/**
 * ONDAS - senoide | onda senoidal | onda seno | onda sinusoide
 * 
 * É uma curva matemática que descreve uma oscilação repetitiva suave, sendo esta uma onda contínua.
 * É nomeada após a função seno. A sua forma mais básica como função do tempo (t) é:
 * 
 * y(x) = a * sin(2 * PI * f * x + φ) = a * sin(ω * x + φ)
 * 
 * a = amplitude, o desvio de pico da função de zero.
 * f = frequência normal, o número de oscilações (ciclos) que ocorrem cada segundo de tempo (hertz).
 * ω "omega" = 2πf, a frequência angular, a taxa de mudança do argumento da função em unidades de radianos por segundo.
 * φ "phi" = fase, especifica (em radianos) onde em seu ciclo a oscilação está em t = 0.
    - Quando φ  é diferente de zero, toda a forma de onda parece ser deslocada no tempo pela quantidade φ / ω segundos.
    Um valor negativo representa um atraso, e um valor positivo representa um adiantamento.
 */

export type TCalc = {
  amplitude: number;
  omega: number;
  phi: number;
}

export interface IWaveVirtual {
  size: number;
  step: number;
  calc: TCalc;
}

export const waveVirtual = (wave: IWaveVirtual) => {
  const coords: { x: number, y: number }[] = []

  for (let x = 0; x < wave.size; x += wave.step) {

    const y = wave.calc.amplitude * Math.sin(wave.calc.omega * x - wave.calc.phi)
    coords.push({ x, y })

  }

  return coords
}