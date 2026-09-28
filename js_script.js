document.addEventListener("DOMContentLoaded", function () {


    /* ==========================================
       1. MOBILE NAVIGATION
    ========================================== */

    const menuToggle =
        document.getElementById("menuToggle");

    const navbar =
        document.getElementById("navbar");


    if (menuToggle && navbar) {

        menuToggle.addEventListener("click", function () {

            navbar.classList.toggle("open");

        });

    }

    const themeToggle = document.getElementById("themeToggle");

    const savedTheme = localStorage.getItem("portfolioTheme");

    if (savedTheme === "dark") {
        document.documentElement.setAttribute(
            "data-theme",
            "dark"
        );
    } else {
        document.documentElement.removeAttribute(
            "data-theme"
        );
    }


    function updateThemeIcon() {

        if (!themeToggle) return;

        const isDark =
            document.documentElement.getAttribute(
                "data-theme"
            ) === "dark";

        if (isDark) {

            themeToggle.textContent = "☀️";

            themeToggle.setAttribute(
                "aria-label",
                "Switch to light mode"
            );

        } else {

            themeToggle.textContent = "🌙";

            themeToggle.setAttribute(
                "aria-label",
                "Switch to dark mode"
            );
        }
    }


    updateThemeIcon();


    if (themeToggle) {

        themeToggle.addEventListener(
            "click",
            function () {

                const isDark =
                    document.documentElement.getAttribute(
                        "data-theme"
                    ) === "dark";


                if (isDark) {

                    // LIGHT MODE
                    document.documentElement.removeAttribute(
                        "data-theme"
                    );

                    localStorage.setItem(
                        "portfolioTheme",
                        "light"
                    );

                } else {

                    // DARK MODE
                    document.documentElement.setAttribute(
                        "data-theme",
                        "dark"
                    );

                    localStorage.setItem(
                        "portfolioTheme",
                        "dark"
                    );
                }


                updateThemeIcon();

            }
        );
    }




    /* ====================
       3. TYPING EFFECT
    ======================= */

    const typingElement =
        document.getElementById("typing");


    if (typingElement) {

        const words = [

            "IT Student",

            "Web Developer",

            "Creative Designer",

            "Technology Learner"

        ];


        let wordIndex = 0;

        let characterIndex = 0;

        let deleting = false;


        function typingEffect() {

            const currentWord =
                words[wordIndex];


            if (!deleting) {

                typingElement.textContent =
                    currentWord.substring(
                        0,
                        characterIndex + 1
                    );

                characterIndex++;


                if (
                    characterIndex ===
                    currentWord.length
                ) {

                    deleting = true;

                    setTimeout(
                        typingEffect,
                        1000
                    );

                    return;

                }

            } else {

                typingElement.textContent =
                    currentWord.substring(
                        0,
                        characterIndex - 1
                    );

                characterIndex--;


                if (characterIndex === 0) {

                    deleting = false;

                    wordIndex =
                        (wordIndex + 1)
                        % words.length;

                }

            }


            setTimeout(
                typingEffect,
                deleting ? 50 : 100
            );

        }


        typingEffect();

    }



    /* ==========================================
       4. PROJECT FILTERING
    ========================================== */

    const filterButtons =
        document.querySelectorAll(".filter");

    const projects =
        document.querySelectorAll(".project-card");


    filterButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                filterButtons.forEach(
                    function (btn) {

                        btn.classList.remove(
                            "active"
                        );

                    }
                );


                button.classList.add("active");


                const filter =
                    button.getAttribute(
                        "data-filter"
                    );


                projects.forEach(
                    function (project) {

                        const category =
                            project.getAttribute(
                                "data-category"
                            );


                        if (
                            filter === "all" ||
                            filter === category
                        ) {

                            project.style.display =
                                "block";

                        } else {

                            project.style.display =
                                "none";

                        }

                    }
                );

            }
        );

    });



    /* ==========================================
       5. PROJECT MODAL
    ========================================== */

    const modal =
        document.getElementById(
            "projectModal"
        );


    const closeModal =
        document.getElementById(
            "closeModal"
        );


    const detailsButtons =
        document.querySelectorAll(
            ".details-btn"
        );


    detailsButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const title =
                        button.getAttribute(
                            "data-title"
                        );

                    const description =
                        button.getAttribute(
                            "data-description"
                        );


                    document.getElementById(
                        "modalTitle"
                    ).textContent = title;


                    document.getElementById(
                        "modalDescription"
                    ).textContent =
                        description;


                    modal.classList.add("show");

                }
            );

        }
    );


    if (closeModal) {

        closeModal.addEventListener(
            "click",
            function () {

                modal.classList.remove(
                    "show"
                );

            }
        );

    }


    if (modal) {

        modal.addEventListener(
            "click",
            function (event) {

                if (
                    event.target === modal
                ) {

                    modal.classList.remove(
                        "show"
                    );

                }

            }
        );

    }



    /* ==========================================
       6. CONTACT FORM VALIDATION
    ========================================== */

    const contactForm =
        document.getElementById(
            "contactForm"
        );


    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const name =
                    document.getElementById(
                        "name"
                    );


                const email =
                    document.getElementById(
                        "email"
                    );


                const message =
                    document.getElementById(
                        "message"
                    );


                const nameError =
                    document.getElementById(
                        "nameError"
                    );


                const emailError =
                    document.getElementById(
                        "emailError"
                    );


                const messageError =
                    document.getElementById(
                        "messageError"
                    );


                const formStatus =
                    document.getElementById(
                        "formStatus"
                    );


                nameError.textContent = "";

                emailError.textContent = "";

                messageError.textContent = "";

                formStatus.textContent = "";


                let valid = true;


                if (
                    name.value.trim().length < 2
                ) {

                    nameError.textContent =
                        "Please enter your name.";

                    valid = false;

                }


                const emailPattern =
                    /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;


                if (
                    !emailPattern.test(
                        email.value.trim()
                    )
                ) {

                    emailError.textContent =
                        "Please enter a valid email.";

                    valid = false;

                }


                if (
                    message.value.trim().length < 10
                ) {

                    messageError.textContent =
                        "Message must contain at least 10 characters.";

                    valid = false;

                }


                if (valid) {

                    formStatus.textContent =
                        "Your message has been validated successfully!";

                    formStatus.style.color =
                        "green";

                    contactForm.reset();

                }

            }
        );

    }



    /* ==========================================
       7. SCROLL TO TOP
    ========================================== */

    const scrollTop =
        document.getElementById(
            "scrollTop"
        );


    if (scrollTop) {

        window.addEventListener(
            "scroll",
            function () {

                if (
                    window.scrollY > 400
                ) {

                    scrollTop.style.display =
                        "block";

                } else {

                    scrollTop.style.display =
                        "none";

                }

            }
        );


        scrollTop.addEventListener(
            "click",
            function () {

                window.scrollTo({

                    top: 0,

                    behavior: "smooth"

                });

            }
        );

    }

});