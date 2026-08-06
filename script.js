const container = document.getElementById("container");
const cubes = document.querySelectorAll(".cube");

const GAP = 20;

/* ---------- 1. Lay the cubes out in a grid ---------- */
function layoutGrid() {
  const cw = container.clientWidth;
  const size = cubes[0].offsetWidth;
  const perRow = Math.max(1, Math.floor((cw - GAP) / (size + GAP)));

  cubes.forEach((cube, i) => {
    const row = Math.floor(i / perRow);
    const col = i % perRow;
    cube.style.left = GAP + col * (size + GAP) + "px";
    cube.style.top  = GAP + row * (size + GAP) + "px";
  });
}
layoutGrid();

/* ---------- 2. Drag state ---------- */
let activeCube = null;
let offsetX = 0;   // distance from cube's left edge to the cursor
let offsetY = 0;

/* ---------- 3. mousedown: select ---------- */
cubes.forEach(cube => {
  cube.addEventListener("mousedown", e => {
    e.preventDefault();
    activeCube = cube;
    cube.classList.add("dragging");

    const cubeRect = cube.getBoundingClientRect();
    offsetX = e.clientX - cubeRect.left;
    offsetY = e.clientY - cubeRect.top;
  });
});

/* ---------- 4. mousemove: drag (listener on document so fast
              mouse movement doesn't "drop" the cube) ---------- */
document.addEventListener("mousemove", e => {
  if (!activeCube) return;

  const box = container.getBoundingClientRect();

  // position relative to the container
  let x = e.clientX - box.left - offsetX;
  let y = e.clientY - box.top  - offsetY;

  // boundary conditions – clamp inside the defined area
  const maxX = container.clientWidth  - activeCube.offsetWidth;
  const maxY = container.clientHeight - activeCube.offsetHeight;

  x = Math.max(0, Math.min(x, maxX));
  y = Math.max(0, Math.min(y, maxY));

  activeCube.style.left = x + "px";
  activeCube.style.top  = y + "px";
});

/* ---------- 5. mouseup: drop ---------- */
document.addEventListener("mouseup", () => {
  if (!activeCube) return;
  activeCube.classList.remove("dragging");
  activeCube = null;   // cube keeps its last left/top values
});
