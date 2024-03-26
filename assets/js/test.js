$(document).ready(function(){
    var isAdding = false; // Biến để kiểm tra trạng thái đang thêm mới hay không

    $('.block').on('click', '.add-button', function() {
        if ($('.add-input').length) {
            $('.add-input').remove(); // Xóa input hiện có nếu đang tồn tại
            $('.cancel-button').remove(); // Ẩn nút hủy
        }
        isAdding = true; // Thiết lập trạng thái đang thêm mới
        var level = parseInt($(this).parent().attr('class').match(/block-level-(\d+)/)[1]) + 1;
        $(this).parent().append('<input type="text" class="add-input" placeholder="Nhập tên cho Cấp Độ ' + level + '">');
        $(this).parent().append('<span class="cancel-button">Hủy</span>'); // Thêm nút hủy
        $('.add-input').focus(); // Focus vào input mới
    });

    $('.block').on('click', '.cancel-button', function(event) {
        event.stopPropagation(); // Ngăn chặn sự kiện click lan truyền tới các khối cha
        $('.add-input').remove(); // Xóa input
        $(this).remove(); // Xóa nút hủy
        isAdding = false; // Trở lại trạng thái không thêm mới
    });

    $('.block').on('click', '.delete-button', function(event) {
        event.stopPropagation(); // Ngăn chặn sự kiện click lan truyền tới các khối cha
        $(this).parent().remove(); // Xóa cấp độ hiện tại khi nút xóa được nhấn
    });

    $('.block').on('keydown', '.add-input', function(event) {
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

    $('.block').click(function(){
        if (!isAdding) {
            $(this).children('.block-level-2').slideToggle();
        }
    });

    $('.block-level-2').click(function(event){
        event.stopPropagation();
        if (!isAdding) {
            $(this).children('.block-level-3').slideToggle();
        }
    });

    $('.block-level-3').click(function(event){
        event.stopPropagation();
        if (!isAdding) {
            $(this).children('.block-level-4').slideToggle();
        }
    });

    $('.block-level-4').click(function(event){
        event.stopPropagation();
    });

    $('.block').on('click', '.add-input', function(event) {
        event.stopPropagation(); // Ngăn chặn sự kiện click từ nút thêm input truyền vào
    });
});
