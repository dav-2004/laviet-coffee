"use strict";
// Login Interaction
const loginBtn = document.querySelector("#login-btn");
const signUpBtn = document.querySelector("#sign-up-btn");
const usernameIn = document.querySelector("#userid");
const emailIn = document.querySelector("#emailid");
const usernameOut = document.querySelector("#username-display");
const usernameOutNavBar = document.querySelector(".sign-in");
const signUpNavBar = document.querySelector(".sign-up");
const slashNavBar = document.querySelector("#slash");
const passwordIn = document.querySelector("#pswrd");
const loginForm = document.querySelector("#login-form");

function checkUsername() {
  let password = passwordIn.value;
  if (usernameIn.value === "") {
    usernameOut.innerHTML = "Please enter a username.";
  } else if (password.length < 8) {
    usernameOut.innerHTML =
      "Please enter a password that is at least 8 character long.";
  } else {
    Storage.setUsername(usernameIn.value);
    location.reload();
    if (usernameIn.value == "E-commerce") {
      window.open("https://lchua2314.github.io/E-commerce-Website/index.html");
      alert("Thanks for looking at the code! :)");
    }
  }
}

function createNewUsername() {
  let password = passwordIn.value,
    email = emailIn.value;
  if (!validateEmail(email)) {
    usernameOut.innerHTML = "Please enter a valid email address.";
  } else if (usernameIn.value === "") {
    usernameOut.innerHTML = "Please enter a username.";
  } else if (password.length < 8) {
    usernameOut.innerHTML =
      "Please enter a password that is at least 8 character long.";
  } else {
    Storage.setUsername(usernameIn.value);
    location.reload();
  }
}

function validateEmail(inputEmail) {
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(String(inputEmail).toLowerCase());
}

class Storage {
  static setUsername(inputUsername) {
    localStorage.setItem("username", inputUsername);
  }
  static getUsername() {
    return localStorage.getItem("username");
  }
  static setPassword(inputPassword) {
    localStorage.setItem("password", inputPassword);
  }
  static getPassword() {
    return localStorage.getItem("password");
  }
  static setAmount(itemName, itemAmount) {
    localStorage.setItem(itemName, itemAmount.toString());
  }
  static removeAmount(itemName) {
    localStorage.removeItem(itemName);
  }
}

let currUser = Storage.getUsername();
if (currUser) {
  usernameOutNavBar.innerHTML = '<i class="fas fa-user"></i> ' + currUser;
  signUpNavBar.innerHTML = "";
  slashNavBar.innerHTML = "";
  if (loginForm) {
    loginForm.innerHTML = "";
    usernameOut.innerHTML =
      'Currently logged in as: <br> <i class="fas fa-user"></i> ' + currUser;
  }
}

if (loginBtn) {
  if (!currUser) {
    loginBtn.addEventListener("click", checkUsername);
    loginForm.addEventListener("submit", (event) => {
      event.preventDefault();
    });
  } else {
    loginBtn.innerHTML = "Sign Out";
    loginBtn.addEventListener("click", () => {
      localStorage.removeItem("username");
      location.reload();
    });
    loginForm.addEventListener("submit", (event) => {
      event.preventDefault();
    });
  }
}

if (signUpBtn) {
  if (!currUser) {
    signUpBtn.addEventListener("click", createNewUsername);
    loginForm.addEventListener("submit", (event) => {
      event.preventDefault();
    });
  } else {
    signUpBtn.innerHTML = "Sign Out";
    signUpBtn.addEventListener("click", () => {
      localStorage.removeItem("username");
      location.reload();
    });
    loginForm.addEventListener("submit", (event) => {
      event.preventDefault();
    });
  }
}

// Navbar Mobile
const menuBtn = document.querySelector(".menu-btn");
const hamburger = document.querySelector(".menu-btn__burger");
const nav = document.querySelector(".nav");
const menuNav = document.querySelector(".menu-nav");
const navItems = document.querySelectorAll(".menu-nav__item");

let showMenu = false;

menuBtn.addEventListener("click", toggleMenu);

function toggleMenu() {
  if (!showMenu) {
    hamburger.classList.add("open");
    nav.classList.add("open");
    menuNav.classList.add("open");
    html.classList.add("no-scroll");
    navItems.forEach((item) => item.classList.add("open"));

    showMenu = true;
  } else {
    hamburger.classList.remove("open");
    nav.classList.remove("open");
    menuNav.classList.remove("open");
    html.classList.remove("no-scroll");
    navItems.forEach((item) => item.classList.remove("open"));

    showMenu = false;
  }
}

// Shopping Cart Open and Close Function
const html = document.querySelector("html");
const cart = document.querySelector(".cart");
const cartOpenBtn = document.querySelector(".cart__openBtn");
const cartCloseBtn = document.querySelector(".cart__closeBtn");
const cartOverlay = document.querySelector(".cart-overlay");

cartOpenBtn.addEventListener("click", function () {
  cart.classList.add("showcart");
  cartOverlay.classList.add("transparentBcg");
  html.classList.add("no-scroll");
});

cartCloseBtn.addEventListener("click", function () {
  cart.classList.remove("showcart");
  cartOverlay.classList.remove("transparentBcg");
  html.classList.remove("no-scroll");
});

// Shopping Cart Adding Items to Cart
const total = document.querySelector(".total");
let totalAmount;

// Establish totalAmount in local storage if not there already.
if (!localStorage.getItem("total")) {
  localStorage.setItem("total", "0");
} else {
  totalAmount = parseFloat(localStorage.getItem("total"));
  updateTotal(0);
}

/**
 * Updates total in the local storage and class "total" in the DOM
 * @param {Float} moneyChange
 */
function updateTotal(moneyChange) {
  totalAmount += moneyChange;
  localStorage.setItem("total", totalAmount.toString());
  if (totalAmount > 1) {
    total.innerHTML = `<span class="span-primary">Total Amount:</span> $${totalAmount.toFixed(
      2
    )}`;
  } else {
    total.innerHTML = `<br>
      <br>
      Your Shopping Cart is empty. <br>
        Add items to cart by hovering over / tapping on the images of products
    on the Menu page.`;
  }
}

/* Item displays in the DOM */

// Item Display: Item 1: Caffe Americano
const item1Display = document.querySelector(".item1-display");
let item1Counter, item1Amount, up1, down1, remove1;
if (localStorage.getItem("item1")) {
  item1Counter = parseInt(localStorage.getItem("item1"));
} else {
  item1Counter = 0;
}

