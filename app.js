'use strict';
const dialog=document.querySelector('#booking');
const service=document.querySelector('#service');
let previousFocus;
function openBooking(value){previousFocus=document.activeElement;if(value)service.value=value;dialog.showModal();document.body.classList.add('modal-open');}
document.querySelectorAll('[data-book]').forEach(button=>button.addEventListener('click',()=>openBooking('Orientación general')));
document.querySelectorAll('[data-service]').forEach(button=>button.addEventListener('click',()=>openBooking(button.dataset.service)));
document.querySelector('.close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target===dialog){const box=dialog.getBoundingClientRect();if(event.clientX<box.left||event.clientX>box.right||event.clientY<box.top||event.clientY>box.bottom)dialog.close();}});
dialog.addEventListener('close',()=>{document.body.classList.remove('modal-open');previousFocus?.focus();});
document.querySelector('#booking-form').addEventListener('submit',event=>{event.preventDefault();const activity=document.querySelector('#business').value;const note=document.querySelector('#note').value.trim();const message=`Hola ECA Contadores, me interesa ${service.value.toLowerCase()}. Mi actividad: ${activity.toLowerCase()}. Quisiera coordinar la primera asesoría gratuita.${note?' Mi consulta: '+note:''}`;window.open('https://wa.me/5493884135179?text='+encodeURIComponent(message),'_blank','noopener,noreferrer');});
document.querySelector('#year').textContent=new Date().getFullYear();
document.querySelectorAll('video').forEach(video=>video.addEventListener('play',()=>{document.querySelectorAll('video').forEach(other=>{if(other!==video)other.pause();});}));

const heroFilm=document.querySelector('#hero-film');
const heroToggle=document.querySelector('#hero-toggle');
const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
heroToggle.addEventListener('click',async()=>{if(heroFilm.paused){try{await heroFilm.play()}catch{heroFilm.controls=true}}else heroFilm.pause()});
function syncFilm(){heroToggle.textContent=heroFilm.paused?'▶ Reproducir':'Ⅱ Pausar';heroToggle.setAttribute('aria-label',heroFilm.paused?'Reproducir video de portada':'Pausar video de portada')}
heroFilm.addEventListener('play',syncFilm);heroFilm.addEventListener('pause',syncFilm);
if(!reduceMotion)heroFilm.play().catch(()=>{});
const gallery=document.querySelector('#gallery-track');
function moveGallery(direction){gallery.scrollBy({left:direction*(gallery.querySelector('figure').getBoundingClientRect().width+24),behavior:reduceMotion?'instant':'smooth'})}
document.querySelector('#gallery-prev').addEventListener('click',()=>moveGallery(-1));
document.querySelector('#gallery-next').addEventListener('click',()=>moveGallery(1));
gallery.addEventListener('keydown',event=>{if(event.key==='ArrowRight'||event.key==='ArrowLeft'){event.preventDefault();moveGallery(event.key==='ArrowRight'?1:-1)}});
if('IntersectionObserver' in window&&!reduceMotion){const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.remove('pending');observer.unobserve(entry.target)}})},{threshold:.08});document.querySelectorAll('.section-head,.service-grid article,.steps article,.team-grid figure,.location').forEach(el=>{el.classList.add('reveal','pending');observer.observe(el)})}
