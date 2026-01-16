const p1 = document.querySelector('#plan-1');
const p2 = document.querySelector('#plan-2');
const p3 = document.querySelector('#plan-3');
const p4 = document.querySelector('#plan-4');
const getStarted = document.querySelector('.btn');
let selected = 'p1';

p1.addEventListener('click', function(){
    p1.classList.add('selected-plan');
    p2.classList.remove('selected-plan');
    p3.classList.remove('selected-plan');
    p4.classList.remove('selected-plan');
    selected = 'p1';
});

p2.addEventListener('click', function(){
    p1.classList.remove('selected-plan');
    p2.classList.add('selected-plan');
    p3.classList.remove('selected-plan');
    p4.classList.remove('selected-plan');
    selected = 'p2';
});

p3.addEventListener('click', function(){
    p1.classList.remove('selected-plan');
    p2.classList.remove('selected-plan');
    p3.classList.add('selected-plan');
    p4.classList.remove('selected-plan');
    selected = 'p3';
});

p4.addEventListener('click', function(){
    p1.classList.remove('selected-plan');
    p2.classList.remove('selected-plan');
    p3.classList.remove('selected-plan');
    p4.classList.add('selected-plan');
    selected = 'p4';
});


function plans(count, planPrice, price){
    this.count = count;
    this.planPrice = planPrice;
    this.price = price
}

const plan1 = new plans(4, 56, 11.49); 
const plan2 = new plans(6, 84, 9.49); 
const plan3 = new plans(10, 140, 8.99); 
const plan4 = new plans(12, 168, 8.49); 

getStarted.addEventListener('click', function(){
    if(selected === 'p1'){
        const {count, planPrice, price} = plan1;
        alert(`Plan 1 is selected: ${count} Meals (per week), Plan Price: $${planPrice}, Price Per Meal: $${price}/meal`);
    }
    if(selected === 'p2'){
        const {count, planPrice, price} = plan2;
        alert(`Plan 2 is selected: ${count} Meals (per week), Plan Price: $${planPrice}, Price Per Meal: $${price}/meal`);
    }
    if(selected === 'p3'){
        const {count, planPrice, price} = plan3;
        alert(`Plan 3 is selected: ${count} Meals (per week), Plan Price: $${planPrice}, Price Per Meal: $${price}/meal`);
    }
    if(selected === 'p4'){
        const {count, planPrice, price} = plan4;
        alert(`Plan 4 is selected: ${count} Meals (per week), Plan Price: $${planPrice}, Price Per Meal: $${price}/meal`);
    }
});