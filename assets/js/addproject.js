//  danh sách các thiết bị
var projectData = {
    "projectCode": "ABC123",
    "projectName": "Project ABC",
    "devices": []
}

// structure dự án
var jsonStructure = {
    "level0": {
        "level1" :{
            "name" : "1233",
            "level2" :{
                "name":"",
                "level3":{
                    "name":"",
                    "level4":[]
                }
            }       
        }
    }
};

var jsonData;


$(document).ready(function () {
    // thêm dự án
    // lưu 
    $('#add-project').on('click', '.save', function () {
        console.log(luu);
    })

    // ẩn/hiện danh sách kênh
    $('.add-device-main').on('click', '.fa-caret-down', function () {
        var deviceName = $(this).data('info');
        var table = $('.table.table-lg.' + deviceName);
        if (table.find('tbody tr').length > 0) {
            table.toggleClass('hide');
        }
    })

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
    })

    // mockup thêm thiết bị
    // mở 
    $('#add-project').on('click', '.add-device-btn', function () {
        $('.add-device-mockup').removeClass('hide');
        var addDeviceIndex = '<span class="device-add">Add</span>'
        $('.device-btns').append(addDeviceIndex);
    })

    // sửa
    $('#add-project').on('click', '.edit-device-btn', function () {
        $(this).parent().addClass('editing')
        $('.add-device-mockup').removeClass('hide');
        var deviceCode = $(this).data('info');
        for (var i = 0; i < projectData.devices.length; i++) {
            var device = projectData.devices[i];
            if (device.code == deviceCode) {
                $('#ma').val(device.code);
                $('#cabinet').val(device.cabinet);
                $('#ngay').val(device.date);
                $('#lv1').val(device.lv1);
                $('#lv2').val(device.lv2);
                $('#lv3').val(device.lv3);
                $('#lv4').val(device.lv4);
                $('#loaitb').val(device.deviceType);
            }
        }
        var editDeviceIndex = '<span class="edit-device-save data-info="' + deviceCode + '">Save</span>';
        $('.device-btns').append(editDeviceIndex)
    })

    // lưu sau khi sửa
    $('.add-device-mockup').on('click', '.edit-device-save', function () {
        deviceCode = $('.editing').data('info')
        for (var i = 0; i < projectData.devices.length; i++) {
            var device = projectData.devices[i];
            if (device.code == deviceCode) {
                device.code = $('#ma').val();
                device.cabinet = $('#cabinet').val();
                device.date = $('#ngay').val();
                device.lv1 = $('#lv1').val();
                device.lv2 = $('#lv2').val();
                device.lv3 = $('#lv3').val();
                device.lv4 = $('#lv4').val();
            }
        }
        $('.editing').removeClass('editing');
        $('.edit-device-save').remove();
        $('.add-device-mockup').addClass('hide');
    })

    // xóa
    $('#add-project').on('click', '.delete-device-btn', function () {
        var check = confirm('Are you sure you want to delete?');
        if (check) {
            $(this).parent().parent().remove();
        }
        else {
            return;
        }
    })

    // thêm
    $('.add-device-mockup').on('click', '.device-add', function () {
        // console.log('1')
        // kiểm tra trường nhập vào
        if (!checkDeviceInput()) {
            alert('Vui lòng điền đầy đủ thông tin');
            return;
        }

        // đọc dữ liệu 
        var maxch;
        var device = {
            code: $('#ma').val(),
            cabinet: $('#cabinet').val(),
            date: $('#ngay').val(),
            lv1: $('#lv1').val(),
            lv2: $('#lv2').val(),
            lv3: $('#lv3').val(),
            lv4: $('#lv4').val(),
            deviceType: $('#loaitb').val(),
            chanels: []
        };

        // kiểm tra loại thiết bị
        if (device.deviceType == '1k3p') {
            maxch = 1;
        }
        if (device.deviceType == '6k3p' || device.deviceType == '6k1p') {
            maxch = 6;
        }
        if (device.deviceType == '12k3p') {
            maxch = 12;
        }

        // thêm thiết bị vào data
        projectData.devices.push(device);
        // thêm thiết bị vào DOM
        var newDevice = '<div class="device-added">' +
            '<div class="device-hd">' +
            '<span>' + device.code + ' - ' + device.cabinet + ' - ' + device.date + ' - ' + device.deviceType + '</span>' +
            '<span class="edit-device-btn" data-info="' + device.code + '"><i class="fa-solid fa-pen-to-square"></i> Edit Device</span>' +
            '<span class="delete-device-btn" data-info="' + device.code + '"><i class="fa-solid fa-trash"></i> Delete Device</span>' +
            '<span class="add-chanel-btn" style="margin-right:10px" data-info="' + device.code + '" data-maxch="' + maxch + '"><i class="fa-solid fa-plus"></i> Add Chanel</span>' +
            '<i class="fa-solid fa-caret-down" data-info="' + device.code + '"></i>' +
            '</div>' +
            '<table class="table table-lg ' + device.code + ' hide" >' +
            '<thead>' +
            '<tr>' +
            '<th>LoadID</th>' +
            '<th>Tên</th>' +
            '<th>Kênh</th>' +
            '<th></th>' +
            '<th></th>' +
            '</tr>' +
            '</thead>' +
            '<tbody>'

        newDevice += '</tbody>' +
            '</table>' +
            '</div>'

        // Thêm đối tượng mới vào DOM
        $('.add-device-main').append(newDevice);

        // đặt lại giá trị về mặc định
        $('#ma').val('');
        $('#cabinet').val('');
        $('#ngay').val('');
        $('#lv1').val('');
        $('#lv2').val('');
        $('#lv3').val('');
        $('#lv4').val('');
        $('#loaitb').val('');

        // ẩn mockup
        $('.device-add').remove();
        $('.add-device-mockup').addClass('hide');
    })

    // đóng
    $('.add-device-mockup').on('click', '.device-close', function () {
        $('.edit-device-save').remove();
        $('.device-add').remove();
        $('.add-device-mockup').addClass('hide');
        console.log('2')
    })

    //mockup thêm chanel
    // mở
    $('.add-device').on('click', '.add-chanel-btn', function () {
        var deviceID = $(this).data('info');
        var tableName = '.table.' + deviceID;
        var maxChanel = $(this).data('maxch')
        // console.log(maxChanel)
        var rowCount = $(tableName + ' tbody tr').length;
        if (rowCount == maxChanel) {
            alert('full');
            $('.add-chanel-mockup').addClass('hide');
            return;
        }

        $('.add-chanel-mockup').removeClass('hide');
        var deviceCode = $(this).data('info')
        var chanelSavebtn = '<span class="chanel-save" data-info="' + deviceCode + '" data-maxch="' + maxChanel + '">Save</span>';
        $('.chanel-btns').append(chanelSavebtn);
    })

    // lưu
    $('.add-chanel-mockup').on('click', '.chanel-save', function () {
        // kiểm tra trường nhập liệu
        if (!checkChanelInput()) {
            alert('Vui lòng điền đầy đủ thông tin');
            return;
        }

        var deviceID = $(this).data('info');
        var tableName = '.table.' + deviceID;
        var rowCount = $(tableName + ' tbody tr').length;
        // console.log(deviceID)
        var chanel = {
            chonch: $('#chonch').val(),
            itt: $('input[name="itt"]').val(),
            ptt: $('input[name="ptt"]').val(),
            ct: $('input[name="ct"]').val(),
            type: $('input[name="type"]').val(),
            name: $('input[name="name"]').val(),
            source: $('input[name="source"]').val(),
            lv1: $('select[name="lv1"]').val(),
            lv2: $('select[name="lv2"]').val(),
            lv3: $('select[name="lv3"]').val(),
            lv4: $('select[name="lv4"]').val(),
            includeS: $('#includeS').is(':checked'),
            includeL: $('#includeL').is(':checked'),
            sourceFr: $('#sourceFr').is(':checked')
        };

        for (var i = 0; i < projectData.devices.length; i++) {
            var device = projectData.devices[i];
            if (device.code == deviceID) {
                // console.log(device.code)
                projectData.devices[i].chanels.push(chanel);
                break; // Thoát khỏi vòng lặp sau khi thêm kênh
            }
        }
        var newRowHTML = '<tr>' +
            '<td class="text-bold-500">' + rowCount + '</td>' +
            '<td>' + chanel.name + '</td>' +
            '<td>' + chanel.chonch + '</td>' +
            '<td class="add-chanel-btn">sửa</td>' +
            '<td>xóa</td>' +
            '</tr>';

        // Thêm dòng mới vào bảng
        $(tableName + ' tbody').append(newRowHTML);
        // đặt form về mặc định
        $('#chonch').val('');
        $('input[name="itt"]').val('');
        $('input[name="ptt"]').val('');
        $('input[name="ct"]').val('');
        $('input[name="type"]').val('');
        $('input[name="name"]').val('');
        $('input[name="source"]').val('');
        $('select[name="lv1"]').val('');
        $('select[name="lv2"]').val('');
        $('select[name="lv3"]').val('');
        $('select[name="lv4"]').val('');
        $('#includeS').prop('checked', false);
        $('#includeL').prop('checked', false);
        $('#sourceFr').prop('checked', false);

        // ẩn mockup
        $('.chanel-save').remove();
        $('.add-chanel-mockup').addClass('hide');
    })

    // đóng
    $('.add-chanel-mockup').on('click', '.chanel-close', function () {
        // $('.chanel-save').attr('data-info', "");
        $('.chanel-save').remove();
        $('.add-chanel-mockup').addClass('hide');
        console.log('2')
    })

    //kiểm tra
    // kiểm tra trường nhập vào
    function checkDeviceInput() {
        var ma = $('#ma').val().trim();
        var cabinet = $('#cabinet').val().trim();
        var ngay = $('#ngay').val().trim();
        var lv1 = $('#lv1').val().trim();
        var lv2 = $('#lv2').val().trim();
        var lv3 = $('#lv3').val().trim();
        var lv4 = $('#lv4').val().trim();
        var loaitb = $('#loaitb').val().trim();

        if (ma === '' || cabinet === '' || ngay === '' || lv1 === '' || lv2 === '' || lv3 === '' || lv4 === '' || loaitb === '') {
            return false;
        }
        return true;
    }

    // kiểm tra trường nhập liệu
    function checkChanelInput() {
        var chonch = $('#chonch').val().trim();
        var itt = $('input[name="itt"]').val().trim();
        var ptt = $('input[name="ptt"]').val().trim();
        var ct = $('input[name="ct"]').val().trim();
        var type = $('input[name="type"]').val().trim();
        var name = $('input[name="name"]').val().trim();
        var source = $('input[name="source"]').val().trim();
        var lv1 = $('select[name="lv1"]').val().trim();
        var lv2 = $('select[name="lv2"]').val().trim();
        var lv3 = $('select[name="lv3"]').val().trim();
        var lv4 = $('select[name="lv4"]').val().trim();

        // Kiểm tra các trường nhập liệu
        if (chonch === '' || itt === '' || ptt === '' || ct === '' || type === '' || name === '' || source === '' || lv1 === '' || lv2 === '' || lv3 === '' || lv4 === '') {
            return false;
        }
        return true;
    }

    // Structure
    var isAdding = false; // Biến để kiểm tra trạng thái đang thêm mới hay không

    $('.container').on('click', '.add-button', function () {
        var parentBlock = $(this).parent(); // Lưu trữ khối cha
        if (parentBlock.find('.add-input').length) {
            parentBlock.find('.add-input').remove(); // Xóa input hiện có nếu đang tồn tại trong khối cha
            parentBlock.find('.cancel-button').remove(); // Xóa nút hủy trong khối cha
        }
        isAdding = true; // Thiết lập trạng thái đang thêm mới
        var level = parseInt(parentBlock.attr('class').match(/block-level-(\d+)/)[1]) + 1;
        parentBlock.append('<input type="text" class="add-input" placeholder="Nhập tên cho Cấp Độ ' + level + '">');
        parentBlock.append('<button class="cancel-button">Hủy</button>'); // Thêm nút hủy vào khối cha
        parentBlock.children('.block-level-' + (level - 1) + ' > .block').each(function () {
            if (!$(this).is(':visible')) {
                $(this).slideToggle(); // Nếu không, hiện chúng ra
            }
        });
        $('.add-input').focus(); // Focus vào input mới
    });


    $('.container').on('click', '.cancel-button', function (event) {
        event.stopPropagation(); // Ngăn chặn sự kiện click lan truyền tới các khối cha
        $('.add-input').remove(); // Xóa input
        $(this).remove(); // Xóa nút hủy
        isAdding = false; // Trở lại trạng thái không thêm mới
    });

    $('.container').on('click', '.delete-button', function (event) {
        event.stopPropagation(); // Ngăn chặn sự kiện click lan truyền tới các khối cha
        $(this).parent().remove(); // Xóa cấp độ hiện tại khi nút xóa được nhấn
    });

    $('.container').on('keydown', '.add-input', function (event) {
        event.stopPropagation(); // Ngăn chặn sự kiện click từ nút thêm input truyền vào
        if (event.which === 13) { // Kiểm tra nếu phím Enter được nhấn
            var inputText = $(this).val();
            var level = parseInt($(this).parent().attr('class').match(/block-level-(\d+)/)[1]);
            var newBlock;
            if (level < 3) {
                newBlock = '<div class="block block-level-' + (level + 1) + '">' + inputText  +
                '<button class="add-button">+</button>' +
                '<button class="delete-button">-</button>' +
                '</div>';
            }else{
                newBlock = '<div class="block block-level-' + (level + 1) + '">' + inputText  +
                '<button class="delete-button">-</button>' +
                '</div>';
            }

            $(this).parent().append(newBlock);
            $(this).remove(); // Xóa input sau khi thêm cấp độ mới
            $('.cancel-button').remove(); // Xóa nút hủy
            isAdding = false; // Trở lại trạng thái không thêm mới
        }
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
    // test
    $(document).ready(function() {
        var jsonData = readData($('.container')); // Đọc dữ liệu từ container và lưu vào biến jsonData
        console.log(jsonData); // In ra dữ liệu đã lưu
        
        function readData($element) {
            var block = {}; // Đối tượng để lưu dữ liệu
            block.name = $element.contents().filter(function() {
                return this.nodeType === 3; // Chỉ lấy text nodes
            }).text().trim(); // Lưu tên của cấp độ
    
            block.children = []; // Mảng để lưu các cấp độ con
            
            // Lặp qua các cấp độ con của phần tử hiện tại
            $element.children('.block').each(function() {
                var $childElement = $(this);
                var childBlock = readData($childElement); // Đọc dữ liệu của cấp độ con
                block.children.push(childBlock); // Thêm cấp độ con vào mảng
            });
    
            return block;
        }
    });
});