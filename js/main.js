'use strict';

//Получаем элементы со страницы
const pageHeader = document.querySelector('header');
const overlay = document.querySelector('.nav--overlay');
const iconBurger = document.querySelector('.header__button--burger');
const iconCross = document.querySelector('.header__button--cross');
const navSite = document.querySelector('nav');
const popupMap = document.querySelector('.popup-map');
const tabsSection = document.querySelector('.compare');
const priceElements = document.querySelectorAll('.card__price');
const splitElem = document.querySelectorAll('.bank_price b');
const priceLine = document.querySelectorAll('.price .bold');
// const tinkoffElem = document.querySelectorAll('tinkoff-create-button');
// if(document.querySelector('.view-good-discount-price')) {
//   const priceCount = Number(document.querySelector('.view-good-discount-price').textContent.trim().slice(0,-2));
//   if(priceCount >= 1000000) {
//     tinkoffElem.forEach(function(elem) {
//       elem.style.display = "none"
//     })
//   }
// }

priceLine.forEach(function (element) {
  const priceString = element.textContent;
  const formattedPrice = addThousandsSeparator(priceString);
  element.textContent = formattedPrice;
});

splitElem.forEach(function (element) {
  const priceString = element.textContent;
  const number = parseFloat(priceString);
  const roundNumber = Math.round(number);
  const formattedPrice = addThousandsSeparator(String(roundNumber));
  element.textContent = formattedPrice;
});

priceElements.forEach(function (element) {
  const priceString = element.textContent;
  const formattedPrice = addThousandsSeparator(priceString);
  element.textContent = formattedPrice;
});

function addThousandsSeparator(priceString) {
  if (priceString.trim() === '') {
    return '';
  }
  const [numberPart, currencyPart] = priceString.split('₽');
  const trimmedNumberPart = numberPart.trim();
  const [integerPart, decimalPart] = trimmedNumberPart.split(/\.|,/);
  const formattedIntegerPart = integerPart.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    ' '
  );

  let result = formattedIntegerPart;
  if (decimalPart !== undefined) {
    result += '.' + decimalPart;
  }
  result += ' ₽';

  return result;
}

//Scroll Nav
const scrollNav = () => {
  window.addEventListener('scroll', () => {
    const navIcon = navSite.querySelectorAll('.nav__icon--side');
    const headLink = document.querySelector('.nav__link');

    if (document.documentElement.clientWidth > 768) {
      if (document.documentElement.scrollTop >= 76) {
        navSite.style.position = 'sticky';
        navSite.style.top = 0;
        navSite.style.zIndex = 10;
        navSite.style.boxShadow = `0px 5px 10px 2px rgba(34, 60, 80, 0.2)`;
        headLink.style.display = 'flex';
        navIcon.forEach((item) => {
          item.style.transform = `translateX(0)`;
        });
      } else {
        headLink.style.display = '';
        navSite.style.boxShadow = '';
        navIcon.forEach((item) => (item.style.transform = ''));
      }
    }
  });
};
scrollNav();

// Открываем меню по клику на бургер и открываем карту по клику на адрес
const toggleMenu = () => {
  pageHeader.addEventListener('click', (evt) => {
    const target = evt.target;

    if (target.closest('.header__button')) {
      iconBurger.classList.toggle('deactive');
      iconCross.classList.toggle('deactive');
      navSite.classList.toggle('menu-close');
      overlay.classList.toggle('menu-close');
    }

    if (target.matches('#map')) {
      evt.preventDefault();
      popupMap.classList.add('popup-map--active');
    }
  });

  //Закрываем карту кликом на оверлей

  popupMap.addEventListener('click', (evt) => {
    const target = evt.target;
    if (target.matches('.popup-map__button')) {
      popupMap.classList.remove('popup-map--active');
    } else {
      popupMap.classList.remove('popup-map--active');
    }
  });

  //Закрытие меню по клику на пункты
  navSite.addEventListener('click', (evt) => {
    const target = evt.target;

    if (target.matches('.nav__link')) {
      navSite.classList.add('menu-close');
      iconBurger.classList.toggle('deactive');
      iconCross.classList.toggle('deactive');
    } else {
      navSite.classList.add('menu-close');
      iconBurger.classList.toggle('deactive');
      iconCross.classList.toggle('deactive');
    }
  });
};
toggleMenu();

