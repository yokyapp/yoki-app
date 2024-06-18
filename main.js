import './styles/style.scss'
import './styles/default.scss'
import './styles/main.scss'



document.querySelector('#app').innerHTML = `
  <div class="sections-wrapper">
    <section class="main-section section">
        <header id="header"></header>
        <div class="head-screen">
            <div class="text-content">
                <h1>Вітаємо у системі пошуку і співпраці <span class="yellow-span-text"> <br>Йокі!</span></h1>
                
                <p>Тут ви знайдете нових друзів, однодумців та партнерів готових втілювати ваші <span class="yellow-span-text">мрії та амбіції</span> в життя.</p>
            </div>
        </div>
    </section>
    
    <section class="about-section section">
        <div class="text-content">
            <h2>Розкажіть про себе у анкеті, дайте іншим зрозуміти хто ви і чого хочете</h2>
            <div class="paragraphs-content">
                <p>У анкеті ви можете написати чим любите займатися, ваші захоплення, улюблені фільми, жанри музики і ще багато іншого. </p>
                <p>Можливо саме це стане джерелом потужного зв’язку з вашими новими знайомими</p>
            </div>
        </div>
    </section>
    
    <section class="search-section section">
        <div class="text-content">
            <h2>Шукайте групи, проєки та інших користувачів за допомогою фільтрів <span class="yellow-span-text">пошуку</span></h2>
            
            <p>Знайдіть мрійників як і ви самі, об’єднуйтесь з тими хто дійсно вас розуміє і готовий творити разом.</p>
        </div>
    </section>
    
    <section class="search-more-section section">
        <div class="text-content">
            <h2>Шукайте пости, групи, проєки а також інших користувачів за допомогою фільтрів <span class="yellow-span-text">пошуку</span></h2>
            
            <p>Знайдіть мрійників як і ви самі, об’єднуйтесь з тими, хто дійсно вас розуміє і готовий творити разом.</p>
        </div>
    </section>
    
    <section class="text-section section">
        <div class="text-content">
            <h2>Переписуйтеся з вашими друзями і колегами у <span class="yellow-span-text">чаті</span></h2>
            
            <div class="paragraphs-content">
                <p>Надсилайте аудіо, фото та відео.</p>
                <p class="orange-text">Діліться референсами, цікавими матеріалами, та будь-чим, що вам подобається!</p>
            </div>
        </div>
    </section>
    
    <section class="last-section section">
        <div class="text-content">
            <h2 class="primary-black-text">Переглядайте роботи інших користувачів та  <span class="yellow-span-text">виставляйте свої</span> у стрічці.</h2>
        </div>
        <div class="text-content">
            <div class="text">
                <p class="orange-text">Діліться <br> картинками, анімаціями, музикою і відео. <br> Рекламуйте свої проєкти та шукайте охочих прийняти в них участь  </p>
            </div>
        </div>
    </section>
    
    <section class="section">
        <footer id="footer">
        </footer>
    </section>
    
  </div>
`






// const container = document.querySelector('.sections-wrapper');
// const sections = document.querySelectorAll('section');
//
// let lastScrollPosition = window.pageYOffset;
//
// function setActiveSection() {
//     const currentScrollPosition = window.pageYOffset;
//     let activeSection = null;
//
//     const direction = currentScrollPosition > lastScrollPosition ? 'down' : 'up';
//
//     sections.forEach(section => {
//         const rect = section.getBoundingClientRect();
//         const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
//
//         if (isVisible && (direction === 'down' || activeSection === null)) {
//             activeSection = section;
//         }
//     });
//
//     const activeIndex = Array.from(sections).indexOf(activeSection);
//     console.log("Активна секція:", activeSection, "Індекс:", activeIndex);
//
//     activeSection.scrollIntoView({ behavior: 'smooth' });
//
//     lastScrollPosition = currentScrollPosition;
// }
//
// document.addEventListener('scroll', setActiveSection);