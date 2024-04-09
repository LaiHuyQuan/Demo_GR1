// mở
$('#main').on('click', '.channel', function () {
    var deviceID = $(this).data('deviceid')
    console.log(deviceID)
    var chonch = $(this).data('chonch')
    var chonpha = $(this).data('chonpha')
    if (!checkChannel(chonch, deviceID)) {
        alert('kênh đã tồn tại!')
        return;
    }
    addChannel(deviceID, chonch, chonpha);
});

function addChannel(deviceID, chonch, chonpha) {
    $('.channel-lv').find('.mockup').remove();
    $('.add-channel-mockup').find('#chonch').remove();
    // var deviceID = $(this).data('info');
    createSelectInputsForLevels('.channel-lv');
    $('.add-channel-mockup').removeClass('hide');
    $('.add-channel-mockup').find('.card-title').text('Channel ' + chonch).data('info', chonch).data('chonpha', chonpha);
    var channelSavebtn = '<button type="reset" class="btn btn-primary me-1 mb-1 channel-save" data-info="' + deviceID + '">Save</button>';
    $('.channel-btns').append(channelSavebtn);
}

$('#main').on('click', '.channel1phase', function () {
    var deviceID = $(this).data('deviceid')
    console.log(deviceID)
    var chonch = $(this).data('chonch')
    var chonpha = $(this).data('chonpha')
    if (!checkChannel(chonch, deviceID)) {
        alert('kênh đã tồn tại!')
        return;
    }
    addChannel(deviceID, chonch, chonpha);
})
// sửa
$('.add-device').on('click', '.edit-channel-btn', function () {
    // $('.channel-lv').find('.mockup').remove();
    // $('.add-channel-mockup').find('#chonch').remove();
    var deviceID = $(this).data('deviceid');
    var channelID = $(this).data('info')
    createSelectInputsForLevels('.channel-lv');
    $('.add-channel-mockup').find('.card-title').text('Channel ' + channelID);

    for (var i = 0; i < projectData.devices.length; i++) {
        var device = projectData.devices[i];
        for (var j = 0; j < device.channels.length; j++) {
            var channel = device.channels[j];
            if (channel.chonch == channelID) {
                $('input[name="itt"]').val(channel.itt)
                $('input[name="ptt"]').val(channel.ptt)
                $('input[name="ct"]').val(channel.ct)
                $('input[name="type"]').val(channel.type)
                $('input[name="name"]').val(channel.name)
                $('input[name="sourceFr"]').val(channel.sourceFr)
                $('.level1-inputs').val(channel.lv1);
                populateSelectOptionsForLevel(channel.lv1, 2);
                $('.level2-inputs').val(channel.lv2);
                populateSelectOptionsForLevel(channel.lv2, 3);
                $('.level3-inputs').val(channel.lv3);
                populateSelectOptionsForLevel(channel.lv3, 4);
                $('.level4-inputs').val(channel.lv4);
                $('#loaitb').val(device.deviceType);
                $('#includeS').prop('checked', channel.includeS)
                $('#includeL').prop('checked', channel.includeL)
                $('#source').prop('checked', channel.source)
            }
        }
    }

    $('.add-channel-mockup').removeClass('hide');
    var channelSavebtn = '<button type="" class="btn btn-primary me-1 mb-1 edit-channel-save" data-info="' + deviceID + '" data-chonch="' + channelID + '">Save</button>'
    $('.channel-btns').append(channelSavebtn);
});

