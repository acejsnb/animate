'use client';
import {useRef, useEffect} from "react";
import clsx from "clsx";
import type {Scope} from "animejs";
import {animate, createScope, stagger, utils, eases} from "animejs";

export default function Banner() {
  const bannerRef = useRef(null);
  const scope = useRef<Scope>(null);

  useEffect(() => {
    scope.current = createScope({root: bannerRef})
      .add(() => {
        animate('.banner-li', {
          loop: true,
          loopDelay: 1000,
          ease: eases.inOutExpo,
          delay: stagger(10, {start: 50}),
          scale: [
            {to: 0},
            {to: 1},
          ],
          translateX: [
            {to: () => utils.random(360, 2100)},
            {to: 0},
          ],
          translateY: [
            {to: () => utils.random(-360, 2100)},
            {to: 0},
          ],
          rotate: [
            {to: () => utils.random(-360, 360)},
            {to: 0},
          ],
          duration: () => utils.random(500, 3000),
        });
      });

    return () => scope.current?.revert();
  }, []);

  return (
    <div className="flex items-center justify-center w-full h-[50vw] text-[0px] overflow-hidden">
      <div
        ref={bannerRef}
        className="relative w-full h-full"
      >
        {Array.from({length: 10}).map((_, i) => (
          <ul key={i}>
            {Array.from({length: 20}).map((_, j) => (
              <li
                key={`${i}${j}`}
                className={clsx(
                  'banner-li absolute w-[5vw] h-[5vw]',
                  'bg-[url(/banner/banner.jpg)] bg-no-repeat',
                )}
                style={{
                  left: `${j * 5}vw`,
                  top: `${i * 5}vw`,
                  backgroundSize: '100vw auto',
                  backgroundPosition: `-${j * 5}vw -${i * 5}vw`
                }}
              />
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}
