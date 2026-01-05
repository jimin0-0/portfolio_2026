document.addEventListener("DOMContentLoaded", () => {

  // Swiper (Project) 

  let projectSwiper = null;

  function initProjectSwiper() {
    const el = document.querySelector(".project-swiper");
    if (!el || projectSwiper) return;

    projectSwiper = new Swiper(".project-swiper", {
      slidesPerView: 1,
      speed: 700,
      loop: true,
      loopAdditionalSlides: 1,
      allowTouchMove: true,
      navigation: {
        prevEl: ".proj-prev",
        nextEl: ".proj-next",
      },
      simulateTouch: true,
      touchStartPreventDefault: false,
    });

    projectSwiper.on("slideChangeTransitionStart", () => {
      const active = projectSwiper.slides[projectSwiper.activeIndex];
      animateProjectSlide(active);
    });
  }

  function animateProjectSlide(activeSlideEl) {
    if (!activeSlideEl) return;

    const left = activeSlideEl.querySelector(".proj-left");
    const right = activeSlideEl.querySelector(".proj-right");
    if (!left || !right) return;

    gsap.killTweensOf([left, right]);
    gsap.set(left, { opacity: 0, x: -30 });
    gsap.set(right, { opacity: 0, y: 18 });

    gsap
      .timeline()
      .to(left, { opacity: 1, x: 0, duration: 0.55, ease: "power2.out" }, 0.05)
      .to(right, { opacity: 1, y: 0, duration: 0.55, ease: "power2.out" }, 0.15);
  }


  // Swiper (Design) 

  let designSwiper = null;

  function initDesignSwiper() {
    const el = document.querySelector(".design-swiper");
    if (!el || designSwiper) return;

    designSwiper = new Swiper(".design-swiper", {
      slidesPerView: 1,
      speed: 700,
      loop: true,
      loopAdditionalSlides: 1,
      allowTouchMove: true,
      navigation: {
        prevEl: ".design-prev",
        nextEl: ".design-next",
      },
      simulateTouch: true,
      touchStartPreventDefault: false,
    });

    designSwiper.on("slideChangeTransitionStart", () => {
      const active = designSwiper.slides[designSwiper.activeIndex];
      animateDesignSlide(active);
    });
  }

  function animateDesignSlide(activeSlideEl) {
    if (!activeSlideEl) return;

    const grid = activeSlideEl.querySelector(".design-grid");
    if (!grid) return;

    const items = grid.querySelectorAll(".design-item");
    if (!items.length) return;

    gsap.killTweensOf(items);
    gsap.set(items, { opacity: 0, y: 24 });

    gsap.to(items, {
      opacity: 1,
      y: 0,
      duration: 0.55,
      ease: "power2.out",
      stagger: 0.08,
    });
  }


  // 숨김 세팅

  function hideCover() {
    gsap.set([".cover-text .sub-title", ".cover-text .title", ".cover-text .desc"], {
      opacity: 0,
      y: 40,
    });
  }

  function hideProfile() {
    gsap.set(
      [".profile .section-title", ".profile .profile-intro", ".profile .profile-card", ".profile .profile-right"],
      { opacity: 0, y: 40 }
    );
  }

  function hideSkill() {
    gsap.set([".skill .skill_title", ".skill .skill_tab"], { opacity: 0, y: 40 });

    const activeWrap = document.querySelector(".skill .skill_wrap.active");
    if (activeWrap) {
      gsap.set(activeWrap.querySelectorAll(".skill_box"), { opacity: 0, y: 40 });
    }
  }

  function hideProject() {
    gsap.set([".project .project-title", ".project .project-card"], { opacity: 0, y: 40 });

    const arrows = document.querySelector(".project .project-arrows");
    if (arrows) gsap.set(arrows, { opacity: 0, y: 10 });

    const activeSlide = document.querySelector(".project .swiper-slide-active");
    if (activeSlide) {
      const left = activeSlide.querySelector(".proj-left");
      const right = activeSlide.querySelector(".proj-right");
      if (left) gsap.set(left, { opacity: 0, x: -30 });
      if (right) gsap.set(right, { opacity: 0, y: 18 });
    }
  }

  function hideDesign() {
    gsap.set([".design .design-title", ".design .design-swiper-wrap"], { opacity: 0, y: 40 });

    const arrows = document.querySelector(".design .design-arrows");
    if (arrows) gsap.set(arrows, { opacity: 0, y: 10 });

    const activeSlide = document.querySelector(".design .swiper-slide-active");
    if (activeSlide) {
      const items = activeSlide.querySelectorAll(".design-item");
      if (items.length) gsap.set(items, { opacity: 0, y: 24 });
    }
  }


  //  Contact 텍스트 준비

  function splitToChars(el) {
    if (!el || el.dataset.splitted === "true") return;

    const text = el.textContent;
    el.textContent = "";

    const frag = document.createDocumentFragment();
    [...text].forEach((ch) => {
      const span = document.createElement("span");
      span.className = "char";
      span.textContent = ch === " " ? "\u00A0" : ch;
      frag.appendChild(span);
    });

    el.appendChild(frag);
    el.dataset.splitted = "true";
  }

  function hideContact() {
    gsap.set([".contact .contact-thanks", ".contact .contact-sub"], {
      opacity: 0,
      y: 26,
    });

    const mailText = document.querySelector(".contact .mail-text");
    if (mailText) {
      splitToChars(mailText);
      const chars = mailText.querySelectorAll(".char");
      gsap.set(chars, {
        opacity: 0,
        y: 52,
        rotateX: 75,
        transformPerspective: 800,
      });
    }

    const hint = document.querySelector(".contact .mail-hint");
    if (hint) gsap.set(hint, { clearProps: "opacity,transform" });
  }

  function playContact() {
    const tl = gsap.timeline();

    tl.to(".contact .contact-thanks", {
      opacity: 1,
      y: 0,
      duration: 0.55,
      ease: "power2.out",
    })
      .add(() => {
        const mailText = document.querySelector(".contact .mail-text");
        if (!mailText) return;

        splitToChars(mailText);
        const chars = mailText.querySelectorAll(".char");

        gsap.killTweensOf(chars);
        gsap.set(chars, {
          opacity: 0,
          y: 58,
          rotateX: 78,
          transformPerspective: 900,
        });

        gsap.to(chars, {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.85,
          ease: "back.out(1.9)",
          stagger: 0.018,
        });

        gsap.delayedCall(1.05, () => {
          gsap.set(chars, { clearProps: "opacity,transform" });
        });
      }, 0.12)
      .to(
        ".contact .contact-sub",
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          ease: "power2.out",
        },
        0.55
      );
  }

  hideCover();
  hideProfile();
  hideSkill();
  hideProject();
  hideDesign();
  hideContact();


  // 섹션별 재생 애니메이션

  function playCover() {
    gsap.to(".cover-text .sub-title", { opacity: 1, y: 0, duration: 0.8 });
    gsap.to(".cover-text .title", { opacity: 1, y: 0, duration: 0.8, delay: 0.2 });
    gsap.to(".cover-text .desc", { opacity: 1, y: 0, duration: 0.8, delay: 0.4 });
  }

  function playProfile() {
    gsap.to(".profile .section-title", { opacity: 1, y: 0, duration: 0.6 });
    gsap.to(".profile .profile-intro", { opacity: 1, y: 0, duration: 0.6, delay: 0.2 });
    gsap.to(".profile .profile-card", { opacity: 1, y: 0, duration: 0.6, delay: 0.4 });
    gsap.to(".profile .profile-right", { opacity: 1, y: 0, duration: 0.6, delay: 0.6 });
  }

  function playSkill() {
    gsap.to(".skill .skill_title", { opacity: 1, y: 0, duration: 0.7 });
    gsap.to(".skill .skill_tab", { opacity: 1, y: 0, duration: 0.7, delay: 0.15 });

    const section = document.querySelector(".skill");
    if (!section) return;

    const activeWrap = section.querySelector(".skill_wrap.active");
    if (!activeWrap) return;

    const rows = activeWrap.querySelectorAll(".skill_row");
    rows.forEach((row, idx) => {
      const boxes = row.querySelectorAll(".skill_box");
      gsap.set(boxes, { opacity: 0, y: 40 });

      gsap.to(boxes, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: 0.35 + idx * 0.2,
        stagger: 0.08,
      });
    });
  }

  function playProject() {
    initProjectSwiper();

    const title = document.querySelector(".project .project-title");
    const card = document.querySelector(".project .project-card");
    const arrows = document.querySelector(".project .project-arrows");

    gsap.killTweensOf([title, card, arrows]);

    gsap.set(title, { opacity: 0, y: 40 });
    gsap.set(card, { opacity: 0, y: 40 });
    if (arrows) gsap.set(arrows, { opacity: 0, y: 10 });

    gsap
      .timeline()
      .to(title, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, 0)
      .to(card, { opacity: 1, y: 0, duration: 0.65, ease: "power2.out" }, 0.15)
      .to(arrows, { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" }, 0.35)
      .add(() => {
        const activeSlide = document.querySelector(".project .swiper-slide-active");
        animateProjectSlide(activeSlide);
      }, 0.35);
  }

  function playDesign() {
    initDesignSwiper();

    const title = document.querySelector(".design .design-title");
    const wrap = document.querySelector(".design .design-swiper-wrap");
    const arrows = document.querySelector(".design .design-arrows");

    gsap.killTweensOf([title, wrap, arrows]);

    gsap.set(title, { opacity: 0, y: 40 });
    gsap.set(wrap, { opacity: 0, y: 40 });
    if (arrows) gsap.set(arrows, { opacity: 0, y: 10 });

    gsap
      .timeline()
      .to(title, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, 0)
      .to(wrap, { opacity: 1, y: 0, duration: 0.65, ease: "power2.out" }, 0.15)
      .to(arrows, { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" }, 0.35)
      .add(() => {
        const activeSlide = document.querySelector(".design .swiper-slide-active");
        animateDesignSlide(activeSlide);
      }, 0.35);
  }


  // 반응형 프리뷰 팝업 열기

  function openPreview(href, width, height) {
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;

    window.open(
      href,
      "_blank",
      `width=${width},height=${height},top=${Math.max(0, top)},left=${Math.max(
        0,
        left
      )},resizable=yes,scrollbars=yes`
    );
  }


  //  fullPage 초기화
 
  new fullpage("#fullpage", {
    licenseKey: "gplv3-license",
    credits: { enabled: false },
    autoScrolling: true,
    navigation: true,
    navigationPosition: "right",
    scrollingSpeed: 900,

    afterRender: () => {
      const active = fullpage_api.getActiveSection();
      const idx = active ? active.index : 0;

      if (idx === 0) playCover();
      if (idx === 1) playProfile();
      if (idx === 2) playSkill();
      if (idx === 3) playProject();
      if (idx === 4) playDesign();
      if (idx === 5) playContact();
    },

    onLeave: (origin, destination) => {
      gsap.killTweensOf("*");

      if (destination.index === 0) hideCover();
      if (destination.index === 1) hideProfile();
      if (destination.index === 2) hideSkill();
      if (destination.index === 3) hideProject();
      if (destination.index === 4) hideDesign();
      if (destination.index === 5) hideContact();
    },

    afterLoad: (origin, destination) => {
      if (destination.index === 0) playCover();
      if (destination.index === 1) playProfile();
      if (destination.index === 2) playSkill();
      if (destination.index === 3) playProject();
      if (destination.index === 4) playDesign();
      if (destination.index === 5) playContact();
    },
  });


  //  프로필 탭

  const profileTabs = document.querySelectorAll(".tabs li");
  const profilePanels = document.querySelectorAll(".tab-panel");

  if (profileTabs.length && profilePanels.length) {
    profileTabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        profileTabs.forEach((t) => t.classList.remove("active"));
        profilePanels.forEach((p) => p.classList.remove("active"));

        tab.classList.add("active");
        const target = document.getElementById(tab.dataset.tab);
        if (target) target.classList.add("active");
      });
    });
  }


  //  스킬 탭

  const skillBtns = document.querySelectorAll(".skill .tab_btn");
  const skillWraps = document.querySelectorAll(".skill .skill_wrap");

  if (skillBtns.length && skillWraps.length) {
    skillBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        skillBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        skillWraps.forEach((w) => w.classList.remove("active"));
        const targetWrap = document.querySelector(`.skill .skill_wrap.${btn.dataset.tab}`);
        if (!targetWrap) return;
        targetWrap.classList.add("active");

        gsap.killTweensOf("*");
        playSkill();
      });
    });
  }


  //  모달 + 복사 + 프리뷰

  let currentCodeModal = null;

  const lockScroll = () => {
    document.body.style.overflow = "hidden";
    if (typeof fullpage_api !== "undefined") {
      fullpage_api.setAutoScrolling(false);
      fullpage_api.setKeyboardScrolling(false);
    }
  };

  const unlockScroll = () => {
    document.body.style.overflow = "";
    if (typeof fullpage_api !== "undefined") {
      fullpage_api.setAutoScrolling(true);
      fullpage_api.setKeyboardScrolling(true);
    }
  };

  function openCodeModal(modal) {
    if (!modal) return;

    modal.classList.add("active");
    currentCodeModal = modal;
    lockScroll();

    const tabs = modal.querySelectorAll(".code-tab");
    const contents = modal.querySelectorAll(".code-tab-content");
    tabs.forEach((t, i) => t.classList.toggle("active", i === 0));
    contents.forEach((c, i) => c.classList.toggle("active", i === 0));
  }

  function closeCodeModal(modal) {
    if (!modal) return;

    modal.classList.remove("active");
    currentCodeModal = null;
    unlockScroll();
  }

  document.addEventListener("click", (e) => {
    const openBtn = e.target.closest("[data-modal]");
    if (openBtn) {
      e.preventDefault();
      const modalId = openBtn.getAttribute("data-modal");
      const modal = document.getElementById(modalId);
      openCodeModal(modal);
      return;
    }


    const previewBtn = e.target.closest(".proj-btns a");
    if (previewBtn) {
      const href = previewBtn.getAttribute("href");
      if (!href || href === "#") return;

      if (previewBtn.classList.contains("btn-mobile")) {
        e.preventDefault();
        openPreview(href, 425, 812);
        return;
      }

      if (previewBtn.classList.contains("btn-tablet")) {
        e.preventDefault();
        openPreview(href, 768, 1024);
        return;
      }

      if (previewBtn.classList.contains("btn-pc")) {
        e.preventDefault();
        openPreview(href, 1280, 800);
        return;
      }
    }

    const closeBtn = e.target.closest(".code-close-btn");
    if (closeBtn) {
      closeCodeModal(closeBtn.closest(".code-modal-overlay"));
      return;
    }

    const overlay = e.target.closest(".code-modal-overlay");
    if (overlay && e.target === overlay) {
      closeCodeModal(overlay);
      return;
    }


    const tabBtn = e.target.closest(".code-tab");
    if (tabBtn) {
      const modal = tabBtn.closest(".code-modal-overlay");
      if (!modal) return;

      modal.querySelectorAll(".code-tab").forEach((t) => t.classList.remove("active"));
      modal.querySelectorAll(".code-tab-content").forEach((c) => c.classList.remove("active"));

      tabBtn.classList.add("active");
      const targetId = tabBtn.getAttribute("data-tab");
      modal.querySelector(`#${targetId}`)?.classList.add("active");
      return;
    }

    //  메일 복사
    const mail = e.target.closest(".contact-mail");
    if (mail) {
      const text = mail.dataset.copy || mail.textContent.trim();
      if (navigator.clipboard && text) {
        navigator.clipboard
          .writeText(text)
          .then(() => {
            const hint = mail.querySelector(".mail-hint");
            if (hint) {
              const prev = hint.textContent;
              hint.textContent = "Copied!";
              setTimeout(() => (hint.textContent = prev || "Click to copy"), 900);
            }
          })
          .catch(() => {});
      }
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && currentCodeModal) {
      closeCodeModal(currentCodeModal);
    }
  });
});
