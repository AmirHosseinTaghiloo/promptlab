<script setup>
import { onMounted } from 'vue'

useSeoMeta({
  title: 'PromptLab | آموزش مهندسی پرامپت',
  description: 'آموزش چارچوب RTIC برای ساخت پرامپت‌های دقیق، ساختاریافته و مؤثر برای هوش مصنوعی'
})

onMounted(() => {
"use strict";

    /* =========================================================
       منوی موبایل
    ========================================================= */
    const navbar = document.getElementById("navbar");
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    const navAnchors = [
      ...document.querySelectorAll(".nav-links a")
    ];

    function closeMobileMenu() {

      navLinks.classList.remove("open");

      menuToggle.classList.remove("open");

      menuToggle.setAttribute(
        "aria-expanded",
        "false"
      );

      menuToggle.setAttribute(
        "aria-label",
        "باز کردن منو"
      );

      document.body.classList.remove(
        "menu-open"
      );

    }

    menuToggle.addEventListener(
      "click",
      () => {

        const isOpen =
          navLinks.classList.toggle("open");

        menuToggle.classList.toggle(
          "open",
          isOpen
        );

        menuToggle.setAttribute(
          "aria-expanded",
          String(isOpen)
        );

        menuToggle.setAttribute(
          "aria-label",
          isOpen
            ? "بستن منو"
            : "باز کردن منو"
        );

        document.body.classList.toggle(
          "menu-open",
          isOpen
        );

      }
    );

    navAnchors.forEach(
      link => {

        link.addEventListener(
          "click",
          closeMobileMenu
        );

      }
    );

    window.addEventListener(
      "resize",
      () => {

        if (
          window.innerWidth > 680
        ) {

          closeMobileMenu();

        }

      }
    );

    /* =========================================================
       افکت نوار ناوبری هنگام اسکرول
    ========================================================= */
    function updateNavbar() {

      navbar.classList.toggle(
        "scrolled",
        window.scrollY > 20
      );

    }

    updateNavbar();

    window.addEventListener(
      "scroll",
      updateNavbar,
      {
        passive: true
      }
    );

    /* =========================================================
       فعال‌شدن لینک منوی بخش فعلی
    ========================================================= */
    const sections = [
      ...document.querySelectorAll(
        "main section[id]"
      )
    ];

    const sectionObserver =
      new IntersectionObserver(
        entries => {

          entries.forEach(
            entry => {

              if (
                !entry.isIntersecting
              ) {

                return;

              }

              const currentId =
                entry.target.id;

              navAnchors.forEach(
                link => {

                  link.classList.toggle(
                    "active",
                    link.getAttribute(
                      "href"
                    ) ===
                    `#${currentId}`
                  );

                }
              );

            }
          );

        },
        {

          rootMargin:
            "-35% 0px -55% 0px",

          threshold: 0.02

        }
      );

    sections.forEach(
      section =>
        sectionObserver.observe(
          section
        )
    );

    /* =========================================================
       انیمیشن نمایش عناصر هنگام اسکرول
    ========================================================= */
    const revealElements =
      document.querySelectorAll(
        ".reveal"
      );

    const revealObserver =
      new IntersectionObserver(
        (
          entries,
          observer
        ) => {

          entries.forEach(
            entry => {

              if (
                !entry.isIntersecting
              ) {

                return;

              }

              entry.target.classList.add(
                "visible"
              );

              observer.unobserve(
                entry.target
              );

            }
          );

        },
        {

          threshold: 0.12,

          rootMargin:
            "0px 0px -45px 0px"

        }
      );

    revealElements.forEach(
      element =>
        revealObserver.observe(
          element
        )
    );

    /* =========================================================
       تولیدکننده تعاملی پرامپت RTIC
    ========================================================= */
    const promptForm =
      document.getElementById(
        "promptForm"
      );

    const roleInput =
      document.getElementById(
        "roleInput"
      );

    const taskInput =
      document.getElementById(
        "taskInput"
      );

    const contextInput =
      document.getElementById(
        "contextInput"
      );

    const constraintInput =
      document.getElementById(
        "constraintInput"
      );

    const outputPlaceholder =
      document.getElementById(
        "outputPlaceholder"
      );

    const generatedPrompt =
      document.getElementById(
        "generatedPrompt"
      );

    const outputRole =
      document.getElementById(
        "outputRole"
      );

    const outputTask =
      document.getElementById(
        "outputTask"
      );

    const outputContext =
      document.getElementById(
        "outputContext"
      );

    const outputConstraint =
      document.getElementById(
        "outputConstraint"
      );

    const copyPromptButton =
      document.getElementById(
        "copyPrompt"
      );

    const defaults = {

      role:
        "به‌عنوان یک مدرس باتجربه هوش مصنوعی و متخصص مهندسی پرامپت عمل کن.",

      task:
        "یک پاسخ واضح، دقیق و کاربردی تولید کن که هدف درخواست را به‌طور کامل انجام دهد.",

      context:
        "مخاطب یک فرد مبتدی است و برای درک بهتر به توضیحات ساده و مثال‌های کاربردی نیاز دارد.",

      constraint:
        "از لحن حرفه‌ای و دوستانه استفاده کن، پاسخ را به‌صورت منظم سازمان‌دهی کن و از پیچیدگی غیرضروری پرهیز کن."

    };

    function getFieldValue(
      input,
      fallback
    ) {

      const value =
        input.value.trim();

      return value || fallback;

    }

    function buildPromptText() {

      return `نقش | ROLE:
${outputRole.textContent}

وظیفه | TASK:
${outputTask.textContent}

زمینه | CONTEXT:
${outputContext.textContent}

محدودیت | CONSTRAINT:
${outputConstraint.textContent}

دستور نهایی:
با استفاده از اطلاعات بالا، یک پاسخ باکیفیت تولید کن که تمام نیازها، شرایط و محدودیت‌های مشخص‌شده را به‌دقت رعایت کند.`;

    }

    promptForm.addEventListener(
      "submit",
      event => {

        event.preventDefault();

        outputRole.textContent =
          getFieldValue(
            roleInput,
            defaults.role
          );

        outputTask.textContent =
          getFieldValue(
            taskInput,
            defaults.task
          );

        outputContext.textContent =
          getFieldValue(
            contextInput,
            defaults.context
          );

        outputConstraint.textContent =
          getFieldValue(
            constraintInput,
            defaults.constraint
          );

        outputPlaceholder.style.display =
          "none";

        generatedPrompt.classList.remove(
          "show"
        );

        /*
          اجرای دوباره انیمیشن
        */
        void generatedPrompt.offsetWidth;

        generatedPrompt.classList.add(
          "show"
        );

        generatedPrompt.scrollIntoView(
          {

            behavior: "smooth",

            block: "nearest"

          }
        );

      }
    );

    /* =========================================================
       کپی پرامپت
    ========================================================= */
    copyPromptButton.addEventListener(
      "click",
      async () => {

        const promptText =
          buildPromptText();

        const originalContent =
          copyPromptButton.innerHTML;

        try {

          await navigator.clipboard
            .writeText(
              promptText
            );

          copyPromptButton.innerHTML =
            "<span>✓</span> کپی شد";

          setTimeout(
            () => {

              copyPromptButton.innerHTML =
                originalContent;

            },
            1800
          );

        } catch (error) {

          /*
            روش جایگزین برای مرورگرهای قدیمی
          */
          const temporaryTextArea =
            document.createElement(
              "textarea"
            );

          temporaryTextArea.value =
            promptText;

          temporaryTextArea.style.position =
            "fixed";

          temporaryTextArea.style.opacity =
            "0";

          document.body.appendChild(
            temporaryTextArea
          );

          temporaryTextArea.select();

          document.execCommand(
            "copy"
          );

          temporaryTextArea.remove();

          copyPromptButton.innerHTML =
            "<span>✓</span> کپی شد";

          setTimeout(
            () => {

              copyPromptButton.innerHTML =
                originalContent;

            },
            1800
          );

        }

      }
    );

    /* =========================================================
       آکاردئون سوالات متداول
    ========================================================= */
    const faqItems = [
      ...document.querySelectorAll(
        ".faq-item"
      )
    ];

    faqItems.forEach(
      item => {

        const question =
          item.querySelector(
            ".faq-question"
          );

        question.addEventListener(
          "click",
          () => {

            const isOpen =
              item.classList.contains(
                "active"
              );

            faqItems.forEach(
              faqItem => {

                faqItem.classList.remove(
                  "active"
                );

                faqItem
                  .querySelector(
                    ".faq-question"
                  )
                  .setAttribute(
                    "aria-expanded",
                    "false"
                  );

              }
            );

            if (
              !isOpen
            ) {

              item.classList.add(
                "active"
              );

              question.setAttribute(
                "aria-expanded",
                "true"
              );

            }

          }
        );

      }
    );

    /* =========================================================
       فرم بازخورد
    ========================================================= */
    const contactForm =
      document.getElementById(
        "contactForm"
      );

    const formStatus =
      document.getElementById(
        "formStatus"
      );

    contactForm.addEventListener(
      "submit",
      event => {

        event.preventDefault();

        if (
          !contactForm.checkValidity()
        ) {

          contactForm.reportValidity();

          return;

        }

        formStatus.classList.remove(
          "show"
        );

        void formStatus.offsetWidth;

        formStatus.classList.add(
          "show"
        );

        contactForm.reset();

      }
    );

    /* =========================================================
       سال فعلی
    ========================================================= */
    document.getElementById(
      "currentYear"
    ).textContent =
      new Date().getFullYear();
})
</script>