// Item Display: Item 2: Caffe Misto
const item2Display = document.querySelector(".item2-display");
let item2Counter, item2Amount, up2, down2, remove2;
if (localStorage.getItem("item2")) {
  item2Counter = parseInt(localStorage.getItem("item2"));
} else {
  item2Counter = 0;
}

// Item Display: Item 3: Blonde Caffe Americano
const item3Display = document.querySelector(".item3-display");
let item3Counter, item3Amount, up3, down3, remove3;
if (localStorage.getItem("item3")) {
  item3Counter = parseInt(localStorage.getItem("item3"));
} else {
  item3Counter = 0;
}

// Item Display: Item 4: Blonde Roast
const item4Display = document.querySelector(".item4-display");
let item4Counter, item4Amount, up4, down4, remove4;
if (localStorage.getItem("item4")) {
  item4Counter = parseInt(localStorage.getItem("item4"));
} else {
  item4Counter = 0;
}

// Item Display: Item 5: Dark Roast Coffee
const item5Display = document.querySelector(".item5-display");
let item5Counter, item5Amount, up5, down5, remove5;
if (localStorage.getItem("item5")) {
  item5Counter = parseInt(localStorage.getItem("item5"));
} else {
  item5Counter = 0;
}

// Item Display: Item 6: Pike Place® Roast
const item6Display = document.querySelector(".item6-display");
let item6Counter, item6Amount, up6, down6, remove6;
if (localStorage.getItem("item6")) {
  item6Counter = parseInt(localStorage.getItem("item6"));
} else {
  item6Counter = 0;
}

// Item Display: Item 7: Decaf Pike Place® Roast
const item7Display = document.querySelector(".item7-display");
let item7Counter, item7Amount, up7, down7, remove7;
if (localStorage.getItem("item7")) {
  item7Counter = parseInt(localStorage.getItem("item7"));
} else {
  item7Counter = 0;
}

// Item Display: Item 8: Cappuccino
const item8Display = document.querySelector(".item8-display");
let item8Counter, item8Amount, up8, down8, remove8;
if (localStorage.getItem("item8")) {
  item8Counter = parseInt(localStorage.getItem("item8"));
} else {
  item8Counter = 0;
}

// Item Display: Item 9: Blonde Cappuccino
const item9Display = document.querySelector(".item9-display");
let item9Counter, item9Amount, up9, down9, remove9;
if (localStorage.getItem("item9")) {
  item9Counter = parseInt(localStorage.getItem("item9"));
} else {
  item9Counter = 0;
}

// Item Display: Item 10: Espresso
const item10Display = document.querySelector(".item10-display");
let item10Counter, item10Amount, up10, down10, remove10;
if (localStorage.getItem("item10")) {
  item10Counter = parseInt(localStorage.getItem("item10"));
} else {
  item10Counter = 0;
}

// Item Display: Item 11: Espresso Macchiato
const item11Display = document.querySelector(".item11-display");
let item11Counter, item11Amount, up11, down11, remove11;
if (localStorage.getItem("item11")) {
  item11Counter = parseInt(localStorage.getItem("item11"));
} else {
  item11Counter = 0;
}

// Item Display: Item 12: Flat White
const item12Display = document.querySelector(".item12-display");
let item12Counter, item12Amount, up12, down12, remove12;
if (localStorage.getItem("item12")) {
  item12Counter = parseInt(localStorage.getItem("item12"));
} else {
  item12Counter = 0;
}

// Item Display: Item 13: Cappuccino
const item13Display = document.querySelector(".item13-display");
let item13Counter, item13Amount, up13, down13, remove13;
if (localStorage.getItem("item13")) {
  item13Counter = parseInt(localStorage.getItem("item13"));
} else {
  item13Counter = 0;
}

// Item Display: Item 14: Espresso
const item14Display = document.querySelector(".item14-display");
let item14Counter, item14Amount, up14, down14, remove14;
if (localStorage.getItem("item14")) {
  item14Counter = parseInt(localStorage.getItem("item14"));
} else {
  item14Counter = 0;
}

// Item Display: Item 15: Americano
const item15Display = document.querySelector(".item15-display");
let item15Counter, item15Amount, up15, down15, remove15;
if (localStorage.getItem("item15")) {
  item15Counter = parseInt(localStorage.getItem("item15"));
} else {
  item15Counter = 0;
}

// Item Display: Item 16: Mocha
const item16Display = document.querySelector(".item16-display");
let item16Counter, item16Amount, up16, down16, remove16;
if (localStorage.getItem("item16")) {
  item16Counter = parseInt(localStorage.getItem("item16"));
} else {
  item16Counter = 0;
}

// Item Display: Item 17: Cold Brew
const item17Display = document.querySelector(".item17-display");
let item17Counter, item17Amount, up17, down17, remove17;
if (localStorage.getItem("item17")) {
  item17Counter = parseInt(localStorage.getItem("item17"));
} else {
  item17Counter = 0;
}

// Item Display: Item 18: Matcha Latte
const item18Display = document.querySelector(".item18-display");
let item18Counter, item18Amount, up18, down18, remove18;
if (localStorage.getItem("item18")) {
  item18Counter = parseInt(localStorage.getItem("item18"));
} else {
  item18Counter = 0;
}