//Табы
const tabs = () => {
  if (tabsSection) {
    tabsSection.addEventListener('click', (evt) => {
      evt.preventDefault();
      const target = evt.target;

      const garlic = document.getElementById('garlic');
      const potato = document.getElementById('potato');
      const onion = document.getElementById('onion');
      const garlicTab = document.querySelector('.compare__link--g');
      const potatoTab = document.querySelector('.compare__link--p');
      const onionTab = document.querySelector('.compare__link--o');

      if (target === garlicTab) {
        garlic.style.display = 'block';
        garlicTab.classList.add('compare__link--active');

        potato.style.display = 'none';
        potatoTab.classList.remove('compare__link--active');

        onion.style.display = 'none';
        onionTab.classList.remove('compare__link--active');
      }

      if (target === potatoTab) {
        potato.style.display = 'block';
        potatoTab.classList.add('compare__link--active');

        garlic.style.display = 'none';
        garlicTab.classList.remove('compare__link--active');

        onion.style.display = 'none';
        onionTab.classList.remove('compare__link--active');
      }

      if (target === onionTab) {
        onion.style.display = 'block';
        onionTab.classList.add('compare__link--active');

        garlic.style.display = 'none';
        garlicTab.classList.remove('compare__link--active');

        potato.style.display = 'none';
        potatoTab.classList.remove('compare__link--active');
      }
    });
  }
};
tabs();

//Видео
const video = () => {
  function findVideos() {
    const videos = document.querySelectorAll('.video');

    for (let i = 0; i < videos.length; i++) {
      setupVideo(videos[i]);
    }
  }

  function setupVideo(video) {
    const link = video.querySelector('.video__link');
    const media = video.querySelector('.video__media');
    const button = video.querySelector('.video__button');

    if (media) {
      const id = parseMediaURL(media);

      video.addEventListener('click', function () {
        const iframe = createIframe(id);
        link.remove();
        button.remove();
        video.appendChild(iframe);
      });
      link.removeAttribute('href');
      video.classList.add('video--enabled');
    }
  }

  function parseMediaURL(media) {
    const regexp =
      /https:\/\/i\.ytimg\.com\/vi\/([a-zA-Z0-9_-]+)\/hqdefault\.jpg/i;
    const url = media.src;
    const match = url.match(regexp);
    return match[1];
  }

  function createIframe(id) {
    const iframe = document.createElement('iframe');
    iframe.setAttribute('allowfullscreen', '');
    iframe.setAttribute('allow', 'autoplay');
    iframe.setAttribute('src', generateURL(id));
    iframe.classList.add('video__media');
    return iframe;
  }

  function generateURL(id) {
    const query = '?rel=0&showinfo=0&autoplay=1';
    return 'https://www.youtube.com/embed/' + id + query;
  }

  findVideos();
};
video();

//Анимация
const animation = () => {
  const feature = document.querySelector('.features');

  if (feature) {
    new WOW().init({
      mobile: false,
    });
  }
};
animation();

//owlcarousel
const carouselMain = () => {
  const carousel = document.querySelector('.owl-carousel');
  // const productSlider = document.querySelector('.product-slider');

  if (carousel) {
    $(document).ready(function () {
      $('.owl-carousel').owlCarousel({
        loop: true,
        navText: ['&larr;', '&rarr;'],
        margin: 0,
        responsiveClass: true,
        responsive: {
          0: {
            items: 1,
            dots: true,
          },
          360: {
            items: 2,
            dots: true,
          },
          768: {
            items: 3,
          },
          1024: {
            dots: false,
            items: 5,
          },
        },
      });
      $('.owl-carousel-reviews').owlCarousel({
        loop: false,
        navText: ['&larr;', '&rarr;'],
        margin: 0,
        responsiveClass: true,
        dots: false,
        // responsive: {
        //     0: {
        //         items: 1,
        //         dots: true,
        //     },
        //     360: {
        //         items: 2,
        //         dots: true,
        //     },
        //     768: {
        //         items: 3,
        //     },
        //     1024: {
        //         dots: false,
        //         items: 5,
        //     }
        // }
      });
    });
  }
};
carouselMain();

