// Hamburger
const button = document.querySelector('.hamburger');
const onClick = event => event.target.classList.toggle('active');
const nav = document.getElementById('nav');
const menuToggle = event => nav.classList.toggle('hidden');
button.addEventListener('click', onClick);
button.addEventListener('click', menuToggle);

//smooth scroll - wiem, że to się da zrobić z jquery, ale byłam ciekawa jak wygląda w gołym js ;)
const linksArr = document.querySelectorAll('.header__nav__box__element__link');

linksArr.forEach(function (elem) {
    elem.addEventListener('click', function (e) {

    const link = this.getAttribute('href');

        function smoothScroll(duration) {
            const target = document.querySelector(link);
            const targetPosition = target.getBoundingClientRect().top;
            const startPosition = window.pageYOffset;
            const distance = targetPosition - startPosition;
            let startTime = null;

            function animation(currentTime) {
                if (startTime === null) {
                    startTime = currentTime;
                }
                const timeElapsed = currentTime - startTime;
                const run = ease(timeElapsed, startPosition, distance, duration);
                window.scrollTo(0, run);
                if (timeElapsed < duration) requestAnimationFrame(animation);
            }

            function ease(t, b, c, d) {
                t /= d / 2;
                if (t < 1) return c / 2 * t * t + b;
                t--;
                return -c / 2 * (t * (t - 2) - 1) + b;
            }

            requestAnimationFrame(animation);
        }

        smoothScroll(1000);
    })

});


// Calculator

const quantityInput = document.getElementById('quantity');
const quantitySum = document.getElementById('sumQuant');
const quantityDes = document.getElementById('desProd');

const ordersInput = document.getElementById('orders');
const ordersSum = document.getElementById('sumOrders');
const ordersDes = document.getElementById('desOrd');

const dropdown = document.getElementById('packageList');
const packageTypeArr = document.querySelectorAll('.option');
const packageType = document.getElementById('packageType');
const packageDes = document.getElementById('desPack');

const accountingInput = document.getElementById('accounting');
const accountingPrice = document.getElementById('accountingPrice');


const rentalInput = document.getElementById('rental');
const rentalPayment = document.getElementById('rentalPayment');

let s1 = 0;
let s2 = 0;
let s3 = 0;
let s4 = 0;
let s5 = 0;

const sum = document.getElementById('sum');

function summary() {
    let result = s1+s2+s3+s4+s5;
    sum.innerText = '$' + result;
}

//event na pierwszy input
quantityInput.addEventListener('input', function (e) {
    if (Number.isInteger(parseFloat(quantityInput.value)) && parseFloat(quantityInput.value)>0) {
        quantitySum.parentElement.style.visibility = 'visible';
        quantitySum.innerText = "$" + quantityInput.value * 0.5;
        quantityDes.innerText = quantityInput.value + ` * $0.5`;
        s1 = 0;
        s1 = quantityInput.value * 0.5;
        summary();
    } else if(quantityInput.value === ''){
        s1 = 0;
        summary();
        quantitySum.innerText = "$0";
        quantityDes.innerText = "";
    } else {
        quantityInput.value = '';
        quantityInput.setAttribute('placeholder', 'Value has to be a positive integer');
        quantitySum.innerText = "$0";
        quantityDes.innerText = "";
    }
});

//event na drugi input
ordersInput.addEventListener('input', function (e) {
    if (Number.isInteger(parseFloat(ordersInput.value)) && parseFloat(ordersInput.value)>0) {
        ordersSum.parentElement.style.visibility = 'visible';
        ordersSum.innerText = "$" + ordersInput.value * 0.25;
        ordersDes.innerText = ordersInput.value + ` * $0.25`;
        s2 = 0;
        s2 = ordersInput.value * 0.25;
        summary();
    } else if(ordersInput.value === ''){
        s2 = 0;
        summary();
        ordersSum.innerText = "$0";
        ordersDes.innerText = "";
    } else {
        ordersInput.value = '';
        ordersInput.setAttribute('placeholder', 'Value has to be an integer');
    }
});

//event na trzeci input


for (let i = 0; i < packageTypeArr.length; i++) {
    packageTypeArr[i].addEventListener('click', function (e) {
        if (i === 0) {
            dropdown.innerText = packageTypeArr[0].innerText;
            packageType.parentElement.style.visibility = 'visible';
            packageType.innerText = '$' + 0;
            packageDes.innerText = packageTypeArr[0].innerText;
            s3 = 0;
            summary();
        } else if (i === 1) {
            dropdown.innerText = packageTypeArr[1].innerText;
            packageType.parentElement.style.visibility = 'visible';
            packageType.innerText = '$' + 25;
            packageDes.innerText = packageTypeArr[1].innerText;
            s3 = 0;
            s3 = 25;
            summary();
        } else {
            dropdown.innerText = packageTypeArr[2].innerText;
            packageType.parentElement.style.visibility = 'visible';
            packageType.innerText = '$' + 60;
            packageDes.innerText = packageTypeArr[2].innerText;
            s3 = 0;
            s3 = 60;
            summary();
        }
    })
}

//event na czwarty input
accountingInput.addEventListener('change', function (e) {
    accountingPrice.parentElement.style.visibility = 'visible';
    if (accountingInput.checked) {
        accountingPrice.innerText = "$" + 35;
        s4 = 0;
        s4 = 35;
        summary();
    } else {
        accountingPrice.innerText = "$" + 0;
        s4 = 0;
        summary();
    }
});

//event na piąty input
rentalInput.addEventListener('change', function (e) {
    rentalPayment.parentElement.style.visibility = 'visible';
    if (rentalInput.checked) {
        rentalPayment.innerText = "$" + 5;
        s5 = 0;
        s5 = 5;
        summary();
    } else {
        rentalPayment.innerText = "$" + 0;
        s5 = 0;
        summary();
    }
});


