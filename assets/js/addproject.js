var projectData = {
    "projectCode": "ABC123",
    "projectName": "Project ABC",
    "devices":[]
}

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
        table.toggleClass('hide');
        console.log('ok')
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
        // set thông tin trong form về null
    })

    // thêm dòng vào bảng kênh
    function addChanel(tableName) {
        var index = '<tr>' +
            '<td class="text-bold-500">' + i + '</td>' +
            '<td>null</td>' +
            '<td> CH' + (i + 1) + '</td>' +
            '<td class="add-chanel-btn" data-info="' + tableName + 'load' + i + '">sửa</td>' +
            '<td>xóa</td>' +
            '</tr>';
        $('.' + tableName).append(index);
    }

    // thêm
    $('.add-device-mockup').on('click', '.device-add', function () {
        // console.log('1')
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
        projectData.devices.push(device);
        console.log(device)
        var newDevice = '<div class="device-added">' +
            '<div class="device-hd">' +
            '<span>' + device.code + ' - ' + device.cabinet + ' - ' + device.date + ' - ' + device.deviceType + '</span>' +
            '<span class="add-chanel-btn" style="margin-right:10px" data-info="'+ device.code +'"><i class="fa-solid fa-plus"></i> Add Chanel</span>' +
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
        $('#ma').val('');
        $('#cabinet').val('');
        $('#ngay').val('');
        $('#lv1').val('');
        $('#lv2').val('');
        $('#lv3').val('');
        $('#lv4').val('');
        $('#loaitb').val('');
        // ẩn mockup
        $('.add-device-mockup').addClass('hide');
    })

    // đóng
    $('.add-device-mockup').on('click', '.device-close', function () {
        $('.add-device-mockup').addClass('hide');
        console.log('2')
    })

    //mockup thêm chanel
    // mở
    $('.add-device').on('click', '.add-chanel-btn', function () {
        $('.add-chanel-mockup').removeClass('hide');
        var deviceCode = $(this).data('info')
        $('.chanel-save').attr('data-info', deviceCode);
    })

    // lưu
    $('.add-chanel-mockup').on('click', '.chanel-save', function () {
        var deviceID = $(this).data('info');
        console.log(deviceID)
        var chanel = {
            chonch: $('#chonch').val(),
            itt: $('input[name="itt"]').val(),
            ptt: $('input[name="ptt"]').val(),
            ct: $('input[name="ct"]').val(),
            type: $('input[name="type"]').val(),
            name: $('input[name="name"]').val(),
            source: $('input[name="source"]').val(),
            lv1: $('#lv1').val(),
            lv2: $('#lv2').val(),
            lv3: $('#lv3').val(),
            lv4: $('#lv4').val(),
            includeS: $('#includeS').is(':checked'),
            includeL: $('#includeL').is(':checked'),
            sourceFr: $('#sourceFr').is(':checked')
        };

        var find;
        for (var i = 0; i < projectData.devices.length; i++) {
            var device = projectData.devices[i];
            if (device.code == deviceID) {
                console.log(device.code)
                find = i;
                break; // Thoát khỏi vòng lặp sau khi thêm kênh
            }
        }
        projectData.devices[find].chanels.push(chanel);

        var newRowHTML = '<tr>' +
                        '<td class="text-bold-500">'+ 0 + '</td>' +
                        '<td>' + chanel.name + '</td>' +
                        '<td>' + chanel.chonch + '</td>' +
                        '<td class="add-chanel-btn">sửa</td>' +
                        '<td>xóa</td>' +
                    '</tr>';

        // Thêm dòng mới vào bảng
        var tableName = '.table.' + deviceID;
        $(tableName + ' tbody').append(newRowHTML);
        deviceID = "";
        console.log(deviceID)
        console.log(chanel);
        $('.add-chanel-mockup').addClass('hide');
    })

    // đóng
    $('.add-chanel-mockup').on('click', '.chanel-close', function () {
        $('.chanel-save').attr('data-info',"");
        $('.add-chanel-mockup').addClass('hide');
        console.log('2')
    })
});

