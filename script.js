// Your code here.
const items = document.querySelectorAll('.item');
const container = document.querySelector('.items');

items.forEach(item => {
  let isDragging = false;
  let startX, startY;
  let initialLeft, initialTop;

  item.addEventListener('mousedown', (e) => {
    isDragging = true;
    
    // Make item draggable
    item.style.position = 'absolute';
    item.style.cursor = 'grabbing';
    
    // Get initial positions
    startX = e.clientX;
    startY = e.clientY;
    
    // Get or set initial position
    if (!item.style.left) {
      const rect = item.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      item.style.left = (rect.left - containerRect.left) + 'px';
      item.style.top = (rect.top - containerRect.top) + 'px';
    }
    
    initialLeft = parseInt(item.style.left) || 0;
    initialTop = parseInt(item.style.top) || 0;
    
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
    
    // Get container bounds
    const containerRect = container.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();
    
    // Apply constraints to keep item within container
    const minLeft = 0;
    const maxLeft = container.scrollWidth - itemRect.width;
    const minTop = 0;
    const maxTop = container.clientHeight - itemRect.height;
    
    newLeft = Math.max(minLeft, Math.min(newLeft, maxLeft));
    newTop = Math.max(minTop, Math.min(newTop, maxTop));
    
    // Update position
    item.style.left = newLeft + 'px';
    item.style.top = newTop + 'px';
  });

  document.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      item.style.cursor = 'pointer';
    }
  });
});