<template>
<!-- =======================================================
       نوار ناوبری
  ======================================================== -->
  <header class="navbar" id="navbar">
    <nav class="nav-inner" aria-label="منوی اصلی">

    <a href="#home" class="brand" aria-label="صفحه اصلی">
      <img class="brand-mark" src="/1.png" alt="لوگوی پرامپت لب">
      <span>
        پرامپت
        <span class="gradient-text">لب</span>
      </span>
    </a>

      <ul class="nav-links" id="navLinks">
        <li><a href="#home" class="active">خانه</a></li>
        <li><a href="#framework">چارچوب RTIC</a></li>
        <li><a href="#builder">پرامپت‌ساز</a></li>
        <li><a href="#examples">مثال‌ها</a></li>
        <li><a href="#faq">سؤالات متداول</a></li>
        <li><a href="#contact">ارتباط با ما</a></li>
      </ul>

      <a href="#builder" class="btn btn-primary nav-cta">
        ساخت پرامپت
      </a>

      <button
        class="menu-toggle"
        id="menuToggle"
        aria-label="باز کردن منو"
        aria-expanded="false"
        aria-controls="navLinks"
      >
        <span></span>
      </button>

    </nav>
  </header>

  <main>

    <!-- =====================================================
         Hero
    ====================================================== -->
    <section class="hero" id="home">

      <div class="hero-grid-lines"></div>
      <div class="glow glow-one"></div>
      <div class="glow glow-two"></div>

      <div class="container hero-grid">

        <div class="hero-content reveal">

          <span class="eyebrow">
            چارچوب ساخت پرامپت‌های حرفه‌ای
          </span>

          <h1>
            مهندسی پرامپت هوش مصنوعی را
            <span class="gradient-text">
              با RTIC حرفه‌ای یاد بگیر
            </span>
          </h1>

          <p>
            درخواست‌های مبهم را به دستورالعمل‌های دقیق و ساختاریافته تبدیل
            کنید. چارچوب RTIC با مشخص‌کردن نقش، وظیفه، زمینه و محدودیت‌ها،
            پاسخ‌های هوش مصنوعی را کاربردی‌تر، دقیق‌تر و قابل‌کنترل‌تر می‌کند.
          </p>

          <div class="hero-actions">

            <a href="#builder" class="btn btn-primary">
              شروع یادگیری
              <span aria-hidden="true">←</span>
            </a>

            <a href="#framework" class="btn btn-secondary">
              آشنایی با چارچوب
              <span aria-hidden="true">↓</span>
            </a>

          </div>

          <div class="hero-stats">

            <div class="hero-stat">
              <strong>۴</strong>
              <span>بخش اصلی</span>
            </div>

            <div class="hero-stat">
              <strong>۱</strong>
              <span>ساختار استاندارد</span>
            </div>

            <div class="hero-stat">
              <strong>∞</strong>
              <span>کاربرد برای هوش مصنوعی</span>
            </div>

          </div>

        </div>

        <div class="hero-visual reveal" aria-hidden="true">

          <div class="ai-orb">
            <span class="orbit-dot"></span>
          </div>

          <div class="floating-chip one">
            <i>✦</i>
            تفکر ساختاریافته
          </div>

          <div class="floating-chip two">
            <i>✓</i>
            خروجی بهتر
          </div>

          <div class="prompt-window">

            <div class="window-top">
              <span class="window-dot"></span>
              <span class="window-dot"></span>
              <span class="window-dot"></span>
            </div>

            <div class="prompt-line">
              <span class="prompt-tag">نقش</span>
              <p>به‌عنوان یک مدرس باتجربه هوش مصنوعی عمل کن.</p>
            </div>

            <div class="prompt-line">
              <span class="prompt-tag">وظیفه</span>
              <p>مهندسی پرامپت را به‌صورت ساده توضیح بده.</p>
            </div>

            <div class="prompt-line">
              <span class="prompt-tag">زمینه</span>
              <p>کاربر با هوش مصنوعی مولد آشنایی کمی دارد.</p>
            </div>

            <div class="prompt-line">
              <span class="prompt-tag">محدودیت</span>
              <p>از زبان ساده و مثال‌های کاربردی استفاده کن.</p>
            </div>

          </div>

        </div>

      </div>

    </section>

    <!-- =====================================================
         معرفی RTIC
    ====================================================== -->
    <section class="section" id="framework">

      <div class="container intro-grid">

        <div class="intro-copy reveal">

          <span class="eyebrow">
            یک روش ساده برای پرامپت‌های بهتر
          </span>

          <h2>
            چارچوب
            <span class="gradient-text">RTIC</span>
            چیست؟
          </h2>

          <p>
            RTIC یک چارچوب کاربردی برای برقراری ارتباط شفاف‌تر با هوش مصنوعی
            است. به‌جای نوشتن یک درخواست کوتاه و مبهم، می‌توانید درخواست خود
            را در چهار بخش مهم سازمان‌دهی کنید.
          </p>

          <p>
            هر بخش بخشی از ابهام را حذف می‌کند و به هوش مصنوعی کمک می‌کند
            هدف، مخاطب، شرایط و شکل موردنظر خروجی را بهتر درک کند.
          </p>

          <div class="intro-list">

            <div class="intro-list-item">
              <span class="check">✓</span>
              <span>
                <strong>نقش:</strong>
                تخصص و هویت حرفه‌ای هوش مصنوعی را مشخص می‌کند.
              </span>
            </div>

            <div class="intro-list-item">
              <span class="check">✓</span>
              <span>
                <strong>وظیفه:</strong>
                اقدام یا نتیجه موردانتظار را تعریف می‌کند.
              </span>
            </div>

            <div class="intro-list-item">
              <span class="check">✓</span>
              <span>
                <strong>زمینه:</strong>
                اطلاعات و شرایط مرتبط را ارائه می‌دهد.
              </span>
            </div>

            <div class="intro-list-item">
              <span class="check">✓</span>
              <span>
                <strong>محدودیت:</strong>
                قوانین و نحوه ارائه خروجی را کنترل می‌کند.
              </span>
            </div>

          </div>

        </div>

        <div class="rtic-model glass reveal">

          <div class="model-ring"></div>

          <div class="model-core">RTIC</div>

          <div class="model-node node-role">
            <b>R</b>
            نقش
          </div>

          <div class="model-node node-task">
            <b>T</b>
            وظیفه
          </div>

          <div class="model-node node-context">
            <b>I</b>
            زمینه
          </div>

          <div class="model-node node-constraint">
            <b>C</b>
            محدودیت
          </div>

        </div>

      </div>

    </section>

    <!-- =====================================================
         چهار بخش RTIC
    ====================================================== -->
    <section class="section">

      <div class="container">

        <div class="section-heading reveal">

          <span class="eyebrow">
            چهار بخش اصلی
          </span>

          <h2>
            به هوش مصنوعی
            <span class="gradient-text">
              مسیر واضح بدهید
            </span>
          </h2>

          <p>
            با ترکیب این چهار بخش، پرامپت‌هایی دقیق، قابل‌کنترل و قابل‌فهم
            برای هوش مصنوعی ایجاد کنید.
          </p>

        </div>

        <div class="cards-grid">

          <article class="rtic-card role-card reveal">

            <div class="icon-box">♙</div>

            <h3>نقش | Role</h3>

            <p>
              تخصص، هویت حرفه‌ای، دیدگاه یا سطح دانش موردانتظار از هوش
              مصنوعی را مشخص کنید.
            </p>

            <div class="example-box">

              <span class="example-label">
                مثال کاربردی
              </span>

              <p>
                «به‌عنوان یک مدرس ارشد امنیت سایبری با تجربه تدریس به
                دانشجویان دانشگاه عمل کن.»
              </p>

            </div>

          </article>

          <article class="rtic-card task-card reveal">

            <div class="icon-box">✓</div>

            <h3>وظیفه | Task</h3>

            <p>
              به‌صورت شفاف مشخص کنید هوش مصنوعی باید چه کاری انجام دهد و
              چه نتیجه‌ای تولید کند.
            </p>

            <div class="example-box">

              <span class="example-label">
                مثال کاربردی
              </span>

              <p>
                «تفاوت‌های اصلی یادگیری نظارت‌شده و بدون‌نظارت را توضیح
                بده.»
              </p>

            </div>

          </article>

          <article class="rtic-card context-card reveal">

            <div class="icon-box">◎</div>

            <h3>زمینه | Context</h3>

            <p>
              اطلاعات پس‌زمینه، مخاطب، شرایط، اهداف و جزئیات مرتبط با
              درخواست را ارائه دهید.
            </p>

            <div class="example-box">

              <span class="example-label">
                مثال کاربردی
              </span>

              <p>
                «مخاطب یک دانشجوی مهندسی کامپیوتر است که با مبانی پایتون
                آشنایی دارد.»
              </p>

            </div>

          </article>

          <article class="rtic-card constraint-card reveal">

            <div class="icon-box">⌘</div>

            <h3>محدودیت | Constraint</h3>

            <p>
              قوانین مربوط به لحن، طول، قالب، سبک، محدودیت‌ها و مواردی که
              باید رعایت شوند را تعیین کنید.
            </p>

            <div class="example-box">

              <span class="example-label">
                مثال کاربردی
              </span>

              <p>
                «از زبان ساده استفاده کن، دو مثال عملی ارائه بده و پاسخ را
                کمتر از ۸۰۰ کلمه نگه دار.»
              </p>

            </div>

          </article>

        </div>

      </div>

    </section>

    <!-- =====================================================
         سازنده پرامپت
    ====================================================== -->
    <section class="section" id="builder">

      <div class="container">

        <div class="section-heading reveal">

          <span class="eyebrow">
            ابزار تعاملی آموزش
          </span>

          <h2>
            پرامپت خود را
            <span class="gradient-text">
              بسازید
            </span>
          </h2>

          <p>
            اطلاعات موردنظر خود را وارد کنید و در چند ثانیه یک پرامپت
            حرفه‌ای و ساختاریافته بر اساس RTIC بسازید.
          </p>

        </div>

        <div class="builder-shell reveal">

          <div class="builder-grid">

            <form class="builder-form" id="promptForm">

              <h3 class="panel-title">

                <span class="mini-icon">✦</span>

                بخش‌های پرامپت

              </h3>

              <div class="form-grid">

                <div class="field">

                  <label for="roleInput">
                    نقش هوش مصنوعی
                    <span>ROLE</span>
                  </label>

                  <textarea
                    id="roleInput"
                    placeholder="مثال: به‌عنوان یک مدرس باتجربه یادگیری ماشین عمل کن..."
                  ></textarea>

                </div>

                <div class="field">

                  <label for="taskInput">
                    وظیفه موردنظر
                    <span>TASK</span>
                  </label>

                  <textarea
                    id="taskInput"
                    placeholder="مثال: مفاهیم اصلی یادگیری ماشین را آموزش بده..."
                  ></textarea>

                </div>

                <div class="field">

                  <label for="contextInput">
                    اطلاعات و زمینه
                    <span>CONTEXT</span>
                  </label>

                  <textarea
                    id="contextInput"
                    placeholder="مثال: مخاطب دانشجوی مهندسی کامپیوتر با دانش پایه پایتون است..."
                  ></textarea>

                </div>

                <div class="field">

                  <label for="constraintInput">
                    محدودیت‌ها و قوانین خروجی
                    <span>CONSTRAINT</span>
                  </label>

                  <textarea
                    id="constraintInput"
                    placeholder="مثال: از زبان ساده و مثال‌های عملی استفاده کن و پاسخ کمتر از ۸۰۰ کلمه باشد..."
                  ></textarea>

                </div>

                <button
                  type="submit"
                  class="btn btn-primary generate-btn"
                >
                  تولید پرامپت
                  <span>✦</span>
                </button>

              </div>

            </form>

            <div class="builder-result">

              <h3 class="panel-title">

                <span class="mini-icon">⌘</span>

                پرامپت تولیدشده

              </h3>

              <div class="prompt-output">

                <div
                  class="output-placeholder"
                  id="outputPlaceholder"
                >

                  <div>

                    <div class="placeholder-icon">
                      ✦
                    </div>

                    <h4>
                      پرامپت ساختاریافته شما اینجا نمایش داده می‌شود
                    </h4>

                    <p>
                      چهار بخش RTIC را تکمیل کنید و روی دکمه «تولید پرامپت»
                      بزنید.
                    </p>

                  </div>

                </div>

                <div
                  class="generated-prompt"
                  id="generatedPrompt"
                  aria-live="polite"
                >

                  <div class="generated-header">

                    <span>
                      پرامپت RTIC آماده است
                    </span>

                    <button
                      class="copy-btn"
                      id="copyPrompt"
                      type="button"
                    >
                      <span>▣</span>
                      کپی
                    </button>

                  </div>

                  <div class="generated-content">

                    <div class="generated-item item-role">

                      <strong>
                        نقش | Role
                      </strong>

                      <p id="outputRole"></p>

                    </div>

                    <div class="generated-item item-task">

                      <strong>
                        وظیفه | Task
                      </strong>

                      <p id="outputTask"></p>

                    </div>

                    <div class="generated-item item-context">

                      <strong>
                        زمینه | Context
                      </strong>

                      <p id="outputContext"></p>

                    </div>

                    <div class="generated-item item-constraint">

                      <strong>
                        محدودیت | Constraint
                      </strong>

                      <p id="outputConstraint"></p>

                    </div>

                  </div>

                  <div class="final-instruction">

                    با استفاده از اطلاعات بالا، یک پاسخ باکیفیت تولید کن که
                    تمام نیازها، شرایط و محدودیت‌های مشخص‌شده را به‌دقت
                    رعایت کند.

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>

    <!-- =====================================================
         مثال
    ====================================================== -->
    <section class="section" id="examples">

      <div class="container">

        <div class="section-heading reveal">

          <span class="eyebrow">
            قبل و بعد
          </span>

          <h2>
            تبدیل پرامپت ضعیف به
            <span class="gradient-text">
              دستورالعمل دقیق
            </span>
          </h2>

          <p>
            ببینید چگونه RTIC با اضافه‌کردن هدف، اطلاعات مخاطب و قوانین
            خروجی، یک درخواست مبهم را به یک پرامپت حرفه‌ای تبدیل می‌کند.
          </p>

        </div>

        <div class="comparison">

          <article class="comparison-card weak-card reveal">

            <span class="comparison-label weak-label">
              پرامپت ضعیف
            </span>

            <div class="weak-prompt">

              «درباره یادگیری ماشین به من آموزش بده.»

            </div>

            <p class="weak-note">

              این درخواست نقش، سطح دانش مخاطب، هدف آموزشی، قالب خروجی و
              محدودیت‌های مشخصی ندارد.

            </p>

          </article>

          <div class="arrow-divider reveal">

            <div class="arrow-circle">
              ←
            </div>

          </div>

          <article class="comparison-card improved-card reveal">

            <span class="comparison-label improved-label">

              پرامپت بهبود‌یافته با RTIC

            </span>

            <div class="improved-lines">

              <div class="improved-line">

                <b>
                  نقش
                </b>

                <p>
                  به‌عنوان یک مدرس باتجربه یادگیری ماشین عمل کن.
                </p>

              </div>

              <div class="improved-line">

                <b>
                  وظیفه
                </b>

                <p>
                  مفاهیم و مبانی اصلی یادگیری ماشین را آموزش بده.
                </p>

              </div>

              <div class="improved-line">

                <b>
                  زمینه
                </b>

                <p>
                  مخاطب یک دانشجوی مهندسی کامپیوتر با دانش پایه پایتون است.
                </p>

              </div>

              <div class="improved-line">

                <b>
                  محدودیت
                </b>

                <p>
                  از زبان ساده استفاده کن، مثال‌های عملی ارائه بده و پاسخ را
                  کمتر از ۸۰۰ کلمه نگه دار.
                </p>

              </div>

            </div>

          </article>

        </div>

      </div>

    </section>

    <!-- =====================================================
         گردش کار
    ====================================================== -->
    <section class="section">

      <div class="container">

        <div class="section-heading reveal">

          <span class="eyebrow">
            فرایند RTIC
          </span>

          <h2>
            از ایده تا
            <span class="gradient-text">
              پاسخ باکیفیت
            </span>
          </h2>

          <p>
            یک گردش کار ساده برای تبدیل درخواست‌های مبهم به دستورالعمل‌های
            دقیق و هدفمند برای هوش مصنوعی.
          </p>

        </div>

        <div class="workflow reveal">

          <div class="workflow-step">

            <div class="workflow-node">
              ♙
            </div>

            <span>
              نقش
            </span>

          </div>

          <div class="workflow-step">

            <div class="workflow-node">
              ✓
            </div>

            <span>
              وظیفه
            </span>

          </div>

          <div class="workflow-step">

            <div class="workflow-node">
              ◎
            </div>

            <span>
              زمینه
            </span>

          </div>

          <div class="workflow-step">

            <div class="workflow-node">
              ⌘
            </div>

            <span>
              محدودیت
            </span>

          </div>

          <div class="workflow-step">

            <div class="workflow-node">
              ✦
            </div>

            <span>
              پاسخ باکیفیت هوش مصنوعی
            </span>

          </div>

        </div>

      </div>

    </section>

    <!-- =====================================================
         مزایا
    ====================================================== -->
    <section class="section">

      <div class="container">

        <div class="section-heading reveal">

          <span class="eyebrow">
            چرا RTIC؟
          </span>

          <h2>
            پرامپت بهتر،
            <span class="gradient-text">
              خروجی بهتر
            </span>
          </h2>

          <p>
            RTIC یک ساختار تکرارپذیر برای ارتباط بهتر با هوش مصنوعی در
            آموزش، برنامه‌نویسی، تحقیق، کسب‌وکار و تولید محتوا ارائه می‌دهد.
          </p>

        </div>

        <div class="benefits-grid">

          <article class="benefit reveal">

            <span class="benefit-number">
              01
            </span>

            <div class="benefit-icon">
              ◎
            </div>

            <h3>
              پاسخ‌های دقیق‌تر
            </h3>

            <p>
              دستورالعمل‌های مشخص به هوش مصنوعی کمک می‌کنند نتیجه موردنظر را
              بهتر درک کند.
            </p>

          </article>

          <article class="benefit reveal">

            <span class="benefit-number">
              02
            </span>

            <div class="benefit-icon">
              ←
            </div>

            <h3>
              دستورالعمل‌های شفاف‌تر
            </h3>

            <p>
              ساختار منظم باعث می‌شود درخواست شما برای هوش مصنوعی قابل‌فهم‌تر
              باشد.
            </p>

          </article>

          <article class="benefit reveal">

            <span class="benefit-number">
              03
            </span>

            <div class="benefit-icon">
              ⌘
            </div>

            <h3>
              کنترل بهتر خروجی
            </h3>

            <p>
              لحن، طول، قالب، سبک و قوانین مهم پاسخ را به‌صورت دقیق تعیین
              کنید.
            </p>

          </article>

          <article class="benefit reveal">

            <span class="benefit-number">
              04
            </span>

            <div class="benefit-icon">
              ◇
            </div>

            <h3>
              کاهش ابهام
            </h3>

            <p>
              زمینه و محدودیت‌ها باعث می‌شوند فرض‌های نامشخص کاهش پیدا کنند.
            </p>

          </article>

          <article class="benefit reveal">

            <span class="benefit-number">
              05
            </span>

            <div class="benefit-icon">
              ↻
            </div>

            <h3>
              نتایج پایدارتر
            </h3>

            <p>
              الگوهای استاندارد و قابل‌استفاده مجدد، کیفیت خروجی را
              قابل‌اعتمادتر می‌کنند.
            </p>

          </article>

        </div>

      </div>

    </section>

    <!-- =====================================================
         سوالات متداول
    ====================================================== -->
    <section class="section" id="faq">

      <div class="container">

        <div class="section-heading reveal">

          <span class="eyebrow">
            پرسش‌های متداول
          </span>

          <h2>
            هرآنچه برای شروع
            <span class="gradient-text">
              RTIC
            </span>
            نیاز دارید
          </h2>

          <p>
            با نحوه استفاده از چارچوب RTIC و روش تطبیق آن با وظایف مختلف
            هوش مصنوعی آشنا شوید.
          </p>

        </div>

        <div class="faq-wrap">

          <article class="faq-item active reveal">

            <button
              class="faq-question"
              type="button"
              aria-expanded="true"
            >

              <span>
                RTIC مخفف چیست؟
              </span>

              <span>
                +
              </span>

            </button>

            <div class="faq-answer">

              <div>

                <p>
                  RTIC مخفف چهار بخش Role، Task، Context و Constraint است.
                  این چهار بخش به شما کمک می‌کنند نقش هوش مصنوعی، وظیفه
                  موردنظر، اطلاعات زمینه‌ای و قوانین خروجی را به‌صورت منظم
                  مشخص کنید.
                </p>

              </div>

            </div>

          </article>

          <article class="faq-item reveal">

            <button
              class="faq-question"
              type="button"
              aria-expanded="false"
            >

              <span>
                آیا همیشه باید از هر چهار بخش استفاده کنم؟
              </span>

              <span>
                +
              </span>

            </button>

            <div class="faq-answer">

              <div>

                <p>
                  خیر. برای درخواست‌های ساده ممکن است فقط وظیفه و یک
                  محدودیت کافی باشد. اما در کارهای پیچیده، زمانی که مخاطب
                  اهمیت دارد یا به قالب خروجی مشخص نیاز دارید، استفاده از هر
                  چهار بخش بسیار مفید است.
                </p>

              </div>

            </div>

          </article>

          <article class="faq-item reveal">

            <button
              class="faq-question"
              type="button"
              aria-expanded="false"
            >

              <span>
                آیا می‌توان از RTIC برای برنامه‌نویسی استفاده کرد؟
              </span>

              <span>
                +
              </span>

            </button>

            <div class="faq-answer">

              <div>

                <p>
                  بله. می‌توانید هوش مصنوعی را به‌عنوان یک توسعه‌دهنده ارشد
                  تعریف کنید، قابلیت موردنظر را توضیح دهید، اطلاعات مربوط به
                  فناوری‌ها و پروژه را ارائه کنید و محدودیت‌هایی مانند سبک
                  کدنویسی، ساختار فایل و قوانین امنیتی تعیین کنید.
                </p>

              </div>

            </div>

          </article>

          <article class="faq-item reveal">

            <button
              class="faq-question"
              type="button"
              aria-expanded="false"
            >

              <span>
                بخش زمینه باید چقدر جزئیات داشته باشد؟
              </span>

              <span>
                +
              </span>

            </button>

            <div class="faq-answer">

              <div>

                <p>
                  اطلاعاتی را اضافه کنید که واقعاً باعث تغییر یا بهبود پاسخ
                  می‌شوند؛ مانند سطح دانش مخاطب، هدف پروژه، ابزارهای موجود،
                  شرایط مهم یا اطلاعاتی که هوش مصنوعی برای ارائه پاسخ بهتر به
                  آن‌ها نیاز دارد.
                </p>

              </div>

            </div>

          </article>

          <article class="faq-item reveal">

            <button
              class="faq-question"
              type="button"
              aria-expanded="false"
            >

              <span>
                یک محدودیت خوب چه ویژگی‌هایی دارد؟
              </span>

              <span>
                +
              </span>

            </button>

            <div class="faq-answer">

              <div>

                <p>
                  محدودیت مناسب باید واضح و قابل‌اندازه‌گیری باشد. برای مثال
                  می‌توانید تعداد کلمات، لحن، تعداد مثال‌ها، عنوان‌های موردنیاز،
                  قالب پاسخ یا مواردی که نباید در خروجی استفاده شوند را مشخص
                  کنید.
                </p>

              </div>

            </div>

          </article>

        </div>

      </div>

    </section>

    <!-- =====================================================
         ارتباط با ما
    ====================================================== -->
    <section class="section" id="contact">

      <div class="container">

        <div class="contact-shell reveal">

          <div class="contact-info">

            <span class="eyebrow">
              بازخورد و پیشنهاد
            </span>

            <h2>
              به بهترشدن آموزش هوش مصنوعی
              <span class="gradient-text">
                کمک کنید
              </span>
            </h2>

            <p>
              اگر سؤال، پیشنهاد یا ایده‌ای برای آموزش‌های جدید RTIC دارید،
              پیام خود را برای ما ارسال کنید.
            </p>

            <div class="contact-points">

              <div class="contact-point">

                <i>✦</i>

                آموزش کاربردی هوش مصنوعی

              </div>

              <div class="contact-point">

                <i>⌘</i>

                چارچوب‌های شفاف برای پرامپت

              </div>

              <div class="contact-point">

                <i>✓</i>

                آموزش مناسب افراد مبتدی

              </div>

            </div>

          </div>

          <form class="contact-form" id="contactForm">

            <div class="form-grid">

              <div class="field">

                <label for="name">
                  نام و نام خانوادگی
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="نام خود را وارد کنید"
                  required
                />

              </div>

              <div class="field">

                <label for="email">
                  ایمیل
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  dir="ltr"
                  placeholder="example@email.com"
                  required
                />

              </div>

              <div class="field">

                <label for="message">
                  پیام شما
                </label>

                <textarea
                  id="message"
                  name="message"
                  placeholder="سؤال، پیشنهاد یا بازخورد خود را بنویسید..."
                  required
                ></textarea>

              </div>

              <button
                type="submit"
                class="btn btn-primary"
              >

                ارسال بازخورد

                <span>
                  ←
                </span>

              </button>

            </div>

            <div
              class="form-status"
              id="formStatus"
              role="status"
            >

              ممنون! پیام شما با موفقیت ثبت شد.

            </div>

          </form>

        </div>

      </div>

    </section>

  </main>

  <!-- =======================================================
       فوتر
  ======================================================== -->
  <footer>

    <div class="container footer-inner">

      <a href="#home" class="brand">
        <img class="brand-mark" src="/1.png" alt="لوگوی پرامپت لب">


        <span>
          پرامپت
          <span class="gradient-text">
            لب
          </span>
        </span>

      </a>

      <p>

        ©
        <span id="currentYear"></span>

        پرامپت‌لب — ساخته شده توسط امیرحسین تقی لو 

      </p>

      <div class="footer-links">

        <a href="#framework">
          چارچوب
        </a>

        <a href="#builder">
          پرامپت‌ساز
        </a>

        <a href="#examples">
          مثال‌ها
        </a>

        <a href="#faq">
          سؤالات متداول
        </a>

      </div>

    </div>

  </footer>