// Фильтр 2 страница
const filter = () => {
  const catalog = document.querySelector('.catalog');

  if (catalog) {
    const catalogTabsContainer = catalog.querySelector('.container');
    const cards = catalog.querySelectorAll('.card__wrapper');

    catalogTabsContainer.addEventListener('click', (evt) => {
      const target = evt.target;

      for (const item of catalogTabsContainer.children) {
        if (item === target) {
          item.classList.add('tab-active');
        } else {
          item.classList.remove('tab-active');
        }
      }

      cards.forEach((item, i) => {
        if (target.dataset.filter !== item.dataset.filter) {
          item.classList.add('hidden');
        } else {
          item.classList.remove('hidden');
          item.parentElement.style.justifyContent = 'normal';
          item.classList.add('filter-card');
        }

        if (target.dataset.filter === 'all') {
          item.classList.remove('hidden');
          item.parentElement.style.justifyContent = 'space-between';
          item.classList.remove('filter-card');
        }
      });
    });
  }
};
filter();

//product-slider
const productSlider = () => {
  const productSliderMain = document.querySelector('.product-slider__main');
  const productSliderBottom = document.querySelector('.product-slider__bottom');

  if (document.documentElement.clientWidth > 768) {
    $('a[data-rel^=lightcase]').lightcase();
  }

  if (productSliderMain) {
    $('.product-slider__main').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      fade: true,
      asNavFor: '.product-slider__bottom',
      responsive: [
        {
          breakpoint: 571,
          settings: {
            dots: true,
            swipe: true,
          },
        },
      ],
    });
  }

  if (productSliderBottom) {
    $('.product-slider__bottom').slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      asNavFor: '.product-slider__main',
      dots: false,
      arrows: true,
      prevArrow: `<button type="button" class="slick-prev">&larr;</button>`,
      nextArrow: `<button type="button" class="slick-next">&rarr;</button>`,
      focusOnSelect: true,
      variableWidth: true,
    });
  }
};
productSlider();

//gallery-slider
const gallerySlider = () => {
  const gallerySliderMain = document.querySelector('.gallery-slider__main');

  $('a[data-rel^=lightcase]').lightcase();

  if (gallerySliderMain) {
    $('.gallery-slider__main').slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      dots: false,
      arrows: true,
      swipe: true,
      prevArrow: `<button type="button" class="slick-prev">&larr;</button>`,
      nextArrow: `<button type="button" class="slick-next">&rarr;</button>`,
      focusOnSelect: true,
      fade: false,
      focusOnSelect: true,
      variableWidth: false,
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 4,
          },
        },
        {
          breakpoint: 999,
          settings: {
            slidesToShow: 3,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 3,
          },
        },
        {
          breakpoint: 571,
          settings: {
            arrows: false,
            dots: true,
            slidesToShow: 2,
          },
        },
        {
          breakpoint: 420,
          settings: {
            arrows: false,
            dots: true,
            slidesToShow: 1,
          },
        },
      ],
    });
  }
};
gallerySlider();

//gallery-slider
const photoGallery = () => {
  const photoGallerySlider = document.querySelector('.photo-gallery__slider');

  $('a[data-rel^=lightcase]').lightcase();

  if (photoGallerySlider) {
    $('.photo-gallery__slider').slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      dots: false,
      arrows: true,
      swipe: true,
      prevArrow: `<button type="button" class="slick-prev">&larr;</button>`,
      nextArrow: `<button type="button" class="slick-next">&rarr;</button>`,
      focusOnSelect: true,
      fade: false,
      focusOnSelect: true,
      variableWidth: false,
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 4,
          },
        },
        {
          breakpoint: 999,
          settings: {
            slidesToShow: 3,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 3,
          },
        },
        {
          breakpoint: 571,
          settings: {
            arrows: false,
            dots: true,
            slidesToShow: 2,
          },
        },
        {
          breakpoint: 420,
          settings: {
            arrows: false,
            dots: true,
            slidesToShow: 1,
          },
        },
      ],
    });
  }
};
photoGallery();

