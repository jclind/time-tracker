const navSlide = () => {
    const burger = document.querySelector('nav .burger')
    const nav = document.querySelector('nav .nav-links')
    const navSlideBackground = document.querySelector(
        'nav .nav-slider-background'
    )
    navSlideBackground.addEventListener('click', () => {
        burger.click()
    })
    const navLinks = document.querySelectorAll('nav .nav-links li')

    burger.addEventListener('click', () => {
        // Toggle Nav on burger click
        nav.classList.toggle('nav-active')

        // If the nav is now open....
        if (nav.classList.contains('nav-active')) {
            // Control background fadeIn animation
            navSlideBackground.style.display = 'block'
            navSlideBackground.style.animation = `fadeIn 0.3s ease`
            navSlideBackground.style.opacity = '1'

            // Remove Touch Scrolling functionality from nav element.
            document.querySelector('nav').ontouchmove = function (event) {
                event.preventDefault()
            }
        } else {
            // Control background fadeOut animation
            navSlideBackground.style.animation = 'fadeOut 0.3s ease'
            navSlideBackground.style.opacity = '0'
            navSlideBackground.style.display = 'none'
        }

        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = ''
            } else {
                link.style.animation = `navLinkFade 0.3s ease forwards ${
                    index / 7
                }s`
            }
            // Add EventListener to background to close nav-bar
            // !! FIX EVENT LISTENER CLEARN UP?
            link.addEventListener('click', () => {
                burger.click()
            })
        })

        // Burger Animation
        burger.classList.toggle('toggle')
    })
}

navSlide()
