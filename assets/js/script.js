$(document).ready(function () {
    // 1. Initialize the wizard with pagination disabled
    let wizard = $("#wizard").steps({
        headerTag: "h3",
        bodyTag: "section",
        transitionEffect: "slideLeft",
        autoFocus: true,
        enablePagination: false
    });
    $("#wizard .steps li").removeClass("current");
    $("#wizard .steps li:first").addClass("current");

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

    let selectedPlanId = '';
    const userPlan = localStorage.getItem('selectedPlanId');
    if (userPlan !== null && plansDetail[userPlan] !== undefined) {
        selectedPlanId = userPlan;
        $(`#${selectedPlanId}`).addClass('selected-plan');
    }
    else {
        $("#start-btn").addClass('disabled');
    }

    $('.plan').each(function () {
        const plan = this;
        const planData = plansDetail[plan.id];
        const { count, planPrice, price } = planData;
        $(plan).find('.count').text(count);
        $(plan).find('.price').text('$' + planPrice);
        $(plan).find('.per-price').text(price);
        $(plan).on('click', function () {
            $('.plan').removeClass('selected-plan');
            $(this).addClass('selected-plan');
            selectedPlanId = plan.id;
            const prevPlan = localStorage.getItem('selectedPlanId');
            if (!prevPlan || prevPlan != selectedPlanId) {
                localStorage.removeItem('selectedDay');
                localStorage.removeItem('totalItems');
                localStorage.removeItem('subTotal');
                localStorage.removeItem('mealPrice');
            }
            localStorage.setItem('selectedPlanId', selectedPlanId);
            $("#start-btn").removeClass('disabled');
        });
    });

    $("#start-btn").on("click", function () {
        if (selectedPlanId) {
            localStorage.setItem('selectedPlanId', selectedPlanId);
            wizard.steps("next");
        }
    });

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
    const userDay = localStorage.getItem('selectedDay');
    if (userDay !== null && daysDetail[userDay] !== undefined) {
        selectedDay = userDay;
    }
    else {
        selectedDay = 'day-1';
        localStorage.setItem('selectedDay', selectedDay);
    }
    $(`#${selectedDay}`).addClass('selected-day');
    const { day, month, date } = daysDetail[selectedDay];
    $('#delivery-date').html(`<strong>${day}</strong>, ${month} ${date}`);

    const days = document.querySelectorAll('.day');
    days.forEach(eachDay => {
        let eachDate = eachDay.querySelector('.date');
        const { day, month, date } = daysDetail[eachDay.id];
        eachDate.innerHTML = `<strong>${day}</strong>, ${month} ${date}`;
        eachDay.addEventListener('click', function () {
            days.forEach(d => d.classList.remove('selected-day'));
            $('#delivery-date').html(`<strong>${day}</strong>, ${month} ${date}`);
            eachDay.classList.add('selected-day');
            selectedDay = eachDay.id;
            localStorage.setItem('selectedDay', selectedDay);
        });
    });

    $("#next-btn").on("click", function () {
        localStorage.setItem('selectedDay', selectedDay);
        wizard.steps("next");
    });

    // Meals Section
    let totalItems = 0;
    let perMealPrice = 0;
    let extras = 0;
    let totalCartItems = 0;
    let mealsCountDetail = {};
    const mealsLength = 24;

    function setPrice() {
        const userPlan = localStorage.getItem('selectedPlanId');
        if (userPlan !== null && plansDetail[userPlan] !== undefined) {
            selectedPlan = userPlan;
        }
        else {
            selectedPlan = 'plan-1';
        }
        const { count, price } = plansDetail[selectedPlan];
        totalItems = count;
        perMealPrice = price;
    }
    setPrice();

    function Meal(name, desc, imgUrl, extraPrice = 0, price = perMealPrice) {
        this.name = name;
        this.desc = desc;
        this.imgUrl = imgUrl;
        this.extraPrice = extraPrice;
        this.price = price;
    }

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
            $('#meals').append(content);
        }
    }
    loadedMeals();

    $("#cart-up").on("click", function () {
        $("#cart-content").removeClass('d-none');
    });
    $("#cart-down").on("click", function () {
        $("#cart-content").addClass('d-none');
    });

    let addBtns = $('#meals .add-btn').toArray();
    let addIcons = '';
    let removeIcons = '';

    function loadedCart() {
        const daySelected = localStorage.getItem('selectedDay');
        const { day, month, date } = daysDetail[daySelected];
        $('.delivery-day').html(`My delivery for: <strong>${day}</strong>, ${month} ${date}`);
        totalCartItems = localStorage.getItem('totalItems');
        if (totalCartItems > 0) {
            const subTotalPrice = localStorage.getItem('subTotal');
            const mealPrice = localStorage.getItem('mealPrice');
            mealsCountDetail = JSON.parse(localStorage.getItem('mealsCountDetail'));
            $('.cart-count').html(totalCartItems);
            if (totalCartItems == 1) {
                $('.cart-meals-count').html(`${totalCartItems} Meal`);
            }
            else {
                $('.cart-meals-count').html(`${totalCartItems} Meals`);
            }
            $('.cart-meals-price').html(mealPrice);
            $('.sub-total-text').html(subTotalPrice);
            $('.cart-sub-total').html(`$${subTotalPrice}`);
            if (totalCartItems < totalItems) {
                $('.meal-left').html(`Please add <strong>${totalItems - totalCartItems} </strong> more meals.`);
                addBtns.forEach(addBtn => {
                    addBtn.disabled = false;
                    addBtn.classList.remove('disabled');
                });
                $('.cart-next-btn').addClass('disabled');
            }
            else {
                $('.meal-left').html(`<strong>Ready to go!</strong>`);
                addBtns.forEach(addBtn => {
                    addBtn.disabled = true;
                    addBtn.classList.add('disabled');
                });
                $('.cart-next-btn').removeClass('disabled');
            }

            let content = '';
            for (const key in mealsCountDetail) {
                const mealId = key;
                const count = mealsCountDetail[mealId];
                for (let i = 1; i <= count; i++) {
                    const { name, imgUrl, extraPrice } = mealsDetail[mealId];
                    if (extraPrice == 0) {
                        content += `
                    <div id="card-${mealId}"
                        class="card d-flex flex-row align-items-center justify-content-between gap-1 pe-2 p-1">
                        <div class="d-flex flex-row align-items-center car-img-top">
                            <img class="img-fluid" width="92" height="60" src="${imgUrl}" alt="${name}">
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
                        content += `
                    <div id="card-${mealId}"
                        class="card d-flex flex-row align-items-center justify-content-between gap-1 pe-2 bg-dark p-1 featured">
                        <div class="d-flex flex-row align-items-center car-img-top">
                            <img class="img-fluid" width="92" height="60" src="${imgUrl}" alt="${name}">
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
                }
            }
            $('.cart-items').html(content);
        }
        else {
            totalCartItems = 0;
            localStorage.setItem('totalItems', totalCartItems);
            $('.meal-left').html(`Please add total <strong>${totalItems} items</strong> to continue.`);
            $('.clear').addClass('d-none');
            $('.cart-body-content').addClass('d-none');
            $('.cart-next-btn').addClass('disabled');
            addBtns.forEach(addBtn => {
                addBtn.disabled = false;
                addBtn.classList.remove('disabled');
            });
        }
    }
    loadedCart();

    function savedCart() {
        localStorage.setItem('totalItems', totalCartItems);
        localStorage.setItem('subTotal', $('.sub-total-text').html());
        localStorage.setItem('mealPrice', $('.cart-meals-price').html());
        localStorage.setItem('mealsCountDetail', JSON.stringify(mealsCountDetail));
    }

    function addToCart(addBtn) {
        $('.clear').removeClass('d-none');
        $('.cart-body-content').removeClass('d-none');
        const mealId = addBtn.id.split('-').slice(1).join('-');
        const { name, imgUrl, extraPrice, price } = mealsDetail[mealId];
        let content = '';
        totalCartItems++;
        if (extraPrice == 0) {
            content += `
            <div id="card-${mealId}"
                class="card d-flex flex-row align-items-center justify-content-between gap-1 pe-2 p-1">
                <div class="d-flex flex-row align-items-center car-img-top">
                    <img class="img-fluid" width="92" height="60" src="${imgUrl}" alt="${name}">
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
            extras = (((extras * 100) + (extraPrice * 100)) / 100).toFixed(2);
            content += `
            <div id="card-${mealId}"
                class="card d-flex flex-row align-items-center justify-content-between gap-1 pe-2 bg-dark p-1 featured">
                <div class="d-flex flex-row align-items-center car-img-top">
                    <img class="img-fluid" width="92" height="60" src="${imgUrl}" alt="${name}">
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
        if (mealsCountDetail[mealId]) {
            mealsCountDetail[mealId]++;
        }
        else {
            mealsCountDetail[mealId] = 1;
        }

        $('.cart-items').append(content);
        addIcons = $('.cart-items .fa-plus').toArray();
        removeIcons = $('.cart-items .fa-minus').toArray();

        if (totalCartItems === 1) {
            $('.cart-meals-count').html(`${totalCartItems} Meal`);
        }
        else {
            $('.cart-meals-count').html(`${totalCartItems} Meals`);
        }
        $('.cart-count').html(totalCartItems);

        if (extras === 0) {
            $('.cart-meals-price').html(`$${price * totalCartItems}`);
        }
        else {
            $('.cart-meals-price').html(`$${price * totalCartItems} + $${extras}`);
        }

        const calculatedPrice = (price * totalCartItems * 100) + (extras * 100);
        $('.cart-sub-total').html(`$${(calculatedPrice / 100).toFixed(2)}`);
        $('.sub-total-text').html(`${(calculatedPrice / 100).toFixed(2)}`);

        if (totalCartItems < totalItems) {
            $('.cart-next-btn').addClass('disabled');
            addBtns.forEach(addBtn => {
                addBtn.disabled = false;
                addBtn.classList.remove('disabled');
            });
            const itemsRem = totalItems - totalCartItems;
            if (itemsRem > 1) {
                $('.meal-left').html(`Please add <strong>${totalItems - totalCartItems} </strong> more meals.`);
            }
            else if (itemsRem == 1) {
                $('.meal-left').html(`Please add <strong>${totalItems - totalCartItems} </strong> more meal.`);
            }
        }
        else {
            addBtns.forEach(addBtn => {
                addBtn.disabled = true;
                addBtn.classList.add('disabled');
            });
            addIcons.forEach(addIcon => {
                addIcon.disabled = true;
                addIcon.classList.add('disabled');
            });
            $('.cart-next-btn').removeClass('disabled');
            $('.meal-left').html(`<strong>Ready to go!</strong>`);
        }
        savedCart();
    }

    function removeFromCart(removeBtn) {
        const mealId = removeBtn.id.split('-').slice(1).join('-');
        const { extraPrice, price } = mealsDetail[mealId];
        totalCartItems--;
        mealsCountDetail[mealId]--;
        if (totalCartItems == 0) {
            clearCart();
        }
        else if (totalCartItems == 1) {
            $('.cart-meals-count').html(`${totalCartItems} Meal`);
        }
        else {
            $('.cart-meals-count').html(`${totalCartItems} Meals`);
        }
        $('.cart-count').html(totalCartItems);

        if (extras === 0) {
            $('.cart-meals-price').html(`$${price * totalCartItems}`);
        }
        else {
            $('.cart-meals-price').html(`$${price * totalCartItems} + $${extras}`);
        }

        const calculatedPrice = (price * totalCartItems * 100) + (extras * 100);
        $('.cart-sub-total').html(`$${(calculatedPrice / 100).toFixed(2)}`);
        $('.sub-total-text').html(`${(calculatedPrice / 100).toFixed(2)}`);

        $('.cart-next-btn').addClass('disabled');
        addBtns.forEach(addBtn => {
            addBtn.disabled = false;
            addBtn.classList.remove('disabled');
        });
        const itemsRem = totalItems - totalCartItems;
        if (itemsRem > 1) {
            $('.meal-left').html(`Please add <strong>${totalItems - totalCartItems} </strong> more meals.`);
        }
        else if (itemsRem == 1) {
            $('.meal-left').html(`Please add <strong>${totalItems - totalCartItems} </strong> more meal.`);
        }
        savedCart();
        loadedCart();
    }

    addBtns.forEach(addBtn => {
        addBtn.addEventListener('click', function () {
            addToCart(addBtn);
            addIcons.forEach(addIcon => {
                addIcon.addEventListener('click', function () {
                    addToCart(addIcon);
                });
            });

            removeIcons.forEach(removeIcon => {
                removeIcon.addEventListener('click', function () {
                    removeFromCart(removeIcon);
                });
            });
        });
    });

    function clearCart() {
        extras = 0;
        totalCartItems = 0;
        mealsCountDetail = {};
        $('.meal-left').html(`Please add total <strong>${totalItems} items</strong> to continue.`);
        $('.cart-items').html('');
        $('.cart-count').html(totalCartItems);
        $('.sub-total-text').html('');
        $('.cart-meals-price').html('');
        $('.clear').addClass('d-none');
        $('.cart-body-content').addClass('d-none');
        $('.cart-next-btn').addClass('disabled');
        addBtns.forEach(addBtn => {
            addBtn.disabled = false;
            addBtn.classList.remove('disabled');
        });
        savedCart();
        loadedCart();
    }

    $(".clear").on("click", function () {
        clearCart();
    });

    $(".cart-next-btn").on("click", function () {
        savedCart();
        wizard.steps("next");
    });

    // Checkout Section
    let isValidated = false;
    $("#fname").on("input", function () { validatefName($('#fname').val()); });
    $("#lname").on("input", function () { validatelName($('#lname').val()); });
    $("#name").on("input", function () { validateName($('#name').val()); });
    $("#line1").on("input", function () { validateLine1($('#line1').val()); });
    $("#city").on("input", function () { validateCity($('#city').val()); });
    $("#state").on("input", function () { validateState($('#state').val()); });
    $("#zip").on("input", function () { validateZip($('#zip').val()); });
    $("#phone").on("input", function () { validatePhone($('#phone').val()); });
    $("#email").on("input", function () { validateEmail($('#email').val()); });

    function toggleDisable() {
        if (isValidated) {
            $("#checkout-btn").removeClass('disabled');
        }
        else {
            $("#checkout-btn").addClass('disabled');
        }
        return isValidated;
    }

    function validatefName(name) {
        if (name) {
            if (isInvalidName(name)) {
                $('#fname-error').removeClass('d-none');
                isValidated = false;
            }
            else {
                $('#fname-error').addClass('d-none');
                isValidated = true;
            }
            $('#fname-req').addClass('d-none');
        }
        else {
            isValidated = false;
            $('#fname-req').removeClass('d-none');
            $('#fname-error').addClass('d-none');
        }
        return toggleDisable();
    }

    function validatelName(name) {
        if (name) {
            if (isInvalidName(name)) {
                isValidated = false;
                $('#lname-error').removeClass('d-none');
            }
            else {
                isValidated = true;
                $('#lname-error').addClass('d-none');
            }
            $('#lname-req').addClass('d-none');
        }
        else {
            isValidated = false;
            $('#lname-req').removeClass('d-none');
            $('#lname-error').addClass('d-none');
        }
        return toggleDisable();
    }

    function validateName(name) {
        if (name) {
            if (isInvalidName(name)) {
                isValidated = false;

                $('#name-error').removeClass('d-none');
            }
            else {
                isValidated = true;
                $('#name-error').addClass('d-none');
            }
            $('#name-req').addClass('d-none');
        }
        else {
            isValidated = false;

            $('#name-req').removeClass('d-none');
            $('#name-error').addClass('d-none');
        }
        return toggleDisable();
    }

    function validateLine1(line) {
        if (line) {
            isValidated = true;
            $('#line1-req').addClass('d-none');
        }
        else {
            isValidated = false;
            $('#line1-req').removeClass('d-none');
        }
        return toggleDisable();
    }

    function validateCity(city) {
        if (city) {
            if (isInvalidName(city)) {

                isValidated = false;
                $('#city-error').removeClass('d-none');
            }
            else {
                isValidated = true;
                $('#city-error').addClass('d-none');
            }
            $('#city-req').addClass('d-none');
        }
        else {

            isValidated = false;
            $('#city-req').removeClass('d-none');
            $('#city-error').addClass('d-none');
        }
        return toggleDisable();
    }

    function validateState(state) {
        if (state) {
            if (isInvalidName(state)) {
                isValidated = false;

                $('#state-error').removeClass('d-none');
            }
            else {
                isValidated = true;
                $('#state-error').addClass('d-none');
            }
            $('#state-req').addClass('d-none');
        }
        else {
            isValidated = false;
            $('#state-req').removeClass('d-none');
            $('#state-error').addClass('d-none');
        }
        return toggleDisable();
    }

    function validateZip(zip) {
        if (zip) {
            if (isInvalidZip(zip)) {
                isValidated = false;

                $('#zip-error').removeClass('d-none');
            }
            else {
                isValidated = true;
                $('#zip-error').addClass('d-none');
            }
            $('#zip-req').addClass('d-none');
        }
        else {
            isValidated = false;
            $('#zip-error').addClass('d-none');
            $('#zip-req').removeClass('d-none');
        }
        return toggleDisable();
    }

    function validatePhone(phone) {
        if (phone) {
            if (isInvalidPhone(phone)) {
                isValidated = false;
                $('#phone-error').removeClass('d-none');
            }
            else {
                isValidated = true;
                $('#phone-error').addClass('d-none');
            }
            $('#phone-req').addClass('d-none');
        }
        else {
            isValidated = false;

            $('#phone-error').addClass('d-none');
            $('#phone-req').removeClass('d-none');
        }
        return toggleDisable();
    }

    function validateEmail(email) {
        if (email) {
            if (isInvalidEmail(email)) {
                isValidated = false;
                $('#email-error').removeClass('d-none');
            }
            else {
                isValidated = true;
                $('#email-error').addClass('d-none');
            }
            $('#email-req').addClass('d-none');
        }
        else {
            isValidated = false;
            $('#email-error').addClass('d-none');
            $('#email-req').removeClass('d-none');
        }
        return toggleDisable();
    }

    function isInvalidName(name) {
        return !(/^[A-Za-z]+$/.test(name));
    }

    function hasAllDigits(number) {
        return /^\d+$/.test(number);
    }

    function isInvalidZip(zip) {
        return !hasAllDigits(zip);
    }

    function isInvalidPhone(phone) {
        return phone.length != 11 || !hasAllDigits(phone);
    }

    function isInvalidEmail(email) {
        return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function isValidCode(code) {
        return hasAllDigits(code) && code >= 1 && code <= 50;
    }

    $("#checkout-btn").on("click", function () {
        isValidated = (validatefName($('#fname').val()) &&
            validatelName($('#lname').val()) &&
            validateName($('#name').val()) &&
            validateLine1($('#line1').val()) &&
            validateCity($('#city').val()) &&
            validateState($('#state').val()) &&
            validateZip($('#zip').val()) &&
            validatePhone($('#phone').val()) &&
            validateEmail($('#email').val()));
        if (isValidated) {
            alert('Order placed successfully!');

            localStorage.removeItem('selectedPlanId');
            localStorage.removeItem('selectedDay');
            localStorage.removeItem('totalItems');
            localStorage.removeItem('subTotal');
            localStorage.removeItem('mealPrice');
            mealsCountDetail = {};
            localStorage.setItem('mealsCountDetail', JSON.stringify(mealsCountDetail));

            $("#wizard").steps("previous");
        }
        else {
            $("#checkout-btn").addClass('disabled');
        }
    });

    const checkoutCart = document.getElementById('checkout-cart');
    const orderPrice = document.getElementById('order-price');
    const orderTotal = document.getElementById('order-total');
    const promoCode = document.getElementById('promo-code');
    const promoInput = document.getElementById('promo-input');
    const discount = document.getElementById('discount');
    const shipping = 8.99;
    const tax = 10.99;
    let orderSubTotal = 0;
    let orderTotalPrice = 0;
    let discountedAmount = 0;

    if (promoCode) {
        promoCode.addEventListener('click', function () {
            promoCode.classList.add('d-none');
            promoInput.classList.remove('d-none');
            promoInput.focus();
        });
        promoInput.addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
                event.preventDefault();
                const code = promoInput.value.trim();
                promoCode.classList.remove('d-none');
                promoInput.classList.add('d-none');
                if (code && isValidCode(code)) {
                    discount.classList.remove('d-none');
                    discountedAmount = (((orderSubTotal * 100) * (code / 100)) / 100).toFixed(2);
                    discount.innerHTML = `
                    <span>Discount</span>
                    <span class="fw-bold text-success">-$${discountedAmount}</span>
                `
                    orderTotalPrice = ((orderTotalPrice * 100 - discountedAmount * 100) / 100).toFixed(2);
                    orderTotal.innerHTML = `$${orderTotalPrice}`;
                }
            }
        });
    }
    function loadedCheckoutCart() {
        orderSubTotal = localStorage.getItem('subTotal');
        orderPrice.innerHTML = `$${orderSubTotal}`;
        orderTotalPrice = ((orderSubTotal * 100 + shipping * 100 + tax * 100) / 100).toFixed(2);
        orderTotal.innerHTML = `$${orderTotalPrice}`;
        const { day, month, date } = daysDetail[localStorage.getItem('selectedDay')];
        $('#checkout-delivery').html(`${day}, ${month} ${date}`);

        mealsCountDetail = JSON.parse(localStorage.getItem('mealsCountDetail'));
        let content = '';
        for (const key in mealsCountDetail) {
            const mealId = key;
            const count = mealsCountDetail[mealId];
            const { name, desc, imgUrl, extraPrice } = mealsDetail[mealId];
            if (extraPrice == 0) {
                content += `
                    <div class="card rounded-0 d-flex flex-row align-items-center gap-1 pe-2 p-1">
                        <div class="d-flex flex-row align-items-center">
                            <p class="d-flex px-3 my-auto fw-bold">${count}</p>
                            <div class="position-relative d-flex">
                                <img class="img-fluid" width="130" height="100" src="${imgUrl}" alt="${name}">
                            </div>
                            <div class="d-flex flex-column">
                                <p class="my-auto ms-2"><strong class="title">${name}</strong></p>
                                <p class="desc my-auto ms-2 text-secondary">${desc}</p>
                            </div>
                        </div>
                    </div>
                    `
            }
            else {
                content += `
                    <div class="card rounded-0 d-flex flex-row align-items-center gap-1 pe-2 p-1 bg-dark featured">
                        <div class="d-flex flex-row align-items-center">
                            <p class="d-flex px-3 my-auto fw-bold">${count}</p>
                            <div class="position-relative d-flex">
                                <img class="img-fluid" width="130" height="100" src="${imgUrl}" alt="${name}">
                                <span class="extra-price px-2">+$55.98</span>
                            </div>
                            <div class="d-flex flex-column">
                                <p class="my-auto ms-2"><strong class="title">${name}</strong></p>
                                <p class="desc my-auto ms-2 text-white">${desc}</p>
                            </div>
                        </div>
                    </div>
                `
            }
        }
        checkoutCart.innerHTML = content;
    }
    loadedCheckoutCart();
});