// modal order
const modalOrder = () => {
  const modal = document.querySelector('.modal__order');
  const priceContainer = document.querySelector('.price');
  const productButton = document.querySelector('.button-main');
  productButton.addEventListener('click', () => {
    document.querySelector('.modal-order-title').textContent =
      'Оформление заказа';
    document.querySelector('.modal-order-btn').textContent = 'Заказать';
    document
      .querySelector('.modal-order-form')
      .setAttribute('data-order', 'order');

    modal.style.display = 'block';

    //Находим фото товара
    const photo = document.querySelector('.view-good-img').src;
    //Находим название товара
    const title = document.querySelector('.view-good-name').innerHTML;
    //Находим его старую цену
    let priceOld = '';
    if (document.querySelector('.view-good-price')) {
      priceOld = document.querySelector('.view-good-price').innerHTML;
    }
    // const priceOld = document.querySelector(".view-good-price").innerHTML;
    //Находим его новую цену
    const priceNew = document.querySelector(
      '.view-good-discount-price'
    ).innerHTML;

    // id товара и листа
    const goodId = document.querySelector('#data-id-form');
    const goodSubId = document.querySelector('#data-sub-id-form');
    const tinkoffDiv = document.querySelector('#tinkoff-button');
    tinkoffDiv.insertAdjacentHTML(
      'afterbegin',
      '<tinkoff-create-button size="M" subtext="на 6 месяцев" shopId="82273e5b-9587-44ad-b8e0-c8eea7f6322f" showcaseId="314dcc5e-6f27-410c-bfe3-3cabfa6768bf" ui-data="productType=installment&useReturnLinks=true&view=newTab" payment-data="items.0.name=' +
        title +
        '&items.0.price=' +
        Number(priceNew.replace(' ', '').replace('₽', '')) +
        '&items.0.quantity=1&promoCode=installment_0_0_6_6,5&sum=' +
        Number(priceNew.replace(' ', '').replace('₽', '')) +
        '"></tinkoff-create-button>'
    );
    tinkoffDiv.style.marginTop = '10px';

    goodId.value = document
      .querySelector('.view-good-name')
      .getAttribute('data-good-id');
    goodSubId.value = 0;
    const orderCard = document.querySelector('.order__card');
    orderCard.innerHTML = `
                <img src="${photo}" width="170" alt=${title}>
                <p class="card__descr"> ${title}</p>
                <span class="card__price card__price--new">${priceNew}</span>
                <span class="card__price card__price--new">${priceOld}</span>
            `;
    maskPhone('#order-phone');
  });

  modal.addEventListener('click', (evt) => {
    const target = evt.target;
    const tinkoffDiv = document.querySelector('#tinkoff-button');

    if (target.closest('.order__button')) {
      modal.style.display = '';
      tinkoffDiv.removeChild(tinkoffDiv.firstChild);
    } else if (target.matches('.modal__order')) {
      modal.style.display = '';
      tinkoffDiv.removeChild(tinkoffDiv.firstChild);
    }
  });

  priceContainer.addEventListener('click', (evt) => {
    const target = evt.target;

    const orderModal = (selectorColumn, selectorLink) => {
      //Находим все li с классом price__list--2x
      const orderList = priceContainer.querySelector(selectorColumn);

      //Находим фото товара
      const photo = priceContainer.querySelector(selectorLink).children[0].src;

      //Находим модель товара
      const mainTitle = document.querySelector('.view-good-name').innerHTML;

      const title = orderList.querySelector('[data-attribute=name]').innerHTML;

      //Находим его старую цену
      const priceOld = orderList.querySelector('.line-throw').innerHTML;

      //Находим его новую цену
      const priceNew = orderList.querySelector('.bold').innerHTML;

      //Находим модалку
      const orderCard = modal.querySelector('.order__card');

      // id товара и листа
      const goodId = document.querySelector('#data-id-form');
      const goodSubId = document.querySelector('#data-sub-id-form');
      const tinkoffDiv = document.querySelector('#tinkoff-button');
      tinkoffDiv.insertAdjacentHTML(
        'afterbegin',
        '<tinkoff-create-button size="M" subtext="на 6 месяцев" shopId="82273e5b-9587-44ad-b8e0-c8eea7f6322f" showcaseId="314dcc5e-6f27-410c-bfe3-3cabfa6768bf" ui-data="productType=installment&useReturnLinks=true&view=newTab" payment-data="items.0.name=' +
          title +
          '&items.0.price=' +
          Number(priceNew.replace(' ', '').replace('₽', '')) +
          '&items.0.quantity=1&promoCode=installment_0_0_6_6,5&sum=' +
          Number(priceNew.replace(' ', '').replace('₽', '')) +
          '"></tinkoff-create-button>'
      );
      tinkoffDiv.style.marginTop = '10px';

      goodId.value = orderList
        .querySelector('[data-id]')
        .getAttribute('data-id');

      if (selectorColumn == '.price__list--2x') {
        goodSubId.value = 1;
      }
      if (selectorColumn == '.price__list--3x') {
        goodSubId.value = 2;
      }
      if (selectorColumn == '.price__list--4x') {
        goodSubId.value = 3;
      }
      if (selectorColumn == '.price__list--5x') {
        goodSubId.value = 4;
      }
      if (selectorColumn == '.price__list--6x') {
        goodSubId.value = 5;
      }

      //Записываем в модалку данные выбранного товара
      orderCard.innerHTML = `
                    <img src="${photo}" width="170" alt="${mainTitle}">
                    <p class="card__descr">${mainTitle} ${title}</p>
                    <span class="card__price card__price--new">${priceNew}</span>
                    <span class="card__price card__price--old">${priceOld}</span>
                `;
      maskPhone('#order-phone');

      //Открываем модалку
      modal.style.display = 'block';
    };

    if (target.matches('.button-main')) {
      // Одна кнопка в листе на мобильной
      modal.style.display = 'block';

      //Находим фото товара
      const photo = document.querySelector('.view-good-img').src;
      //Находим название товара
      const title = document.querySelector('.view-good-name').innerHTML;
      //Находим его старую цену
      let priceOld = '';
      if (document.querySelector('.view-good-price')) {
        priceOld = document.querySelector('.view-good-price').innerHTML;
      }
      // const priceOld = document.querySelector(".view-good-price").innerHTML;
      //Находим его новую цену
      const priceNew = document.querySelector(
        '.view-good-discount-price'
      ).innerHTML;
      // id товара и листа
      const goodId = document.querySelector('#data-id-form');
      const goodSubId = document.querySelector('#data-sub-id-form');
      // const tinkoffDiv = document.querySelector("#tinkoff-button");
      // tinkoffDiv.insertAdjacentHTML(
      //   "afterbegin",
      //   '<tinkoff-create-button size="M" subtext="на 6 месяцев" shopId="82273e5b-9587-44ad-b8e0-c8eea7f6322f" showcaseId="314dcc5e-6f27-410c-bfe3-3cabfa6768bf" ui-data="productType=installment&useReturnLinks=true&view=newTab" payment-data="items.0.name=' +
      //     title +
      //     "&items.0.price=" +
      //     Number(priceNew.replace(" ", "").replace("₽", "")) +
      //     "&items.0.quantity=1&promoCode=installment_0_0_6_6,5&sum=" +
      //     Number(priceNew.replace(" ", "").replace("₽", "")) +
      //     '"></tinkoff-create-button>'
      // );

      goodId.value = document
        .querySelector('.view-good-name')
        .getAttribute('data-good-id');
      goodSubId.value = 0;
      const orderCard = modal.querySelector('.order__card');
      orderCard.innerHTML = `
                <img src="${photo}" width="170" alt=${title}>
                <p class="card__descr"> ${title}</p>
                <span class="card__price card__price--new">${priceNew}</span>
                <span class="card__price card__price--old">${priceOld}</span>
            `;
      maskPhone('#order-phone');
    }

    if (target.dataset.button === '2x') {
      orderModal('.price__list--2x', '.price__link--2x');
    }

    if (target.dataset.button === '3x') {
      orderModal('.price__list--3x', '.price__link--3x');
    }

    if (target.dataset.button === '4x') {
      orderModal('.price__list--4x', '.price__link--4x');
    }

    if (target.dataset.button === '5x') {
      orderModal('.price__list--5x', '.price__link--5x');
    }

    if (target.dataset.button === '6x') {
      orderModal('.price__list--6x', '.price__link--6x');
    }
  });
};
modalOrder();