// Tests whether or not person is on the Menu page
if (document.querySelector(".one__cart__button")) {
  // Item 1: Caffe Americano
  const item1Button = document.querySelector(".one__cart__button");

  item1Button.addEventListener("click", function () {
    if (!localStorage.getItem("item1")) {
      initializeItem1();
    }
    item1Counter++;
    item1Amount.innerHTML = item1Counter;
    updateTotal(2.1);
    Storage.setAmount("item1", item1Counter);
  });

  // Item 2: Caffe Misto
  const item2Button = document.querySelector(".two__cart__button");

  item2Button.addEventListener("click", function () {
    if (!localStorage.getItem("item2")) {
      initializeItem2();
    }
    item2Counter++;
    item2Amount.innerHTML = item2Counter;
    updateTotal(2.6);
    Storage.setAmount("item2", item2Counter);
  });

  // Item 3: Blonde Caffe Americano
  const item3Button = document.querySelector(".three__cart__button");

  item3Button.addEventListener("click", function () {
    if (!localStorage.getItem("item3")) {
      initializeItem3();
    }
    item3Counter++;
    item3Amount.innerHTML = item3Counter;
    updateTotal(2.79);
    Storage.setAmount("item3", item3Counter);
  });

  // Item 4: Blonde Roast
  const item4Button = document.querySelector(".four__cart__button");

  item4Button.addEventListener("click", function () {
    if (!localStorage.getItem("item4")) {
      initializeItem4();
    }
    item4Counter++;
    item4Amount.innerHTML = item4Counter;
    updateTotal(2.05);
    Storage.setAmount("item4", item4Counter);
  });

  // Item 5: Dark Roast Coffee
  const item5Button = document.querySelector(".five__cart__button");

  item5Button.addEventListener("click", function () {
    if (!localStorage.getItem("item5")) {
      initializeItem5();
    }
    item5Counter++;
    item5Amount.innerHTML = item5Counter;
    updateTotal(2.2);
    Storage.setAmount("item5", item5Counter);
  });

  // Item 6: Pike Place® Roast
  const item6Button = document.querySelector(".six__cart__button");

  item6Button.addEventListener("click", function () {
    if (!localStorage.getItem("item6")) {
      initializeItem6();
    }
    item6Counter++;
    item6Amount.innerHTML = item6Counter;
    updateTotal(2.8);
    Storage.setAmount("item6", item6Counter);
  });

  // Item 7: Decaf Pike Place® Roast
  const item7Button = document.querySelector(".seven__cart__button");

  item7Button.addEventListener("click", function () {
    if (!localStorage.getItem("item7")) {
      initializeItem7();
    }
    item7Counter++;
    item7Amount.innerHTML = item7Counter;
    updateTotal(2.25);
    Storage.setAmount("item7", item7Counter);
  });

  // Item 8: Cappuccino
  const item8Button = document.querySelector(".eight__cart__button");

  item8Button.addEventListener("click", function () {
    if (!localStorage.getItem("item8")) {
      initializeItem8();
    }
    item8Counter++;
    item8Amount.innerHTML = item8Counter;
    updateTotal(2.59);
    Storage.setAmount("item8", item8Counter);
  });

  // Item 9: Blonde Cappuccino
  const item9Button = document.querySelector(".nine__cart__button");

  item9Button.addEventListener("click", function () {
    if (!localStorage.getItem("item9")) {
      initializeItem9();
    }
    item9Counter++;
    item9Amount.innerHTML = item9Counter;
    updateTotal(2.34);
    Storage.setAmount("item9", item9Counter);
  });

  // Item 10: Espresso
  const item10Button = document.querySelector(".ten__cart__button");

  item10Button.addEventListener("click", function () {
    if (!localStorage.getItem("item10")) {
      initializeItem10();
    }
    item10Counter++;
    item10Amount.innerHTML = item10Counter;
    updateTotal(2.89);
    Storage.setAmount("item10", item10Counter);
  });

  // Item 11: Espresso Macchiato
  const item11Button = document.querySelector(".eleven__cart__button");

  item11Button.addEventListener("click", function () {
    if (!localStorage.getItem("item11")) {
      initializeItem11();
    }
    item11Counter++;
    item11Amount.innerHTML = item11Counter;
    updateTotal(2.18);
    Storage.setAmount("item11", item11Counter);
  });

  // Item 12: Flat White
  const item12Button = document.querySelector(".twelve__cart__button");

  item12Button.addEventListener("click", function () {
    if (!localStorage.getItem("item12")) {
      initializeItem12();
    }
    item12Counter++;
    item12Amount.innerHTML = item12Counter;
    updateTotal(2.75);
    Storage.setAmount("item12", item12Counter);
  });

  // Item 13: Cappuccino
  const item13Button = document.querySelector(".thirteen__cart__button");

  item13Button.addEventListener("click", function () {
    if (!localStorage.getItem("item13")) {
      initializeItem13();
    }
    item13Counter++;
    item13Amount.innerHTML = item13Counter;
    updateTotal(3.0); // Giá ví dụ: 3.00
    Storage.setAmount("item13", item13Counter);
  });

  // Item 14: Espresso
  const item14Button = document.querySelector(".fourteen__cart__button");

  item14Button.addEventListener("click", function () {
    if (!localStorage.getItem("item14")) {
      initializeItem14();
    }
    item14Counter++;
    item14Amount.innerHTML = item14Counter;
    updateTotal(2.5); // Giá ví dụ: 2.50
    Storage.setAmount("item14", item14Counter);
  });

  // Item 15: Americano
  const item15Button = document.querySelector(".fifteen__cart__button");

  item15Button.addEventListener("click", function () {
    if (!localStorage.getItem("item15")) {
      initializeItem15();
    }
    item15Counter++;
    item15Amount.innerHTML = item15Counter;
    updateTotal(2.8); // Giá ví dụ: 2.80
    Storage.setAmount("item15", item15Counter);
  });

  // Item 16: Mocha
  const item16Button = document.querySelector(".sixteen__cart__button");

  item16Button.addEventListener("click", function () {
    if (!localStorage.getItem("item16")) {
      initializeItem16();
    }
    item16Counter++;
    item16Amount.innerHTML = item16Counter;
    updateTotal(3.25); // Giá ví dụ: 3.25
    Storage.setAmount("item16", item16Counter);
  });

  // Item 17: Cold Brew
  const item17Button = document.querySelector(".seventeen__cart__button");

  item17Button.addEventListener("click", function () {
    if (!localStorage.getItem("item17")) {
      initializeItem17();
    }
    item17Counter++;
    item17Amount.innerHTML = item17Counter;
    updateTotal(3.5); // Giá ví dụ: 3.50
    Storage.setAmount("item17", item17Counter);
  });

  // Item 18: Matcha Latte
  const item18Button = document.querySelector(".eighteen__cart__button");

  item18Button.addEventListener("click", function () {
    if (!localStorage.getItem("item18")) {
      initializeItem18();
    }
    item18Counter++;
    item18Amount.innerHTML = item18Counter;
    updateTotal(3.75); // Giá ví dụ: 3.75
    Storage.setAmount("item18", item18Counter);
  });

}


