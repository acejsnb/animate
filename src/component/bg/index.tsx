'use client';
import {useEffect, useRef} from "react";
import type {Scope} from "animejs";
import {createScope, animate} from "animejs";
import {getPlace} from "@/utils";

const maxDepth = 80;
export default function BackgroundCmp() {
  const root = useRef(null);
  const scope = useRef<Scope>(null);

  const mouseMove = (e: MouseEvent) => {
    scope.current?.methods.mousemove(e)
  }
  const mouseOut = () => {
    scope.current?.methods.mouseout()
  }

  useEffect(() => {
    scope.current = createScope({root}).add(self => {
      self.add('mousemove', e => {
        const place = getPlace(e);
        const obj = {
          'left-top': () => {
            animate(self.root, {
              translateZ: -maxDepth,
              rotateX: maxDepth / 10,
              rotateY: -maxDepth / 10,
              duration: 500,
              ease: 'outQuad'
            });
          },
          'left-bottom': () => {
            animate(self.root, {
              translateZ: -maxDepth,
              rotateX: -maxDepth / 10,
              rotateY: -maxDepth / 10,
              duration: 500,
              ease: 'outQuad'
            });
          },
          'right-top': () => {
            animate(self.root, {
              translateZ: -maxDepth,
              rotateX: maxDepth / 10,
              rotateY: maxDepth / 10,
              duration: 500,
              ease: 'outQuad'
            });
          },
          'right-bottom': () => {
            animate(self.root, {
              translateZ: -maxDepth,
              rotateX: -maxDepth / 10,
              rotateY: maxDepth / 10,
              duration: 500,
              ease: 'outQuad'
            });
          },
          'center-middle': () => {
            animate(self.root, {
              translateZ: 0,
              rotateX: 0,
              rotateY: 0,
              duration: 800,
              ease: 'outQuad'
            });
          },
        };
        if (!Object.keys(obj).includes(place)) return;
        console.log(place);
        obj[place as keyof typeof obj]();
      });

      self.add('mouseout', () => {
        animate(self.root, {
          translateZ: 0,
          rotateX: 0,
          rotateY: 0,
          duration: 500,
          ease: 'outQuad'
        });
      })
    });

    document.body.addEventListener('mousemove', mouseMove);
    document.body.addEventListener('mouseout', mouseOut);

    return () => {
      document.body.removeEventListener('mousemove', mouseMove);
      document.body.removeEventListener('mouseout', mouseOut);
      scope.current?.revert()
    };
  }, [])

  return (
    <div
      ref={root}
      className="fixed left-0 top-0 bg-[url(/bg.jpg)] bg-no-repeat bg-center bg-cover opacity-10 w-full h-full scale-105"
    />
  )
}