const modalOrderPay = () => {
  const modal = document.querySelector('.modal__order');
  const priceContainer = document.querySelector('.price');
  const productButton = document.querySelector('.button-main-pay');

  if (productButton) {
    productButton.addEventListener('click', () => {
      document.querySelector('.modal-order-title').textContent =
        'Купить онлайн';
      document.querySelector('.modal-order-btn').textContent = 'Купить';
      document
        .querySelector('.modal-order-form')
        .setAttribute('data-order', 'pay');

      modal.style.display = 'block';
      //Находим фото товара
      const photo = document.querySelector('.view-good-img').src;
      //Находим название товара
      const title = document.querySelector('.view-good-name').innerHTML;
      //Находим его старую цену
      const priceOld = document.querySelector('.view-good-price').innerHTML;
      //Находим его новую цену
      const priceNew = document.querySelector(
        '.view-good-discount-price'
      ).innerHTML;
      // id товара и листа
      const goodId = document.querySelector('#data-id-form');
      const goodSubId = document.querySelector('#data-sub-id-form');
      const tinkoffDiv = document.querySelector('#tinkoff-button');
      tinkoffDiv.insertAdjacentHTML(
        'afterbegin',
        '<tinkoff-create-button size="M" subtext="на 6 месяцев" shopId="82273e5b-9587-44ad-b8e0-c8eea7f6322f" showcaseId="314dcc5e-6f27-410c-bfe3-3cabfa6768bf" ui-data="productType=installment&useReturnLinks=true&view=newTab" payment-data="items.0.name=' +
          title +
          '&items.0.price=' +
          Number(priceNew.replace(' ', '').replace('₽', '')) +
          '&items.0.quantity=1&promoCode=installment_0_0_6_6,5&sum=' +
          Number(priceNew.replace(' ', '').replace('₽', '')) +
          '"></tinkoff-create-button>'
      );
      goodId.value = document
        .querySelector('.view-good-name')
        .getAttribute('data-good-id');
      goodSubId.value = 0;
      const orderCard = modal.querySelector('.order__card');
      orderCard.innerHTML = `
                <img src="${photo}" width="170" alt=${title}>
                <p class="card__descr"> ${title}</p>
                <span class="card__price card__price--new">${priceNew}</span>
                <span class="card__price card__price--old">${priceOld}</span>
            `;
      maskPhone('#order-phone');
    });
  }

  modal.addEventListener('click', (evt) => {
    const target = evt.target;

    if (target.closest('.order__button')) {
      modal.style.display = '';
    } else if (target.matches('.modal__order')) {
      modal.style.display = '';
    }
  });

  priceContainer.addEventListener('click', (evt) => {
    const target = evt.target;

    const orderModal = (selectorColumn, selectorLink) => {
      //Находим все li с классом price__list--2x
      const orderList = priceContainer.querySelector(selectorColumn);

      //Находим фото товара
      const photo = priceContainer.querySelector(selectorLink).children[0].src;

      //Находим модель товара
      const mainTitle = document.querySelector('.view-good-name').innerHTML;

      const title = orderList.querySelector('[data-attribute=name]').innerHTML;

      //Находим его старую цену
      const priceOld = orderList.querySelector('.line-throw').innerHTML;

      //Находим его новую цену
      const priceNew = orderList.querySelector('.bold').innerHTML;

      //Находим модалку
      const orderCard = modal.querySelector('.order__card');

      // id товара и листа
      const goodId = document.querySelector('#data-id-form');
      const goodSubId = document.querySelector('#data-sub-id-form');

      goodId.value = orderList
        .querySelector('[data-id]')
        .getAttribute('data-id');

      if (selectorColumn == '.price__list--2x') {
        goodSubId.value = 1;
      }
      if (selectorColumn == '.price__list--3x') {
        goodSubId.value = 2;
      }
      if (selectorColumn == '.price__list--4x') {
        goodSubId.value = 3;
      }
      if (selectorColumn == '.price__list--5x') {
        goodSubId.value = 4;
      }
      if (selectorColumn == '.price__list--6x') {
        goodSubId.value = 5;
      }

      //Записываем в модалку данные выбранного товара
      orderCard.innerHTML = `
                    <img src="${photo}" width="170" alt="${mainTitle}">
                    <p class="card__descr">${mainTitle} ${title}</p>
                    <span class="card__price card__price--new">${priceNew}</span>
                    <span class="card__price card__price--old">${priceOld}</span>
                `;
      maskPhone('#order-phone');

      //Открываем модалку
      modal.style.display = 'block';
    };

    if (target.matches('.button-main-pay')) {
      // Одна кнопка в листе на мобильной
      modal.style.display = 'block';

      //Находим фото товара
      const photo = document.querySelector('.view-good-img').src;
      //Находим название товара
      const title = document.querySelector('.view-good-name').innerHTML;
      //Находим его старую цену
      const priceOld = document.querySelector('.view-good-price').innerHTML;
      //Находим его новую цену
      const priceNew = document.querySelector(
        '.view-good-discount-price'
      ).innerHTML;
      // id товара и листа
      const goodId = document.querySelector('#data-id-form');
      const goodSubId = document.querySelector('#data-sub-id-form');
      goodId.value = document
        .querySelector('.view-good-name')
        .getAttribute('data-good-id');
      goodSubId.value = 0;
      const orderCard = modal.querySelector('.order__card');
      orderCard.innerHTML = `
                <img src="${photo}" width="170" alt=${title}>
                <p class="card__descr"> ${title}</p>
                <span class="card__price card__price--new">${priceNew}</span>
                <span class="card__price card__price--old">${priceOld}</span>
            `;
      maskPhone('#order-phone');
    }

    if (target.dataset.button === '2x') {
      orderModal('.price__list--2x', '.price__link--2x');
    }

    if (target.dataset.button === '3x') {
      orderModal('.price__list--3x', '.price__link--3x');
    }

    if (target.dataset.button === '4x') {
      orderModal('.price__list--4x', '.price__link--4x');
    }

    if (target.dataset.button === '5x') {
      orderModal('.price__list--5x', '.price__link--5x');
    }

    if (target.dataset.button === '6x') {
      orderModal('.price__list--6x', '.price__link--6x');
    }
  });
};
modalOrderPay();