// Check if there are items in the local storage
if (checkStorageForCart()) {
  if (localStorage.getItem("item1")) {
    // Item 1: Caffe Americano
    initializeItem1();
  }
  if (localStorage.getItem("item2")) {
    // Item 2: Caffe Misto
    initializeItem2();
  }
  if (localStorage.getItem("item3")) {
    // Item 3: Blonde Caffe Americano
    initializeItem3();
  }
  if (localStorage.getItem("item4")) {
    // Item 4: Blonde Roast
    initializeItem4();
  }
  if (localStorage.getItem("item5")) {
    // Item 5: Dark Roast Coffee
    initializeItem5();
  }
  if (localStorage.getItem("item6")) {
    // Item 6: Pike Place® Roast
    initializeItem6();
  }
  if (localStorage.getItem("item7")) {
    // Item 7: Decaf Pike Place® Roast
    initializeItem7();
  }
  if (localStorage.getItem("item8")) {
    // Item 8: Cappuccino
    initializeItem8();
  }
  if (localStorage.getItem("item9")) {
    // Item 9: Blonde Cappuccino
    initializeItem9();
  }
  if (localStorage.getItem("item10")) {
    // Item 10: Espresso
    initializeItem10();
  }
  if (localStorage.getItem("item11")) {
    // Item 11: Espresso Macchiato
    initializeItem11();
  }
  if (localStorage.getItem("item12")) {
    // Item 12: Flat White
    initializeItem12();
  }
  if (localStorage.getItem("item13")) {
    // Item 13: Cappuccino
    initializeItem13();
  }

  if (localStorage.getItem("item14")) {
    // Item 14: Espresso
    initializeItem14();
  }

  if (localStorage.getItem("item15")) {
    // Item 15: Americano
    initializeItem15();
  }

  if (localStorage.getItem("item16")) {
    // Item 16: Mocha
    initializeItem16();
  }

  if (localStorage.getItem("item17")) {
    // Item 17: Cold Brew
    initializeItem17();
  }

  if (localStorage.getItem("item18")) {
    // Item 18: Matcha Latte
    initializeItem18();
  }

}

/**
 * Checks if there is at least one item in the local storage
 */
function checkStorageForCart() {
  if (
    localStorage.getItem("item1") ||
    localStorage.getItem("item2") ||
    localStorage.getItem("item3") ||
    localStorage.getItem("item4") ||
    localStorage.getItem("item5") ||
    localStorage.getItem("item6") ||
    localStorage.getItem("item7") ||
    localStorage.getItem("item8") ||
    localStorage.getItem("item9") ||
    localStorage.getItem("item10") ||
    localStorage.getItem("item11") ||
    localStorage.getItem("item12") ||
    localStorage.getItem("item13") ||
    localStorage.getItem("item14") ||
    localStorage.getItem("item15") ||
    localStorage.getItem("item16") ||
    localStorage.getItem("item17") ||
    localStorage.getItem("item18") 
  ) {
    return true;
  }
  return false;
}

/**
 * Initializes item1 if it is already in the cart or needs to be added to the cart.
 * Caffe Americano
 */
function initializeItem1() {
  item1Display.innerHTML += `<div class="one1-cart-item">
  <img src="./img/menu/ca-phe-sua.png" alt="product" />
    <div>
      <h3><span class="span-primary">بالحليب</span> قهوة</h3>
      <h4>$17.48</h4>
      <span class="remove-item-1">Remove</span>
    </div>
    <div>
      <div class="item1Up">
      <i class="fas fa-chevron-up"></i>
      </div>
      <p class="item-amount1">${item1Counter}</p>
      <div class="item1Down">
      <i class="fas fa-chevron-down"></i>
      </div>
    </div>
          </div >`;
  item1Amount = document.querySelector(".item-amount1");
  up1 = document.querySelector(".item1Up");
  down1 = document.querySelector(".item1Down");
  remove1 = document.querySelector(".remove-item-1");

  up1.addEventListener("click", function () {
    item1Counter++;
    item1Amount.innerHTML = item1Counter;
    updateTotal(17.48);
    Storage.setAmount("item1", item1Counter);
  });

  down1.addEventListener("click", function () {
    item1Counter--;
    item1Amount.innerHTML = item1Counter;
    updateTotal(-17.48);
    Storage.setAmount("item1", item1Counter);

    if (item1Counter === 0) {
      item1Display.innerHTML = "";
      Storage.removeAmount("item1");
    }
  });

  remove1.addEventListener("click", function () {
    item1Display.innerHTML = "";
    updateTotal(-17.48 * item1Counter);
    item1Counter = 0;
    Storage.removeAmount("item1");
  });
}

/**
 * Initializes item2 if it is already in the cart or needs to be added to the cart.
 * Caffe Misto
 */
function initializeItem2() {
  item2Display.innerHTML += `<div class="two2-cart-item">
  <img src="./img/menu/latte.png" alt="product" />
    <div>
      <h3><span class="span-primary">لاتيه</span> </h3>
      <h4>$17.48</h4>
      <span class="remove-item-2">Remove</span>
    </div>
    <div>
      <div class="item2Up">
      <i class="fas fa-chevron-up"></i>
      </div>
      <p class="item-amount2">${item2Counter}</p>
      <div class="item2Down">
      <i class="fas fa-chevron-down"></i>
      </div>
    </div>
          </div >`;
  item2Amount = document.querySelector(".item-amount2");
  up2 = document.querySelector(".item2Up");
  down2 = document.querySelector(".item2Down");
  remove2 = document.querySelector(".remove-item-2");

  up2.addEventListener("click", function () {
    item2Counter++;
    item2Amount.innerHTML = item2Counter;
    updateTotal(17.48);
    Storage.setAmount("item2", item2Counter);
  });

  down2.addEventListener("click", function () {
    item2Counter--;
    item2Amount.innerHTML = item2Counter;
    updateTotal(-17.48);
    Storage.setAmount("item2", item2Counter);

    if (item2Counter === 0) {
      item2Display.innerHTML = "";
      Storage.removeAmount("item2");
    }
  });

  remove2.addEventListener("click", function () {
    item2Display.innerHTML = "";
    updateTotal(-17.48 * item2Counter);
    item2Counter = 0;
    Storage.removeAmount("item2");
  });
}

/**
 * Initializes item3 if it is already in the cart or needs to be added to the cart.
 * Blonde Caffe Americano
 */
