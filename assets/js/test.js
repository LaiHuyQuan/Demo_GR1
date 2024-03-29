$(document).ready(function () {
    // Hàm đọc dữ liệu từ chuỗi HTML và trả về một biến chứa dữ liệu của các cấp độ
    function readBlockData(htmlString) {
        var jsonStructure = {
            "level0": []
        };

        // Tạo một phần tử div ẩn để chứa chuỗi HTML và sử dụng jQuery để trích xuất thông tin
        var $tempDiv = $('<div>').html(htmlString);

        // Duyệt qua các khối cấp độ 1 và lưu tên của mỗi khối vào jsonStructure
        $tempDiv.find('.block-level-1').each(function() {
            var level1Name = $(this).contents().first().text().trim();
            var level1Children = [];

            // Duyệt qua các khối cấp độ 2 và lưu tên của mỗi khối vào jsonStructure
            $(this).find('.block-level-2').each(function() {
                var level2Name = $(this).contents().first().text().trim();
                var level2Children = [];

                // Duyệt qua các khối cấp độ 3 và lưu tên của mỗi khối vào jsonStructure
                $(this).find('.block-level-3').each(function() {
                    var level3Name = $(this).contents().first().text().trim();
                    var level3Children = [];

                    // Duyệt qua các khối cấp độ 4 và lưu tên của mỗi khối vào jsonStructure
                    $(this).find('.block-level-4').each(function() {
                        var level4Name = $(this).contents().first().text().trim();
                        level3Children.push({
                            "name": level4Name
                        });
                    });

                    level2Children.push({
                        "name": level3Name,
                        "children": level3Children
                    });
                });

                level1Children.push({
                    "name": level2Name,
                    "children": level2Children
                });
            });

            jsonStructure.level0.push({
                "name": level1Name,
                "children": level1Children
            });
        });

        return jsonStructure;
    }

    // Chuỗi HTML cần đọc dữ liệu
    var htmlString = '<div class="block block-level-1">Cấp Độ 1 \
    <span class="add-button">+</span> \
    <span class="delete-button">-</span> \
    <div class="block block-level-2">Cấp Độ 2a \
        <span class="add-button">+</span> \
        <span class="delete-button">-</span> \
        <div class="block block-level-3">Cấp Độ 3a \
            <span class="add-button">+</span> \
            <span class="delete-button">-</span> \
            <div class="block block-level-4">Cấp Độ 4a</div> \
        </div> \
    </div> \
    <div class="block block-level-2">Cấp Độ 2b \
        <span class="add-button">+</span> \
        <span class="delete-button">-</span> \
        <div class="block block-level-3">Cấp Độ 3b \
            <span class="add-button">+</span> \
            <span class="delete-button">-</span> \
            <div class="block block-level-4">Cấp Độ 4b</div> \
        </div> \
    </div> \
    <div class="block block-level-2">Cấp Độ 2d \
        <span class="add-button">+</span> \
        <span class="delete-button">-</span> \
        <div class="block block-level-3">Cấp Độ 3d \
        </div> \
    </div> \
</div>';

    // Đọc dữ liệu từ chuỗi HTML và lưu vào biến jsonStructure
    var jsonStructure = readBlockData(htmlString);

    // Hàm in ra dữ liệu theo các cấp độ
    function printData(data, level) {
        if (data instanceof Array) {
            data.forEach(function(item) {
                console.log("level" + (level + 1) + ":", item.name);
                printData(item.children, level + 1);
            });
        } else if (typeof data === 'object') {
            console.log("level" + (level + 1) + ":", data.name);
            printData(data.children, level + 1);
        }
    }

    // Hàm tạo các ô lựa chọn cho mỗi cấp độ
    function createSelectInputs(level, data) {
        var selectInputs = $('<select>');
        selectInputs.addClass('level' + level + '-inputs');
        selectInputs.append('<option value="">-- Select --</option>'); // Add an empty option initially

        // Thêm các lựa chọn cho cấp độ hiện tại
        if (data && data.length > 0) {
            data.forEach(function(item) {
                var option = $('<option>');
                option.text(item.name);
                option.val(item.name);
                selectInputs.append(option);
            });
        }

        return selectInputs;
    }

    // Tạo các ô lựa chọn cho mỗi cấp độ và thêm vào .container
    function createSelectInputsForLevels() {
        var container = $('.container');
        var level0Data = jsonStructure.level0;

        // Tạo ô lựa chọn cho cấp độ 1
        var level1Select = createSelectInputs(1, level0Data);
        container.append(level1Select);

        // Tạo ô lựa chọn cho cấp độ 2
        var level2Select = createSelectInputs(2, []);
        container.append(level2Select);

        // Tạo ô lựa chọn cho cấp độ 3
        var level3Select = createSelectInputs(3, []);
        container.append(level3Select);

        // Tạo ô lựa chọn cho cấp độ 4
        var level4Select = createSelectInputs(4, []);
        container.append(level4Select);
    }

    // Gọi hàm tạo ô lựa chọn cho mỗi cấp độ
    createSelectInputsForLevels();

    // Hàm cập nhật ô lựa chọn cho các cấp độ tiếp theo dựa trên giá trị đã chọn ở cấp độ trước
    function populateSelectOptionsForLevel(selectedValue, level) {
        var dataForLevel = getDataForLevel(selectedValue, level);
        var selectInputs = $('.level' + level + '-inputs');

        // Xóa các lựa chọn hiện có
        selectInputs.empty();
        selectInputs.append('<option value="">-- Select --</option>'); // Thêm một lựa chọn rỗng

        // Thêm các lựa chọn cho cấp độ hiện tại dựa trên giá trị đã chọn ở cấp độ trước
        if (dataForLevel && dataForLevel.length > 0) {
            dataForLevel.forEach(function(item) {
                var option = $('<option>');
                option.text(item.name);
                option.val(item.name);
                selectInputs.append(option);
            });
        }
    }

    // Sự kiện thay đổi cho các ô lựa chọn
    $('.container').on('change', 'select', function() {
        var selectedValue = $(this).val();
        var level = parseInt($(this).attr('class').match(/level(\d+)-inputs/)[1]);
        for (var i = level + 1; i <= 4; i++) {
            var selectInput = $('.level' + i + '-inputs');
            selectInput.empty();
            selectInput.append('<option value="">-- Select --</option>');
        }
        // Cập nhật các ô lựa chọn cho các cấp độ tiếp theo dựa trên giá trị đã chọn
        populateSelectOptionsForLevel(selectedValue, level + 1);
    });

    // Hàm lấy dữ liệu cho mỗi cấp độ từ biến jsonStructure
function getDataForLevel(selectedValue, level) {
    var dataForLevel = [];
    switch (level) {
        case 2:
            var level1Data = jsonStructure.level0;
            level1Data.forEach(function(item) {
                if (item.name === selectedValue && item.children) {
                    dataForLevel = item.children;
                }
            });
            break;
        case 3:
            var level2Data = jsonStructure.level0.flatMap(level1 => level1.children);
            level2Data.forEach(function(item) {
                if (item.name === selectedValue && item.children) {
                    dataForLevel = item.children;
                }
            });
            break;
        case 4:
            var level3Data = jsonStructure.level0.flatMap(level1 => level1.children).flatMap(level2 => level2.children);
            level3Data.forEach(function(item) {
                if (item.name === selectedValue && item.children) {
                    dataForLevel = item.children;
                }
            });
            break;
        default:
            break;
    }
    return dataForLevel;
}


    // In ra dữ liệu theo các cấp độ
    printData(jsonStructure.level0, 0);

    // Tạo một ô select mới
var selectBox = $('<select>');

// Mảng chứa các lựa chọn
var options = ["CH1", "CH2", "CH3", "CH4", "CH5", "CH6"];

// Thêm tất cả các lựa chọn vào ô select
$.each(options, function(index, value) {
    var option = $('<option>', {
        value: value.toLowerCase(), // giá trị lựa chọn, ví dụ: ch1, ch2, ...
        text: value // Nội dung hiển thị của lựa chọn
    });
    selectBox.append(option); // Thêm lựa chọn vào ô select
});

// Thêm ô select vào một phần tử có id là "container"
$('.container').append(selectBox);

});