// Маска для поля ввода телефона
function maskPhone(selector, masked = '+7 (___) ___-__-__') {
  const elems = document.querySelectorAll(selector);

  function mask(event) {
    const keyCode = event.keyCode;
    const template = masked,
      def = template.replace(/\D/g, ''),
      val = this.value.replace(/\D/g, '');
    let i = 0,
      newValue = template.replace(/[_\d]/g, (a) =>
        i < val.length ? val.charAt(i++) || def.charAt(i) : a
      );
    i = newValue.indexOf('_');
    if (i != -1) {
      newValue = newValue.slice(0, i);
    }
    let reg = template
      .substr(0, this.value.length)
      .replace(/_+/g, (a) => '\\d{1,' + a.length + '}')
      .replace(/[+()]/g, '\\$&');
    reg = new RegExp('^' + reg + '$');
    if (
      !reg.test(this.value) ||
      this.value.length < 5 ||
      (keyCode > 47 && keyCode < 58)
    ) {
      this.value = newValue;
    }
    if (event.type == 'blur' && this.value.length < 5) {
      this.value = '';
    }
  }

  for (const elem of elems) {
    elem.addEventListener('input', mask);
    elem.addEventListener('focus', mask);
    elem.addEventListener('blur', mask);
  }
}

// page 3 tabs

