/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

{
  'use strict';

  const select = {
    templateOf: {
      menuProduct: '#template-menu-product',
    },
    containerOf: {
      menu: '#product-list',
      cart: '#cart',
    },
    all: {
      menuProducts: '#product-list > .product',
      menuProductsActive: '#product-list > .product.active',
      formInputs: 'input, select',
    },
    menuProduct: {
      clickable: '.product__header',
      form: '.product__order',
      priceElem: '.product__total-price .price',
      imageWrapper: '.product__images',
      amountWidget: '.widget-amount',
      cartButton: '[href="#add-to-cart"]',
    },
    widgets: {
      amount: {
        input: 'input[name="amount"]',
        linkDecrease: 'a[href="#less"]',
        linkIncrease: 'a[href="#more"]',
      },
    },
  };

  const classNames = {
    menuProduct: {
      wrapperActive: 'active',
      imageVisible: 'active',
    },
  };

  const settings = {
    amountWidget: {
      defaultValue: 1,
      defaultMin: 1,
      defaultMax: 9,
    }
  };

  const templates = {
    menuProduct: Handlebars.compile(document.querySelector(select.templateOf.menuProduct).innerHTML),
  };
  

  class Product{
    constructor(id, data){
      const thisProduct = this;
      thisProduct.id = id;
      thisProduct.data = data;
      thisProduct.renderInMenu();
      thisProduct.initAccordion();
      console.log('new Product:', thisProduct);
    },
      renderInMenu(){
        const thisProduct = this;
        // generate HTML based on tempalte
        const generatedHTML = templates.menuProduct(thisProduct.data);
        // create element using utills.createElementFromHTML
        thisProduct.element = utils.createDOMFromHTML(generatedHTML);
        // find menu container
        const menuContainer = document.querySelector(select.containerOf.menu);
        // add element to menu
        menuContainer.appendChild(thisProduct.element);
      },
    initAccordion(){
      const thisProduct = this;
       /* find the clickable trigger (the element that should react to clicking) */
       // const productHeader = 'product_header';
      
       // const clickableTrigger = document.getQuerySelector(productHeader);
      
        const clickableTrigger = classNames.menuProduct.wrapperActive

      /* START: add event listener to clickable trigger on event click */
      clickableTrigger.addEventListener('click', function(event) {
        
      /* prevent default action for event */
      event.preventDefault();
        
      /* find active product (product that has active class) */
      // document.thisProduct.activeElement
        classNames.menuProduct.wrapperActive 
        
      /* if there is active product and it's not thisProduct.element, remove class active from it */
      // productHeader.classList.remove('active'); 
        classNames.menuProduct.wrapperActive.classList.remove('active');
      /* toggle active class on thisProduct.element */
        thisProduct.classList.toggle('active'); 
    });

  }
}
    }
}

/* 7.5 Do rozwiązania tego zadania przydadzą Ci się te informacje:

aby odnaleźć clickableTrigger, użyj selektora select.menuProduct.clickable,
zastanów się, czy szukać elementu clickableTrigger w całym dokumencie, czy może jednak dokładniej?
element bieżącego produktu to thisProduct.element, czyli to na tym elemencie będziemy dodawać i usuwać (toggle) klasę zdefiniowaną w select.menuProduct.clickable,
aby sprawdzić, czy dany element DOM udało się znaleźć, wystarczy sprawdzić, czy nie jest nullem if(activeProduct),
do sprawdzenia, czy dany aktywny produkt jest różny od elementu bieżącego produktu, wystarczy wykorzystać takiego samego operatora porównania, jak przy porównywaniu liczb.*/

  const app = {
    initMenu: function(){
      const testProduct = new Product();
      console.log('testProduct:', testProduct);

      const thisApp = this;
      console.log('thisApp.data', thisApp.data);

      for(let productData in thisApp.data.products){
        new Product(productData, thisApp.data.products[productData]);
      }
    },

    init: function(){
      const thisApp = this;
      console.log('*** App starting ***');
      console.log('thisApp:', thisApp);
      console.log('classNames:', classNames);
      console.log('settings:', settings);
      console.log('templates:', templates);

      thisApp.initData();
      thisApp.initMenu();
    },

    initData: function(){
      const thisApp = this;
  
      thisApp.data = dataSource;
    },
  
  };

  app.init();
}

