// Your code here.
const items = document.querySelectorAll('.item');
const container = document.querySelector('.items');

// Adjust container to display items in a grid
container.style.display = 'grid';
container.style.gridTemplateColumns = 'repeat(5, 200px)';
container.style.gap = '0';
container.style.overflow = 'hidden';
container.style.whiteSpace = 'normal';

// Reset item styles for grid layout
items.forEach(item => {
  item.style.display = 'flex';
});

items.forEach(item => {
  let isDragging = false;
  let startX, startY;
  let initialLeft, initialTop;

  item.addEventListener('mousedown', (e) => {
    isDragging = true;
    
    // Get initial position before making absolute
    const rect = item.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    
    // Make item draggable
    item.style.position = 'absolute';
    item.style.left = (rect.left - containerRect.left + container.scrollLeft) + 'px';
    item.style.top = (rect.top - containerRect.top) + 'px';
    item.style.cursor = 'grabbing';
    item.style.margin = '0';
    item.style.zIndex = '1000';
    
    // Store starting positions
    startX = e.clientX;
    startY = e.clientY;
    initialLeft = parseInt(item.style.left);
    initialTop = parseInt(item.style.top);
    
    e.preventDefault();
  });

  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    
    e.preventDefault();
    
    // Calculate new position
    const deltaX = e.clientX - startX;
    const deltaY = e.clientY - startY;
    
    let newLeft = initialLeft + deltaX;
    let newTop = initialTop + deltaY;
    
    // Apply constraints to keep item within container
    const itemWidth = item.offsetWidth;
    const itemHeight = item.offsetHeight;
    
    const minLeft = 0;
    const maxLeft = container.clientWidth - itemWidth;
    const minTop = 0;
    const maxTop = container.clientHeight - itemHeight;
    
    newLeft = Math.max(minLeft, Math.min(newLeft, maxLeft));
    newTop = Math.max(minTop, Math.min(newTop, maxTop));
    
    // Update position
    item.style.left = newLeft + 'px';
    item.style.top = newTop + 'px';
  });

  document.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      item.style.cursor = 'grab';
    }
  });
});