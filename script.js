const container = document.querySelector(".items");
const items = document.querySelectorAll(".item");

let current = null;
let offsetX = 0;
let offsetY = 0;

items.forEach(item => {

    item.addEventListener("mousedown", function(e){

        current = item;

        const itemRect = item.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();

        offsetX = e.clientX - itemRect.left;
        offsetY = e.clientY - itemRect.top;

        item.style.position = "absolute";
        item.style.left = (itemRect.left - containerRect.left) + "px";
        item.style.top = (itemRect.top - containerRect.top) + "px";
        item.style.zIndex = "1000";
        item.style.cursor = "grabbing";

        e.preventDefault();

    });

});

document.addEventListener("mousemove", function(e){

    if(!current) return;

    const rect = container.getBoundingClientRect();

    let left = e.clientX - rect.left - offsetX;
    let top = e.clientY - rect.top - offsetY;

    left = Math.max(0, Math.min(left, container.clientWidth - current.offsetWidth));
    top = Math.max(0, Math.min(top, container.clientHeight - current.offsetHeight));

    current.style.left = left + "px";
    current.style.top = top + "px";

});

document.addEventListener("mouseup", function(){

    if(current){
        current.style.cursor = "grab";
        current = null;
    }

});