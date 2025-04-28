'use client';
import {useEffect, useRef} from "react";
import type {Scope, Timer} from "animejs";
import {createTimer, createScope, utils} from "animejs";
import RefreshSvg from '@/assets/svg/refresh.svg';

type ReactRef = {
  current?: HTMLElement | SVGElement | null;
};
interface TimerParams {
  [key: string]: any;
}
const scopeHandler = (root: ReactRef, el: string, timerParams?: TimerParams) => createScope({root}).add((self) => {
  const [$code] = utils.$(el);
  const timer = createTimer({
    duration: 3000,
    alternate: true,
    ...timerParams,
    onUpdate: self => $code.innerHTML = String(self.currentTime)
  })
  self.add('reset', () => {
    timer.reset();
  });
  self.add('play', () => {
    timer.play();
  });
  self.add('pause', () => {
    timer.pause();
  });
});

export default function Index() {
  const root = useRef(null);
  const root2 = useRef(null);
  const scope = useRef<Scope>(null);
  const scope2 = useRef<Scope>(null);
  useEffect(() => {
    scope.current = scopeHandler(root, '.code1');
    scope2.current = scopeHandler(root2, '.code2', {autoplay: false});

    return () => {
      scope.current?.revert();
      scope2.current?.revert();
    }
  }, []);

  const timerRefresh = () => {
    scope.current?.refresh();
  }
  const timerPlay = () => {
    scope2.current?.methods.reset();
    scope2.current?.methods.play();
  }
  const timerPause = () => {
    scope2.current?.methods.pause();
  }

  return (
    <>
      <div ref={root} className="flex items-center justify-center w-full">
        <section className="px-6 py-3 bg-fuchsia-950/30">
          <article className="flex items-center justify-between">
            <span className="text-xs text-fuchsia-500">Rolling Numbers</span>
            <RefreshSvg className="w-6 h-6 text-fuchsia-500 cursor-pointer" onClick={timerRefresh} />
          </article>
          <article className="flex items-center justify-center w-61 mt-3">
            <code className="code1 flex items-center justify-center bg-fuchsia-950 rounded-md w-40 h-13 text-center">0</code>
          </article>
        </section>
      </div>
      <div ref={root2} className="flex items-center justify-center w-full mt-10">
        <section className="px-6 py-3 bg-fuchsia-950/30">
          <article className="flex items-center justify-between">
            <span className="text-xs text-fuchsia-500">Rolling Numbers 《Play | Pause》</span>
          </article>
          <article className="flex items-center justify-center w-61 mt-3">
            <code className="code2 flex items-center justify-center bg-fuchsia-950 rounded-md w-40 h-13 text-center">0</code>
          </article>

          <article className="flex items-center justify-center gap-2 mt-3">
            <button
              className="flex items-center justify-center bg-fuchsia-700 rounded-md w-18 h-6 text-white text-xs cursor-pointer duration-200 hover:opacity-75"
              onClick={timerPlay}
            >Play</button>
            <button
              className="flex items-center justify-center bg-fuchsia-700 rounded-md w-18 h-6 text-white text-xs cursor-pointer duration-200 hover:opacity-75"
              onClick={timerPause}
            >Pause</button>
          </article>
        </section>
      </div>
    </>
  )
}
