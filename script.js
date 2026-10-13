const header=document.querySelector('[data-header]');
const progress=document.querySelector('.progress span');
const menu=document.querySelector('.menu-toggle');
const nav=document.querySelector('.nav');
const revealItems=document.querySelectorAll('.reveal');

const updateScroll=()=>{
  header.classList.toggle('scrolled',window.scrollY>24);
  const max=document.documentElement.scrollHeight-window.innerHeight;
  progress.style.width=`${max>0?(window.scrollY/max)*100:0}%`;
};
window.addEventListener('scroll',updateScroll,{passive:true}); updateScroll();

menu?.addEventListener('click',()=>{
  const open=nav.classList.toggle('open');
  menu.setAttribute('aria-expanded',open);
});
nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
  nav.classList.remove('open'); menu?.setAttribute('aria-expanded','false');
}));

const observer=new IntersectionObserver((entries)=>entries.forEach(entry=>{
  if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}
}),{threshold:.12,rootMargin:'0px 0px -40px'});
revealItems.forEach((item,index)=>{item.style.transitionDelay=`${Math.min(index*70,280)}ms`;observer.observe(item)});

document.querySelectorAll('a[href^="#"]').forEach(link=>link.addEventListener('click',event=>{
  const target=document.querySelector(link.getAttribute('href'));
  if(target){event.preventDefault();target.scrollIntoView({behavior:'smooth',block:'start'});}
}));
