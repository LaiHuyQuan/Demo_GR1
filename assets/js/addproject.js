//  danh sách các thiết bị
var projectData = {
    "projectCode": "ABC123",
    "projectName": "Project ABC",
    "devices": []
}

// structure dự án
var jsonStructure = {
    "level0": []
};

var jsonData;
// danh sách mã thiết bị
var deviceCodeList = [];

$(document).ready(function () {
    // thêm dự án
    // lưu 
    $('#add-project').on('click', '.save', function () {
        console.log(luu);
    })

    // ẩn/hiện danh sách kênh
    $('.add-device-main').on('click', '.fa-caret-down', function () {
        var deviceName = $(this).data('info');
        var $table = $(this).parent().parent().find('table');
        if ($table.length > 0) {
            $table.remove();
        } else {
            $(this).parent().parent().append(createchannelTable(deviceName));
        }
    });


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

    // mockup thêm thiết bị
    // mở 
    $('#add-project').on('click', '.add-device-btn', function () {
        $('.add-device-mockup').removeClass('hide');
        createSelectInputsForLevels('.device-lv');
        var addDeviceIndex = '<span class="device-add">Add</span>'
        $('.device-btns').append(addDeviceIndex);
        $('#ma').focus();
    })

    // sửa
    $('#add-project').on('click', '.edit-device-btn', function () {
        $(this).parent().addClass('editing')
        $('.add-device-mockup').removeClass('hide');
        var deviceCode = $(this).data('info');
        createSelectInputsForLevels('.device-lv');
        for (var i = 0; i < projectData.devices.length; i++) {
            var device = projectData.devices[i];
            if (device.code == deviceCode) {
                $('#ma').val(device.code);
                $('#cabinet').val(device.cabinet);
                $('#ngay').val(device.date);
                $('.level1-inputs').val(device.lv1);
                $('.level2-inputs').val(device.lv2);
                $('.level3-inputs').val(device.lv3);
                $('.level4-inputs').val(device.lv4);
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
        // đọc dữ liệu
        if ($('#ma').val() === '' || $('#loaitb').val() === '' || $('#loaitb').val() === null) {
            alert('Điền đủ mã thiết bị và loại thiết bị');
            return;
        }

        // kiểm tra loại thiết bị
        if ($('#loaitb').val() == '1k3p') {
            maxch = 1;
        }
        if ($('#loaitb').val() == '6k3p' || $('#loaitb').val() == '6k1p') {
            maxch = 6;
        }
        if ($('#loaitb').val() == '12k3p') {
            maxch = 12;
        }

        var maxch;
        var device = {
            code: $('#ma').val(),
            cabinet: $('#cabinet').val() || 0,
            date: $('#ngay').val() || 0,
            lv1: $('.level1-inputs').val() || 0,
            lv2: $('.level2-inputs').val() || 0,
            lv3: $('.level3-inputs').val() || 0,
            lv4: $('.level4-inputs').val() || 0,
            deviceType: $('#loaitb').val(),
            channels: [],
            maxch: maxch
        };

        // kiểm tra mã thiết bị
        if (deviceCodeList.includes(device.code)) {
            alert('Mã thiết bị đã tồn tại')
            return;
        }


        // thêm thiết bị vào data
        projectData.devices.push(device);
        deviceCodeList.push(device.code);

        var newDevice = '<div class="device-added-' + device.code + '">' +
            '<div class="device-hd">' +
            '<span>' + device.code + ' - ' + device.cabinet + ' - ' + device.date + ' - ' + device.deviceType + '</span>' +
            '<span class="edit-device-btn" data-info="' + device.code + '"><i class="fa-solid fa-pen-to-square"></i> Edit Device</span>' +
            '<span class="delete-device-btn" data-info="' + device.code + '"><i class="fa-solid fa-trash"></i> Delete Device</span>' +
            '<span class="add-channel-btn" style="margin-right:10px" data-info="' + device.code + '" data-maxch="' + maxch + '" data-type="' + device.deviceType + '"><i class="fa-solid fa-plus"></i> Add channel</span>' +
            '<i class="fa-solid fa-caret-down" data-info="' + device.code + '"></i>';

        // Thêm đối tượng mới vào DOM
        $('.add-device-main').append(newDevice);

        // đặt lại giá trị về mặc định
        $('#ma').val('');
        $('#cabinet').val('');
        $('#ngay').val('');
        $('.level1-inputs').val('');
        $('.level2-inputs').val('');
        $('.level3-inputs').val('');
        $('.level4-inputs').val('');
        $('#loaitb').val('');

        // ẩn mockup
        $('.device-lv').find('.mockup').remove();
        $('.device-add').remove();
        $('.add-device-mockup').addClass('hide');
    })

    // đóng
    $('.add-device-mockup').on('click', '.device-close', function () {
        $('.edit-device-save').remove();
        $('.device-add').remove();
        $('.add-device-mockup').addClass('hide');
        console.log('2')
        $('.device-lv').find('.mockup').remove();
    })

    //mockup thêm channel
    // mở
    $('.add-device').on('click', '.add-channel-btn', function () {
        $('.channel-lv').find('.mockup').remove();
        $('.add-channel-mockup').find('#chonch').remove();
        var deviceID = $(this).data('info');
        var deviceType = $(this).data('type');
        checkDeviceType(deviceType);
        var tableName = '.table.' + deviceID;
        var maxchannel = $(this).data('maxch')
        createSelectInputsForLevels('.channel-lv');
        // console.log(maxchannel)

        $('.add-channel-mockup').removeClass('hide');
        var deviceCode = $(this).data('info')
        var channelSavebtn = '<span class="channel-save" data-info="' + deviceCode + '" data-maxch="' + maxchannel + '">Save</span>';
        $('.channel-btns').append(channelSavebtn);
    })

    // lưu
    $('.add-channel-mockup').on('click', '.channel-save', function () {
        var deviceID = $(this).data('info');
        // console.log(deviceID)
        var channel = {
            chonch: $('#chonch').val(),
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
            source: $('#source').is(':checked')
        };

        for (var i = 0; i < projectData.devices.length; i++) {
            var device = projectData.devices[i];
            if (device.code == deviceID) {
                // console.log(device.code)
                projectData.devices[i].channels.push(channel);
                break; // Thoát khỏi vòng lặp sau khi thêm kênh
            }
        }
        // đặt form về mặc định
        $('#chonch').val('');
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
        var $table = $('.device-added-' + deviceID).find('table');
            $('.device-added-' + deviceID).find('table').remove();
            $('.device-added-' + deviceID).append(createchannelTable(deviceID));

        // ẩn mockup
        $('.add-channel-mockup').find('#chonch').remove();
        $('.channel-lv').find('.mockup').remove();
        $('.channel-save').remove();
        $('.add-channel-mockup').addClass('hide');
    })

    // đóng
    $('.add-channel-mockup').on('click', '.channel-close', function () {
        // $('.channel-save').attr('data-info', "");
        $('.add-channel-mockup').find('#chonch').remove();
        $('.channel-lv').find('.mockup').remove();
        $('.channel-save').remove();
        $('.add-channel-mockup').addClass('hide');
        console.log('2')
    })

    // xóa
    $('.add-device-main').on('click', '.delete-channel-btn', function () {
        var channelID = $(this).data('info');
        var deviceID = $(this).data('deviceid');
        if (confirm('Bạn có chắc chắn muốn xóa kênh này không?')) {
            // Lặp qua mảng devices trong projectData
            for (var i = 0; i < projectData.devices.length; i++) {
                var device = projectData.devices[i];
                // Kiểm tra xem mã thiết bị có trùng khớp với deviceID không
                if (device.code == deviceID) {
                    console.log(2)
                    for (var j = 0; j < device.channels.length; j++) {
                        if (device.channels[j].chonch == channelID) {
                            device.channels.splice(j, 1);
                            break; // Thoát khỏi vòng lặp sau khi xóa kênh
                        }
                    }
                    // Sau khi xóa kênh, có thể thoát khỏi vòng lặp vì chỉ cần xóa một kênh duy nhất
                    break;
                }
            }
        }
        var $table = $('.device-added-' + deviceID).find('table');
            console.log(2);
            $table.remove();
            var newTable = createchannelTable(deviceID);
            $('.device-added-' + deviceID).append(newTable);
         $table = $('.device-added-' + deviceID).find('table');
            
            // Kiểm tra xem bảng mới có hàng nào không
            if ($table.find('tbody tr').length == 0) {
                $Table.remove(); // Nếu không có hàng nào, loại bỏ bảng mới
            }
    });

    // tạo bảng kênh
    function createchannelTable(deviceName) {
        var newDevice;
        for (var i = 0; i < projectData.devices.length; i++) {
            if (projectData.devices[i].code == deviceName) {
                console.log(1)
                var foundDevice = projectData.devices[i];
                newDevice =
                    '</div>' +
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
                        '<td>' + channel.chonch + '</td>' +
                        '<td>' + channel.lv1 + '</td>' +
                        '<td>' + channel.lv2 + '</td>' +
                        '<td>' + channel.lv3 + '</td>' +
                        '<td>' + channel.lv4 + '</td>' +
                        '<td class="edit-channel-btn">sửa</td>' +
                        '<td class="delete-channel-btn" data-info="' + channel.chonch + '" data-deviceID="' + foundDevice.code + '">xóa</td>' +
                        '</tr>';
                });

                newDevice += '</tbody>' +
                    '</table>' +
                    '</div>';
            }
        }
        return newDevice;
    }

    //kiểm tra
    // kiểm tra loại thiết bị || thêm các channel vào thiết bị 
    function checkDeviceType(deviceType) {
        // Tạo một ô select mới
        var channelList = $('<select id="chonch" name="chonch">');

        var options;
        if (deviceType == '1k3p') {
            options = ["CH1"];
        }
        if (deviceType == '6k3p') {
            options = ["CH1", "CH2", "CH3", "CH4", "CH5", "CH6"];
        }
        if (deviceType == '6k1p') {
            options = ["A11", "A12", "A13", "A14", "A15", "A16"];
        }
        if (deviceType == '12k3p') {
            options = ["CH1", "CH2", "CH3", "CH4", "CH5", "CH6", "CH7", "CH8", "CH9", "CH10", "CH11", "CH12"];
        }

        // Thêm các lựa chọn vào ô select
        $.each(options, function (index, value) {
            var option = $('<option>', {
                value: value.toLowerCase(),
                text: value
            });
            channelList.append(option); // Thêm lựa chọn vào ô select
        });

        // Trả về ô select đã được tạo
        $('.chonch').append(channelList);
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
                newBlock = '<div class="block block-level-' + (level + 1) + '">' + inputText +
                    '<button class="add-button">+</button>' +
                    '<button class="delete-button">-</button>' +
                    '</div>';
            } else {
                newBlock = '<div class="block block-level-' + (level + 1) + '">' + inputText +
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
    function SaveStructure() {
        jsonStructure.level0 = [];
        $('.container').find('.block-level-1').each(function () {
            var level1Name = $(this).contents().first().text().trim();
            jsonStructure.level0.push({
                "name": level1Name,
                "children": []
            });

            // Duyệt qua các khối cấp độ 2 và lưu tên của mỗi khối vào jsonStructure
            $(this).find('.block-level-2').each(function () {
                var level2Name = $(this).contents().first().text().trim();
                jsonStructure.level0[jsonStructure.level0.length - 1].children.push({
                    "name": level2Name,
                    "children": []
                });

                // Duyệt qua các khối cấp độ 3 và lưu tên của mỗi khối vào jsonStructure
                $(this).find('.block-level-3').each(function () {
                    var level3Name = $(this).contents().first().text().trim();
                    jsonStructure.level0[jsonStructure.level0.length - 1].children[jsonStructure.level0[jsonStructure.level0.length - 1].children.length - 1].children.push({
                        "name": level3Name,
                        "children": []
                    });

                    // Duyệt qua các khối cấp độ 4 và lưu tên của mỗi khối vào jsonStructure
                    $(this).find('.block-level-4').each(function () {
                        var level4Name = $(this).contents().first().text().trim();
                        jsonStructure.level0[jsonStructure.level0.length - 1].children[jsonStructure.level0[jsonStructure.level0.length - 1].children.length - 1].children[jsonStructure.level0[jsonStructure.level0.length - 1].children[jsonStructure.level0[jsonStructure.level0.length - 1].children.length - 1].children.length - 1].children.push({
                            "name": level4Name
                        });
                    });
                });
            });
        });
    }

    // function printData(data, level) {
    //     if (data instanceof jsonStructure) {
    //         data.forEach(function(item, index) {
    //             console.log("level" + level + ":", item.name);
    //             printData(item.children, level + 1);
    //         });
    //     } else if (typeof data === 'object') {
    //         console.log("level" + level + ":", data.name);
    //         printData(data.children, level + 1);
    //     }
    // }

    // // In dữ liệu theo các cấp độ
    // printData(jsonStructure.level0, 0);

    // test phase 2
    function createSelectInputs(level, data) {
        var selectInputs = $('<select class="select-lv">');
        selectInputs.addClass('level' + level + '-inputs');
        selectInputs.prepend('<option value="">-- Select --</option>'); // Add an empty option initially

        // Thêm các lựa chọn cho cấp độ hiện tại
        if (data && data.length > 0) {
            data.forEach(function (item) {
                var option = $('<option>');
                option.text(item.name);
                option.val(item.name);
                selectInputs.append(option);
            });
        }

        return selectInputs;
    }

    // Tạo các ô lựa chọn cho mỗi cấp độ và thêm vào .container
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
        selectInputs.append('<option value="">-- Select --</option>'); // Thêm một lựa chọn rỗng

        // Thêm các lựa chọn cho cấp độ hiện tại dựa trên giá trị đã chọn ở cấp độ trước
        if (dataForLevel && dataForLevel.length > 0) {
            dataForLevel.forEach(function (item) {
                var option = $('<option>');
                option.text(item.name);
                option.val(item.name);
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
});