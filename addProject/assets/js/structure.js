//mockup structure
    // mở
    $('#add-project').on('click', '.structure', function () {
        $('.structure-mockup').removeClass('hide');
    })

    // đóng
    $('.structure-mockup').on('click', '.struc-close', function () {
        $('.structure-mockup').addClass('hide');
    })

    // lưu
    $('.structure-mockup').on('click', '.struc-save', function () {
        $('.structure-mockup').addClass('hide');
        SaveStructure();
    })

    function SaveStructure() {    
        jsonStructure.level0 = [];
    
        $('.container').find('.block-level-1').each(function () {
            var levelInfo = $(this).contents().first().text().trim();
            var match = levelInfo.match(/^(.+?)\s*\(code:\s*(.+?)\)$/);
    
            jsonStructure.level0.push({
                "name": match[1],
                "code": match[2],
                "children": []
            });
    
            $(this).find('.block-level-2').each(function () {
                var levelInfo = $(this).contents().first().text().trim();
                var match2 = levelInfo.match(/^(.+?)\s*\(code:\s*(.+?)\)$/);
                jsonStructure.level0[jsonStructure.level0.length - 1].children.push({
                    "name": match2[1],
                    "code": match2[2],
                    "children": []
                });
    
                $(this).find('.block-level-3').each(function () {
                    var levelInfo = $(this).contents().first().text().trim();
                    var match3 = levelInfo.match(/^(.+?)\s*\(code:\s*(.+?)\)$/);
                    var lastLevel2 = jsonStructure.level0[jsonStructure.level0.length - 1].children.length - 1;
                    jsonStructure.level0[jsonStructure.level0.length - 1].children[lastLevel2].children.push({
                        "name": match3[1],
                        "code": match3[2],
                        "children": []
                    });
    
                    $(this).find('.block-level-4').each(function () {
                        var levelInfo = $(this).contents().first().text().trim();
                        var match4 = levelInfo.match(/^(.+?)\s*\(code:\s*(.+?)\)$/);
                        var lastLevel3 = jsonStructure.level0[jsonStructure.level0.length - 1].children[lastLevel2].children.length - 1;
                        jsonStructure.level0[jsonStructure.level0.length - 1].children[lastLevel2].children[lastLevel3].children.push({
                            "name": match4[1],
                            "code": match4[2]
                        });
                    });
                });
            });
        });
    }
    
    var isAdding = false; // Biến để kiểm tra trạng thái đang thêm mới hay không
    $('.container').on('click', '.add-button', function () {
        var parentBlock = $(this).parent(); // Lưu trữ khối cha
        if ($('.container').find('.add-input').length) {
            $('.container').find('.add-input').remove(); // Xóa input hiện có nếu đang tồn tại trong khối cha
            $('.container').find('.add-code').remove(); // Xóa input hiện có nếu đang tồn tại trong khối cha
            $('.container').find('.ok-button').remove();
            $('.container').find('.cancel-button').remove(); // Xóa nút hủy trong khối cha
        }
        isAdding = true; // Thiết lập trạng thái đang thêm mới
        var level = parseInt(parentBlock.attr('class').match(/block-level-(\d+)/)[1]) + 1;
        parentBlock.append('<input type="text" class="add-input" placeholder="Nhập tên cho Cấp Độ ' + level + '">');
        parentBlock.append('<input type="text" class="add-code" placeholder="Nhập mã cho Cấp Độ ' + level + '">'); // Thêm input cho mã vào khối cha
        parentBlock.append('<button class="ok-button">OK</button>'); // Thêm nút OK vào khối cha
        parentBlock.append('<button class="cancel-button">Hủy</button>'); // Thêm nút hủy vào khối cha
        parentBlock.children('.block-level-' + (level - 1) + ' > .block').each(function () {
            if (!$(this).is(':visible')) {
                $(this).slideToggle(); // Nếu không, hiện chúng ra
            }
        });
        $('.add-input').first().focus(); // Focus vào input mới (tên)
    });

    $('.container').on('click', '.cancel-button', function (event) {
        event.stopPropagation(); // Ngăn chặn sự kiện click lan truyền tới các khối cha
        $('.add-input').remove(); // Xóa input
        $('.add-code').remove(); // Xóa input nhập mã
        $(this).remove(); // Xóa nút hủy
        $('.ok-button').remove(); // Xóa nút OK
        isAdding = false; // Trở lại trạng thái không thêm mới
    });

    $('.container').on('click', '.delete-button', function (event) {
        event.stopPropagation(); // Ngăn chặn sự kiện click lan truyền tới các khối cha
        $(this).parent().remove(); // Xóa cấp độ hiện tại khi nút xóa được nhấn
    });

    $('.container').on('keydown', '.add-input', function (event) {
        if (event.keyCode === 13) { // Kiểm tra nếu là phím Enter
            $('.add-code').focus(); // Chuyển focus sang input nhập mã
        }
    });

    $('.container').on('keydown', '.add-code', function (event) {
        event.stopPropagation(); // Ngăn chặn sự kiện click từ nút thêm input truyền vào
        if (event.which === 13) { // Kiểm tra nếu phím Enter được nhấn
            var inputText = $(this).prev('.add-input').val();
            var inputCode = $(this).val(); // Lấy mã cấp độ từ input mã

            var level = parseInt($(this).parent().attr('class').match(/block-level-(\d+)/)[1]);
            var newBlock;
            if (level < 3) {
                newBlock = '<div class="block block-level-' + (level + 1) + '">' + inputText + ' (code: ' + inputCode + ')' +
                    '<i class="fa-solid fa-plus fa-sm add-button"></i>' +
                    '<i class="fa-solid fa-minus fa-sm delete-button"></i>' +
                    '</div>';
            } else {
                newBlock = '<div class="block block-level-' + (level + 1) + '">' + inputText + ' (code: ' + inputCode + ')' +
                    '<i class="fa-solid fa-minus fa-sm delete-button"></i>' +
                    '</div>';
            }

            $(this).parent().append(newBlock);
            $(this).remove(); // Xóa input sau khi thêm cấp độ mới
            $('.add-input').remove(); // Xóa input tên
            $('.ok-button').remove(); // Xóa nút OK
            $('.cancel-button').remove(); // Xóa nút hủy
            isAdding = false; // Trở lại trạng thái không thêm mới
        }
    });

    $('.container').on('click', '.ok-button', function (event) {
        event.stopPropagation(); // Ngăn chặn sự kiện click từ nút thêm input truyền vào
        var parentBlock = $(this).parent();
        var inputText = parentBlock.find('.add-input').val();
        var inputCode = parentBlock.find('.add-code').val();
        var level = parseInt(parentBlock.attr('class').match(/block-level-(\d+)/)[1]);
        var newBlock;

        if (checkDuplicateNameAndCodeInBlock($(this).parent(), inputText, inputCode)) {
            alert('không hợp lệ')
            return; // Nếu có trùng lặp hoặc giá trị rỗng, dừng lại
        }else(
            console.log('ok')
        )

        if (level < 3) {
            newBlock = '<div class="block block-level-' + (level + 1) + '">' + inputText + ' (code: ' + inputCode + ')' +
                '<i class="fa-solid fa-plus fa-sm add-button"></i>' +
                '<i class="fa-solid fa-minus fa-sm delete-button"></i>' +
                '</div>';
        } else {
            newBlock = '<div class="block block-level-' + (level + 1) + '">' + inputText + ' (code: ' + inputCode + ')' +
                '<i class="fa-solid fa-minus fa-sm delete-button"></i>' +
                '</div>';
        }

        parentBlock.append(newBlock);
        parentBlock.find('.add-input').remove(); // Xóa input tên
        parentBlock.find('.add-code').remove(); // Xóa input mã
        $(this).remove(); // Xóa nút OK
        parentBlock.find('.cancel-button').remove(); // Xóa nút hủy
        isAdding = false; // Trở lại trạng thái không thêm mới
    });

    $('.container').on('click', '.block', function () {
        if (!isAdding) {
            $(this).children('.block-level-2').slideToggle();
        }
    });

    $('.container').on('click', '.block-level-2', function (event) {
        event.stopPropagation();
        if (!isAdding) {
            $(this).children('.block-level-3').slideToggle();
        }
    });

    $('.container').on('click', '.block-level-3', function (event) {
        event.stopPropagation();
        if (!isAdding) {
            $(this).children('.block-level-4').slideToggle();
        }
    });

    $('.container').on('click', '.block-level-4', function (event) {
        event.stopPropagation();
    });
