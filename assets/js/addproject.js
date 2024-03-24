//  danh sách các thiết bị
var projectData = {
    "projectCode": "ABC123",
    "projectName": "Project ABC",
    "devices": []
}

// structure dự án
var jsonStructure = {
    "level1": "nhà 1",
    "level1Child": []
};


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
        var editDeviceIndex = '<span class="edit-device-save data-info="'+ deviceCode +'">Save</span>';
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
        if (check){
            $(this).parent().parent().remove();
        }
        else{
            return;
        }
    })
    
    // thêm
    $('.add-device-mockup').on('click', '.device-add', function () {
        // console.log('1')
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

        if(device.deviceType == '1k3p'){
            maxch = 1;
        }
        if(device.deviceType == '6k3p' || device.deviceType == '6k1p'){
            maxch = 6;
        }
        if(device.deviceType == '12k3p'){
            maxch =12;
        }
        
        projectData.devices.push(device);
        console.log(device)
        var newDevice = '<div class="device-added">' +
            '<div class="device-hd">' +
            '<span>' + device.code + ' - ' + device.cabinet + ' - ' + device.date + ' - ' + device.deviceType + '</span>' +
            '<span class="edit-device-btn" data-info="' + device.code + '"><i class="fa-solid fa-pen-to-square"></i> Edit Device</span>' +
            '<span class="delete-device-btn" data-info="' + device.code + '"><i class="fa-solid fa-trash"></i> Delete Device</span>' +
            '<span class="add-chanel-btn" style="margin-right:10px" data-info="' + device.code + '" data-maxch="'+maxch +'"><i class="fa-solid fa-plus"></i> Add Chanel</span>' +
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
        if (rowCount == maxChanel){
            alert('full');
            $('.add-chanel-mockup').addClass('hide');
            return;
        }

        $('.add-chanel-mockup').removeClass('hide');
        var deviceCode = $(this).data('info')
        var chanelSavebtn = '<span class="chanel-save" data-info="' + deviceCode + '" data-maxch="'+ maxChanel + '">Save</span>';
        $('.chanel-btns').append(chanelSavebtn);
    })

    // lưu
    $('.add-chanel-mockup').on('click', '.chanel-save', function () {
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
            lv1: $('#lv1').val(),
            lv2: $('#lv2').val(),
            lv3: $('#lv3').val(),
            lv4: $('#lv4').val(),
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
});