</template>

<style>
/* =========================================================
       متغیرهای اصلی و تنظیمات پایه
    ========================================================= */
    :root {
      --bg: #050716;
      --bg-secondary: #0a0f28;
      --surface: rgba(16, 22, 52, 0.72);
      --surface-dark: rgba(7, 11, 29, 0.88);

      --text: #f7f8ff;
      --text-muted: #aab3d0;

      --purple: #8b5cf6;
      --purple-light: #b794f6;
      --blue: #3b82f6;
      --cyan: #22d3ee;
      --pink: #ec4899;
      --green: #34d399;

      --border: rgba(255, 255, 255, 0.1);
      --shadow: 0 25px 80px rgba(0, 0, 0, 0.38);

      --radius-xl: 30px;
      --radius-lg: 23px;
      --radius-md: 17px;
      --radius-sm: 12px;

      --max-width: 1200px;
      --nav-height: 78px;

      --transition: 0.32s ease;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    html {
      scroll-behavior: smooth;
      scroll-padding-top: 100px;
    }

    body {
      min-height: 100vh;
      overflow-x: hidden;
      color: var(--text);
      background:
        radial-gradient(
          circle at 8% 12%,
          rgba(59, 130, 246, 0.12),
          transparent 30%
        ),
        radial-gradient(
          circle at 92% 8%,
          rgba(139, 92, 246, 0.17),
          transparent 29%
        ),
        radial-gradient(
          circle at 50% 90%,
          rgba(236, 72, 153, 0.07),
          transparent 35%
        ),
        var(--bg);
      font-family:
        Vazirmatn, Tahoma, Arial, sans-serif;
      line-height: 1.9;
    }

    body.menu-open {
      overflow: hidden;
    }

    a {
      color: inherit;
      text-decoration: none;
    }

    button,
    input,
    textarea {
      font: inherit;
    }

    button {
      border: 0;
      cursor: pointer;
    }

    input,
    textarea {
      width: 100%;
      border: 1px solid var(--border);
      outline: none;
      color: var(--text);
      background: rgba(3, 7, 22, 0.72);
      border-radius: 14px;
      transition:
        border-color var(--transition),
        box-shadow var(--transition),
        transform var(--transition);
    }

    input {
      min-height: 55px;
      padding: 0 17px;
    }

    textarea {
      min-height: 118px;
      padding: 15px 17px;
      resize: vertical;
    }

    input::placeholder,
    textarea::placeholder {
      color: #6f7899;
    }

    input:focus,
    textarea:focus {
      border-color: rgba(139, 92, 246, 0.9);
      box-shadow: 0 0 0 4px rgba(139, 92, 246, 0.12);
      transform: translateY(-1px);
    }

    ::selection {
      color: #fff;
      background: var(--purple);
    }

    /* =========================================================
       کلاس‌های عمومی
    ========================================================= */
    .container {
      width: min(var(--max-width), calc(100% - 40px));
      margin-inline: auto;
    }

    .section {
      position: relative;
      padding: 115px 0;
    }

    .section-heading {
      max-width: 800px;
      margin: 0 auto 62px;
      text-align: center;
    }

    .eyebrow {
      display: inline-flex;
      align-items: center;
      gap: 9px;
      padding: 8px 15px;
      margin-bottom: 18px;
      border: 1px solid rgba(139, 92, 246, 0.3);
      border-radius: 999px;
      color: #d9caff;
      background: rgba(139, 92, 246, 0.1);
      font-size: 0.78rem;
      font-weight: 800;
    }

    .eyebrow::before {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: var(--cyan);
      box-shadow: 0 0 14px var(--cyan);
      content: "";
    }

    .section-heading h2 {
      margin-bottom: 18px;
      font-size: clamp(2rem, 5vw, 3.7rem);
      line-height: 1.25;
      letter-spacing: -0.04em;
    }

    .section-heading p {
      color: var(--text-muted);
      font-size: 1.04rem;
    }

    .gradient-text {
      color: transparent;
      background: linear-gradient(
        100deg,
        var(--cyan),
        #a78bfa,
        var(--pink)
      );
      -webkit-background-clip: text;
      background-clip: text;
    }

    .glass {
      border: 1px solid var(--border);
      background: var(--surface);
      box-shadow: var(--shadow);
      backdrop-filter: blur(18px);
      -webkit-backdrop-filter: blur(18px);
    }

    .btn {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      min-height: 54px;
      padding: 0 25px;
      overflow: hidden;
      border-radius: 14px;
      font-weight: 800;
      transition:
        transform var(--transition),
        box-shadow var(--transition),
        border-color var(--transition);
    }

    .btn::before {
      position: absolute;
      inset: 0;
      background: linear-gradient(
        110deg,
        transparent 20%,
        rgba(255, 255, 255, 0.25),
        transparent 80%
      );
      transform: translateX(130%);
      transition: transform 0.7s ease;
      content: "";
    }

    .btn:hover::before {
      transform: translateX(-130%);
    }

    .btn:hover {
      transform: translateY(-3px);
    }

    .btn-primary {
      color: #fff;
      background: linear-gradient(135deg, var(--purple), #5b6ee8);
      box-shadow:
        0 15px 38px rgba(109, 73, 246, 0.34),
        inset 0 1px 0 rgba(255, 255, 255, 0.2);
    }

    .btn-primary:hover {
      box-shadow:
        0 22px 50px rgba(109, 73, 246, 0.48),
        inset 0 1px 0 rgba(255, 255, 255, 0.25);
    }

    .btn-secondary {
      border: 1px solid var(--border);
      color: var(--text);
      background: rgba(255, 255, 255, 0.045);
    }

    .btn-secondary:hover {
      border-color: rgba(139, 92, 246, 0.5);
      background: rgba(139, 92, 246, 0.1);
    }

    .reveal {
      opacity: 0;
      transform: translateY(28px);
      transition:
        opacity 0.8s ease,
        transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
    }

    .reveal.visible {
      opacity: 1;
      transform: translateY(0);
    }

    /* =========================================================
       نوار ناوبری
    ========================================================= */
    .navbar {
      position: fixed;
      z-index: 1000;
      top: 0;
      right: 0;
      width: 100%;
      height: var(--nav-height);
      border-bottom: 1px solid transparent;
      transition:
        background var(--transition),
        border-color var(--transition),
        box-shadow var(--transition);
    }

    .navbar.scrolled {
      border-color: var(--border);
      background: rgba(5, 7, 22, 0.82);
      box-shadow: 0 10px 45px rgba(0, 0, 0, 0.22);
      backdrop-filter: blur(19px);
      -webkit-backdrop-filter: blur(19px);
    }

    .nav-inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: min(var(--max-width), calc(100% - 40px));
      height: 100%;
      margin-inline: auto;
    }

    .brand {
      display: inline-flex;
      align-items: center;
      gap: 11px;
      font-size: 1.2rem;
      font-weight: 950;
    }

    .brand-mark {
      display: grid;
      width: 41px;
      height: 41px;
      place-items: center;
      border: 1px solid rgba(255, 255, 255, 0.18);
      border-radius: 13px;
      background: linear-gradient(135deg, var(--purple), var(--blue));
      box-shadow: 0 8px 24px rgba(99, 102, 241, 0.38);
      direction: ltr;
    }

    .brand-mark span {
      font-size: 0.78rem;
      font-weight: 950;
    }

    .nav-links {
      display: flex;
      align-items: center;
      gap: 25px;
      list-style: none;
    }

    .nav-links a {
      position: relative;
      color: var(--text-muted);
      font-size: 0.89rem;
      font-weight: 700;
      transition: color var(--transition);
    }

    .nav-links a::after {
      position: absolute;
      right: 0;
      bottom: -8px;
      left: 0;
      height: 2px;
      border-radius: 5px;
      background: linear-gradient(90deg, var(--purple), var(--cyan));
      transform: scaleX(0);
      transform-origin: right;
      transition: transform var(--transition);
      content: "";
    }

    .nav-links a:hover,
    .nav-links a.active {
      color: #fff;
    }

    .nav-links a:hover::after,
    .nav-links a.active::after {
      transform: scaleX(1);
      transform-origin: left;
    }

    .nav-cta {
      min-height: 43px;
      padding: 0 18px;
      font-size: 0.84rem;
    }

    .menu-toggle {
      display: none;
      width: 45px;
      height: 45px;
      border: 1px solid var(--border);
      border-radius: 12px;
      color: #fff;
      background: rgba(255, 255, 255, 0.04);
    }

    .menu-toggle span,
    .menu-toggle::before,
    .menu-toggle::after {
      display: block;
      width: 21px;
      height: 2px;
      margin: 5px auto;
      border-radius: 5px;
      background: currentColor;
      transition: transform var(--transition);
      content: "";
    }

    .menu-toggle.open span {
      opacity: 0;
    }

    .menu-toggle.open::before {
      transform: translateY(7px) rotate(45deg);
    }

    .menu-toggle.open::after {
      transform: translateY(-7px) rotate(-45deg);
    }

    /* =========================================================
       بخش Hero
    ========================================================= */
    .hero {
      position: relative;
      display: flex;
      align-items: center;
      min-height: 100vh;
      padding: calc(var(--nav-height) + 80px) 0 80px;
      overflow: hidden;
    }

    .hero-grid {
      display: grid;
      grid-template-columns: 1.08fr 0.92fr;
      align-items: center;
      gap: 60px;
    }

    .hero-content {
      position: relative;
      z-index: 3;
    }

    .hero-content h1 {
      max-width: 800px;
      margin-bottom: 26px;
      font-size: clamp(3rem, 7vw, 6.1rem);
      line-height: 1.08;
      letter-spacing: -0.065em;
    }

    .hero-content > p {
      max-width: 680px;
      margin-bottom: 34px;
      color: var(--text-muted);
      font-size: clamp(1rem, 2vw, 1.18rem);
    }

    .hero-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 14px;
      margin-bottom: 42px;
    }

    .hero-stats {
      display: flex;
      flex-wrap: wrap;
      gap: 30px;
    }

    .hero-stat {
      padding-left: 30px;
      border-left: 1px solid var(--border);
    }

    .hero-stat:last-child {
      padding-left: 0;
      border-left: 0;
    }

    .hero-stat strong {
      display: block;
      margin-bottom: 2px;
      font-size: 1.35rem;
    }

    .hero-stat span {
      color: var(--text-muted);
      font-size: 0.8rem;
    }

    .hero-visual {
      position: relative;
      z-index: 2;
      min-height: 570px;
    }

    .hero-grid-lines {
      position: absolute;
      inset: 0;
      z-index: 0;
      opacity: 0.2;
      background-image:
        linear-gradient(
          rgba(255, 255, 255, 0.05) 1px,
          transparent 1px
        ),
        linear-gradient(
          90deg,
          rgba(255, 255, 255, 0.05) 1px,
          transparent 1px
        );
      background-size: 60px 60px;
      mask-image: radial-gradient(
        circle at center,
        #000 20%,
        transparent 72%
      );
    }

    .glow {
      position: absolute;
      z-index: 0;
      border-radius: 50%;
      filter: blur(12px);
      pointer-events: none;
    }

    .glow-one {
      top: 12%;
      right: -10%;
      width: 430px;
      height: 430px;
      background: rgba(109, 73, 246, 0.17);
      animation: glowPulse 8s ease-in-out infinite;
    }

    .glow-two {
      bottom: -20%;
      left: -10%;
      width: 360px;
      height: 360px;
      background: rgba(34, 211, 238, 0.09);
      animation: glowPulse 9s ease-in-out infinite reverse;
    }

    .ai-orb {
      position: absolute;
      top: 50%;
      right: 50%;
      width: min(430px, 85vw);
      aspect-ratio: 1;
      border: 1px solid rgba(255, 255, 255, 0.14);
      border-radius: 50%;
      background:
        radial-gradient(
          circle at 35% 30%,
          rgba(255, 255, 255, 0.25),
          transparent 15%
        ),
        radial-gradient(
          circle at 48% 48%,
          rgba(139, 92, 246, 0.55),
          rgba(56, 189, 248, 0.14) 44%,
          transparent 68%
        );
      box-shadow:
        0 0 100px rgba(139, 92, 246, 0.28),
        inset 0 0 70px rgba(56, 189, 248, 0.13);
      transform: translate(50%, -50%);
      animation: orbFloat 7s ease-in-out infinite;
    }

    .ai-orb::before,
    .ai-orb::after {
      position: absolute;
      inset: -35px;
      border: 1px solid rgba(139, 92, 246, 0.2);
      border-radius: inherit;
      content: "";
    }

    .ai-orb::before {
      animation: spin 18s linear infinite;
    }

    .ai-orb::after {
      inset: 55px;
      border-color: rgba(34, 211, 238, 0.25);
      animation: spin 12s linear infinite reverse;
    }

    .orbit-dot {
      position: absolute;
      top: 4%;
      right: 50%;
      width: 13px;
      height: 13px;
      border-radius: 50%;
      background: var(--cyan);
      box-shadow: 0 0 20px var(--cyan);
    }

    .prompt-window {
      position: absolute;
      z-index: 5;
      bottom: 25px;
      left: -20px;
      width: min(420px, 92%);
      padding: 20px;
      border: 1px solid rgba(255, 255, 255, 0.13);
      border-radius: 20px;
      background: rgba(8, 12, 35, 0.76);
      box-shadow: 0 30px 80px rgba(0, 0, 0, 0.42);
      backdrop-filter: blur(20px);
      animation: cardFloat 6s ease-in-out infinite;
    }

    .window-top {
      display: flex;
      align-items: center;
      gap: 7px;
      margin-bottom: 18px;
      direction: ltr;
    }

    .window-dot {
      width: 9px;
      height: 9px;
      border-radius: 50%;
      background: #f472b6;
    }

    .window-dot:nth-child(2) {
      background: #fbbf24;
    }

    .window-dot:nth-child(3) {
      background: #34d399;
    }

    .prompt-line {
      display: flex;
      gap: 12px;
      align-items: flex-start;
      padding: 11px 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    }

    .prompt-line:last-child {
      border-bottom: 0;
    }

    .prompt-tag {
      min-width: 68px;
      color: var(--purple-light);
      font-size: 0.73rem;
      font-weight: 900;
    }

    .prompt-line p {
      color: #cbd3ec;
      font-size: 0.79rem;
      line-height: 1.7;
    }

    .floating-chip {
      position: absolute;
      z-index: 4;
      display: flex;
      align-items: center;
      gap: 9px;
      padding: 12px 16px;
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 14px;
      background: rgba(14, 19, 46, 0.74);
      box-shadow: 0 15px 45px rgba(0, 0, 0, 0.3);
      backdrop-filter: blur(16px);
      font-size: 0.76rem;
      font-weight: 800;
    }

    .floating-chip.one {
      top: 60px;
      right: -5px;
      animation: chipFloat 5s ease-in-out infinite;
    }

    .floating-chip.two {
      top: 110px;
      left: 10px;
      animation: chipFloat 5.5s ease-in-out infinite reverse;
    }

    .floating-chip i {
      display: grid;
      width: 28px;
      height: 28px;
      place-items: center;
      border-radius: 9px;
      color: #fff;
      background: rgba(139, 92, 246, 0.22);
      font-style: normal;
    }

    /* =========================================================
       معرفی RTIC
    ========================================================= */
    .intro-grid {
      display: grid;
      grid-template-columns: 0.95fr 1.05fr;
      gap: 55px;
      align-items: center;
    }

    .intro-copy h2 {
      margin-bottom: 20px;
      font-size: clamp(2.1rem, 4vw, 3.5rem);
      line-height: 1.25;
    }

    .intro-copy p {
      margin-bottom: 18px;
      color: var(--text-muted);
    }

    .intro-list {
      display: grid;
      gap: 14px;
      margin-top: 30px;
    }

    .intro-list-item {
      display: flex;
      gap: 13px;
      align-items: flex-start;
      color: #dbe2f7;
    }

    .check {
      display: grid;
      flex: 0 0 auto;
      width: 26px;
      height: 26px;
      place-items: center;
      margin-top: 3px;
      border-radius: 50%;
      color: #fff;
      background: linear-gradient(135deg, var(--purple), var(--blue));
      font-size: 0.75rem;
      font-weight: 900;
    }

    .rtic-model {
      position: relative;
      display: grid;
      min-height: 470px;
      place-items: center;
      overflow: hidden;
      border-radius: var(--radius-xl);
    }

    .model-core {
      position: relative;
      z-index: 3;
      display: grid;
      width: 160px;
      height: 160px;
      place-items: center;
      border: 1px solid rgba(255, 255, 255, 0.18);
      border-radius: 50%;
      background:
        radial-gradient(
          circle at 35% 25%,
          rgba(255, 255, 255, 0.25),
          transparent 25%
        ),
        linear-gradient(
          145deg,
          rgba(139, 92, 246, 0.8),
          rgba(56, 189, 248, 0.65)
        );
      box-shadow:
        0 0 70px rgba(139, 92, 246, 0.36),
        inset 0 0 25px rgba(255, 255, 255, 0.12);
      font-size: 2.3rem;
      font-weight: 950;
      direction: ltr;
    }

    .model-ring {
      position: absolute;
      width: 310px;
      height: 310px;
      border: 1px dashed rgba(255, 255, 255, 0.18);
      border-radius: 50%;
      animation: spin 28s linear infinite;
    }

    .model-node {
      position: absolute;
      z-index: 4;
      display: flex;
      align-items: center;
      gap: 9px;
      padding: 10px 13px;
      border: 1px solid rgba(255, 255, 255, 0.13);
      border-radius: 13px;
      background: rgba(10, 15, 38, 0.84);
      box-shadow: 0 13px 35px rgba(0, 0, 0, 0.28);
      backdrop-filter: blur(12px);
      font-size: 0.77rem;
      font-weight: 850;
    }

    .model-node b {
      display: grid;
      width: 27px;
      height: 27px;
      place-items: center;
      border-radius: 8px;
      color: #fff;
      direction: ltr;
    }

    .node-role {
      top: 55px;
      right: 50%;
      transform: translateX(50%);
    }

    .node-role b {
      background: linear-gradient(135deg, #7c3aed, #c084fc);
    }

    .node-task {
      top: 50%;
      left: 18px;
      transform: translateY(-50%);
    }

    .node-task b {
      background: linear-gradient(135deg, #0284c7, #22d3ee);
    }

    .node-context {
      right: 50%;
      bottom: 55px;
      transform: translateX(50%);
    }

    .node-context b {
      background: linear-gradient(135deg, #db2777, #f472b6);
    }

    .node-constraint {
      top: 50%;
      right: 18px;
      transform: translateY(-50%);
    }

    .node-constraint b {
      background: linear-gradient(135deg, #059669, #34d399);
    }

    /* =========================================================
       کارت‌های RTIC
    ========================================================= */
    .cards-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 19px;
    }

    .rtic-card {
      position: relative;
      min-height: 410px;
      padding: 27px;
      overflow: hidden;
      border: 1px solid var(--border);
      border-radius: 23px;
      background: linear-gradient(
        155deg,
        rgba(255, 255, 255, 0.07),
        rgba(255, 255, 255, 0.025)
      );
      box-shadow: 0 18px 55px rgba(0, 0, 0, 0.18);
      transition:
        transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1),
        border-color 0.4s ease,
        box-shadow 0.4s ease;
    }

    .rtic-card::before {
      position: absolute;
      top: -80px;
      left: -80px;
      width: 180px;
      height: 180px;
      border-radius: 50%;
      background: var(--card-glow);
      filter: blur(15px);
      opacity: 0.17;
      transition: opacity 0.4s ease;
      content: "";
    }

    .rtic-card::after {
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      height: 4px;
      background: var(--card-accent);
      transform: scaleX(0);
      transform-origin: right;
      transition: transform 0.4s ease;
      content: "";
    }

    .rtic-card:hover {
      border-color: var(--card-border);
      box-shadow:
        0 28px 65px rgba(0, 0, 0, 0.3),
        0 0 35px var(--card-glow);
      transform: translateY(-11px);
    }

    .rtic-card:hover::before {
      opacity: 0.35;
    }

    .rtic-card:hover::after {
      transform: scaleX(1);
    }

    .icon-box {
      display: grid;
      width: 58px;
      height: 58px;
      place-items: center;
      margin-bottom: 27px;
      border-radius: 17px;
      color: #fff;
      background: var(--card-accent);
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.17);
      font-size: 1.55rem;
    }

    .rtic-card h3 {
      margin-bottom: 12px;
      font-size: 1.48rem;
    }

    .rtic-card > p {
      min-height: 82px;
      color: var(--text-muted);
      font-size: 0.9rem;
    }

    .example-box {
      margin-top: 23px;
      padding: 16px;
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 14px;
      background: rgba(3, 7, 22, 0.48);
    }

    .example-label {
      display: block;
      margin-bottom: 7px;
      color: var(--card-label);
      font-size: 0.71rem;
      font-weight: 900;
    }

    .example-box p {
      color: #d8def0;
      font-size: 0.79rem;
      line-height: 1.8;
    }

    .role-card {
      --card-accent: linear-gradient(135deg, #7c3aed, #a855f7);
      --card-glow: rgba(139, 92, 246, 0.55);
      --card-border: rgba(139, 92, 246, 0.55);
      --card-label: #c4b5fd;
    }

    .task-card {
      --card-accent: linear-gradient(135deg, #0284c7, #22d3ee);
      --card-glow: rgba(34, 211, 238, 0.48);
      --card-border: rgba(34, 211, 238, 0.5);
      --card-label: #67e8f9;
    }

    .context-card {
      --card-accent: linear-gradient(135deg, #db2777, #f472b6);
      --card-glow: rgba(236, 72, 153, 0.48);
      --card-border: rgba(236, 72, 153, 0.5);
      --card-label: #f9a8d4;
    }

    .constraint-card {
      --card-accent: linear-gradient(135deg, #059669, #34d399);
      --card-glow: rgba(52, 211, 153, 0.43);
      --card-border: rgba(52, 211, 153, 0.5);
      --card-label: #6ee7b7;
    }

    /* =========================================================
       سازنده پرامپت
    ========================================================= */
    .builder-shell {
      position: relative;
      overflow: hidden;
      border: 1px solid rgba(139, 92, 246, 0.24);
      border-radius: 30px;
      background:
        linear-gradient(
          135deg,
          rgba(139, 92, 246, 0.09),
          transparent 40%
        ),
        rgba(12, 17, 42, 0.74);
      box-shadow: var(--shadow);
      backdrop-filter: blur(18px);
    }

    .builder-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }

    .builder-form {
      padding: 43px;
      border-left: 1px solid var(--border);
    }

    .builder-result {
      display: flex;
      flex-direction: column;
      padding: 43px;
      background: rgba(4, 8, 24, 0.36);
    }

    .panel-title {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 28px;
      font-size: 1.24rem;
    }

    .mini-icon {
      display: grid;
      width: 39px;
      height: 39px;
      place-items: center;
      border-radius: 11px;
      background: rgba(139, 92, 246, 0.18);
    }

    .form-grid {
      display: grid;
      gap: 20px;
    }

    .field label {
      display: flex;
      align-items: center;
      gap: 9px;
      margin-bottom: 9px;
      color: #dce2f6;
      font-size: 0.85rem;
      font-weight: 800;
    }

    .field label span {
      color: var(--purple-light);
      font-size: 0.7rem;
      direction: ltr;
    }

    .generate-btn {
      width: 100%;
      margin-top: 5px;
    }

    .prompt-output {
      position: relative;
      flex: 1;
      min-height: 420px;
      padding: 24px;
      overflow: auto;
      border: 1px solid rgba(255, 255, 255, 0.09);
      border-radius: 18px;
      background:
        linear-gradient(
          rgba(255, 255, 255, 0.018) 1px,
          transparent 1px
        ),
        linear-gradient(
          90deg,
          rgba(255, 255, 255, 0.018) 1px,
          transparent 1px
        ),
        rgba(2, 6, 19, 0.7);
      background-size: 28px 28px;
    }

    .output-placeholder {
      display: grid;
      min-height: 350px;
      place-items: center;
      text-align: center;
    }

    .placeholder-icon {
      display: grid;
      width: 78px;
      height: 78px;
      place-items: center;
      margin: 0 auto 20px;
      border: 1px solid rgba(139, 92, 246, 0.22);
      border-radius: 23px;
      color: var(--purple-light);
      background: rgba(139, 92, 246, 0.09);
      font-size: 2rem;
    }

    .output-placeholder h4 {
      margin-bottom: 9px;
      font-size: 1.08rem;
    }

    .output-placeholder p {
      max-width: 320px;
      color: var(--text-muted);
      font-size: 0.86rem;
    }

    .generated-prompt {
      display: none;
    }

    .generated-prompt.show {
      display: block;
      animation: outputIn 0.5s ease both;
    }

    .generated-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 15px;
      margin-bottom: 20px;
    }

    .generated-header > span {
      color: var(--green);
      font-size: 0.75rem;
      font-weight: 900;
    }

    .copy-btn {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      padding: 8px 12px;
      border: 1px solid var(--border);
      border-radius: 9px;
      color: #dce3f7;
      background: rgba(255, 255, 255, 0.04);
      font-size: 0.75rem;
      font-weight: 800;
      transition: all var(--transition);
    }

    .copy-btn:hover {
      border-color: rgba(34, 211, 238, 0.4);
      background: rgba(34, 211, 238, 0.09);
    }

    .generated-content {
      display: grid;
      gap: 15px;
    }

    .generated-item {
      padding: 15px 17px;
      border-right: 3px solid var(--item-color);
      border-radius: 12px 0 0 12px;
      background: rgba(255, 255, 255, 0.035);
    }

    .generated-item strong {
      display: block;
      margin-bottom: 5px;
      color: var(--item-color);
      font-size: 0.74rem;
    }

    .generated-item p {
      color: #d5dcef;
      font-size: 0.88rem;
      white-space: pre-wrap;
    }

    .item-role {
      --item-color: #b794f6;
    }

    .item-task {
      --item-color: #67e8f9;
    }

    .item-context {
      --item-color: #f9a8d4;
    }

    .item-constraint {
      --item-color: #6ee7b7;
    }

    .final-instruction {
      margin-top: 18px;
      padding: 15px 17px;
      border: 1px solid rgba(139, 92, 246, 0.2);
      border-radius: 13px;
      color: #e6e0ff;
      background: rgba(139, 92, 246, 0.08);
      font-size: 0.84rem;
    }

    /* =========================================================
       مثال ضعیف و بهبود یافته
    ========================================================= */
    .comparison {
      display: grid;
      grid-template-columns: 0.78fr 0.1fr 1.12fr;
      gap: 22px;
      align-items: stretch;
    }

    .comparison-card {
      padding: 33px;
      border: 1px solid var(--border);
      border-radius: 24px;
    }

    .weak-card {
      background: rgba(239, 68, 68, 0.055);
    }

    .improved-card {
      border-color: rgba(139, 92, 246, 0.27);
      background:
        linear-gradient(
          145deg,
          rgba(139, 92, 246, 0.12),
          transparent
        ),
        rgba(16, 22, 51, 0.65);
    }

    .comparison-label {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 24px;
      font-size: 0.76rem;
      font-weight: 900;
    }

    .comparison-label::before {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: currentColor;
      box-shadow: 0 0 14px currentColor;
      content: "";
    }

    .weak-label {
      color: #fb7185;
    }

    .improved-label {
      color: #a78bfa;
    }

    .weak-prompt {
      padding: 22px;
      border: 1px solid rgba(251, 113, 133, 0.16);
      border-radius: 16px;
      color: #f4d7dd;
      background: rgba(0, 0, 0, 0.2);
      font-size: 1.08rem;
      font-style: italic;
    }

    .weak-note {
      margin-top: 23px;
      color: var(--text-muted);
      font-size: 0.87rem;
    }

    .arrow-divider {
      display: grid;
      place-items: center;
    }

    .arrow-circle {
      display: grid;
      width: 55px;
      height: 55px;
      place-items: center;
      border: 1px solid rgba(139, 92, 246, 0.35);
      border-radius: 50%;
      color: var(--purple-light);
      background: rgba(139, 92, 246, 0.1);
      box-shadow: 0 0 30px rgba(139, 92, 246, 0.18);
      font-size: 1.35rem;
    }

    .improved-lines {
      display: grid;
      gap: 12px;
    }

    .improved-line {
      display: grid;
      grid-template-columns: 105px 1fr;
      gap: 14px;
      padding: 13px 15px;
      border-radius: 12px;
      background: rgba(255, 255, 255, 0.035);
    }

    .improved-line b {
      color: var(--purple-light);
      font-size: 0.8rem;
    }

    .improved-line p {
      color: #d8dff1;
      font-size: 0.87rem;
    }

    /* =========================================================
       گردش کار
    ========================================================= */
    .workflow {
      position: relative;
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      align-items: center;
      padding: 39px;
      overflow: hidden;
      border: 1px solid var(--border);
      border-radius: 28px;
      background: rgba(14, 20, 47, 0.67);
    }

    .workflow::before {
      position: absolute;
      top: 50%;
      right: 9%;
      left: 9%;
      height: 2px;
      background: linear-gradient(
        90deg,
        rgba(139, 92, 246, 0.15),
        rgba(34, 211, 238, 0.75),
        rgba(139, 92, 246, 0.15)
      );
      content: "";
    }

    .workflow-step {
      position: relative;
      z-index: 2;
      display: grid;
      place-items: center;
      text-align: center;
    }

    .workflow-node {
      display: grid;
      width: 100px;
      height: 100px;
      place-items: center;
      margin-bottom: 13px;
      border: 1px solid rgba(255, 255, 255, 0.13);
      border-radius: 25px;
      background: rgba(8, 12, 31, 0.94);
      box-shadow: 0 12px 35px rgba(0, 0, 0, 0.25);
      font-size: 1.65rem;
      transition:
        transform var(--transition),
        box-shadow var(--transition);
    }

    .workflow-step:hover .workflow-node {
      box-shadow: 0 20px 45px rgba(0, 0, 0, 0.38);
      transform: translateY(-7px) scale(1.04);
    }

    .workflow-step span {
      color: #dce3f6;
      font-size: 0.79rem;
      font-weight: 850;
    }

    .workflow-step:nth-child(1) .workflow-node {
      color: #c4b5fd;
      box-shadow: 0 0 35px rgba(139, 92, 246, 0.15);
    }

    .workflow-step:nth-child(2) .workflow-node {
      color: #67e8f9;
      box-shadow: 0 0 35px rgba(34, 211, 238, 0.13);
    }

    .workflow-step:nth-child(3) .workflow-node {
      color: #f9a8d4;
      box-shadow: 0 0 35px rgba(236, 72, 153, 0.12);
    }

    .workflow-step:nth-child(4) .workflow-node {
      color: #6ee7b7;
      box-shadow: 0 0 35px rgba(52, 211, 153, 0.12);
    }

    .workflow-step:nth-child(5) .workflow-node {
      color: #fff;
      background: linear-gradient(135deg, #6d45e8, #2563eb);
      box-shadow: 0 0 42px rgba(99, 102, 241, 0.35);
    }

    /* =========================================================
       مزایا
    ========================================================= */
    .benefits-grid {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 16px;
    }

    .benefit {
      padding: 24px 20px;
      border: 1px solid var(--border);
      border-radius: 19px;
      background: rgba(255, 255, 255, 0.035);
      transition:
        transform var(--transition),
        border-color var(--transition),
        background var(--transition);
    }

    .benefit:hover {
      border-color: rgba(139, 92, 246, 0.38);
      background: rgba(139, 92, 246, 0.07);
      transform: translateY(-7px);
    }

    .benefit-number {
      display: block;
      margin-bottom: 21px;
      color: rgba(167, 139, 250, 0.7);
      font-size: 0.72rem;
      font-weight: 900;
      direction: ltr;
    }

    .benefit-icon {
      display: grid;
      width: 46px;
      height: 46px;
      place-items: center;
      margin-bottom: 18px;
      border-radius: 13px;
      color: var(--purple-light);
      background: rgba(139, 92, 246, 0.13);
      font-size: 1.2rem;
    }

    .benefit h3 {
      margin-bottom: 10px;
      font-size: 1rem;
    }

    .benefit p {
      color: var(--text-muted);
      font-size: 0.81rem;
    }

    /* =========================================================
       سوالات متداول
    ========================================================= */
    .faq-wrap {
      max-width: 860px;
      margin: 0 auto;
    }

    .faq-item {
      margin-bottom: 13px;
      overflow: hidden;
      border: 1px solid var(--border);
      border-radius: 17px;
      background: rgba(255, 255, 255, 0.035);
      transition:
        border-color var(--transition),
        background var(--transition);
    }

    .faq-item.active {
      border-color: rgba(139, 92, 246, 0.38);
      background: rgba(139, 92, 246, 0.055);
    }

    .faq-question {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      padding: 21px 23px;
      color: var(--text);
      background: transparent;
      text-align: right;
      font-size: 0.94rem;
      font-weight: 800;
    }

    .faq-question span:last-child {
      display: grid;
      flex: 0 0 auto;
      width: 31px;
      height: 31px;
      place-items: center;
      border: 1px solid var(--border);
      border-radius: 9px;
      color: var(--purple-light);
      transition:
        transform var(--transition),
        background var(--transition);
    }

    .faq-item.active .faq-question span:last-child {
      background: rgba(139, 92, 246, 0.15);
      transform: rotate(45deg);
    }

    .faq-answer {
      display: grid;
      grid-template-rows: 0fr;
      transition: grid-template-rows 0.4s ease;
    }

    .faq-item.active .faq-answer {
      grid-template-rows: 1fr;
    }

    .faq-answer > div {
      overflow: hidden;
    }

    .faq-answer p {
      padding: 0 23px 22px;
      color: var(--text-muted);
      font-size: 0.88rem;
    }

    /* =========================================================
       تماس و بازخورد
    ========================================================= */
    .contact-shell {
      display: grid;
      grid-template-columns: 0.82fr 1.18fr;
      overflow: hidden;
      border: 1px solid var(--border);
      border-radius: 30px;
      background: rgba(13, 19, 46, 0.72);
      box-shadow: var(--shadow);
    }

    .contact-info {
      position: relative;
      padding: 50px;
      overflow: hidden;
      background:
        radial-gradient(
          circle at 20% 15%,
          rgba(139, 92, 246, 0.28),
          transparent 45%
        ),
        linear-gradient(145deg, #121a48, #0c102b);
    }

    .contact-info::after {
      position: absolute;
      left: -100px;
      bottom: -100px;
      width: 280px;
      height: 280px;
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 50%;
      box-shadow:
        0 0 0 35px rgba(139, 92, 246, 0.05),
        0 0 0 70px rgba(139, 92, 246, 0.035);
      content: "";
    }

    .contact-info > * {
      position: relative;
      z-index: 2;
    }

    .contact-info h2 {
      max-width: 430px;
      margin-bottom: 18px;
      font-size: clamp(2rem, 4vw, 3.3rem);
      line-height: 1.25;
    }

    .contact-info > p {
      max-width: 430px;
      color: var(--text-muted);
    }

    .contact-points {
      display: grid;
      gap: 16px;
      margin-top: 38px;
    }

    .contact-point {
      display: flex;
      align-items: center;
      gap: 13px;
      color: #dbe2f6;
      font-size: 0.87rem;
    }

    .contact-point i {
      display: grid;
      width: 40px;
      height: 40px;
      place-items: center;
      border-radius: 12px;
      color: var(--cyan);
      background: rgba(34, 211, 238, 0.09);
      font-style: normal;
    }

    .contact-form {
      padding: 50px;
    }

    .contact-form .form-grid {
      gap: 19px;
    }

    .form-status {
      display: none;
      margin-top: 16px;
      padding: 12px 14px;
      border: 1px solid rgba(52, 211, 153, 0.25);
      border-radius: 11px;
      color: #a7f3d0;
      background: rgba(52, 211, 153, 0.08);
      font-size: 0.83rem;
    }

    .form-status.show {
      display: block;
      animation: outputIn 0.4s ease;
    }

    /* =========================================================
       فوتر
    ========================================================= */
    footer {
      padding: 35px 0;
      border-top: 1px solid var(--border);
      background: rgba(2, 5, 17, 0.48);
    }

    .footer-inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 20px;
    }

    .footer-inner p {
      color: #7f89a9;
      font-size: 0.78rem;
    }

    .footer-links {
      display: flex;
      gap: 19px;
      color: var(--text-muted);
      font-size: 0.78rem;
    }

    .footer-links a:hover {
      color: #fff;
    }

    /* =========================================================
       انیمیشن‌ها
    ========================================================= */
    @keyframes orbFloat {
      0%,
      100% {
        transform: translate(50%, -50%) translateY(-10px);
      }

      50% {
        transform: translate(50%, -50%) translateY(14px);
      }
    }

    @keyframes cardFloat {
      0%,
      100% {
        transform: translateY(0) rotate(-1deg);
      }

      50% {
        transform: translateY(-12px) rotate(1deg);
      }
    }

    @keyframes chipFloat {
      0%,
      100% {
        transform: translateY(0);
      }

      50% {
        transform: translateY(-12px);
      }
    }

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }

    @keyframes glowPulse {
      0%,
      100% {
        opacity: 0.45;
        transform: scale(0.95);
      }

      50% {
        opacity: 0.9;
        transform: scale(1.08);
      }
    }

    @keyframes outputIn {
      from {
        opacity: 0;
        transform: translateY(12px);
      }

      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    /* =========================================================
       طراحی واکنش‌گرا
    ========================================================= */
    @media (max-width: 1100px) {
      .hero-grid {
        gap: 25px;
      }

      .cards-grid {
        grid-template-columns: repeat(2, 1fr);
      }

      .benefits-grid {
        grid-template-columns: repeat(3, 1fr);
      }

      .workflow-node {
        width: 82px;
        height: 82px;
        border-radius: 21px;
      }
    }

    @media (max-width: 900px) {
      .section {
        padding: 88px 0;
      }

      .hero {
        padding-top: calc(var(--nav-height) + 60px);
      }

      .hero-grid,
      .intro-grid,
      .contact-shell {
        grid-template-columns: 1fr;
      }

      .hero-content {
        text-align: center;
      }

      .hero-content > p {
        margin-inline: auto;
      }

      .hero-actions,
      .hero-stats {
        justify-content: center;
      }

      .hero-visual {
        min-height: 510px;
      }

      .prompt-window {
        right: 50%;
        left: auto;
        transform: translateX(50%);
      }

      .floating-chip.one {
        right: 5%;
      }

      .floating-chip.two {
        left: 5%;
      }

      .intro-copy {
        text-align: center;
      }

      .intro-list {
        max-width: 620px;
        margin-inline: auto;
        text-align: right;
      }

      .builder-grid {
        grid-template-columns: 1fr;
      }

      .builder-form {
        border-bottom: 1px solid var(--border);
        border-left: 0;
      }

      .comparison {
        grid-template-columns: 1fr;
      }

      .arrow-divider {
        min-height: 55px;
      }

      .arrow-circle {
        transform: rotate(90deg);
      }

      .workflow {
        grid-template-columns: repeat(5, minmax(115px, 1fr));
        overflow-x: auto;
      }

      .workflow::before {
        min-width: 600px;
      }

      .contact-info,
      .contact-form {
        padding: 42px;
      }
    }

    @media (max-width: 680px) {
      :root {
        --nav-height: 69px;
      }

      .container,
      .nav-inner {
        width: min(100% - 28px, var(--max-width));
      }

      .navbar {
        height: var(--nav-height);
      }

      .nav-links {
        position: fixed;
        top: var(--nav-height);
        right: 14px;
        left: 14px;
        display: grid;
        gap: 4px;
        padding: 18px;
        border: 1px solid var(--border);
        border-radius: 18px;
        background: rgba(8, 11, 29, 0.97);
        box-shadow: 0 25px 60px rgba(0, 0, 0, 0.42);
        opacity: 0;
        visibility: hidden;
        transform: translateY(-12px);
        transition: all 0.3s ease;
        backdrop-filter: blur(18px);
      }

      .nav-links.open {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
      }

      .nav-links li {
        width: 100%;
      }

      .nav-links a {
        display: block;
        padding: 12px 10px;
      }

      .nav-links a::after {
        display: none;
      }

      .nav-cta {
        display: none;
      }

      .menu-toggle {
        display: block;
      }

      .hero-content h1 {
        font-size: clamp(2.75rem, 15vw, 4.5rem);
      }

      .hero-stat {
        padding-left: 18px;
      }

      .hero-visual {
        min-height: 455px;
      }

      .ai-orb {
        width: 330px;
      }

      .prompt-window {
        bottom: 5px;
      }

      .model-node {
        padding: 8px 10px;
        font-size: 0.68rem;
      }

      .node-task {
        left: 3px;
      }

      .node-constraint {
        right: 3px;
      }

      .cards-grid,
      .benefits-grid {
        grid-template-columns: 1fr;
      }

      .rtic-card > p {
        min-height: auto;
      }

      .builder-form,
      .builder-result,
      .contact-info,
      .contact-form {
        padding: 27px 20px;
      }

      .prompt-output {
        min-height: 390px;
      }

      .improved-line {
        grid-template-columns: 1fr;
        gap: 5px;
      }

      .workflow {
        grid-template-columns: repeat(5, 120px);
        padding: 28px 20px;
      }

      .workflow-step span {
        font-size: 0.72rem;
      }

      .footer-inner {
        flex-direction: column;
        text-align: center;
      }

      .footer-links {
        flex-wrap: wrap;
        justify-content: center;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      html {
        scroll-behavior: auto;
      }

      *,
      *::before,
      *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        scroll-behavior: auto !important;
        transition-duration: 0.01ms !important;
      }
    }

/* Nuxt/Vue polish */
html { color-scheme: dark; }
button:focus-visible, a:focus-visible {
  outline: 2px solid #22d3ee;
  outline-offset: 4px;
}
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
  }
}
</style>
