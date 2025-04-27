'use client';
import {useEffect, useRef} from "react";
import type {Scope} from "animejs";
import {animate, createScope, utils, stagger, eases} from 'animejs';

const wrapChars = (str: string) => str.replace(/./g, '<span style="display:inline-block">$&</span>');

function randomSteps(length: number) {
  const steps = [0];
  for (let i = 1; i < length - 1; i++) {
    const minRange = steps[i - 1];
    const maxRange = i / (length - 1);
    const randomValue = minRange + (maxRange - minRange) * Math.random();
    steps.push(randomValue);
  }
  steps.push(1);
  return steps;
}

export default function TypingEffect() {
  const typing = useRef(null);
  const scope = useRef<Scope>(null);

  useEffect(() => {
    scope.current = createScope({root: typing}).add(() => {
      const [$code] = utils.$('code');
      $code.style.opacity = '1';
      $code.innerHTML = wrapChars($code.innerHTML);
      const $spans = $code.querySelectorAll('span');
      const [$caret] = utils.$('.caret');
      const charsAnim = animate($spans, {
        opacity: [0, 1],
        duration: 0,
        delay: stagger(60),
        autoplay: false
      });

      const caretAnim = animate($caret, {
        x: ['1ch', $spans.length],
        ease: eases.steps($spans.length - 1),
        duration: charsAnim.duration,
        autoplay: false
      });

      animate([charsAnim, caretAnim], {
        loop: true,
        loopDelay: 2000,
        alternate: true,
        progress: 1,
        duration: $spans.length * 125,
        ease: eases.linear(...randomSteps($spans.length))
      });

      animate($caret, {
        opacity: [0, 1],
        loop: true,
        alternate: true,
        ease: 'easeOut(2)',
        duration: 600,
      });
    });

    return () => scope.current?.revert();
  }, []);

  return (
    <div className="flex items-center justify-center p-20 w-full">
      <section className="px-8 py-5 bg-rose-700/10 rounded-md text-md">
        <article className="text-xs text-rose-500">Typing Effect</article>
        <article className="px-6 py-3 bg-rose-700/20 rounded-md mt-3">
          <pre ref={typing} className="relative flex items-center">
            <code className="h-[24px] opacity-0 text-rose-500">Welcome anime demo!</code>
            <span className="caret absolute left-0 top-[3px] w-[2px] h-[16px] bg-rose-700 rounded-sm"/>
          </pre>
        </article>
      </section>
    </div>
  )
};
