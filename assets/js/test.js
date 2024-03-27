$(document).ready(function(){
    var isAdding = false; // Biến để kiểm tra trạng thái đang thêm mới hay không

    $('.container').on('click', '.add-button', function() {
        var parentBlock = $(this).parent(); // Lưu trữ khối cha
        if (parentBlock.find('.add-input').length) {
            parentBlock.find('.add-input').remove(); // Xóa input hiện có nếu đang tồn tại trong khối cha
            parentBlock.find('.cancel-button').remove(); // Xóa nút hủy trong khối cha
        }
        isAdding = true; // Thiết lập trạng thái đang thêm mới
        var level = parseInt(parentBlock.attr('class').match(/block-level-(\d+)/)[1]) + 1;
        parentBlock.append('<input type="text" class="add-input" placeholder="Nhập tên cho Cấp Độ ' + level + '">');
        parentBlock.append('<span class="cancel-button">Hủy</span>'); // Thêm nút hủy vào khối cha
        parentBlock.children('.block-level-' + (level-1) + ' > .block').each(function() {
            if (!$(this).is(':visible')) {
                $(this).slideToggle(); // Nếu không, hiện chúng ra
            }
        });
        $('.add-input').focus(); // Focus vào input mới
    });
    

    $('.container').on('click', '.cancel-button', function(event) {
        event.stopPropagation(); // Ngăn chặn sự kiện click lan truyền tới các khối cha
        $('.add-input').remove(); // Xóa input
        $(this).remove(); // Xóa nút hủy
        isAdding = false; // Trở lại trạng thái không thêm mới
    });

    $('.container').on('click', '.delete-button', function(event) {
        event.stopPropagation(); // Ngăn chặn sự kiện click lan truyền tới các khối cha
        $(this).parent().remove(); // Xóa cấp độ hiện tại khi nút xóa được nhấn
    });

    $('.container').on('keydown', '.add-input', function(event) {
        event.stopPropagation(); // Ngăn chặn sự kiện click từ nút thêm input truyền vào
        if (event.which === 13) { // Kiểm tra nếu phím Enter được nhấn
            var inputText = $(this).val();
            var level = parseInt($(this).parent().attr('class').match(/block-level-(\d+)/)[1]);
            var newBlock = $('<div class="block block-level-' + (level + 1) + '">' + inputText + '</div>');

            if(level < 3){
                newBlock.append('<span class="add-button">+</span>');
            }
            
            newBlock.append('<span class="delete-button">-</span>');
            $(this).parent().append(newBlock);
            $(this).remove(); // Xóa input sau khi thêm cấp độ mới
            $('.cancel-button').remove(); // Xóa nút hủy
            isAdding = false; // Trở lại trạng thái không thêm mới
        }
    });

    $('.container').on('click', '.block', function() {
        if (!isAdding) {
            $(this).children('.block-level-2').slideToggle();
        }
    });

    $('.container').on('click', '.block-level-2', function(event) {
        event.stopPropagation();
        if (!isAdding) {
            $(this).children('.block-level-3').slideToggle();
        }
    });

    $('.container').on('click', '.block-level-3', function(event) {
        event.stopPropagation();
        if (!isAdding) {
            $(this).children('.block-level-4').slideToggle();
        }
    });

    $('.container').on('click', '.block-level-4', function(event) {
        event.stopPropagation();
    });
});
