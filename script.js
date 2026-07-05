// ===== Loader =====
window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = "0";
            loader.style.transition = "opacity 0.6s ease";
            setTimeout(() => (loader.style.display = "none"), 600);
        }, 350);
    }
});

// ===== Background particles =====
(function spawnParticles() {
    const fx = document.querySelector(".bg-fx");
    if (!fx) return;
    const count = window.innerWidth < 700 ? 12 : 26;
    for (let i = 0; i < count; i++) {
        const p = document.createElement("div");
        p.className = "particle";
        p.style.left = Math.random() * 100 + "%";
        p.style.bottom = "-10px";
        p.style.animationDuration = 8 + Math.random() * 14 + "s";
        p.style.animationDelay = Math.random() * 10 + "s";
        p.style.width = p.style.height = 1 + Math.random() * 2 + "px";
        fx.appendChild(p);
    }
})();

// ===== Mouse glow =====
(function mouseGlow() {
    const glow = document.querySelector(".cursor-glow");
    if (!glow) return;
    if (window.matchMedia("(pointer: coarse)").matches) { glow.style.display = "none"; return; }
    window.addEventListener("mousemove", (e) => {
        glow.style.left = e.clientX + "px";
        glow.style.top = e.clientY + "px";
    });
})();

// ===== Mobile nav =====
(function mobileNav() {
    const burger = document.querySelector(".hamburger");
    const links = document.querySelector(".nav-links");
    if (!burger || !links) return;
    burger.addEventListener("click", () => {
        links.classList.toggle("open");
        burger.classList.toggle("open");
    });
    links.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => links.classList.remove("open")));
})();

// ===== Scroll reveal =====
(function scrollReveal() {
    const items = document.querySelectorAll(".reveal, .reveal-zoom, .reveal-left, .reveal-right");
    if (!items.length) return;
    const obs = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("in");
                    obs.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15 }
    );
    items.forEach((el) => obs.observe(el));
})();

// ===== Animated counters =====
(function counters() {
    const nums = document.querySelectorAll(".stat-num[data-count]");
    if (!nums.length) return;
    const animate = (el) => {
        const target = parseInt(el.getAttribute("data-count"), 10);
        const suffix = el.getAttribute("data-suffix") || "";
        let current = 0;
        const duration = 1600;
        const start = performance.now();
        function tick(now) {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            current = Math.floor(eased * target);
            el.textContent = current + suffix;
            if (progress < 1) requestAnimationFrame(tick);
            else el.textContent = target + suffix;
        }
        requestAnimationFrame(tick);
    };
    const obs = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    animate(entry.target);
                    obs.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.4 }
    );
    nums.forEach((el) => obs.observe(el));
})();

// ===== Typing animation =====
(function typingAnim() {
    const el = document.querySelector(".typing-line[data-words]");
    if (!el) return;
    const words = JSON.parse(el.getAttribute("data-words"));
    let wordIndex = 0, charIndex = 0, deleting = false;
    el.innerHTML = '<span class="typed-text"></span><span class="typing-cursor">&nbsp;</span>';
    const textEl = el.querySelector(".typed-text");
    function tick() {
        const word = words[wordIndex];
        if (!deleting) {
            charIndex++;
            textEl.textContent = word.slice(0, charIndex);
            if (charIndex === word.length) {
                deleting = true;
                setTimeout(tick, 1600);
                return;
            }
        } else {
            charIndex--;
            textEl.textContent = word.slice(0, charIndex);
            if (charIndex === 0) {
                deleting = false;
                wordIndex = (wordIndex + 1) % words.length;
            }
        }
        setTimeout(tick, deleting ? 35 : 70);
    }
    setTimeout(tick, 500);
})();

