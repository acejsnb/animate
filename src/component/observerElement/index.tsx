'use client';
import type {ReactElement, RefObject} from "react";
import {useRef, useEffect, cloneElement} from "react";

interface ChildrenRefState {
  root: RefObject<HTMLElement>;
  play: () => void;
  pause?: () => void;
  reset?: () => void;
}
interface Props {
  children?: ReactElement<any>;
  render?: (ref: RefObject<ChildrenRefState>) => ReactElement<any>;
}

export default function ObserverElement({children, render}: Props) {
  const childrenRef = useRef<ChildrenRefState>({} as ChildrenRefState);

  useEffect(() => {
    if (!childrenRef.current?.root?.current) return;
    const observer = new IntersectionObserver(([{isIntersecting}]) => {
        if (isIntersecting) {
          // 出现在是口内执行
          childrenRef.current?.play();
        } else {
          childrenRef.current?.reset?.();
        }
      },
      {
        threshold: 0.01,
      },
    );
    childrenRef.current.root.current && observer.observe(childrenRef.current.root.current);

    return () => {
      childrenRef.current.root.current && observer.unobserve(childrenRef.current.root.current)
    };
  }, []);

  return render ? render(childrenRef) : children ? cloneElement(children, {ref: childrenRef}) : null;
}
