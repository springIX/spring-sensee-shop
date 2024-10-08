// 스크롤에 따라 버튼 보이기/숨기기
window.onscroll = function() {
  const topBtn = document.getElementById('topBtn');
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
      topBtn.classList.add('show'); // 스크롤이 100px 이상 내려가면 버튼 표시
  } else {
      topBtn.classList.remove('show'); // 그렇지 않으면 버튼 숨김
  }
};

// 버튼 클릭 시 맨 위로 부드럽게 스크롤
document.getElementById('topBtn').onclick = function() {
  window.scrollTo({
      top: 0,
      behavior: 'smooth' // 부드러운 스크롤
  });
};



// 첫 번째 스와이퍼
const swiper1 = new Swiper(".swiper1", {
  spaceBetween: 0,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination1",
    type: "fraction",
    clickable: true,
    renderFraction: function (currentClass, totalClass) {
      return (
        '<span class="' +
        currentClass +
        '"></span> / <span class="' +
        totalClass +
        '"></span>'
      );
    },
    formatFractionCurrent: function (number) {
      return number < 10 ? "0" + number : number; // 두 자리로 표시
    },
    formatFractionTotal: function (number) {
      return number < 10 ? "0" + number : number; // 두 자리로 표시
    },
  },
  navigation: {
    nextEl: ".swiper-button-next1",
    prevEl: ".swiper-button-prev1",
  },
  breakpoints: {
    // min
    768: {
      spaceBetween: 30,
      allowTouchMove: false,
    },
  },
  on: {
    init: function () {
      startProgress(); // 첫 슬라이드에서 진행 바 시작
    },
    slideChangeTransitionStart: function () {
      resetProgress(); // 슬라이드 전환 시 진행 바 초기화
    },
    slideChangeTransitionEnd: function () {
      startProgress(); // 슬라이드 전환이 끝난 후 진행 바 애니메이션 시작
    }
  }
});

  // 진행 바 애니메이션 시작
  function startProgress() {
    var progressBar = document.querySelector('.swiper1 .pagi .progress');
    if (progressBar) {
      progressBar.style.transform = 'scaleX(1)'; // 0에서 100%까지 진행
    }
  }

  // 진행 바 초기화
  function resetProgress() {
    var progressBar = document.querySelector('.swiper1 .pagi .progress');
    if (progressBar) {
      progressBar.style.transform = 'scaleX(0)'; // 0으로 초기화
      progressBar.style.transition = 'none'; // 애니메이션 없이 즉시 0으로 설정

      setTimeout(function () {
        progressBar.style.transition = 'transform 3s linear'; // 3초 동안 부드럽게 변환되도록 다시 설정
      }, 50); // 약간의 지연 후 애니메이션 재설정
    }
  }

fetch(
  "https://3dcoloring.co.kr/wp-json/wc/v3/products?consumer_key=ck_311bafa9a4027c0cdfd31d0310f771b93ad001b0&consumer_secret=cs_2285ceb45b51bc04a2230d62f45c8d6eb0180709&category=402&orderby=menu_order&order=asc"
)
  .then((response) => response.json())
  .then((data) => {
    const productSlides = document.getElementById("product-slides1");

    data.forEach((product) => {
      const slideDiv = document.createElement("div");
      slideDiv.classList.add("swiper-slide");
      // 세일 가격이 있는지 여부에 따라 클래스 설정
      const productPriceClass = product.sale_price
        ? "product_price discounted"
        : "product_price";

      slideDiv.innerHTML = `
        <div class="slide_content_wrap">
          <img src="${product.images[0]?.src}" alt="${product.name}">
          <div class="slide_product_title">${product.name}</div>
          <div class="product_price_wrap">
            <div class="${productPriceClass}">${product.price}원</div>
            ${
              product.sale_price
                ? `<div class="product_discount">${product.sale_price}원</div>`
                : ""
            }
          </div>
        </div>
      `;
      productSlides.appendChild(slideDiv);
    });

    // 두 번째 스와이퍼
    const swiper2 = new Swiper(".swiper2", {
      slidesPerView: 1,
      spaceBetween: 0,
      navigation: {
        nextEl: ".swiper-button-next2",
        prevEl: ".swiper-button-prev2",
      },
			breakpoints: {
				// min
				768: {
					slidesPerView: "5",
					spaceBetween: 10,
					allowTouchMove: false,
				},
			},
    });
  })
  .catch((error) => console.error("Error:", error));

// 세 번째 스와이퍼
const swiper3 = new Swiper(".swiper3", {
  slidesPerView: 3,
  spaceBetween: 30,
  pagination: {
    el: ".swiper-pagination3",
  },
  navigation: {
    nextEl: ".swiper-button-next3",
    prevEl: ".swiper-button-prev3",
  },
});

document.addEventListener("DOMContentLoaded", () => {
  const tabButtons = document.querySelectorAll(".tab_button");
  const tabContents = document.querySelectorAll(".tab_content");

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // 모든 버튼의 active 클래스 제거
      tabButtons.forEach((btn) => btn.classList.remove("active"));

      // 모든 콘텐츠의 active 클래스 제거
      tabContents.forEach((content) => content.classList.remove("active"));

      // 현재 클릭된 버튼에 active 클래스 추가
      button.classList.add("active");

      // 해당하는 탭 콘텐츠 보여주기
      const tabId = button.getAttribute("data-tab");
      document.getElementById(tabId).classList.add("active");
    });
  });
});