// ===== Ripple effect on buttons =====
(function ripple() {
    document.querySelectorAll(".btn-primary, .btn-outline").forEach((btn) => {
        btn.addEventListener("click", function (e) {
            const rect = this.getBoundingClientRect();
            const circle = document.createElement("span");
            const size = Math.max(rect.width, rect.height);
            circle.className = "ripple";
            circle.style.width = circle.style.height = size + "px";
            circle.style.left = e.clientX - rect.left - size / 2 + "px";
            circle.style.top = e.clientY - rect.top - size / 2 + "px";
            this.appendChild(circle);
            setTimeout(() => circle.remove(), 650);
        });
    });
})();

// ===== Page transition on internal nav links =====
(function pageTransition() {
    const overlay = document.getElementById("page-transition");
    if (!overlay) return;
    document.querySelectorAll('a[href$=".html"]').forEach((link) => {
        link.addEventListener("click", function (e) {
            const href = this.getAttribute("href");
            if (this.target === "_blank") return;
            e.preventDefault();
            overlay.classList.add("active");
            setTimeout(() => (window.location.href = href), 320);
        });
    });
})();

// ===== FAQ accordion =====
(function faq() {
    document.querySelectorAll(".faq-q").forEach((q) => {
        q.addEventListener("click", () => {
            const item = q.parentElement;
            const wasOpen = item.classList.contains("open");
            item.parentElement.querySelectorAll(".faq-item").forEach((i) => i.classList.remove("open"));
            if (!wasOpen) item.classList.add("open");
        });
    });
})();

// ===== Category / pill filter (community page) =====
(function pillFilter() {
    const pills = document.querySelectorAll(".pill[data-filter]");
    if (!pills.length) return;
    const cards = document.querySelectorAll("[data-category]");
    pills.forEach((pill) => {
        pill.addEventListener("click", () => {
            pills.forEach((p) => p.classList.remove("active"));
            pill.classList.add("active");
            const filter = pill.getAttribute("data-filter");
            cards.forEach((card) => {
                const match = filter === "all" || card.getAttribute("data-category") === filter;
                card.style.display = match ? "" : "none";
            });
        });
    });
})();

// ===== Live search (community page) =====
(function liveSearch() {
    const input = document.querySelector(".search-bar input");
    if (!input) return;
    const cards = document.querySelectorAll("[data-title]");
    input.addEventListener("input", () => {
        const q = input.value.toLowerCase().trim();
        cards.forEach((card) => {
            const title = card.getAttribute("data-title").toLowerCase();
            card.style.display = title.includes(q) ? "" : "none";
        });
    });
})();

// ===== Chat demo send =====
(function chatDemo() {
    const input = document.querySelector(".chat-input-row input");
    const sendBtn = document.querySelector(".chat-input-row button");
    const body = document.querySelector(".chat-body");
    if (!input || !sendBtn || !body) return;
    function send() {
        const val = input.value.trim();
        if (!val) return;
        const msg = document.createElement("div");
        msg.className = "msg msg-out";
        msg.textContent = val;
        body.appendChild(msg);
        input.value = "";
        body.scrollTop = body.scrollHeight;
        setTimeout(() => {
            const reply = document.createElement("div");
            reply.className = "msg msg-in";
            reply.textContent = "Got it — a community moderator will follow up shortly.";
            body.appendChild(reply);
            body.scrollTop = body.scrollHeight;
        }, 900);
    }
    sendBtn.addEventListener("click", send);
    input.addEventListener("keydown", (e) => { if (e.key === "Enter") send(); });
})();

// ===== Write Article preview toggle =====
(function articlePreview() {
    const previewBtn = document.getElementById("previewBtn");
    if (!previewBtn) return;
    const titleInput = document.getElementById("artTitle");
    const contentInput = document.getElementById("artContent");
    const catInput = document.getElementById("artCategory");
    const previewPane = document.getElementById("previewPane");
    previewBtn.addEventListener("click", () => {
        document.getElementById("previewTitle").textContent = titleInput.value || "Untitled Article";
        document.getElementById("previewCat").textContent = catInput.value || "General";
        document.getElementById("previewContent").textContent = contentInput.value || "Your article content will appear here...";
        previewPane.style.display = previewPane.style.display === "block" ? "none" : "block";
    });
})();