function initializeItem3() {
  item3Display.innerHTML += `<div class="three3-cart-item">
  <img src="./img/menu/bac-xiu.png" alt="product" />
    <div>
      <h3><span class="span-primary">بيضاء</span> قهوة</h3>
      <h4>$17.48</h4>
      <span class="remove-item-3">Remove</span>
    </div>
    <div>
      <div class="item3Up">
      <i class="fas fa-chevron-up"></i>
      </div>
      <p class="item-amount3">${item3Counter}</p>
      <div class="item3Down">
      <i class="fas fa-chevron-down"></i>
      </div>
    </div>
          </div >`;
  item3Amount = document.querySelector(".item-amount3");
  up3 = document.querySelector(".item3Up");
  down3 = document.querySelector(".item3Down");
  remove3 = document.querySelector(".remove-item-3");

  up3.addEventListener("click", function () {
    item3Counter++;
    item3Amount.innerHTML = item3Counter;
    updateTotal(17.48);
    Storage.setAmount("item3", item3Counter);
  });

  down3.addEventListener("click", function () {
    item3Counter--;
    item3Amount.innerHTML = item3Counter;
    updateTotal(-17.48);
    Storage.setAmount("item3", item3Counter);

    if (item3Counter === 0) {
      item3Display.innerHTML = "";
      Storage.removeAmount("item3");
    }
  });

  remove3.addEventListener("click", function () {
    item3Display.innerHTML = "";
    updateTotal(-17.48 * item3Counter);
    item3Counter = 0;
    Storage.removeAmount("item3");
  });
}

/**
 * Initializes item4 if it is already in the cart or needs to be added to the cart.
 * Blonde Roast
 */
function initializeItem4() {
  item4Display.innerHTML += `<div class="four4-cart-item">
  <img src="./img/menu/phin.png" alt="product" />
    <div>
      <h3><span class="span-primary">Phin</span> قهوة</h3>
      <h4>$17.48</h4>
      <span class="remove-item-4">Remove</span>
    </div>
    <div>
      <div class="item4Up">
      <i class="fas fa-chevron-up"></i>
      </div>
      <p class="item-amount4">${item4Counter}</p>
      <div class="item4Down">
      <i class="fas fa-chevron-down"></i>
      </div>
    </div>
          </div >`;
  item4Amount = document.querySelector(".item-amount4");
  up4 = document.querySelector(".item4Up");
  down4 = document.querySelector(".item4Down");
  remove4 = document.querySelector(".remove-item-4");

  up4.addEventListener("click", function () {
    item4Counter++;
    item4Amount.innerHTML = item4Counter;
    updateTotal(17.48);
    Storage.setAmount("item4", item4Counter);
  });

  down4.addEventListener("click", function () {
    item4Counter--;
    item4Amount.innerHTML = item4Counter;
    updateTotal(-17.48);
    Storage.setAmount("item4", item4Counter);

    if (item4Counter === 0) {
      item4Display.innerHTML = "";
      Storage.removeAmount("item4");
    }
  });

  remove4.addEventListener("click", function () {
    item4Display.innerHTML = "";
    updateTotal(-17.48 * item4Counter);
    item4Counter = 0;
    Storage.removeAmount("item4");
  });
}

/**
 * Initializes item5 if it is already in the cart or needs to be added to the cart.
 * Dark Roast Coffee
 */
function initializeItem5() {
  item5Display.innerHTML += `<div class="five5-cart-item">
  <img src="./img/menu/dam.png" alt="product" />
    <div>
      <h3><span class="span-primary">Dam</span> قهوة</h3>
      <h4>$17.48</h4>
      <span class="remove-item-5">Remove</span>
    </div>
    <div>
      <div class="item5Up">
      <i class="fas fa-chevron-up"></i>
      </div>
      <p class="item-amount5">${item5Counter}</p>
      <div class="item5Down">
      <i class="fas fa-chevron-down"></i>
      </div>
    </div>
          </div >`;
  item5Amount = document.querySelector(".item-amount5");
  up5 = document.querySelector(".item5Up");
  down5 = document.querySelector(".item5Down");
  remove5 = document.querySelector(".remove-item-5");

  up5.addEventListener("click", function () {
    item5Counter++;
    item5Amount.innerHTML = item5Counter;
    updateTotal(17.48);
    Storage.setAmount("item5", item5Counter);
  });

  down5.addEventListener("click", function () {
    item5Counter--;
    item5Amount.innerHTML = item5Counter;
    updateTotal(-17.48);
    Storage.setAmount("item5", item5Counter);

    if (item5Counter === 0) {
      item5Display.innerHTML = "";
      Storage.removeAmount("item5");
    }
  });

  remove5.addEventListener("click", function () {
    item5Display.innerHTML = "";
    updateTotal(-17.48 * item5Counter);
    item5Counter = 0;
    Storage.removeAmount("item5");
  });
}

/**
 * Initializes item6 if it is already in the cart or needs to be added to the cart.
 * Pike Place® Roast
 */
function initializeItem6() {
  item6Display.innerHTML += `<div class="six6-cart-item">
  <img src="./img/menu/diu.png" alt="product" />
    <div>
      <h3><span class="span-primary">Diu</span> قهوة</h3>
      <h4>$17.48</h4>
      <span class="remove-item-6">Remove</span>
    </div>
    <div>
      <div class="item6Up">
      <i class="fas fa-chevron-up"></i>
      </div>
      <p class="item-amount6">${item6Counter}</p>
      <div class="item6Down">
      <i class="fas fa-chevron-down"></i>
      </div>
    </div>
          </div >`;
  item6Amount = document.querySelector(".item-amount6");
  up6 = document.querySelector(".item6Up");
  down6 = document.querySelector(".item6Down");
  remove6 = document.querySelector(".remove-item-6");

  up6.addEventListener("click", function () {
    item6Counter++;
    item6Amount.innerHTML = item6Counter;
    updateTotal(17.48);
    Storage.setAmount("item6", item6Counter);
  });

  down6.addEventListener("click", function () {
    item6Counter--;
    item6Amount.innerHTML = item6Counter;
    updateTotal(-17.48);
    Storage.setAmount("item6", item6Counter);

    if (item6Counter === 0) {
      item6Display.innerHTML = "";
      Storage.removeAmount("item6");
    }
  });

  remove6.addEventListener("click", function () {
    item6Display.innerHTML = "";
    updateTotal(-17.48 * item6Counter);
    item6Counter = 0;
    Storage.removeAmount("item6");
  });
}

/**
 * Initializes item7 if it is already in the cart or needs to be added to the cart.
 * Decaf Pike Place® Roast
 */
