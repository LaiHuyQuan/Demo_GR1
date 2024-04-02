//  danh sách các thiết bị
var projectData = {
    "projectCode": '',
    "projectName": '',
    "devices": []
}

// structure dự án
var jsonStructure = {
    "level0": []
};

$(document).ready(function () {
    // thêm dự án
    // dự án
    function saveProject() {
        projectData.projectName = $('#ProjectName').val();
        projectData.projectCode = $('#ProjectCode').val();
    }

    // lưu biến 
    $('#add-project').on('click', '.save', function () {
        saveProject();
        var jsonData = projectData.map(obj => JSON.stringify(obj)).join('\n');
        jsonData += '\n';
        jsonData += jsonStructure.map(obj => JSON.stringify(obj)).join('\n');

        // Tạo và tải xuống tệp văn bản
        download('projectData.txt', jsonData);
    })

    // xuất dữ liệu
    $('#add-project').on('click', '.export', function () {
        saveProject();
        downloadProjectData();
    })

    function downloadProjectData() {
        var projectInfo = {
            "projectCode": projectData.projectCode,
            "projectName": projectData.projectName
        };

        // Tạo mảng cho các thiết bị
        var devices = projectData.devices.map(function (device) {
            return {
                "projectCode": projectData.projectCode,
                "deviceCode": device.code,
                "lv1name": device.lv1,
                "lv2name": device.lv2,
                "lv3name": device.lv3,
                "lv4name": device.lv4,
                "lv1Code": device.lv1Code,
                "lv2Code": device.lv2Code,
                "lv3Code": device.lv3Code,
                "lv4Code": device.lv4Code,
                "cabinet": device.cabinet,
                "date": device.date,
                "deviceType": device.deviceType
            };
        });

        // Tạo mảng cho các kênh
        var channels = [];
        projectData.devices.forEach(function (device) {
            var deviceCode = device.code;
            var loadId = 0; // Biến đếm loadid, bắt đầu từ 1 cho mỗi thiết bị
            device.channels.forEach(function (channel) {
                channels.push({
                    "deviceCode": deviceCode,
                    "loadId": loadId++, // Tăng giá trị loadId sau mỗi lần sử dụng và gán vào thuộc tính loadId của kênh
                    "chonch": channel.chonch,
                    "chonpha": channel.pha,
                    "itt": channel.itt,
                    "ptt": channel.ptt,
                    "ct": channel.ct,
                    "type": channel.type,
                    "name": channel.name,
                    "source": channel.source,
                    "lv1name": channel.lv1,
                    "lv2name": channel.lv2,
                    "lv3name": channel.lv3,
                    "lv4name": channel.lv4,
                    "lv1Code": channel.lv1Code,
                    "lv2Code": channel.lv2Code,
                    "lv3Code": channel.lv3Code,
                    "lv4Code": channel.lv4Code,
                    "includeS": channel.includeS,
                    "includeL": channel.includeL,
                    "source": channel.source
                });
            });
        });
        // Chuỗi dữ liệu cho thông tin dự án
        var projectInfoText = projectInfo.map(obj => JSON.stringify(obj)).join('\n');

        // Chuỗi dữ liệu cho danh sách thiết bị
        var devicesText = devices.map(device => JSON.stringify(device)).join('\n');

        // Chuỗi dữ liệu cho danh sách kênh
        var channelsText = channels.map(channel => JSON.stringify(channel)).join('\n');

        // Kết hợp các chuỗi dữ liệu thành một chuỗi duy nhất
        var data = projectInfoText + '\n\n' + devicesText + '\n\n' + channelsText;

        // Tải dữ liệu xuống dưới dạng tệp văn bản
        download('project_data.txt', data);
    }

    function download(filename, text) {
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    }

    // ẩn/hiện danh sách kênh
    $('.add-device-main').on('click', '.fa-caret-down', function () {
        var deviceID = $(this).data('info');
        var $table = $(this).parent().parent().find('table');
        if ($table.length > 0) {
            $table.remove();
        } else {
            $(this).parent().parent().append(createchannelTable(deviceID));
        }
        var newTable = $('.device-added-' + deviceID).find('table');

        // Kiểm tra xem bảng mới có hàng nào không
        var tableExist = $('.device-added-' + deviceID).find('table');
        if (tableExist.length > 0) {
            var rowCount = newTable.find('tbody tr').length;
            if (rowCount === 0) {
                tableExist.remove(); // Loại bỏ bảng nếu không có hàng nào
                alert("Thiết bị chưa có kênh nào");
            }
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

            // Duyệt qua các khối cấp độ 2 và lưu tên của mỗi khối vào jsonStructure
            $(this).find('.block-level-2').each(function () {
                var levelInfo = $(this).contents().first().text().trim();
                var match2 = levelInfo.match(/^(.+?)\s*\(code:\s*(.+?)\)$/);
                jsonStructure.level0[jsonStructure.level0.length - 1].children.push({
                    "name": match2[1],
                    "code": match2[2],
                    "children": []
                });

                // Duyệt qua các khối cấp độ 3 và lưu tên của mỗi khối vào jsonStructure
                $(this).find('.block-level-3').each(function () {
                    var levelInfo = $(this).contents().first().text().trim();
                    var match3 = levelInfo.match(/^(.+?)\s*\(code:\s*(.+?)\)$/);
                    jsonStructure.level0[jsonStructure.level0.length - 1].children[jsonStructure.level0[jsonStructure.level0.length - 1].children.length - 1].children.push({
                        "name": match3[1],
                        "code": match3[2],
                        "children": []
                    });

                    // Duyệt qua các khối cấp độ 4 và lưu tên của mỗi khối vào jsonStructure
                    $(this).find('.block-level-4').each(function () {
                        var levelInfo = $(this).contents().first().text().trim();
                        var match4 = levelInfo.match(/^(.+?)\s*\(code:\s*(.+?)\)$/);
                        jsonStructure.level0[jsonStructure.level0.length - 1].children[jsonStructure.level0[jsonStructure.level0.length - 1].children.length - 1].children[jsonStructure.level0[jsonStructure.level0.length - 1].children[jsonStructure.level0[jsonStructure.level0.length - 1].children.length - 1].children.length - 1].children.push({
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

        if (checkDuplicateNameAndCodeInBlock($(this).parent())) {
            alert('không hợp lệ')
            return; // Nếu có trùng lặp hoặc giá trị rỗng, dừng lại
        }

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

    // mockup thêm thiết bị
    // mở 
    $('#add-project').on('click', '.add-device-btn', function () {
        $('.add-device-mockup').removeClass('hide');
        createSelectInputsForLevels('.device-lv');
        var addDeviceIndex = '<button type="reset" class="btn btn-primary me-1 mb-1 device-add">Save</button>'
        $('.device-btns').append(addDeviceIndex);
        $('#ma').focus();
    })

    // sửa
    $('.add-device').on('click', '.edit-device-btn', function () {
        $(this).parent().addClass('editing')
        $('.add-device-mockup').removeClass('hide');
        $('.add-device-mockup').find('.loaitb').prop('disabled', true);

        var deviceCode = $(this).data('info');
        createSelectInputsForLevels('.device-lv');
        for (var i = 0; i < projectData.devices.length; i++) {
            var device = projectData.devices[i];
            if (device.code == deviceCode) {
                $('#ma').val(device.code);
                $('#cabinet').val(device.cabinet);
                $('#ngay').val(device.date);
                $('.level1-inputs').val(device.lv1);
                populateSelectOptionsForLevel(device.lv1, 2);
                $('.level2-inputs').val(device.lv2);
                populateSelectOptionsForLevel(device.lv2, 3);
                $('.level3-inputs').val(device.lv3);
                populateSelectOptionsForLevel(device.lv3, 4);
                $('.level4-inputs').val(device.lv4);
                $('#loaitb').val(device.deviceType);
            }
        }

        var editDeviceIndex = '<button type="reset" class="btn btn-primary me-1 mb-1 edit-device-save" data-info="' + deviceCode + '">Save</button>';
        $('.device-btns').append(editDeviceIndex)
    })

    // lưu sau khi sửa
    $('.add-device-mockup').on('click', '.edit-device-save', function () {
        var deviceCode = $('.editing').data('info');
        $('.add-device-mockup').find('.loaitb').prop('disabled', false);
        for (var i = 0; i < projectData.devices.length; i++) {
            var device = projectData.devices[i];
            if (device.code == deviceCode) {
                device.code = $('#ma').val();
                device.cabinet = $('#cabinet').val();
                device.date = $('#ngay').val();
                device.lv1 = $('.level1-inputs').val();
                device.lv2 = $('.level2-inputs').val();
                device.lv3 = $('.level3-inputs').val();
                device.lv4 = $('.level4-inputs').val();
                device.lv1code = $('.level1-inputs').find('option:selected').data('code');
                device.lv2code = $('.level2-inputs').find('option:selected').data('code');
                device.lv3code = $('.level3-inputs').find('option:selected').data('code');
                device.lv4code = $('.level4-inputs').find('option:selected').data('code');
                break; // Kết thúc vòng lặp khi tìm thấy thiết bị cần chỉnh sửa
            }
        }
        $('.editing').removeClass('editing');
        $('.edit-device-save').remove();
        $('.add-device-mockup').addClass('hide');
        $('.device-lv').find('.mockup').remove();
    });

    // xóa
    $('.add-device').on('click', '.delete-device-btn', function () {
        var deviceID = $(this).data('info')
        var check = confirm('Are you sure you want to delete?');
        if (check) {
            $(this).parent().parent().remove();
        }
        else {
            return;
        }
        for (var i = 0; i < projectData.devices.length; i++) {
            var device = projectData.devices[i];
            if (device.code == deviceID) {
                projectData.devices.splice(i, 1);
                break;
            }
        }
        $('.menu').find('.device-added-' + deviceID).remove();
    })

    // thêm
    $('.add-device-mockup').on('click', '.device-add', function () {
        // đọc dữ liệu
        if ($('#ma').val() === '' || $('#loaitb').val() === '' || $('#loaitb').val() === null) {
            alert('Điền đủ mã thiết bị và loại thiết bị');
            return;
        }

        var device = {
            code: $('#ma').val(),
            cabinet: $('#cabinet').val() || 0,
            date: $('#ngay').val() || 0,
            lv1: $('.level1-inputs').val() || 0,
            lv2: $('.level2-inputs').val() || 0,
            lv3: $('.level3-inputs').val() || 0,
            lv4: $('.level4-inputs').val() || 0,
            lv1code: $('.level1-inputs').find('option:selected').data('code'),
            lv2code: $('.level2-inputs').find('option:selected').data('code'),
            lv3code: $('.level3-inputs').find('option:selected').data('code'),
            lv4code: $('.level4-inputs').find('option:selected').data('code'),
            deviceType: $('#loaitb').val(),
            channels: [],
        };

        // kiểm tra mã thiết bị
        for (var i = 0; i < projectData.devices.length; i++) {
            var check = projectData.devices[i];
            if (device.code == check.code) {
                alert('Mã thiết bị đã tồn tại');
                return;
            }
        }

        // thêm thiết bị vào data
        projectData.devices.push(device);

        var newDevices = '<li class="sidebar-item  ">' +
            '<div class="device-added device-added-' + device.code + '">' +
            '<div class="device-hd" data-info="' + device.code + '">' +
            '<span>' + device.code + ' - ' + device.deviceType + '</span>' +
            '</li>'
        $('.menu').append(newDevices)

        // đặt lại giá trị về mặc định
        $('#ma').val('');
        $('#cabinet').val('');
        $('#ngay').val('');
        $('#loaitb').val('');

        // ẩn mockup
        $('.device-lv').find('.mockup').remove();
        $('.device-add').remove();
        $('.add-device-mockup').addClass('hide');
    })

    function addProject(device) {
        var newDevice = '<div class="device-added device-added-' + device.code + '" data-info="' + device.code + '">' +
            '<div class="device-hd" data-info="' + device.code + '">' +
            '<span>' + device.code + ' - ' + device.cabinet + ' - ' + device.date + ' - ' + device.deviceType + '</span>' +
            '<span class="edit-device-btn" data-info="' + device.code + '"><i class="fa-solid fa-pen-to-square"></i> Edit Device</span>' +
            '<span class="delete-device-btn" data-info="' + device.code + '"><i class="fa-solid fa-trash"></i> Delete Device</span>' +
            '<span class="add-channel-btn" style="margin-right:10px" data-info="' + device.code + '" data-type="' + device.deviceType + '"><i class="fa-solid fa-plus"></i> Add channel</span>' +
            '<i class="fa-solid fa-caret-down" data-info="' + device.code + '"></i>';


        // Thêm đối tượng mới vào DOM
        $('.add-device-main').append(newDevice);

        if (device.channels && device.channels.length > 0) {
            $('.device-added-' + device.code).find('table').remove();
            $('.device-added-' + device.code).append(createchannelTable(device.code));
        }
    }

    $('.menu').on('click', '.device-hd', function () {
        $('.color-gray').removeClass('color-gray');
        $(this).toggleClass('color-gray');
        var deviceID = $(this).data('info');
        $('#main').find('.device-added').remove();
        for (var i = 0; i < projectData.devices.length; i++) {
            var device = projectData.devices[i];
            if (device.code == deviceID) {
                addProject(device);
            }

        }
    })

    // đóng
    $('.add-device-mockup').on('click', '.device-close', function (event) {
        event.preventDefault()
        $('.edit-device-save').remove();
        $('.device-add').remove();
        $('.add-device-mockup').find('.loaitb').prop('disabled', false);
        $('.add-device-mockup').addClass('hide');
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
        createSelectInputsForLevels('.channel-lv');

        $('.add-channel-mockup').removeClass('hide');
        var channelSavebtn = '<button type="reset" class="btn btn-primary me-1 mb-1 channel-save" data-info="' + deviceID + '">Save</button>';
        $('.channel-btns').append(channelSavebtn);
    });

    // sửa
    $('.add-device').on('click', '.edit-channel-btn', function () {
        // $('.channel-lv').find('.mockup').remove();
        // $('.add-channel-mockup').find('#chonch').remove();
        var deviceID = $(this).data('deviceid');
        var channelID = $(this).data('info')
        var deviceType = $(this).data('type');
        checkDeviceType(deviceType);
        createSelectInputsForLevels('.channel-lv');
        $('.add-channel-mockup').find('#chonch').prop('disabled', true);
        $('.add-channel-mockup').find('#chonpha').prop('disabled', true);

        for (var i = 0; i < projectData.devices.length; i++) {
            var device = projectData.devices[i];
            for (var j = 0; j < device.channels.length; j++) {
                var channel = device.channels[j];
                if (channel.chonch == channelID) {
                    $('#chonpha').val(channel.pha);
                    checkPhase(channel.pha, deviceType);
                    $('#chonch').val(channel.chonch);
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
        var channelSavebtn = '<button type="reset" class="btn btn-primary me-1 mb-1 edit-channel-save" data-info="' + deviceID + '" data-chonch="' + channel.chonch + '">Save</button>'
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
                    channel.pha = $('#chonpha').val();
                    channel.chonch = $('#chonch').val();
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
        $('.device-added-' + deviceID).append(createchannelTable(deviceID));

        // ẩn mockup
        $('.add-channel-mockup').find('#chonpha').remove();
        $('.add-channel-mockup').find('#chonch').remove();
        $('.channel-lv').find('.mockup').remove();
        $('.edit-channel-save').remove();
        $('.add-channel-mockup').addClass('hide'
        );
    });

    // lưu
    $('.add-channel-mockup').on('click', '.channel-save', function () {
        var deviceID = $(this).data('info');
        if ($('#chonch').val() == '') {
            alert('Hãy chọn kênh');
            return;
        };
        if (!checkChannel($('#chonch').val(), deviceID)) {
            alert('Kênh đã tồn tại');
            return;
        }

        var channel = {
            pha: $('#chonpha').val(),
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
        $('.device-added-' + deviceID).find('table').remove();
        $('#main').find('.device-added-' + deviceID).append(createchannelTable(deviceID));

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

        // Kiểm tra xem bảng mới có hàng nào không
        if (newTable.find('tbody tr').length == 0) {
            newTable.remove(); // Nếu không có hàng nào, loại bỏ bảng mới
        }
    });

    // tạo bảng kênh
    function createchannelTable(deviceID) {
        var newDevice;
        for (var i = 0; i < projectData.devices.length; i++) {
            if (projectData.devices[i].code == deviceID) {
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
                        '<td>' + channel.chonch.toUpperCase() + '</td>' +
                        '<td>' + channel.lv1 + '</td>' +
                        '<td>' + channel.lv2 + '</td>' +
                        '<td>' + channel.lv3 + '</td>' +
                        '<td>' + channel.lv4 + '</td>' +
                        '<td class="edit-channel-btn" data-info="' + channel.chonch + '" data-deviceID="' + foundDevice.code + '" data-type="' + foundDevice.deviceType + '">sửa</td>' +
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
        var chonPha = $('<select id="chonpha" name="chonpha" data-info="' + deviceType + '">');
        var channelList = $('<select id="chonch" name="chonch">');
        channelList.prepend('<option value="">-- Select --</option>');

        var pha, options1;
        if (deviceType == '1k3p') {
            pha = ['1 pha', '3 pha'];
            options1 = ["CH1"];
        }
        if (deviceType == '6k3p') {
            pha = ['1 pha', '3 pha'];
            options1 = ["CH1", "CH2", "CH3", "CH4", "CH5", "CH6"];
        }
        if (deviceType == '6k1p') {
            pha = ['1 pha'];
            options1 = ["A11", "A12", "A13", "A14", "A15", "A16"];
        }
        if (deviceType == '12k3p') {
            pha = ['1 pha', '3 pha'];
            options1 = ["CH1", "CH2", "CH3", "CH4", "CH5", "CH6", "CH7", "CH8", "CH9", "CH10", "CH11", "CH12"];
        }

        pha.forEach(function (item) {
            var phase = $('<option>', {
                value: item.toLowerCase(),
                text: item
            });
            chonPha.append(phase);
        });

        $.each(options1, function (index, value) {
            var option = $('<option>', {
                value: value.toLowerCase(),
                text: value
            });
            channelList.append(option);
        });

        // Thêm ô select pha vào DOM
        $('.chonch').append(chonPha);
        $('.chonch').append(channelList);
    }

    // kiểm tra pha 
    $(document).on('change', '#chonpha', function () {
        var deviceType = $(this).data('info');
        var selectedPhase = $(this).val();

        checkPhase(selectedPhase, deviceType);

    });

    // kiểm tra lựa chọn pha
    function checkPhase(phase, deviceType) {

        var channelList = $('#chonch');
        var options1, options2;
        if (deviceType == '1k3p') {
            options1 = ["CH1"];
            options2 = ["P1", "P2", "P3"];
        }
        if (deviceType == '6k3p') {
            options1 = ["CH1", "CH2", "CH3", "CH4", "CH5", "CH6"];
            options2 = ["A11", "A21", "A31", "A12", "A22", "A32", "A31", "A32", "A33", "A14", "A24", "A34", "A15", "A25", "A35", "A16", "A26", "A36"];
        }
        if (deviceType == '6k1p') {
            options1 = ["A11", "A12", "A13", "A14", "A15", "A16"];
        }
        if (deviceType == '12k3p') {
            options1 = ["CH1", "CH2", "CH3", "CH4", "CH5", "CH6", "CH7", "CH8", "CH9", "CH10", "CH11", "CH12"];
            options2 = ["A11", "A21", "A31", "A12", "A22", "A32", "A13", "A33", "A33", "A14", "A24", "A34", "A15", "A25", "A35", "A16", "A26", "A36",
                "A41", "A51", "A61", "A42", "A52", "A62", "A43", "A53", "A63", "A44", "A54", "A64", "A45", "A55", "A65", "A46", "A56", "A66"];
        }

        var options;
        if (phase == '1 pha') {
            options = options1;
        } else if (phase == '3 pha') {
            options = options2;
        }

        // Xóa các option hiện có trong select
        channelList.empty();

        // Thêm các option mới vào select
        $.each(options, function (index, value) {
            var option = $('<option>', {
                value: value.toLowerCase(),
                text: value
            });
            channelList.append(option);
        });
    }

    // kiểm tra list kênh
    function checkChannel(channelID, deviceID) {
        var mapping = {
            "ch1": ["a11", "a21", "a31", "p1", "p2", "p3"],
            "ch2": ["a12", "a22", "a32"],
            "ch3": ["a13", "a23", "a33"],
            "ch4": ["a14", "a24", "a34"],
            "ch5": ["a15", "a25", "a35"],
            "ch6": ["a16", "a26", "a36"],
            "ch7": ["a41", "a51", "a61"],
            "ch8": ["a42", "a52", "a62"],
            "ch9": ["a43", "a53", "a63"],
            "ch10": ["a44", "a54", "a64"],
            "ch11": ["a45", "a55", "a65"],
            "ch12": ["a46", "a56", "a66"]
        };
        var reversedMapping = {};
        for (var key in mapping) {
            if (mapping.hasOwnProperty(key)) {
                var values = mapping[key];
                for (var i = 0; i < values.length; i++) {
                    var value = values[i];
                    if (!reversedMapping.hasOwnProperty(value)) {
                        reversedMapping[value] = [];
                    }
                    reversedMapping[value].push(key);
                }
            }
        }

        var Values = mapping[channelID];

        var result = checkChannelExistence(channelID, deviceID);
        if (!result) {
            return false; // Nếu kết quả là false, trả về false ngay lập tức
        }

        if (channelID in mapping) {
            for (var i = 0; i < Values.length; i++) {
                result = checkChannelExistence(Values[i], deviceID);
                if (!result) {
                    return false; // Nếu kết quả là false, trả về false ngay lập tức
                }
            }
        } else {
            for (var key in reversedMapping) {
                if (reversedMapping.hasOwnProperty(key)) {
                    var values = reversedMapping[key];
                    if (values.includes(channelID)) {
                        result = checkChannelExistence(key, deviceID);
                        if (!result) {
                            return false;
                        }
                    }
                }
            }
        }
        return true;
    }

    // kiểm tra chọn kênh
    function checkChannelExistence(selectedValue, deviceID) {
        for (var i = 0; i < projectData.devices.length; i++) {
            var device = projectData.devices[i];
            if (device.code == deviceID) {
                for (var j = 0; j < device.channels.length; j++) {
                    var channel = device.channels[j];
                    if (channel.chonch == selectedValue) {
                        return false;
                    }
                }
            }
        }
        return true;
    }

    // kiểm tra tên và code cấp độ
    function checkDuplicateNameAndCodeInBlock(block) {
        var names = {};
        var codes = {};

        block.find('.block').each(function () {
            var nameInput = $('.add-input');
            var codeInput = $('.add-code');

            var name = nameInput.val().trim();
            var code = codeInput.val().trim();

            if (name == "") {
                return true; // Rỗng, trả về true
            }

            if (code == "") {
                return true; // Rỗng, trả về true
            }

            // Kiểm tra xem tên đã tồn tại chưa
            if (names[name]) {
                return true; // Trùng lặp, trả về true
            } else {
                names[name] = true; // Lưu trữ tên vào đối tượng
            }

            // Kiểm tra xem mã đã tồn tại chưa
            if (codes[code]) {
                return true; // Trùng lặp, trả về true
            } else {
                codes[code] = true; // Lưu trữ mã vào đối tượng
            }
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


    // test
    var drawings = []; // Mảng lưu trữ các hình vẽ

    function updateCanvasSize() {
        // Lấy canvas
        var canvas = $('.yourCanvas')[0];

        // Lưu lại dữ liệu đã vẽ
        var ctx = canvas.getContext('2d');
        drawings.push(ctx.getImageData(0, 0, canvas.width, canvas.height));

        // Cập nhật kích thước cho canvas
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        // Vẽ lại các hình đã vẽ trước đó
        for (var i = 0; i < drawings.length; i++) {
            ctx.putImageData(drawings[i], 0, 0);
        }
    }

    // Bắt đầu xử lý khi tài liệu đã sẵn sàng
    var img = new Image();
    img.onload = function () {
        var canvas = $('.yourCanvas')[0];
        var ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        // Gọi updateCanvasSize() sau khi canvas đã được vẽ
        updateCanvasSize();

        // Sự kiện resize
        $(window).resize(function () {
            updateCanvasSize();
        });

        // Sự kiện zoom (mặc định không có sự kiện zoom trong jQuery,
        // bạn có thể cần sử dụng một thư viện hoặc cách khác để xử lý sự kiện này)
    };

    // Thay đổi đường dẫn của hình ảnh của bạn ở đây
    img.src = './assets/img/test.png';
    // end
});