'use client';
import {useEffect, useRef} from "react";
import type {Scope} from "animejs";
import {animate, createScope, utils, stagger} from "animejs";

const backgroundColor = ['rgba(255,255,255,0.3)', '#f00', '#0f0', '#f0f', '#ff0', 'rgba(255,255,255,0.3)'];
const rotate = () => utils.random(-360, 360);
const translateX = () => utils.random(-100, 100);
const translateY = () => utils.random(-100, 100);

export default function GridIon() {
  const root = useRef(null);
  const scope = useRef<Scope>(null);

  useEffect(() => {
    scope.current = createScope({root}).add(async (self) => {
      const dots = utils.$('.dot');
      const aniHandler = (from: number | "first" | "center" | "last" | undefined) => animate(dots, {
        // loop: true,
        // ease: 'inOutExpo',
        ease: 'inOutExpo',
        // playbackEase: 'inOut(1)',
        delay: stagger(100, {grid: [30, 30], from}),
        // autoplay: false,
        rotate: from === 'last' ? 0 : rotate,
        translateX: from === 'last' ? 0 : translateX,
        translateY: from === 'last' ? 0 : translateY,
        backgroundColor: from === 'last' ? ['rgba(255,255,255,0.3)', 'rgba(255,255,255,0.8)', 'rgba(255,255,255,0.3)'] : backgroundColor
      });

      const runSequentialAnimations = async () => {
        const a1 = await aniHandler('first').then();
        await aniHandler('center').then();
        await aniHandler('last').then();
        await runSequentialAnimations().then();
      }

      await runSequentialAnimations();
    });

    return () => scope.current?.revert();
  }, []);

  return (
    <div ref={root} className="flex items-center justify-center w-full my-40 h-auto">
      <section className="flex items-center justify-center flex-wrap gap-2 w-120 h-120">
        {Array.from({ length: 900 }).map((_, i) => (
          <article key={i} className="dot w-2 h-2 bg-white/30 rounded-full" />
        ))}
      </section>
    </div>
  )
}