function initializeItem7() {
  item7Display.innerHTML += `<div class="seven7-cart-item">
  <img src="./img/menu/phieu.png" alt="product" />
    <div>
      <h3><span class="span-primary">Phieu </span>قهوة</h3>
      <h4>$17.48</h4>
      <span class="remove-item-7">Remove</span>
    </div>
    <div>
      <div class="item7Up">
      <i class="fas fa-chevron-up"></i>
      </div>
      <p class="item-amount7">${item7Counter}</p>
      <div class="item7Down">
      <i class="fas fa-chevron-down"></i>
      </div>
    </div>
          </div >`;
  item7Amount = document.querySelector(".item-amount7");
  up7 = document.querySelector(".item7Up");
  down7 = document.querySelector(".item7Down");
  remove7 = document.querySelector(".remove-item-7");

  up7.addEventListener("click", function () {
    item7Counter++;
    item7Amount.innerHTML = item7Counter;
    updateTotal(17.48);
    Storage.setAmount("item7", item7Counter);
  });

  down7.addEventListener("click", function () {
    item7Counter--;
    item7Amount.innerHTML = item7Counter;
    updateTotal(-17.48);
    Storage.setAmount("item7", item7Counter);

    if (item7Counter === 0) {
      item7Display.innerHTML = "";
      Storage.removeAmount("item7");
    }
  });

  remove7.addEventListener("click", function () {
    item7Display.innerHTML = "";
    updateTotal(-17.48 * item7Counter);
    item7Counter = 0;
    Storage.removeAmount("item7");
  });
}

/**
 * Initializes item8 if it is already in the cart or needs to be added to the cart.
 * Cappuccino
 */
function initializeItem8() {
  item8Display.innerHTML += `<div class="eight8-cart-item">
  <img src="./img/menu/classico.png" alt="product" />
    <div>
      <h3><span class="span-primary">Classio</span>قهوة</h3>
      <h4>$7.48</h4>
      <span class="remove-item-8">Remove</span>
    </div>
    <div>
      <div class="item8Up">
      <i class="fas fa-chevron-up"></i>
      </div>
      <p class="item-amount8">${item8Counter}</p>
      <div class="item8Down">
      <i class="fas fa-chevron-down"></i>
      </div>
    </div>
          </div >`;
  item8Amount = document.querySelector(".item-amount8");
  up8 = document.querySelector(".item8Up");
  down8 = document.querySelector(".item8Down");
  remove8 = document.querySelector(".remove-item-8");

  up8.addEventListener("click", function () {
    item8Counter++;
    item8Amount.innerHTML = item8Counter;
    updateTotal(7.48);
    Storage.setAmount("item8", item8Counter);
  });

  down8.addEventListener("click", function () {
    item8Counter--;
    item8Amount.innerHTML = item8Counter;
    updateTotal(-7.48);
    Storage.setAmount("item8", item8Counter);

    if (item8Counter === 0) {
      item8Display.innerHTML = "";
      Storage.removeAmount("item8");
    }
  });

  remove8.addEventListener("click", function () {
    item8Display.innerHTML = "";
    updateTotal(-7.48 * item8Counter);
    item8Counter = 0;
    Storage.removeAmount("item8");
  });
}

/**
 * Initializes item9 if it is already in the cart or needs to be added to the cart.
 * Blonde Cappuccino
 */
function initializeItem9() {
  item9Display.innerHTML += `<div class="nine9-cart-item">
  <img src="./img/menu/traditional.png" alt="product" />
    <div>
      <h3><span class="span-primary">Traditional</span> قهوة</h3>
      <h4>$7.48</h4>
      <span class="remove-item-9">Remove</span>
    </div>
    <div>
      <div class="item9Up">
      <i class="fas fa-chevron-up"></i>
      </div>
      <p class="item-amount9">${item9Counter}</p>
      <div class="item9Down">
      <i class="fas fa-chevron-down"></i>
      </div>
    </div>
          </div >`;
  item9Amount = document.querySelector(".item-amount9");
  up9 = document.querySelector(".item9Up");
  down9 = document.querySelector(".item9Down");
  remove9 = document.querySelector(".remove-item-9");

  up9.addEventListener("click", function () {
    item9Counter++;
    item9Amount.innerHTML = item9Counter;
    updateTotal(7.48);
    Storage.setAmount("item9", item9Counter);
  });

  down9.addEventListener("click", function () {
    item9Counter--;
    item9Amount.innerHTML = item9Counter;
    updateTotal(-7.48);
    Storage.setAmount("item9", item9Counter);

    if (item9Counter === 0) {
      item9Display.innerHTML = "";
      Storage.removeAmount("item9");
    }
  });

  remove9.addEventListener("click", function () {
    item9Display.innerHTML = "";
    updateTotal(-7.48 * item9Counter);
    item9Counter = 0;
    Storage.removeAmount("item9");
  });
}

/**
 * Initializes item10 if it is already in the cart or needs to be added to the cart.
 * Espresso
 */
function initializeItem10() {
  item10Display.innerHTML += `<div class="ten10-cart-item">
  <img src="./img/menu/a.png" alt="product" />
    <div>
      <h3><span class="span-primary">Aromatic</span>قهوة</h3>
      <h4>$24.48</h4>
      <span class="remove-item-10">Remove</span>
    </div>
    <div>
      <div class="item10Up">
      <i class="fas fa-chevron-up"></i>
      </div>
      <p class="item-amount10">${item10Counter}</p>
      <div class="item10Down">
      <i class="fas fa-chevron-down"></i>
      </div>
    </div>
          </div >`;
  item10Amount = document.querySelector(".item-amount10");
  up10 = document.querySelector(".item10Up");
  down10 = document.querySelector(".item10Down");
  remove10 = document.querySelector(".remove-item-10");

  up10.addEventListener("click", function () {
    item10Counter++;
    item10Amount.innerHTML = item10Counter;
    updateTotal(24.48);
    Storage.setAmount("item10", item10Counter);
  });

  down10.addEventListener("click", function () {
    item10Counter--;
    item10Amount.innerHTML = item10Counter;
    updateTotal(-24.48);
    Storage.setAmount("item10", item10Counter);

    if (item10Counter === 0) {
      item10Display.innerHTML = "";
      Storage.removeAmount("item10");
    }
  });

  remove10.addEventListener("click", function () {
    item10Display.innerHTML = "";
    updateTotal(-24.48 * item10Counter);
    item10Counter = 0;
    Storage.removeAmount("item10");
  });
}

