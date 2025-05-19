let btn = document.getElementById('btn');
let inp = document.getElementById('inp');
let boxes = document.querySelectorAll('.Box');
let drag = null;

btn.onclick = function () {
    if (inp.value !== '') {
        boxes[0].innerHTML += `
            <p class="item" draggable="true">${inp.value}</p>
        `;
        inp.value = '';
        dragItem();
        localStorage.setItem('savedData', boxes[0].innerHTML);
    }
}

function dragItem() {
    let items = document.querySelectorAll('.item');

    items.forEach(item => {
        item.addEventListener('dragstart', function () {
            drag = this;
            this.style.opacity = '0.5';
        });

        item.addEventListener('dragend', function () {
            drag = null;
            this.style.opacity = '1';
        });
    });

    boxes.forEach(box => {
        box.addEventListener('dragover', function (e) {
            e.preventDefault();
            this.style.background = '#090';
            this.style.color = '#fff';
        });

        box.addEventListener('dragleave', function () {
            this.style.background = '#fff';
            this.style.color = '#000';
        });

        box.addEventListener('drop', function (e) {

            this.append(drag);
            this.style.background = '#fff';
            this.style.color = '#000';
        });
    });
}
window.onload = function () {
    boxes[0].innerHTML = localStorage.getItem('savedData') || '';

    dragItem();
};