// lưu bản sửa kênh
$('.add-channel-mockup').on('click', '.edit-channel-save', function () {
    var deviceID = $(this).data('info');
    var channelID = $(this).data('chonch');
    for (var i = 0; i < projectData.devices.length; i++) {
        var device = projectData.devices[i];
        for (var j = 0; j < device.channels.length; j++) {
            var channel = device.channels[j];
            if (channel.chonch === channelID) {
                channel.itt = $('input[name="itt"]').val();
                channel.ptt = $('input[name="ptt"]').val();
                channel.ct = $('input[name="ct"]').val();
                channel.type = $('input[name="type"]').val();
                channel.name = $('input[name="name"]').val();
                channel.sourceFr = $('input[name="sourceFr"]').val();
                channel.lv1 = $('.level1-inputs').val() || 0;
                channel.lv2 = $('.level2-inputs').val() || 0;
                channel.lv3 = $('.level3-inputs').val() || 0;
                channel.lv4 = $('.level4-inputs').val() || 0;
                channel.includeS = $('#includeS').is(':checked');
                channel.includeL = $('#includeL').is(':checked');
                channel.source = $('#source').is(':checked');
                channel.lv1code = $('.level1-inputs').find('option:selected').data('code');
                channel.lv2code = $('.level2-inputs').find('option:selected').data('code');
                channel.lv3code = $('.level3-inputs').find('option:selected').data('code');
                channel.lv4code = $('.level4-inputs').find('option:selected').data('code');
            }
        }
    }

    // sửa bảng
    $('.device-added-' + deviceID).find('table').remove();
    $('#main').find('.device-added-' + deviceID).append(createchannelTable(deviceID));

    // ẩn mockup
    $('.add-channel-mockup').find('#chonpha').remove();
    $('.add-channel-mockup').find('#chonch').remove();
    $('.channel-lv').find('.mockup').remove();
    $('.edit-channel-save').remove();
    $('.add-channel-mockup').addClass('hide');
});

// lưu
$('.add-channel-mockup').on('click', '.channel-save', function () {
    var deviceID = $(this).data('info');

    var channel = {
        chonpha: $('.add-channel-mockup').find('.card-title').data('chonpha'),
        chonch: $('.add-channel-mockup').find('.card-title').data('info'),
        itt: $('input[name="itt"]').val() || 0,
        ptt: $('input[name="ptt"]').val() || 0,
        ct: $('input[name="ct"]').val() || 0,
        type: $('input[name="type"]').val() || 0,
        name: $('input[name="name"]').val() || 0,
        sourceFr: $('input[name="sourceFr"]').val() || 0,
        lv1: $('.level1-inputs').val() || 0,
        lv2: $('.level2-inputs').val() || 0,
        lv3: $('.level3-inputs').val() || 0,
        lv4: $('.level4-inputs').val() || 0,
        includeS: $('#includeS').is(':checked'),
        includeL: $('#includeL').is(':checked'),
        source: $('#source').is(':checked'),
        lv1code: $('.level1-inputs').find('option:selected').data('code'),
        lv2code: $('.level2-inputs').find('option:selected').data('code'),
        lv3code: $('.level3-inputs').find('option:selected').data('code'),
        lv4code: $('.level4-inputs').find('option:selected').data('code'),
    };

    for (var i = 0; i < projectData.devices.length; i++) {
        var device = projectData.devices[i];
        if (device.code == deviceID) {
            projectData.devices[i].channels.push(channel);
            break; // Thoát khỏi vòng lặp sau khi thêm kênh
        };
    };
    // đặt form về mặc định
    $('input[name="itt"]').val('');
    $('input[name="ptt"]').val('');
    $('input[name="ct"]').val('');
    $('input[name="type"]').val('');
    $('input[name="name"]').val('');
    $('input[name="source"]').val('');
    $('.level1-inputs').val('');
    $('.level2-inputs').val('');
    $('.level3-inputs').val('');
    $('.level4-inputs').val('');
    $('#includeS').prop('checked', false);
    $('#includeL').prop('checked', false);
    $('#sourceFr').prop('checked', false);

    // thêm vào bảng
    $('.device-added-' + deviceID).find('table').remove();
    $('#main').find('.device-added-' + deviceID).append(createchannelTable(deviceID));
    if (mapping.hasOwnProperty(channel.chonch)) {
        var Values = mapping[channel.chonch];
        for (var i = 0; i < Values.length; i++) {
            $('#main').find('.channel-' + Values[i]).addClass('created');
        }
    }
    $('#main').find('.channel-' + channel.chonch).addClass('created')

    // ẩn mockup
    $('.add-channel-mockup').find('#chonpha').remove();
    $('.add-channel-mockup').find('#chonch').remove();
    $('.channel-lv').find('.mockup').remove();
    $('.channel-save').remove();
    $('.add-channel-mockup').addClass('hide');
});

