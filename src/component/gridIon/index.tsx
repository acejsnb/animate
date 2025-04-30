'use client';
import type { RefObject } from "react";
import {useEffect, useRef, useImperativeHandle} from "react";
import type {Scope} from "animejs";
import {createScope, utils, stagger, createTimeline} from "animejs";

interface Props {
  ref?: RefObject<any>;
}

const backgroundColor = ['rgba(255,255,255,0.3)', '#f00', '#0f0', '#f0f', '#ff0', 'rgba(255,255,255,0.3)'];
const rotate = () => utils.random(-360, 360);
const translateX = () => utils.random(-100, 100);
const translateY = () => utils.random(-100, 100);

export default function GridIon({ref}: Props) {
  const root = useRef(null);
  const scope = useRef<Scope>(null);

  useEffect(() => {
    scope.current = createScope({root}).add((self) => {
      const dots = utils.$('.dot');

      const addHandler = (from: number | "first" | "center" | "last" | undefined) => ({
        delay: stagger(100, {grid: [30, 30], from}),
        rotate: from === 'last' ? 0 : rotate,
        translateX: from === 'last' ? 0 : translateX,
        translateY: from === 'last' ? 0 : translateY,
        backgroundColor: from === 'last' ? ['rgba(255,255,255,0.8)', 'rgba(255,255,255,0.3)'] : backgroundColor
      });
      const timerLine = createTimeline({loop: true, autoplay: false, defaults: {ease: 'inOutExpo'}})
        .add(dots, addHandler('first'))
        .add(dots, addHandler('center'))
        .add(dots, addHandler('last'));

      self.add('reset', () => {
        timerLine.reset()
      });
      self.add('play', () => {
        timerLine.play()
      });
      self.add('pause', () => {
        timerLine.pause()
      });
    });

    return () => scope.current?.revert();
  }, []);

  useImperativeHandle(ref, () => ({
    root: root,
    reset: () => scope.current?.methods.reset(),
    play: () => scope.current?.methods.play(),
    pause: () => scope.current?.methods.pause(),
  }));

  return (
    <div ref={root} className="flex items-center justify-center w-full my-50 h-auto">
      <section className="flex items-center justify-center flex-wrap gap-2 w-120 h-120">
        {Array.from({ length: 900 }).map((_, i) => (
          <article key={i} className="dot w-2 h-2 bg-white/30 rounded-full" />
        ))}
      </section>
    </div>
  )
}
