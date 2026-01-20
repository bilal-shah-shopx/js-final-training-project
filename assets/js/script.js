// Plans Section
function Plan(count, planPrice, price) {
    this.count = count;
    this.planPrice = planPrice;
    this.price = price
}

const plansDetail = {
    'plan-1': new Plan(4, 56, 11.49),
    'plan-2': new Plan(6, 84, 9.49),
    'plan-3': new Plan(10, 140, 8.99),
    'plan-4': new Plan(12, 168, 8.49)
}

let selectedPlan = '';

document.addEventListener('DOMContentLoaded', function () {
    const userPlan = localStorage.getItem('selectedPlan');
    if (userPlan) {
        selectedPlan = userPlan;
    }
    else {
        selectedPlan = 'plan-1';
    }
    const planId = document.getElementById(selectedPlan);
    if (planId) {
        planId.classList.add('selected-plan');
    }
});

const plans = document.querySelectorAll('.plan');
plans.forEach(plan => {
    const { count, planPrice, price } = plansDetail[plan.id];
    plan.querySelector('.count').textContent = count;
    plan.querySelector('.price').textContent = '$' + planPrice;
    plan.querySelector('.per-price').textContent = price;
    plan.addEventListener('click', () => {
        plans.forEach(p => p.classList.remove('selected-plan'));
        plan.classList.add('selected-plan');
        selectedPlan = plan.id;
    });
});

const getStarted = document.getElementById('start-btn');
if (getStarted) {
    getStarted.addEventListener('click', function () {
        //const { count, planPrice, price } = plansDetail[selectedPlan];
        //alert(`${selectedPlan} is selected: ${count} Meals (per week), Plan Price: $${planPrice}, Price Per Meal: $${price}/meal`);
        localStorage.setItem('selectedPlan', selectedPlan);
    });
}

// Day Section
function Day(day, month, date) {
    this.day = day;
    this.month = month;
    this.date = date
}

let today = new Date();

// get the first day is monday
do {
    today.setDate(today.getDate() + 1);
} while (today.getDay() !== 1);

const getDay = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const getMonth = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const daysDetail = {};

for (let i = 1; i <= 10; i++) {
    daysDetail[`day-${i}`] = new Day(getDay[today.getDay()], getMonth[today.getMonth()], today.getDate());
    today.setDate(today.getDate() + 1);
}

let selectedDay = '';
let deliveryDate = document.getElementById('delivery-date');

document.addEventListener('DOMContentLoaded', function () {
    const userDay = localStorage.getItem('selectedDay');
    if (userDay) {
        selectedDay = userDay;
    }
    else {
        selectedDay = 'day-1';
    }
    const dayId = document.getElementById(selectedDay);
    if (dayId) {
        dayId.classList.add('selected-day');
        const { day, month, date } = daysDetail[selectedDay];
        deliveryDate.innerHTML = `<strong>${day}</strong> , ${month} ${date}`;
    }
});

const days = document.querySelectorAll('.day');

days.forEach(dey => {
    let daet = dey.querySelector('.date');
    const { day, month, date } = daysDetail[dey.id];
    daet.innerHTML = `<strong>${day}</strong>, ${month} ${date}`;
    dey.addEventListener('click', function () {
        days.forEach(d => d.classList.remove('selected-day'));
        deliveryDate.innerHTML = `<strong>${day}</strong>, ${month} ${date}`;
        dey.classList.add('selected-day');
        selectedDay = dey.id;
    });
});

const nextBtn = document.getElementById('next-btn');
if (nextBtn) {
    nextBtn.addEventListener('click', function () {
        localStorage.setItem('selectedDay', selectedDay);
    });
}

// Meals Section
let totalCartItems = 0;
let totalItems = 0;
let extras = 0;

function Meal(name, desc, imgUrl, extraPrice = 0, price = 15) {
    this.name = name;
    this.desc = desc;
    this.imgUrl = imgUrl;
    this.extraPrice = extraPrice;
    this.price = price;
}

const mealsLength = 24;