// đóng
$('.add-channel-mockup').on('click', '.channel-close', function (event) {
    // $('.channel-save').attr('data-info', "");
    event.preventDefault()
    $('.add-channel-mockup').find('#chonpha').remove();
    $('.add-channel-mockup').find('#chonch').remove();
    $('.channel-lv').find('.mockup').remove();
    $('.edit-channel-save').remove();
    $('.channel-save').remove();
    $('.add-channel-mockup').addClass('hide');
});

// xóa
$('.add-device-main').on('click', '.delete-channel-btn', function () {
    var channelID = $(this).data('info');
    var deviceID = $(this).data('deviceid');
    if (confirm('Bạn có chắc chắn muốn xóa kênh này không?')) {
        for (var i = 0; i < projectData.devices.length; i++) {
            var device = projectData.devices[i];
            if (device.code == deviceID) {
                for (var j = 0; j < device.channels.length; j++) {
                    if (device.channels[j].chonch == channelID) {
                        device.channels.splice(j, 1);
                        break;
                    }
                }
                break;
            }
        }
    }
    var $table = $('.device-added-' + deviceID).find('table');
    $table.remove();
    $('#main').find('.device-added-' + deviceID).append(createchannelTable(deviceID));
    var newTable = $('.device-added-' + deviceID).find('table');

    if (mapping.hasOwnProperty(channelID)) {
        var Values = mapping[channelID];
        for (var i = 0; i < Values.length; i++) {
            $('#main').find('.channel-' + Values[i]).removeClass('created');
        }
    }
    $('#main').find('.channel-' + channelID).removeClass('created')

    // Kiểm tra xem bảng mới có hàng nào không
    if (newTable.find('tbody tr').length == 0) {
        newTable.remove(); // Nếu không có hàng nào, loại bỏ bảng mới
    }
});

// tạo bảng kênh
function createchannelTable(deviceID) {
    var newDevice = '';
    for (var i = 0; i < projectData.devices.length; i++) {
        if (projectData.devices[i].code == deviceID) {
            var foundDevice = projectData.devices[i];
            newDevice +=
                '<div>' +
                '<table class="table table-lg ' + foundDevice.code + '" >' +
                '<thead>' +
                '<tr>' +
                '<th>LoadID</th>' +
                '<th>Tên</th>' +
                '<th>Kênh</th>' +
                '<th>Lv1</th>' +
                '<th>Lv2</th>' +
                '<th>Lv3</th>' +
                '<th>Lv4</th>' +
                '<th></th>' +
                '<th></th>' +
                '</tr>' +
                '</thead>' +
                '<tbody>';

            // Thêm dữ liệu của các kênh vào bảng
            foundDevice.channels.forEach(function (channel, index) {
                newDevice += '<tr>' +
                    '<td class="text-bold-500">' + index + '</td>' +
                    '<td>' + channel.name + '</td>' +
                    '<td>' + channel.chonch.toUpperCase() + '</td>' +
                    '<td>' + channel.lv1 + '</td>' +
                    '<td>' + channel.lv2 + '</td>' +
                    '<td>' + channel.lv3 + '</td>' +
                    '<td>' + channel.lv4 + '</td>' +
                    '<td class="edit-channel-btn" data-info="' + channel.chonch + '" data-deviceID="' + foundDevice.code + '" data-type="' + foundDevice.deviceType + '">sửa</td>' +
                    '<td class="delete-channel-btn" data-info="' + channel.chonch + '" data-deviceID="' + foundDevice.code + '">xóa</td>' +
                    '</tr>';

                // Cập nhật trạng thái của các kênh
            })
            newDevice += '</tbody>' +
                '</table>' +
                '</div>';
        }
    }
    return newDevice;
}

