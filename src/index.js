import 'bootstrap';
import 'regenerator-runtime';
import './styles/styles.scss';
import './scripts/components/apps-bar';
import './scripts/components/scroll-up';
import './scripts/components/custom-footer';
import main from './scripts/views/main';
import AOS from 'aos';

AOS.init(); 

document.addEventListener("DOMContentLoaded", main);
