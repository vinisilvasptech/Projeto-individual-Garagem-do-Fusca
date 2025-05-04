var btnNext = document.querySelector('.next')
var btnBack = document.querySelector('.back')

var container = document.querySelector('.carrosel .container')
var list = document.querySelector('.carrosel .container .list')

btnNext.onclick = () => moveItemsONClick('next')
btnBack.onclick = () => moveItemsONClick('back')

function moveItemsONClick(type) {
    var listItems = document.querySelectorAll('.list .list-item')
    
    if (type === 'next') {
        list.appendChild(listItems[0])
        container.classList.add('next')
    } else {
        list.prepend(listItems[listItems.length - 1])
        container.classList.add('back')
    }

    setTimeout(() => {
        container.classList.remove('next')
        container.classList.remove('back')        
    }, 3000);

}

window.addEventListener("scroll", function() {
    const header = document.querySelector('#header');
    const carrosel = document.querySelector('.carrosel');

    if (window.scrollY > 0) {
        header.classList.add('scroll');
        carrosel.style.marginTop = '80px'; // altura do header
    } else {
        header.classList.remove('scroll');
        carrosel.style.marginTop = '0';
    }
});