const mealsDetail = {
    'meal-1': new Meal('Mix Veggies', 'with Cabbage, Carrots & Chicken', 'assets/images/1.png'),
    'meal-2': new Meal('Protein-Packed Chicken Salad', 'with Fruits & Seeds', 'assets/images/2.png'),
    'meal-3': new Meal('Super-Grain Snacks Bowl', 'with Avocado & Veggies', 'assets/images/3.png', 11.49),
    'meal-4': new Meal('Stir Fried Rice Noodles Bowl', 'with Mushroom & Spanish Pepper', 'assets/images/4.png'),
    'meal-5': new Meal('Cauliflower Pilaf', 'with Chickpea & Cheese', 'assets/images/5.png'),
    'meal-6': new Meal('Keto-Friendly Pasta Bowl', 'with Tina & Spanish', 'assets/images/6.png'),
    'meal-7': new Meal('Vegetable Soup Bowl', 'with Chicken & Sweet Kabu', 'assets/images/7.png'),
    'meal-8': new Meal('Kashmiri Rice', 'with Chicken & Coconut', 'assets/images/8.png'),
    'meal-9': new Meal('Mix Veggies', 'with Cabbage, Carrots & Chicken', 'assets/images/1.png'),
    'meal-10': new Meal('Super-Grain Snacks Bowl', 'with Avocado & Veggies', 'assets/images/3.png', 1.49),
    'meal-11': new Meal('Protein-Packed Chicken Salad', 'with Fruits & Seeds', 'assets/images/2.png'),
    'meal-12': new Meal('Stir Fried Rice Noodles Bowl', 'with Mushroom & Spanish Pepper', 'assets/images/4.png'),
    'meal-13': new Meal('Cauliflower Pilaf', 'with Chickpea & Cheese', 'assets/images/5.png'),
    'meal-14': new Meal('Keto-Friendly Pasta Bowl', 'with Tina & Spanish', 'assets/images/6.png'),
    'meal-15': new Meal('Vegetable Soup Bowl', 'with Chicken & Sweet Kabu', 'assets/images/7.png'),
    'meal-16': new Meal('Kashmiri Rice', 'with Chicken & Coconut', 'assets/images/8.png'),
    'meal-17': new Meal('Mix Veggies', 'with Cabbage, Carrots & Chicken', 'assets/images/1.png'),
    'meal-18': new Meal('Protein-Packed Chicken Salad', 'with Fruits & Seeds', 'assets/images/2.png'),
    'meal-19': new Meal('Keto-Friendly Pasta Bowl', 'with Tina & Spanish', 'assets/images/6.png'),
    'meal-20': new Meal('Stir Fried Rice Noodles Bowl', 'with Mushroom & Spanish Pepper', 'assets/images/4.png'),
    'meal-21': new Meal('Cauliflower Pilaf', 'with Chickpea & Cheese', 'assets/images/5.png'),
    'meal-22': new Meal('Super-Grain Snacks Bowl', 'with Avocado & Veggies', 'assets/images/3.png', 1.49),
    'meal-23': new Meal('Vegetable Soup Bowl', 'with Chicken & Sweet Kabu', 'assets/images/7.png'),
    'meal-24': new Meal('Kashmiri Rice', 'with Chicken & Coconut', 'assets/images/8.png'),
}
const mealsSection = document.getElementById('meals');
const deliveryDay = document.getElementById('delivery-day');
const clearAll = document.getElementById('clear');
const cartBody = document.getElementById('cart-body');
const cartItems = document.getElementById('cart-items');
const cartMealsCount = document.getElementById('cart-meals-count');
const cartMealsPrice = document.getElementById('cart-meals-price');
const cartSubTotal = document.getElementById('cart-sub-total');
const subTotal = document.getElementById('sub-total');
const subTotalMobile = document.getElementById('sub-total-sm');
const cartCount = document.getElementById('cart-count');
const cartCountMobile = document.getElementById('cart-count-sm');
const mealLeft = document.getElementById('meal-left');
const mealLeftMobile = document.getElementById('meal-left-sm');
const cartNextBtn = document.getElementById('cart-next-btn');
const cartNextBtnMobile = document.getElementById('cart-next-btn-sm');
const cart = document.getElementById('cart-mobile');
const cartDown = document.getElementById('cart-down');
const cartUp = document.getElementById('cart-up');

