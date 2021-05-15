// ==============================================
import { gsap } from 'gsap';
import { element_geometry, viewport_geometry } from '../util/geometry.js';
// import { enable_scroll_listener, 
//         disable_scroll_listener } from './hide-navbar.js';

// ==============================================

let master_timeline;
const duration = 0.5;
let is_nav_dropdown_open = false;

// ==============================================

// const nav_items = gsap.utils.toArray('.nav-desktop .nav-item');
const nav_items = document.querySelectorAll('.nav-desktop .nav-item');

// ==============================================

// const blur_container = document.querySelector('.blur-container-2');
// const blur_background = () => {

//   const timeline = gsap.timeline();

//   timeline.to(blur_container, {
//     duration,
//     filter: 'blur(4px)',
//   }); // .to()
  
//   return timeline;
// }; // blur_background()

// ==============================================

// const overlay = document.querySelector('.overlay');
// const translucent_overlay = () => {

//   const timeline = gsap.timeline();
  
//   timeline.to(overlay, {
//     duration,
//     backgroundColor: 'rgba(0, 0, 0, 0.3)',
//     onStart:           () => overlay.style.zIndex = 1,
//     onReverseComplete: () => overlay.style.zIndex = -1,
//   }); // .to()

//   return timeline;
// }; // translucent_overlay()

// ==============================================

const navbar = document.querySelector('.nav-desktop');
const nav_height = element_geometry(navbar).h;
const nav_dropdown = document.querySelector('.nav-dropdown');
const nav_dropdown_height = element_geometry(nav_dropdown).h;

const slide = (className) => {

  const timeline = gsap.timeline();

  timeline.to(className, {
    duration,
    y: nav_height + nav_dropdown_height, 
    onStart: () => {
      is_nav_dropdown_open = true;
    }, // onStart()
    onComplete: () => {
      listen_for_click_outside_of_element('add');
      // disable_scroll_listener();
    }, // onComplete()
    onReverseComplete: () => {
      listen_for_click_outside_of_element('remove');
      // enable_scroll_listener();
      reset_nav_item_click_listeners();
      is_nav_dropdown_open = false;
    }, // onReverseComplete()
  });

  // - - - - - - - - - - - - - - - - - - - - - - 

  const click_outside_of_element_listener = (event) => {
    const element = document.querySelector(className);
    const {y1: element_top, y2: element_bottom} = element_geometry(element);
    const {viewport_height: vh} = viewport_geometry();
    const y = event.clientY;
    // console.log('y: ', y, 'vh: ', vh,  'element_bottom: ', element_bottom);
    if (y < element_top) { // clicked in navbar region (above nav-dropdown)
      // avoid being able to open the navbar dropdown twice (done by removing listeners on all nav-items in function disable_nav_item_click_listeners())
      // event.preventDefault(); // this does not fix it
    }
    else if (y > element_bottom) { // clicked below opened nav-dropdown
      console.log('clicked outside the side-drawer!');
      close();
    }
  };

  // - - - - - - - - - - - - - - - - - - - - - - 

  const listen_for_click_outside_of_element = (option) => {
    if (option === 'add')
      window.addEventListener('click',    click_outside_of_element_listener);
    else if (option === 'remove')
      window.removeEventListener('click', click_outside_of_element_listener);
  };

  return timeline;
}; // slide_side_drawer()

// ==============================================

const open = () => {

  if (is_nav_dropdown_open === false) {
    master_timeline = gsap.timeline();
    master_timeline.add( slide('.nav-dropdown')     );
    // master_timeline.add( blur_background()          );
    // master_timeline.add( translucent_overlay(), '<' );
  }
};

// ==============================================

const close = () => {
  // -currently only used in click listener for
  //  clicking outside of the side-drawer
  master_timeline.reverse();
}; // close()

// ==============================================

const click_listener = (event) => {

  // -Listening for event-capturing (not event-bubbling)
  // event.stopPropagation(); // -Don't listen for click event on <span> inside .nav-item
  const nav_item = event.currentTarget;
  
  const display_collection = (nav_item_id) => {
    const collections = document.querySelectorAll('.nav-dropdown__collection');
    collections.forEach((collection) => {
      collection.style.display = 'none';  
    });
    const collection = document.querySelector(`.nav-dropdown__collection-${nav_item_id}`);
    collection.style.display = 'grid';
  };

  // Open nav-dropdown with corresponding data
  const nav_item_id = nav_item.dataset.id;
  console.log('clicked nav item: ', nav_item_id);
  display_collection(nav_item_id);
  open();
  
  // -first reset all event listeners, then disable only the one currently open
  // -need to reset them in case you click one nav-item,
  //  then click a second nav-item before closing the nav dropdown,
  //  then again clicking the first nav-item,
  //  we need to be listening to it again.
  // -All event listeners on nav-items are also reset upon
  //  completion of the closing of the nav dropdown.
  reset_nav_item_click_listeners();
  
  // disable event listener to prevent double open of nav-dropdown for same nav-item
  nav_item.removeEventListener('click', click_listener);

  // Display the border-bottom on nav-item's child
  nav_item.children[0].classList.add('clicked');
};

// ==============================================

const reset_nav_item_click_listeners = () => {

  // this will run at page load and after the nav-dropdown is closed
  nav_items.forEach((nav_item, idx) => {

    nav_item.addEventListener('click', click_listener);
    nav_item.addEventListener('mouseover',  () => nav_item.children[0].classList.add('hovered'));
    nav_item.addEventListener('mouseleave', () => nav_item.children[0].classList.remove('hovered'));

    // Remove clicked highlighting on nav_item's child    
    nav_item.children[0].classList.remove('clicked');
  });
};

// ==============================================
// Enable on page load
reset_nav_item_click_listeners();

// ==============================================