const tabPrice = () => {
  const price = document.querySelector('.price');

  if (price) {
    const tabLinks = price.querySelectorAll('.price__link');
    const tabContainer = price.querySelector('.container');
    const tab2x = price.querySelector('.price__list--2x');
    const tab3x = price.querySelector('.price__list--3x');
    const tab4x = price.querySelector('.price__list--4x');
    const tab5x = price.querySelector('.price__list--5x');
    const tab6x = price.querySelector('.price__list--6x');

    tabContainer.addEventListener('click', (evt) => {
      const target = evt.target;
      console.dir(target);

      for (const link of tabLinks) {
        if (target.closest('.price__link').className === link.className) {
          link.classList.add('price__link--active');
        } else {
          link.classList.remove('price__link--active');
        }
      }

      if (target.closest('.price__link').dataset.filter === '2x') {
        tab2x.style.display = 'block';
        tab3x.style.display = 'none';
        tab4x.style.display = 'none';
        tab5x.style.display = 'none';
        tab6x.style.display = 'none';
      }

      if (target.closest('.price__link').dataset.filter === '3x') {
        tab2x.style.display = 'none';
        tab3x.style.display = 'block';
        tab4x.style.display = 'none';
        tab5x.style.display = 'none';
        tab6x.style.display = 'none';
      }

      if (target.closest('.price__link').dataset.filter === '4x') {
        tab2x.style.display = 'none';
        tab3x.style.display = 'none';
        tab4x.style.display = 'block';
        tab5x.style.display = 'none';
        tab6x.style.display = 'none';
      }

      if (target.closest('.price__link').dataset.filter === '5x') {
        tab2x.style.display = 'none';
        tab3x.style.display = 'none';
        tab4x.style.display = 'none';
        tab5x.style.display = 'block';
        tab6x.style.display = 'none';
      }

      if (target.closest('.price__link').dataset.filter === '6x') {
        tab2x.style.display = 'none';
        tab3x.style.display = 'none';
        tab4x.style.display = 'none';
        tab5x.style.display = 'none';
        tab6x.style.display = 'block';
      }
    });
  }
};
tabPrice();