cartDown.addEventListener('click', function(){
    cart.classList.add('d-none');
});

cartUp.addEventListener('click', function(){
    cart.classList.remove('d-none');
});

document.addEventListener('DOMContentLoaded', function () {
    loadedCart();
});

function loadedMeals() {
    for (let i = 1; i <= mealsLength; i++) {
        const { name, desc, imgUrl, extraPrice } = mealsDetail[`meal-${i}`];
        let content = '';
        if (extraPrice === 0) {
            content += `
            <div class="col-12 col-md-6 col-lg-4 col-xl-3 p-1">
                <div id="meal-${i}" class="card">
                    <div class="card-img-top">
                        <img class="img-fluid w-100" src="${imgUrl}" alt="${name}">
                    </div>
                    <div class="card-body p-2">
                        <strong class="title">${name}</strong>
                        <p class="desc">${desc}</p>
                        <div class="d-flex justify-content-between desc">
                            <div class="d-flex flex-column pe-1 me-1 position-relative">
                                <div class="divider position-absolute"></div>
                                <span>Gluten</span>
                                <span>Free</span>
                            </div>
                            <div class="d-flex flex-column pe-1 me-1 position-relative">
                                <div class="divider position-absolute"></div>
                                <span>560</span>
                                <span>Cals</span>
                            </div>
                            <div class="d-flex flex-column pe-1 me-1 position-relative">
                                <div class="divider position-absolute"></div>
                                <span>35</span>
                                <span>Carbs</span>
                            </div>
                            <div class="d-flex flex-column">
                                <span>46</span>
                                <span>Protiens</span>
                            </div>

                            <button id="btn-meal-${i}"
                                class="add-btn text-white d-flex justify-content-center align-items-center ms-2 px-2 border-0 rounded flex-wrap">
                                <i class="fa-solid fa-plus fa-xs"></i>
                                <span>Add</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            `
        }
        else {
            content += `
            <div class="col-12 col-md-6 col-lg-4 col-xl-3 p-1">
                <div id="meal-${i}" class="card featured">
                    <div class="card-img-top">
                        <img class="img-fluid w-100" src="${imgUrl}" alt="${name}">
                        <span class="extra-price py-1 px-2">+ $${extraPrice}</span>
                    </div>
                    <div class="card-body p-2">
                        <strong class="title featured">${name}</strong>
                        <div class="desc featured">
                            <p>${desc}</p>
                            <div class="d-flex justify-content-between">
                                <div class="d-flex flex-column pe-1 me-1 position-relative">
                                    <div class="divider position-absolute"></div>
                                    <span>Gluten</span>
                                    <span>Free</span>
                                </div>
                                <div class="d-flex flex-column pe-1 me-1 position-relative">
                                    <div class="divider position-absolute"></div>
                                    <span>560</span>
                                    <span>Cals</span>
                                </div>
                                <div class="d-flex flex-column pe-1 me-1 position-relative">
                                    <div class="divider position-absolute"></div>
                                    <span>35</span>
                                    <span>Carbs</span>
                                </div>
                                <div class="d-flex flex-column">
                                    <span>46</span>
                                    <span>Protiens</span>
                                </div>
                                <button id="btn-meal-${i}"
                                    class="add-btn text-white d-flex justify-content-center align-items-center ms-2 px-2 border-0 rounded flex-wrap">
                                    <i class="fa-solid fa-plus fa-xs"></i>
                                    <span>Add</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `
        }
        mealsSection.innerHTML += content;
    }
}
loadedMeals();

function loadedCart() {
    const { day, month, date } = daysDetail[selectedDay];
    deliveryDay.innerHTML = `My delivery for: <strong>${day}</strong>, ${month} ${date}`;
    const { count } = plansDetail[selectedPlan];
    totalItems = count;
    mealLeft.innerHTML = `Please add total <strong>${totalItems} items</strong> to continue.`
    mealLeftMobile.innerHTML = `Please add total <strong>${totalItems} items</strong> to continue.`
    cartNextBtn.classList.add('disabled');
    cartNextBtn.disabled = true;
    cartNextBtnMobile.classList.add('disabled');
    cartNextBtnMobile.disabled = true;
    clearAll.classList.add('d-none');
    cartBody.classList.add('d-none');
}

