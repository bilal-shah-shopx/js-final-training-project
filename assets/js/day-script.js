const r1 = document.querySelector('#r-1');
const r2 = document.querySelector('#r-2');
const r3 = document.querySelector('#r-3');
const r4 = document.querySelector('#r-4');
const r5 = document.querySelector('#r-5');
const r6 = document.querySelector('#r-6');
const r7 = document.querySelector('#r-7');
const r8 = document.querySelector('#r-8');
const r9 = document.querySelector('#r-9');
const r10 = document.querySelector('#r-10');

const selectedDay='r1';

document.addEventListener("DOMContentLoaded", function () {
    r1.classList.add('selected-day');
});

r1.addEventListener('click', function(){
    r1.classList.add('selected-day');
    r2.classList.remove('selected-day');
    r3.classList.remove('selected-day');
    r4.classList.remove('selected-day');
    r5.classList.remove('selected-day');
    r6.classList.remove('selected-day');
    r7.classList.remove('selected-day');
    r8.classList.remove('selected-day');
    r9.classList.remove('selected-day');
    r10.classList.remove('selected-day');
    selectedDay='r1'
});

r2.addEventListener('click', function(){
    r1.classList.remove('selected-day');
    r2.classList.add('selected-day');
    r3.classList.remove('selected-day');
    r4.classList.remove('selected-day');
    r5.classList.remove('selected-day');
    r6.classList.remove('selected-day');
    r7.classList.remove('selected-day');
    r8.classList.remove('selected-day');
    r9.classList.remove('selected-day');
    r10.classList.remove('selected-day');
    selectedDay='r2'
});

r3.addEventListener('click', function(){
    r1.classList.remove('selected-day');
    r2.classList.remove('selected-day');
    r3.classList.add('selected-day');
    r4.classList.remove('selected-day');
    r5.classList.remove('selected-day');
    r6.classList.remove('selected-day');
    r7.classList.remove('selected-day');
    r8.classList.remove('selected-day');
    r9.classList.remove('selected-day');
    r10.classList.remove('selected-day');
    selectedDay='r3'
});

r4.addEventListener('click', function(){
    r1.classList.remove('selected-day');
    r2.classList.remove('selected-day');
    r3.classList.remove('selected-day');
    r4.classList.add('selected-day');
    r5.classList.remove('selected-day');
    r6.classList.remove('selected-day');
    r7.classList.remove('selected-day');
    r8.classList.remove('selected-day');
    r9.classList.remove('selected-day');
    r10.classList.remove('selected-day');
    selectedDay='r4'
});

r5.addEventListener('click', function(){
    r1.classList.remove('selected-day');
    r2.classList.remove('selected-day');
    r3.classList.remove('selected-day');
    r4.classList.remove('selected-day');
    r5.classList.add('selected-day');
    r6.classList.remove('selected-day');
    r7.classList.remove('selected-day');
    r8.classList.remove('selected-day');
    r9.classList.remove('selected-day');
    r10.classList.remove('selected-day');
    selectedDay='r5'
});

r6.addEventListener('click', function(){
    r1.classList.remove('selected-day');
    r2.classList.remove('selected-day');
    r3.classList.remove('selected-day');
    r4.classList.remove('selected-day');
    r5.classList.remove('selected-day');
    r6.classList.add('selected-day');
    r7.classList.remove('selected-day');
    r8.classList.remove('selected-day');
    r9.classList.remove('selected-day');
    r10.classList.remove('selected-day');
    selectedDay='r6'
});

r7.addEventListener('click', function(){
    r1.classList.remove('selected-day');
    r2.classList.remove('selected-day');
    r3.classList.remove('selected-day');
    r4.classList.remove('selected-day');
    r5.classList.remove('selected-day');
    r6.classList.remove('selected-day');
    r7.classList.add('selected-day');
    r8.classList.remove('selected-day');
    r9.classList.remove('selected-day');
    r10.classList.remove('selected-day');
    selectedDay='r7'
});

r8.addEventListener('click', function(){
    r1.classList.remove('selected-day');
    r2.classList.remove('selected-day');
    r3.classList.remove('selected-day');
    r4.classList.remove('selected-day');
    r5.classList.remove('selected-day');
    r6.classList.remove('selected-day');
    r7.classList.remove('selected-day');
    r8.classList.add('selected-day');
    r9.classList.remove('selected-day');
    r10.classList.remove('selected-day');
    selectedDay='r8'
});

r9.addEventListener('click', function(){
    r1.classList.remove('selected-day');
    r2.classList.remove('selected-day');
    r3.classList.remove('selected-day');
    r4.classList.remove('selected-day');
    r5.classList.remove('selected-day');
    r6.classList.remove('selected-day');
    r7.classList.remove('selected-day');
    r8.classList.remove('selected-day');
    r9.classList.add('selected-day');
    r10.classList.remove('selected-day');
    selectedDay='r9'
});

r10.addEventListener('click', function(){
    r1.classList.remove('selected-day');
    r2.classList.remove('selected-day');
    r3.classList.remove('selected-day');
    r4.classList.remove('selected-day');
    r5.classList.remove('selected-day');
    r6.classList.remove('selected-day');
    r7.classList.remove('selected-day');
    r8.classList.remove('selected-day');
    r9.classList.remove('selected-day');
    r10.classList.add('selected-day');
    selectedDay='r10'
});