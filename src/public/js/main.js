// --  NavBar effect  --
let last_known_scroll_position = 0;
let ticking = false;
let nav = document.querySelector('nav');

function doSomething(scroll_pos) {
    if(scroll_pos > 100){
        nav.className = "navbar navbar-expand-lg fixed-top navbar-light bg-light";
    } else {
        nav.className = "navbar navbar-expand-lg fixed-top navbar-dark bg-dark p-3";
    }
}

window.addEventListener('scroll', function(e) {
  last_known_scroll_position = window.scrollY;
  if (!ticking) {
    window.requestAnimationFrame(function() {
      doSomething(last_known_scroll_position);
      ticking = false;
    });
  }
  ticking = true;
});


// --  End Navbar effect  --

// --  Welcome effect --
$(document).ready(function(){
  $('#wellcome-hello').fadeTo(1000, 1, ()=>{
    $('#wellcome-salute').fadeTo(800, 1, ()=>{
      $('#wellcome-p').fadeTo(800, 1);
    });
  });
  
  
  $('#home-filter').fadeTo('slow', 0.9);
})
// --  End Welcome effect

// --  Card effect --
$(document).ready(function(){
  $('.card').hover(function(){
    console.log("Entro");
    $(this).find('.card-body').fadeTo("fast", 0.9);
  }, function(){
    console.log('Salgo');
    $(this).find('.card-body').fadeTo("fast", 0);
  })
})
// --  End Card effect --
// --  Work effect --

// --  End Work effect --
