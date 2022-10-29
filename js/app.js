const tabs = document.querySelectorAll('.tabheader__item')
const tabsParent = document.querySelector('.tabheader__items')
const tabContent = document.querySelectorAll('.tabcontent')

const hideTabContent = () => {
    tabContent.forEach((item) => {
        item.style.display = "none";
    });
    tabs.forEach((item) => {
        item.classList.remove("tabheader__item_active");
    });
};
const showTabContent = (i = 1) =>{
    tabContent[i].style.display = 'block';
    tabs[i].classList.add('tabheader__item_active')
};

hideTabContent();
showTabContent();

tabsParent.addEventListener('click', (event)=>{
    const target = event.target
    tabs.forEach((item, i) =>{
        if (target === item){
            hideTabContent();
            showTabContent(i);
        }
    });
    });

/////


let slideIndex = 0;

tabsParent.addEventListener("click", (event) => {
    const target = event.target;

    if (target.classList.contains("tabheader__item")) {
        tabs.forEach((item, i) => {
            if (target === item) {
                slideIndex = i;
                hideTabContent();
                showTabContent(slideIndex);
            }
        });
    }
});

const timer = () => {
    slideIndex++;
    if (slideIndex > 3) {
        slideIndex = 0;
    }
    hideTabContent()
    showTabContent(slideIndex)
}
setInterval(timer, 1000)

const modal = document.querySelector('.modal')
const modalTrigger = document.querySelector('[data-modal]')
const closeModalBtn = document.querySelector('.modal__close')

modalTrigger.addEventListener('click', openModal)

function openModal() {
  modal.classList.add('show')
  modal.classList.remove('hide')
  document.body.style.overflow = 'hidden'

  clearInterval(modalTimeout)
}

function closeModal() {
  modal.classList.add('hide')
  modal.classList.remove('show')
  document.body.style.overflow = ''
}

closeModalBtn.addEventListener('click', closeModal)

modal.addEventListener('click', (event) => {
  if (event.target === modal) {
    closeModal()
  }
})

document.body.addEventListener('keydown', (event) => {
  if (event.code === 'Backspace') {
    closeModal()
  }
})

function openModalScroll() {
  const page = document.documentElement

  if (page.scrollTop + page.clientHeight >= page.scrollHeight) {
    openModal()

    window.removeEventListener('scroll', openModalScroll)
  }
}

window.addEventListener('scroll', openModalScroll)

const forms = document.querySelectorAll("form")

forms.forEach ((item) =>{
  postData(item)
})

function postData (form) {
  form.addEventListener("submit", (e) =>{
    e.preventDefault()

    const requst = new XMLHttpRequest()
    requst.open("POST", "server.php")
    requst.setRequestHeader("Content-type", "application/json")

    const formData = new FormData(form)

    const object = {}

    formData.forEach((item, i)=>{
      object[i] = item
    })

    const json = JSON.stringify(object)

    requst.send(json)
  })
}