// tabs
const initTabs = (tabsContainer) => {
  const tabButtons = tabsContainer.querySelectorAll('.tabs-button');
  const tabs = tabsContainer.querySelectorAll('.tab');

  const activateTab = (tabId, shouldScroll = false) => {
    tabButtons.forEach((btn) => btn.classList.remove('active'));
    tabs.forEach((tab) => tab.classList.remove('active'));

    const activeButton = tabsContainer.querySelector(
      `.tabs-buttons [data-tab-open="${tabId}"]`
    );
    const activeTab = tabsContainer.querySelector(
      `.tab[data-tab-id="${tabId}"]`
    );

    if (activeButton) {
      activeButton.classList.add('active');
    }

    if (activeTab) {
      activeTab.classList.add('active');
      // Прокрутка к активной вкладке только если shouldScroll = true
      if (shouldScroll) {
        activeTab.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }
  };

  // Обработчик клика по кнопкам вкладок
  tabButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      const tabId = button.getAttribute('data-tab-open');
      activateTab(tabId);
    });
  });

  // Обработчик клика по ссылкам с data-link-tab-open
  const linkTabs = document.querySelectorAll('[data-link-tab-open]');
  linkTabs.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      linkTabs.forEach((l) => l.classList.remove('active'));

      link.classList.add('active');

      const tabId = link.getAttribute('data-link-tab-open');
      activateTab(tabId, true);
    });
  });

  // Проверка наличия якоря в URL
  const hash = window.location.hash.substring(1);
  if (hash) {
    activateTab(hash, true);
  }
};

// Инициализация табов для каждого контейнера
const tabContainers = document.querySelectorAll('.tabs-container');
tabContainers.forEach(initTabs);
