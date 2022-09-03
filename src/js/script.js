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
      thisProduct.getElements();
      thisProduct.initAccordion();
      thisProduct.initOrderForm();
      thisProduct.processOrder();
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
    
    getElements(){
  const thisProduct = this;

  thisProduct.accordionTrigger = thisProduct.element.querySelector(select.menuProduct.clickable);
  thisProduct.form = thisProduct.element.querySelector(select.menuProduct.form);
  thisProduct.formInputs = thisProduct.form.querySelectorAll(select.all.formInputs);
  thisProduct.cartButton = thisProduct.element.querySelector(select.menuProduct.cartButton);
  thisProduct.priceElem = thisProduct.element.querySelector(select.menuProduct.priceElem);
},
    
    initAccordion(){
      const thisProduct = this;
       /* find the clickable trigger (the element that should react to clicking) */
       // const productHeader = 'product_header';
      
       // const clickableTrigger = document.getQuerySelector(productHeader);
      
       const clickableTrigger = classNames.menuProduct.wrapperActive

      /* START: add event listener to clickable trigger on event click */
      thisProduct.accordionTrigger.addEventListener('click', function(event) {
        
      /* prevent default action for event */
      event.preventDefault();
        
      /* find active product (product that has active class) */
      // document.thisProduct.activeElement
        classNames.menuProduct.wrapperActive 
        
      /* if there is active product and it's not thisProduct.element, remove class active from it */
      // productHeader.classList.remove('active'); 
        classNames.menuProduct.wrapperActive.classList.remove('active');
      /* toggle active class on thisProduct.element */
        thisProduct.element.classList.toggle('active'); 
   });
  }
},
  
  /* 7.5 Do rozwiązania tego zadania przydadzą Ci się te informacje:

aby odnaleźć clickableTrigger, użyj selektora select.menuProduct.clickable,
zastanów się, czy szukać elementu clickableTrigger w całym dokumencie, czy może jednak dokładniej?
element bieżącego produktu to thisProduct.element, czyli to na tym elemencie będziemy dodawać i usuwać (toggle) klasę zdefiniowaną w select.menuProduct.clickable,
aby sprawdzić, czy dany element DOM udało się znaleźć, wystarczy sprawdzić, czy nie jest nullem if(activeProduct),
do sprawdzenia, czy dany aktywny produkt jest różny od elementu bieżącego produktu, wystarczy wykorzystać takiego samego operatora porównania, jak przy porównywaniu liczb.*/
  
    initOrderForm(){
      const thisProduct = this;
      console.log('methodName:', initOrderForm);
      
      thisProduct.form.addEventListener('submit', function(event){
  event.preventDefault();
  thisProduct.processOrder();
});

for(let input of thisProduct.formInputs){
  input.addEventListener('change', function(){
    thisProduct.processOrder();
  });
}

thisProduct.cartButton.addEventListener('click', function(event){
  event.preventDefault();
  thisProduct.processOrder();
});
},
  
    processOrder(){
    const thisProduct = this;
    console.log('methodName:', processOrder);
      
     // convert form to object structure e.g. { sauce: ['tomato'], toppings: ['olives', 'redPeppers']}
  const formData = utils.serializeFormToObject(thisProduct.form);
  console.log('formData', formData);

  // set price to default price
  let price = thisProduct.data.price;

  // for every category (param)...
  for(let paramId in thisProduct.data.params) {
    // determine param value, e.g. paramId = 'toppings', param = { label: 'Toppings', type: 'checkboxes'... }
    const param = thisProduct.data.params[paramId];
    console.log(paramId, param);

    // for every option in this category
    for(let optionId in param.options) {
      // determine option value, e.g. optionId = 'olives', option = { label: 'Olives', price: 2, default: true }
      const option = param.options[optionId];
      console.log(optionId, option);

  // check if there is param with a name of paramId in formData and if it includes optionId
  if(formData[paramId] && formData[paramId].includes(optionId)) {
    // check if the option is not default
    if(optionId[price] == false) {
       
      // add option price to price variable
    price.add('optionId[price]');
    }
  } else {
    price.remove('optionId[price]');
    
    // check if the option is default
    if(optionId[price] == true) {
       
      // reduce price variable
     price.remove('optionId[price]');
    }
  }
}
  // update calculated price in the HTML
  thisProduct.priceElem.innerHTML = price;
};


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