function createSelectInputs(level, data) {
    var selectInputs = $('<select class="select-lv">');
    selectInputs.addClass('level' + level + '-inputs');
    selectInputs.prepend('<option value="0" data-code="0">0</option>');

    // Thêm các lựa chọn cho cấp độ hiện tại
    if (data && data.length > 0) {
        data.forEach(function (item) {
            var option = $('<option>');
            option.text(item.name);
            option.val(item.name);
            option.data('code', item.code);
            selectInputs.append(option);
        });
    }
    return selectInputs;
}

function createSelectInputsForLevels(blockName) {
    var container = $(blockName);
    var level0Data = jsonStructure.level0;

    var selectBlock = $('<div class = "mockup">');

    // Tạo ô lựa chọn cho cấp độ 1
    var level1Select = createSelectInputs(1, level0Data);
    selectBlock.append('<label class="level-select" for="lv1">lv1</label>')
    selectBlock.append(level1Select);
    selectBlock.append('</br>')

    // Tạo ô lựa chọn cho cấp độ 2
    var level2Select = createSelectInputs(2, []);
    selectBlock.append('<label class="level-select" for="lv2">lv2</label>')
    selectBlock.append(level2Select);
    selectBlock.append('</br>')


    // Tạo ô lựa chọn cho cấp độ 3
    var level3Select = createSelectInputs(3, []);
    selectBlock.append('<label class="level-select" for="lv3">lv3</label>')
    selectBlock.append(level3Select);
    selectBlock.append('</br>')

    // Tạo ô lựa chọn cho cấp độ 4
    var level4Select = createSelectInputs(4, []);
    selectBlock.append('<label class="level-select" for="lv4">lv4</label>')
    selectBlock.append(level4Select);
    selectBlock.append('</br>')

    container.append(selectBlock);
}

// Hàm cập nhật ô lựa chọn cho các cấp độ tiếp theo dựa trên giá trị đã chọn ở cấp độ trước
function populateSelectOptionsForLevel(selectedValue, level) {
    var dataForLevel = getDataForLevel(selectedValue, level);
    var selectInputs = $('.level' + level + '-inputs');

    // Xóa các lựa chọn hiện có
    selectInputs.empty();
    selectInputs.append('<option value="0" data-code="0">0</option>'); // Thêm một lựa chọn rỗng

    // Thêm các lựa chọn cho cấp độ hiện tại dựa trên giá trị đã chọn ở cấp độ trước
    if (dataForLevel && dataForLevel.length > 0) {
        dataForLevel.forEach(function (item) {
            var option = $('<option>');
            option.text(item.name);
            option.val(item.name);
            option.data('code', item.code);
            selectInputs.append(option);
        });
    }
}

// Sự kiện thay đổi cho các ô lựa chọn
$('.mockup').on('change', '.select-lv', function () {
    var selectedValue = $(this).val();
    var level = parseInt($(this).attr('class').match(/level(\d+)-inputs/)[1]);
    for (var i = level + 1; i <= 4; i++) {
        var selectInput = $('.level' + i + '-inputs');
        selectInput.empty();
        selectInput.append('<option value="0" data-code="0">0</option>');
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
            level1Data.forEach(function (item) {
                if (item.name === selectedValue && item.children) {
                    dataForLevel = item.children;
                }
            });
            break;
        case 3:
            var level2Data = jsonStructure.level0.flatMap(level1 => level1.children);
            level2Data.forEach(function (item) {
                if (item.name === selectedValue && item.children) {
                    dataForLevel = item.children;
                }
            });
            break;
        case 4:
            var level3Data = jsonStructure.level0.flatMap(level1 => level1.children).flatMap(level2 => level2.children);
            level3Data.forEach(function (item) {
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