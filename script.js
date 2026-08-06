const containerRect = container.getBoundingClientRect();

let left = e.clientX - containerRect.left - offsetX;
let top = e.clientY - containerRect.top - offsetY;

left = Math.max(
    0,
    Math.min(left, containerRect.width - current.getBoundingClientRect().width)
);

top = Math.max(
    0,
    Math.min(top, containerRect.height - current.getBoundingClientRect().height)
);