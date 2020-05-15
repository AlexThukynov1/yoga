window.addEventListener('DOMContentLoaded', function(){
    'use strict';

//TABS

    let infoHeader = document.querySelector('.info-header'),
        infoHeaderTab = document.querySelectorAll('.info-header-tab'),
        tabContent = document.querySelectorAll('.info-tabcontent'),
        moreBtn = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        cross = document.querySelector('.popup-close'),
        moreDescrBtn = document.querySelectorAll('.description-btn');

        function hideTabContent(a){
            for (let i = a; i < tabContent.length; i++){
                tabContent[i].classList.remove('show');
                tabContent[i].classList.add('hide');

            }
        }
        hideTabContent(1);

        function showTabContent(b){
            if(tabContent[b].classList.contains('hide')){
                tabContent[b].classList.remove('hide');
                tabContent[b].classList.add('show');
            }
        }
        infoHeader.addEventListener('click', function(event){
            let target = event.target;
            if(target && target.classList.contains('info-header-tab')){
                for(let i = 0; i < infoHeaderTab.length; i++){
                    if(target == infoHeaderTab[i]){
                        hideTabContent(0);
                        showTabContent(i);
                        break;
                    }
                }
            }
        });

//TIMER


        let deadline = '2020-05-01';
        

        function getTimeRemaining(endtime){
            let t = Date.parse(endtime) - Date.parse(new Date()),
                seconds = Math.floor((t/1000) % 60),
                mins = Math.floor((t/1000/60) % 60),
                hours = Math.floor ((t/(1000*60*60)));
            return {
                'total': t,
                'hours': hours,
                'minutes': mins,
                'sec': seconds
            };
        }

        function setClock(id,endtime){
            let timer = document.getElementById(id),
                hours = timer.querySelector('.hours'),
                min = timer.querySelector('.minutes'),
                sec = timer.querySelector('.seconds'),
                timeInterval = setInterval(updateClock,1000);


                function updateClock(){
                    let t = getTimeRemaining(endtime);


                    function addZero(num){
                        if(num <= 9) {
                            return '0' + num;
                        } else return num;
                    }

                        hours.textContent = addZero(t.hours) ;
                        min.textContent = addZero(t.minutes) ;
                        sec.textContent = addZero(t.sec);
        
                        if(t.total <= 0){
                            clearInterval(timeInterval);
                            hours.textContent = '00';
                            min.textContent = '00';
                            sec.textContent ='00';
                        }
                }
        }
        setClock('timer', deadline);

        //Modal window

            moreBtn.addEventListener('click', function (){
                overlay.style.display = 'block';
                this.classList.add('more-spalsh');
                document.body.style.overflow = 'hidden';
            });
            

            cross.addEventListener('click', function(){
                overlay.style.display = 'none';
                cross.classList.remove('more-spalsh');
                document.body.style.overflow = '';
            });


            moreDescrBtn.forEach(function(item){
                item.addEventListener('click', function(){
                    overlay.style.display = 'block';
                    this.classList.add('more-spalsh');
                    document.body.style.overflow = 'hidden';

                });
            });
            
   //FORM
   function setForm(classForm){
   
   let statusMesseg = {
       loading : "Loading...",
       succses : "Succses!!!",
       fail : "Error!!!"
   };

   let form = document.querySelector(classForm);
   let input = form.querySelectorAll('input');
   let showMesseg = document.createElement('div');
   showMesseg.classList.add('status');

   form.addEventListener('submit', function(event){
    event.preventDefault();
    form.appendChild(showMesseg);


    let request = new XMLHttpRequest();

    request.open('POST','server.php');
    request.setRequestHeader('Content-type','appication/x-www-form-unlencoded');

    let formData = new FormData(form);
    request.send(formData);

    request.addEventListener('readystatechange',function(){
        if(request.readyState < 4){
            showMesseg.innerHTML = statusMesseg.loading;
        } else if(request.readyState === 4 && request.status == 200 ) {
            showMesseg.innerHTML = statusMesseg.succses;
        } else {
            showMesseg.innerHTML = statusMesseg.fail;
        }
    });
    form.reset();
 });
}
setForm('.main-form');
setForm('#form');

//Slider

let slideNumber = 1;

let slides = document.querySelectorAll('.slider-item'),
    nextSlide = document.querySelector('.next'),
    prevSlide = document.querySelector('.prev'),
    dotsWrap = document.querySelector('.slider-dots'),
    dots = document.querySelectorAll('.dot');

    showSlide(slideNumber);

    function showSlide(n){
        if(slideNumber > slides.length){
            slideNumber = 1;
        } else if(slideNumber < 1){
            slideNumber = slides.length;
        }

        slides.forEach((item) => item.style.display = 'none' );
        dots.forEach((item) => item.classList.remove('dot-active'));
        slides[slideNumber-1].style.display = 'block';
        dots[slideNumber-1].classList.add('dot-active');
    }

    function changeSlide(n){
        slideNumber += n;
        showSlide(slideNumber);
    }

    function curSlide (n){
        showSlide(slideNumber = n);
    }
    nextSlide.addEventListener('click', function(){
        changeSlide(1);

    });
    prevSlide.addEventListener('click', function(){
        changeSlide(-1);

    });

    dotsWrap.addEventListener('click',function(event){
        for(let i = 0; i < dots.length +1; i++ ){
            if(event.target.classList.contains('dot') && event.target == dots[i-1]){
                curSlide(i);
            }
        }
    });

    //Calculator

    let numberPerson = document.querySelectorAll('.counter-block-input')[0],
        numberDays = document.querySelectorAll('.counter-block-input')[1],
        selectorBase = document.querySelector('#select'),
        finalSum = document.querySelector('#total'),
        countPeople = 0,
        countDays = 0,
        totalSum = 0;
        finalSum.textContent = 0;

        numberPerson.addEventListener('input', function(){
            countPeople = +this.value;
            totalSum = ( countDays+countPeople)*1000;
            console.log(countDays+countPeople);
            if(numberDays.value == ''){
                finalSum.textContent = 0;
            } else {
                
                finalSum.textContent = totalSum;
            }
        });
        numberDays.addEventListener('input', function(){
            countDays = +this.value;
            totalSum = (countPeople+ countDays)*1000;
            console.log(countDays+countPeople);
            if(numberPerson.value == ''){
                finalSum.textContent = 0;
            } else {
                
                finalSum.textContent = totalSum;
            }
        });
        selectorBase.addEventListener('change',function(){
            if(numberDays.value == '' || numberPerson.value == ''){
                finalSum.textContent = 0;
            } else {
                let a = totalSum;
                finalSum.innerHTML = a * selectorBase.options[selectorBase.selectedIndex].value;
            }
         
       
        });
        
});


