
document.addEventListener("DOMContentLoaded", () => {

    // スマホ用ナビゲーション
    const hamburger = document.getElementById("hamburger");
    const nav = document.getElementById("nav");

    function closeMenu() {
        nav.classList.remove("active");
        hamburger.classList.remove("active");
        hamburger.setAttribute("aria-expanded", "false");
        hamburger.setAttribute("aria-label", "メニューを開く");
    }

    hamburger.addEventListener("click", () => {
        const isOpen = nav.classList.toggle("active");

        hamburger.classList.toggle("active", isOpen);
        hamburger.setAttribute("aria-expanded", isOpen);
        hamburger.setAttribute(
            "aria-label",
            isOpen ? "メニューを閉じる" : "メニューを開く"
        );
    });

    nav.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            closeMenu();
        }
    });


    // 施工実績のカテゴリー切り替え
    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {

            const filter = button.dataset.filter;

            filterButtons.forEach(btn => {
                btn.classList.remove("active");
                btn.setAttribute("aria-pressed", "false");
            });

            button.classList.add("active");
            button.setAttribute("aria-pressed", "true");

            projectCards.forEach(card => {
                card.hidden =
                    filter !== "all" &&
                    card.dataset.category !== filter;
            });
        });
    });


    // 施工画像の拡大表示
    const modal = document.getElementById("image-modal");
    const modalImage = document.getElementById("modal-image");
    const modalClose = document.getElementById("modal-close");

    document.querySelectorAll(".project-image").forEach(button => {

        button.addEventListener("click", () => {

            const image = button.querySelector("img");

            modalImage.src = image.currentSrc || image.src;
            modalImage.alt = image.alt;

            modal.showModal();

        });

    });

    modalClose.addEventListener("click", () => {
        modal.close();
    });

    modal.addEventListener("click", event => {

        if (event.target === modal) {
            modal.close();
        }

    });


    // お問い合わせフォーム
    const form = document.getElementById("contact-form");
    const formMessage = document.getElementById("form-message");

    const nameInput = document.getElementById("name");
    const messageInput = document.getElementById("message");

    [nameInput, messageInput].forEach(input => {

        input.addEventListener("input", () => {
            input.setCustomValidity("");
            formMessage.textContent = "";
        });

    });

    form.addEventListener("submit", event => {

        event.preventDefault();

        if (!nameInput.value.trim()) {
            nameInput.setCustomValidity("お名前を入力してください。");
            nameInput.reportValidity();
            return;
        }

        if (!messageInput.value.trim()) {
            messageInput.setCustomValidity("お問い合わせ内容を入力してください。");
            messageInput.reportValidity();
            return;
        }

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        formMessage.textContent =
            "入力内容を確認しました。制作実績用のため、実際の送信は行われません。";

    });


    // スクロールアニメーション
    const revealElements = document.querySelectorAll(
        ".about-image, .about-content, .section-heading, .service-card, .company-table, .contact-form"
    );

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }

            });

        }, {
            threshold: 0.1
        });

        revealElements.forEach(element => {
            element.classList.add("reveal");
            observer.observe(element);
        });

    }


    // スクロール時のヘッダー・トップに戻るボタン
    const header = document.querySelector(".header");
    const backToTop = document.getElementById("back-to-top");

    function updateScroll() {

        header.classList.toggle(
            "scrolled",
            window.scrollY > 50
        );

        backToTop.classList.toggle(
            "visible",
            window.scrollY > 500
        );

    }

    window.addEventListener("scroll", updateScroll, {
        passive: true
    });

    updateScroll();

    backToTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches ? "instant" : "smooth"
        });

    });

});
