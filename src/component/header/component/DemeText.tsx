'use client';
import {useEffect, useRef} from "react";
import type {Scope} from "animejs";
import {animate, createScope} from "animejs";
import {wrapChars} from '@/utils';

export default function DemoText() {
  const root = useRef(null)
  const scope = useRef<Scope>(null)

  useEffect(() => {
    scope.current = createScope({root}).add((self) => {
      const $el = self.root as HTMLElement;
      $el.innerHTML = wrapChars($el.innerHTML);

      animate('span', {
        y: [
          { to: '-20px', ease: 'outExpo', duration: 600 },
          { to: 0, ease: 'outBounce', duration: 800, delay: 100 }
        ],
        rotate: {
          from: '-1turn',
          delay: 0
        },
        delay: (_, i) => i * 50,
        ease: 'inOutCirc',
        loopDelay: 1000,
        loop: true
      });
    });

    return () => scope.current?.revert();
  }, []);

  return (
    <h3 className="flex items-center justify-center gap-0.5 text-lg" ref={root}>Animejs demo</h3>
  )
}