/**
 * Initializes item11 if it is already in the cart or needs to be added to the cart.
 * Espresso Macchiato
 */
function initializeItem11() {
  item11Display.innerHTML += `<div class="eleven11-cart-item">
  <img src="./img/menu/b.png" alt="product" />
    <div>
      <h3><span class="span-primary">Bold</span> قهوة</h3>
      <h4>$24.48</h4>
      <span class="remove-item-11">Remove</span>
    </div>
    <div>
      <div class="item11Up">
      <i class="fas fa-chevron-up"></i>
      </div>
      <p class="item-amount11">${item11Counter}</p>
      <div class="item11Down">
      <i class="fas fa-chevron-down"></i>
      </div>
    </div>
          </div >`;
  item11Amount = document.querySelector(".item-amount11");
  up11 = document.querySelector(".item11Up");
  down11 = document.querySelector(".item11Down");
  remove11 = document.querySelector(".remove-item-11");

  up11.addEventListener("click", function () {
    item11Counter++;
    item11Amount.innerHTML = item11Counter;
    updateTotal(24.48);
    Storage.setAmount("item11", item11Counter);
  });

  down11.addEventListener("click", function () {
    item11Counter--;
    item11Amount.innerHTML = item11Counter;
    updateTotal(-24.48);
    Storage.setAmount("item11", item11Counter);

    if (item11Counter === 0) {
      item11Display.innerHTML = "";
      Storage.removeAmount("item11");
    }
  });

  remove11.addEventListener("click", function () {
    item11Display.innerHTML = "";
    updateTotal(-24.48 * item11Counter);
    item11Counter = 0;
    Storage.removeAmount("item11");
  });
}

/**
 * Initializes item12 if it is already in the cart or needs to be added to the cart.
 * Flat White
 */
function initializeItem12() {
  item12Display.innerHTML += `<div class="twelve12-cart-item">
  <img src="./img/menu/c.png" alt="product" />
    <div>
      <h3><span class="span-primary">Coldbrew</span> قهوة</h3>
      <h4>$24.48</h4>
      <span class="remove-item-12">Remove</span>
    </div>
    <div>
      <div class="item12Up">
      <i class="fas fa-chevron-up"></i>
      </div>
      <p class="item-amount12">${item12Counter}</p>
      <div class="item12Down">
      <i class="fas fa-chevron-down"></i>
      </div>
    </div>
          </div >`;
  item12Amount = document.querySelector(".item-amount12");
  up12 = document.querySelector(".item12Up");
  down12 = document.querySelector(".item12Down");
  remove12 = document.querySelector(".remove-item-12");

  up12.addEventListener("click", function () {
    item12Counter++;
    item12Amount.innerHTML = item12Counter;
    updateTotal(24.48);
    Storage.setAmount("item12", item12Counter);
  });

  down12.addEventListener("click", function () {
    item12Counter--;
    item12Amount.innerHTML = item12Counter;
    updateTotal(-24.48);
    Storage.setAmount("item12", item12Counter);

    if (item12Counter === 0) {
      item12Display.innerHTML = "";
      Storage.removeAmount("item12");
    }
  });

  remove12.addEventListener("click", function () {
    item12Display.innerHTML = "";
    updateTotal(-24.48 * item12Counter);
    item12Counter = 0;
    Storage.removeAmount("item12");
  });
}

/**
 * Initializes item13 if it is already in the cart or needs to be added to the cart.
 * Cappuccino
 */
function initializeItem13() {
  item13Display.innerHTML += `<div class="thirteen13-cart-item">
  <img src="./img/menu/d.png" alt="product" />
    <div>
      <h3><span class="span-primary">D</span>قهوة</h3>
      <h4>$24.48</h4>
      <span class="remove-item-13">Remove</span>
    </div>
    <div>
      <div class="item13Up">
        <i class="fas fa-chevron-up"></i>
      </div>
      <p class="item-amount13">${item13Counter}</p>
      <div class="item13Down">
        <i class="fas fa-chevron-down"></i>
      </div>
    </div>
  </div>`;
  
  item13Amount = document.querySelector(".item-amount13");
  up13 = document.querySelector(".item13Up");
  down13 = document.querySelector(".item13Down");
  remove13 = document.querySelector(".remove-item-13");

  up13.addEventListener("click", function () {
    item13Counter++;
    item13Amount.innerHTML = item13Counter;
    updateTotal(24.48);
    Storage.setAmount("item13", item13Counter);
  });

  down13.addEventListener("click", function () {
    item13Counter--;
    item13Amount.innerHTML = item13Counter;
    updateTotal(-24.48);
    Storage.setAmount("item13", item13Counter);

    if (item13Counter === 0) {
      item13Display.innerHTML = "";
      Storage.removeAmount("item13");
    }
  });

  remove13.addEventListener("click", function () {
    item13Display.innerHTML = "";
    updateTotal(-24.48 * item13Counter);
    item13Counter = 0;
    Storage.removeAmount("item13");
  });
}


/**
 * Initializes item14: Espresso
 */
function initializeItem14() {
  item14Display.innerHTML += `<div class="fourteen14-cart-item">
  <img src="./img/menu/e1.png" alt="product" />
    <div>
      <h3><span class="span-primary">E1</span>قهوة</h3>
      <h4>$24.48</h4>
      <span class="remove-item-14">Remove</span>
    </div>
    <div>
      <div class="item14Up"><i class="fas fa-chevron-up"></i></div>
      <p class="item-amount14">${item14Counter}</p>
      <div class="item14Down"><i class="fas fa-chevron-down"></i></div>
    </div>
  </div>`;
  
  item14Amount = document.querySelector(".item-amount14");
  up14 = document.querySelector(".item14Up");
  down14 = document.querySelector(".item14Down");
  remove14 = document.querySelector(".remove-item-14");

  up14.addEventListener("click", function () {
    item14Counter++;
    item14Amount.innerHTML = item14Counter;
    updateTotal(24.48);
    Storage.setAmount("item14", item14Counter);
  });

  down14.addEventListener("click", function () {
    item14Counter--;
    item14Amount.innerHTML = item14Counter;
    updateTotal(-24.48);
    Storage.setAmount("item14", item14Counter);
    if (item14Counter === 0) {
      item14Display.innerHTML = "";
      Storage.removeAmount("item14");
    }
  });

  remove14.addEventListener("click", function () {
    item14Display.innerHTML = "";
    updateTotal(-24.48 * item14Counter);
    item14Counter = 0;
    Storage.removeAmount("item14");
  });
}


