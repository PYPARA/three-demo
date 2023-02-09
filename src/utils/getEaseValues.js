import { gsap } from "gsap";

function getEaseValues({start = 0, end = 100, ease = 'none', steps = 10} = {}) {
  console.log(start, end, ease, steps);
  const array = [];
  const data = {
    value: start,
  };
  const tween = gsap.to(data, {
    value: end,
    ease: ease,
    duration: steps,
  });
  for(let i = 0; i <= steps; i += 1) {
    array.push(tween.seek(i)._targets[0].value);
  }
  return array;
}

// console.log(getEaseValues({}));

const array = getEaseValues({
  start: 0,
  end: 100,
  ease: 'power1',
  steps: 20,
});

getEaseValues();
getEaseValues({start: 1});
getEaseValues({end: 2});
getEaseValues({ease: 'power2'});
getEaseValues({steps: 100});