const addBtns = mealsSection.querySelectorAll('.add-btn');
let addIcons = '';
let removeIcons = '';

function addToCart(addBtn) {
    clearAll.classList.remove('d-none');
    cartBody.classList.remove('d-none');
    const mealId = addBtn.id.split('-').slice(1).join('-');
    const { name, desc, imgUrl, extraPrice, price } = mealsDetail[mealId];
    let content = '';
    totalCartItems++;
    if (extraPrice == 0) {
        content += `
            <div id="card-${mealId}"
                class="card d-flex flex-row align-items-center justify-content-between gap-1 pe-2 p-1">
                <div class="w-75 d-flex flex-row align-items-center car-img-top">
                    <img class="img-fluid w-50" src="${imgUrl}" alt="${name}">
                    <p class="my-auto ms-2"><strong class="title">${name}</strong></p>
                </div>
                <div class="d-flex flex-column gap-4">
                    <i id="icon-${mealId}" class="fa-solid fa-plus"></i>
                    <i id="icon-${mealId}" class="fa-solid fa-minus"></i>
                </div>
            </div>
            `
    }
    else {
        extras += extraPrice;
        content += `
            <div id="card-${mealId}"
                class="card d-flex flex-row align-items-center justify-content-between gap-1 pe-2 bg-dark p-1 featured">
                <div class="w-75 d-flex flex-row align-items-center car-img-top">
                    <img class="img-fluid w-50" src="${imgUrl}" alt="${name}">
                    <span class="extra-price px-1 m-1">+ $${extraPrice}</span>
                    <p class="my-auto ms-2"><strong class="title">${name}</strong></p>
                </div>
                <div class="d-flex flex-column gap-4">
                    <i id="icon-${mealId}" class="fa-solid fa-plus text-white"></i>
                    <i id="icon-${mealId}" class="fa-solid fa-minus text-white"></i>
                </div>
            </div>
            `
    }
    cartItems.innerHTML += content;
    addIcons = cartItems.querySelectorAll('.fa-plus');
    removeIcons = cartItems.querySelectorAll('.fa-minus');
    if (totalCartItems === 1) {
        cartMealsCount.innerHTML = `${totalCartItems} Meal`;
    }
    else {
        cartMealsCount.innerHTML = `${totalCartItems} Meals`;
    }
    cartCount.innerHTML = totalCartItems;
    cartCountMobile.innerHTML = totalCartItems;
    if (extras === 0) {
        cartMealsPrice.innerHTML = `$${price * totalCartItems}`;
    }
    else {
        cartMealsPrice.innerHTML = `$${price * totalCartItems} + $${extras}`;
    }
    const calculatedPrice = (price * totalCartItems * 100) + (extras * 100);
    cartSubTotal.innerHTML = `$${calculatedPrice / 100}`;
    subTotal.innerHTML = `${calculatedPrice / 100}`;
    subTotalMobile.innerHTML = `${calculatedPrice / 100}`;

    const itemsRem = totalItems - totalCartItems;
    if (itemsRem === 0) {
        addBtns.forEach(addBtn => {
            addBtn.disabled = true;
            addBtn.classList.add('disabled');
        });
        addIcons.forEach(addIcon => {
            addIcon.disabled = true;
            addIcon.classList.add('disabled');
        });
        cartNextBtn.classList.remove('disabled');
        cartNextBtn.disabled = false;
        cartNextBtnMobile.classList.remove('disabled');
        cartNextBtnMobile.disabled = false;
        mealLeftMobile.innerHTML = `<strong>Ready to go!</strong>`
        mealLeftMobile.innerHTML = `<strong>Ready to go!</strong>`
    }
    else {
        cartNextBtn.disabled = true;
        cartNextBtn.classList.add('disabled');
        cartNextBtnMobile.disabled = true;
        cartNextBtnMobile.classList.add('disabled');
        addBtns.forEach(addBtn => {
            addBtn.disabled = false;
            addBtn.classList.remove('disabled');
        });
        if (itemsRem > 1) {
            mealLeftMobile.innerHTML = `Please add <strong>${totalItems - totalCartItems} </strong> more meals.`
            mealLeftMobile.innerHTML = `Please add <strong>${totalItems - totalCartItems} </strong> more meals.`
        }
        else if (itemsRem === 1) {
            mealLeftMobile.innerHTML = `Please add <strong>${totalItems - totalCartItems} </strong> more meal.`
            mealLeftMobile.innerHTML = `Please add <strong>${totalItems - totalCartItems} </strong> more meal.`
        }
        addIcons.forEach(addIcon => {
            addIcon.addEventListener('click', function () {
                addToCart(addIcon);
            });
        });
    }
}

