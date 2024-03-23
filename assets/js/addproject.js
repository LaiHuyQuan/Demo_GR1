$(document).ready(function () {
    // thêm dự án
    // lưu 
    $('#add-project').on('click', '.save', function(){
        console.log(luu);
    })

    //mockup structure
    // mở
    $('#add-project').on('click', '.structure', function(){
        $('.structure-mockup').removeClass('hide');
    })

    // đóng
    $('.structure-mockup').on('click', '.struc-close', function(){
        $('.structure-mockup').addClass('hide');
    })

    // lưu
    $('.structure-mockup').on('click', '.struc-save', function(){
        $('.structure-mockup').addClass('hide');
    })

    //mockup thêm device
    // mở
    $('#add-project').on('click', '.add-device-btn', function(){
        $('.add-device-mockup').removeClass('hide');
    })

    // lưu
    $('.add-device-mockup').on('click', '.device-save', function(){
        console.log('1')
        $('.add-device-mockup').addClass('hide');
    })

    // đóng
    $('.add-device-mockup').on('click', '.device-close', function(){
        $('.add-device-mockup').addClass('hide');
        console.log('2')
    })

    function toggleSubList(id) {
        var subList = document.getElementById(id);
        if (subList.style.display === "none") {
          subList.style.display = "block";
        } else {
          subList.style.display = "none";
        }
      }
    
      // Add click event listeners to level 1 items
      var level1Items = document.querySelectorAll('#level1 > li');
      level1Items.forEach(function(item) {
        item.addEventListener('click', function() {
          toggleSubList('level2');
        });
      });
    
      // Add click event listeners to level 2 items
      var level2Items = document.querySelectorAll('#level2 > li');
      level2Items.forEach(function(item) {
        item.addEventListener('click', function() {
          toggleSubList('level3');
        });
      });
    
      // Add click event listeners to level 3 items
      var level3Items = document.querySelectorAll('#level3 > li');
      level3Items.forEach(function(item) {
        item.addEventListener('click', function() {
          toggleSubList('level4');
        });
      });
});