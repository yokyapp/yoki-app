import './footer.scss'

document.querySelector('#footer').innerHTML = `
    <div class="links">
        <a href="" class="soc-media">
            <img src="/components/footer/telegram-icon-svg.svg" alt="">
            
            долучайся до нашого Telegram
        </a>
        <a href="" class="footer-logo">
            <img src="/components/footer/yoki-logo-svg.svg" alt="">
        
            Натисніть на Yoky щоб підтримати наш проєкт.
        </a>
        <a href="" class="soc-media">
            <img src="/components/footer/discord-icon-svg.svg" alt="">
            долучайся до нашого Discord
        </a>
    </div>
    <div class="big-name-logo-privacy">
        <div class="name">
<!--            <img src="/components/footer/yoky-name.svg" alt="">-->
        </div>
        <div class="privacy">
            <p>Copyright 2024 Yoky. Всі права захищені.</p>
        </div>
    </div>
`