function removeFromCart(removeIcon) {
    clearAll.classList.remove('d-none');
    cartBody.classList.remove('d-none');
    const mealId = removeIcon.id.split('-').slice(1).join('-');
    const cardId = `#card-${mealId}`;
    const cardToRemove = cartItems.querySelector(cardId);
    cardToRemove.classList.add('d-none');
    const { extraPrice, price } = mealsDetail[mealId];
    totalCartItems--;
    extras -= extraPrice;
    if (totalCartItems === 1) {
        cartMealsCount.innerHTML = `${totalCartItems} Meal`;
    }
    else {
        cartMealsCount.innerHTML = `${totalCartItems} Meals`;
    }
    cartCount.innerHTML = totalCartItems;
    cartCountMobile.innerHTML = totalCartItems;
    if (extras === 0) {
        cartMealsPrice.innerHTML = `$${price * totalCartItems}`;
    }
    else {
        cartMealsPrice.innerHTML = `$${price * totalCartItems} + $${extras}`;
    }
    const calculatedPrice = (price * totalCartItems * 100) + (extras * 100);
    cartSubTotal.innerHTML = `$${calculatedPrice / 100}`;
    subTotal.innerHTML = `${calculatedPrice / 100}`;
    subTotalMobile.innerHTML = `${calculatedPrice / 100}`;
    const itemsRem = totalItems - totalCartItems;

    cartNextBtn.disabled = true;
    cartNextBtn.classList.add('disabled');
     cartNextBtnMobile.disabled = true;
    cartNextBtnMobile.classList.add('disabled');
    addBtns.forEach(addBtn => {
        addBtn.disabled = false;
        addBtn.classList.remove('disabled');
    });
    if (itemsRem > 1) {
        mealLeft.innerHTML = `Please add <strong>${totalItems - totalCartItems} </strong> more meals.`
        mealLeftMobile.innerHTML = `Please add <strong>${totalItems - totalCartItems} </strong> more meals.`
    }
    else if (itemsRem === 1) {
        mealLeft.innerHTML = `Please add <strong>${totalItems - totalCartItems} </strong> more meal.`
        mealLeftMobile.innerHTML = `Please add <strong>${totalItems - totalCartItems} </strong> more meal.`
    }
}

addBtns.forEach(addBtn => {
    addBtn.addEventListener('click', function () {
        addToCart(addBtn);
        removeIcons.forEach(removeIcon => {
            removeIcon.addEventListener('click', function () {
                removeFromCart(removeIcon);
                addIcons.forEach(addIcon => {
                    addIcon.disabled = false;
                    addIcon.classList.remove('disabled');
                });
            });
        });

    });
});

function clear() {
    totalCartItems = 0;
    extras = 0;
    cartItems.innerHTML = '';
    cartCount.innerHTML = 0;
    cartCountMobile.innerHTML = 0;
    subTotal.innerHTML = '';
    subTotalMobile.innerHTML = '';
    clearAll.classList.add('d-none');
    cartBody.classList.add('d-none');
    mealLeft.innerHTML = `Please add total <strong>${totalItems} items</strong> to continue.`
    mealLeftMobile.innerHTML = `Please add total <strong>${totalItems} items</strong> to continue.`
    addBtns.forEach(addBtn => {
        addBtn.disabled = false;
        addBtn.classList.remove('disabled');
    });
    cartNextBtn.disabled = true;
    cartNextBtn.classList.add('disabled');
     cartNextBtnMobile.disabled = true;
    cartNextBtnMobile.classList.add('disabled');
}

clearAll.addEventListener('click', function () {
    clear();
});
