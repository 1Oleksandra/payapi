 async function loadComponent(id, file) {
        let response = await fetch(file)
        let text = await response.text()
        document.getElementById(id).innerHTML = text;

        if (id === 'header') {
            BurgerClick()
            NavLinks()
            logoClick()
        }
        if (id === 'footer') {
            NavLinks()
        }
    }

    loadComponent("header", "header.html")
    loadComponent("footer", "footer.html")

// burger ==========================================================
const header  = document.querySelector('.header ')
function BurgerClick() {
  const burgerBtn = document.querySelector('.burger')
  const headerContant = document.querySelector('.header-contant')

  if (burgerBtn && headerContant) {
    burgerBtn.addEventListener('click', () => {
      burgerBtn.classList.toggle('active')
      headerContant.classList.toggle('active')
      document.body.classList.toggle('lock') 
      header.classList.toggle('fixed')
    });
  }
}

// перехід між сторінками, та додавання класу activeLink ===============================================
const homeLink = document.querySelector('.home-link')
const headerLogo = document.querySelector('.logo-header')
const currentPage = localStorage.getItem('activePage')

function NavLinks() {
    const links = document.querySelectorAll('.link')
    console.log(links);
    // const currentPage = localStorage.getItem('activePage')
    links.forEach(link => {

        if(link.getAttribute('data-page') === currentPage) link.classList.add('activeLink')
            else link.classList.remove('activeLink')
        
            link.addEventListener('click', (e) => {
            const page = link.getAttribute('data-page')
            localStorage.setItem('activePage', page)
        })
        })   
  }


function logoClick() {
  const headerLogo = document.querySelector('.logo-header')
  const homeLink = document.querySelector('.header-link[data-page="home.html"]')
  const links = document.querySelectorAll('.header-link')


  headerLogo.addEventListener('click', (e) => {
    e.preventDefault()

    links.forEach(link => link.classList.remove('activeLink'))
    homeLink.classList.add('activeLink')
    localStorage.setItem('activePage', 'home.html')
    window.location.href = 'home.html'
  });
}



// форма =========================================================================================== 

const form = document.querySelector('form') 
const userName = document.querySelector('.form-name')
const formEmail = document.querySelector('.form-email')
const company = document.querySelector('.form-company')
const formTitle = document.querySelector('.form-title')
const formTextarea = document.querySelector('.form-textarea')
const formChecked = document.querySelector('.label-check')

function checkRequired(inputs) {
  inputs.forEach(input => {
    if (input.value.trim() === '') {
      input.classList.add('error')
    } else {
      input.classList.remove('error')
    }
  })
}


function checkLength(input,min,max){
    if(input.value.length < min || input.value.length > max){
        input.classList.add('error')
        return false
    } 
    input.classList.remove('error')
    return true
}

function checkEmail(input){
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if(!re.test(input.value.trim())){
        input.classList.add('error')
        return false
    }
    input.classList.remove('error')
    return true
}
function checkedForm(checkInput) {
    if (!checkInput.checked) {
        checkInput.classList.add('errorCheck')
        return false;
    }
    checkInput.classList.remove('errorCheck')
    return true;
}
const required = [userName, formEmail, company, formTitle,formTextarea]

function checkRequiredInput(required){
  required.forEach(input=>{
    input.addEventListener('click',()=>{
      input.classList.remove('error')
      if(!checkLength) input.classList.add('error')
      if(!checkEmail(input)) input.classList.add('error')
    })
  })
}
function submitInputs (){
  form.addEventListener('submit',(e)=>{
    e.preventDefault()
  checkRequiredInput(required)
    checkRequired(required)

    if(userName.value.trim() !== '') checkLength(userName, 3, 40)
    if(formEmail.value.trim() !== '') checkEmail(formEmail)
    if(company.value.trim() !== '') checkLength(company, 3, 15)
    if(formTitle.value.trim() !== '') checkLength(formTitle, 3, 15)
    if(formTextarea.value.trim() !== '') checkLength(formTextarea, 3, 15)
    checkedForm(formChecked)
}) 
}

submitInputs ()