/**
 * Initializes item15: Americano
 */
function initializeItem15() {
  item15Display.innerHTML += `<div class="fifteen15-cart-item">
  <img src="./img/menu/e2.png" alt="product" />
    <div>
      <h3><span class="span-primary">E2</span>قهوة</h3>
      <h4>$24.48</h4>
      <span class="remove-item-15">Remove</span>
    </div>
    <div>
      <div class="item15Up"><i class="fas fa-chevron-up"></i></div>
      <p class="item-amount15">${item15Counter}</p>
      <div class="item15Down"><i class="fas fa-chevron-down"></i></div>
    </div>
  </div>`;
  
  item15Amount = document.querySelector(".item-amount15");
  up15 = document.querySelector(".item15Up");
  down15 = document.querySelector(".item15Down");
  remove15 = document.querySelector(".remove-item-15");

  up15.addEventListener("click", function () {
    item15Counter++;
    item15Amount.innerHTML = item15Counter;
    updateTotal(24.48);
    Storage.setAmount("item15", item15Counter);
  });

  down15.addEventListener("click", function () {
    item15Counter--;
    item15Amount.innerHTML = item15Counter;
    updateTotal(-24.48);
    Storage.setAmount("item15", item15Counter);
    if (item15Counter === 0) {
      item15Display.innerHTML = "";
      Storage.removeAmount("item15");
    }
  });

  remove15.addEventListener("click", function () {
    item15Display.innerHTML = "";
    updateTotal(-24.48 * item15Counter);
    item15Counter = 0;
    Storage.removeAmount("item15");
  });
}


/**
 * Initializes item16: Mocha
 */
function initializeItem16() {
  item16Display.innerHTML += `<div class="sixteen16-cart-item">
  <img src="./img/menu/f1.png" alt="product" />
    <div>
      <h3><span class="span-primary">F1</span>قهوة</h3>
      <h4>$24.48</h4>
      <span class="remove-item-16">Remove</span>
    </div>
    <div>
      <div class="item16Up"><i class="fas fa-chevron-up"></i></div>
      <p class="item-amount16">${item16Counter}</p>
      <div class="item16Down"><i class="fas fa-chevron-down"></i></div>
    </div>
  </div>`;
  
  item16Amount = document.querySelector(".item-amount16");
  up16 = document.querySelector(".item16Up");
  down16 = document.querySelector(".item16Down");
  remove16 = document.querySelector(".remove-item-16");

  up16.addEventListener("click", function () {
    item16Counter++;
    item16Amount.innerHTML = item16Counter;
    updateTotal(24.48);
    Storage.setAmount("item16", item16Counter);
  });

  down16.addEventListener("click", function () {
    item16Counter--;
    item16Amount.innerHTML = item16Counter;
    updateTotal(-24.48);
    Storage.setAmount("item16", item16Counter);
    if (item16Counter === 0) {
      item16Display.innerHTML = "";
      Storage.removeAmount("item16");
    }
  });

  remove16.addEventListener("click", function () {
    item16Display.innerHTML = "";
    updateTotal(-24.48 * item16Counter);
    item16Counter = 0;
    Storage.removeAmount("item16");
  });
}


/**
 * Initializes item17: Cold Brew
 */
function initializeItem17() {
  item17Display.innerHTML += `<div class="seventeen17-cart-item">
  <img src="./img/menu/f2.png" alt="product" />
    <div>
      <h3><span class="span-primary">F1</span>قهوة</h3>
      <h4>$24.48</h4>
      <span class="remove-item-17">Remove</span>
    </div>
    <div>
      <div class="item17Up"><i class="fas fa-chevron-up"></i></div>
      <p class="item-amount17">${item17Counter}</p>
      <div class="item17Down"><i class="fas fa-chevron-down"></i></div>
    </div>
  </div>`;
  
  item17Amount = document.querySelector(".item-amount17");
  up17 = document.querySelector(".item17Up");
  down17 = document.querySelector(".item17Down");
  remove17 = document.querySelector(".remove-item-17");

  up17.addEventListener("click", function () {
    item17Counter++;
    item17Amount.innerHTML = item17Counter;
    updateTotal(24.48);
    Storage.setAmount("item17", item17Counter);
  });

  down17.addEventListener("click", function () {
    item17Counter--;
    item17Amount.innerHTML = item17Counter;
    updateTotal(-24.48);
    Storage.setAmount("item17", item17Counter);
    if (item17Counter === 0) {
      item17Display.innerHTML = "";
      Storage.removeAmount("item17");
    }
  });

  remove17.addEventListener("click", function () {
    item17Display.innerHTML = "";
    updateTotal(-24.48 * item17Counter);
    item17Counter = 0;
    Storage.removeAmount("item17");
  });
}


/**
 * Initializes item18: Matcha Latte
 */
function initializeItem18() {
  item18Display.innerHTML += `<div class="eighteen18-cart-item">
  <img src="./img/menu/s.png" alt="product" />
    <div>
      <h3><span class="span-primary">S</span>قهوة</h3>
      <h4>$24.48</h4>
      <span class="remove-item-18">Remove</span>
    </div>
    <div>
      <div class="item18Up"><i class="fas fa-chevron-up"></i></div>
      <p class="item-amount18">${item18Counter}</p>
      <div class="item18Down"><i class="fas fa-chevron-down"></i></div>
    </div>
  </div>`;
  
  item18Amount = document.querySelector(".item-amount18");
  up18 = document.querySelector(".item18Up");
  down18 = document.querySelector(".item18Down");
  remove18 = document.querySelector(".remove-item-18");

  up18.addEventListener("click", function () {
    item18Counter++;
    item18Amount.innerHTML = item18Counter;
    updateTotal(24.48);
    Storage.setAmount("item18", item18Counter);
  });

  down18.addEventListener("click", function () {
    item18Counter--;
    item18Amount.innerHTML = item18Counter;
    updateTotal(-24.48);
    Storage.setAmount("item18", item18Counter);
    if (item18Counter === 0) {
      item18Display.innerHTML = "";
      Storage.removeAmount("item18");
    }
  });

  remove18.addEventListener("click", function () {
    item18Display.innerHTML = "";
    updateTotal(-24.48 * item18Counter);
    item18Counter = 0;
    Storage.removeAmount("item18");
  });
}

