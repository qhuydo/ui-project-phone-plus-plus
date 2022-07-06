import { useCallback, useEffect, useState } from "react";

// https://gist.github.com/joshuacerbito/ea318a6a7ca4336e9fadb9ae5bbb87f4
export const useScroll = () => {
  const [state, setState] = useState({
    lastScrollTop: 0,
    bodyOffset: document.body.getBoundingClientRect(),
    scrollY: document.body.getBoundingClientRect().top,
    scrollX: document.body.getBoundingClientRect().left,
    scrollDirection: "", // down, up
  });

  const handleScrollEvent = useCallback(() => {
    setState((prevState) => {
      const prevLastScrollTop = prevState.lastScrollTop;
      const bodyOffset = document.body.getBoundingClientRect();

      return {
        setBodyOffset: bodyOffset,
        scrollY: -bodyOffset.top,
        scrollX: bodyOffset.left,
        scrollDirection: prevLastScrollTop > -bodyOffset.top ? "down" : "up",
        lastScrollTop: -bodyOffset.top,
      };
    });
  }, []);

  useEffect(() => {
    const scrollListener = (e) => {
      handleScrollEvent(e);
    };
    window.addEventListener("scroll", scrollListener);

    return () => {
      window.removeEventListener("scroll", scrollListener);
    };
  }, [handleScrollEvent]);

  return {
    scrollY: state.scrollY,
    scrollX: state.scrollX,
    scrollDirection: state.scrollDirection,
  };
};
