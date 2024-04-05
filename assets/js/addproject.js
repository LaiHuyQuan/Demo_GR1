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
                if (channel.chonpha == "3 pha") {
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
                    var Values = mapping[deviceCode]
                    loadId++
                    for (var i = 0; i < Values.length; i++) {
                        channels.push({
                            "deviceCode": deviceCode,
                            "loadId": loadId, // Tăng giá trị loadId sau mỗi lần sử dụng và gán vào thuộc tính loadId của kênh
                            "chonch": Values[i],
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
                    }

                }
                else {
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
                }
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
            '<div class="device-hd" data-info="' + device.code + '" data-type="' + device.deviceType + '">' +
            '<span>' + device.code + ' - ' + device.deviceType + '</span>' +
            '</li>'
        $('.menu').append(newDevices)

        $('.color-gray').removeClass('color-gray');
        $(this).toggleClass('color-gray');
        $('#main').find('.device-added').remove();
        addProject(device);

        switch (device.deviceType) {
            case '1k3p': addChannelList1k3p(device.code);
                break;
            case '6k1p': addChannelList6k1p(device.code);
                break;
            case '6k3p': addChannelList6k3p(device.code);
                break;
            case '12k3p': addChannelList12k3p(device.code);
                break;
        }

        initializeTooltips();

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
            '<div class="channel-list" data-info="' + device.code + '"></div>' +
            '<div class="device-hd" data-info="' + device.code + '">' +
            '<span>' + device.code + ' - ' + device.cabinet + ' - ' + device.date + ' - ' + device.deviceType + '</span>' +
            '<span class="edit-device-btn" data-info="' + device.code + '"><i class="fa-solid fa-pen-to-square"></i> Edit Device</span>' +
            '<span class="delete-device-btn" data-info="' + device.code + '"><i class="fa-solid fa-trash"></i> Delete Device</span>';
        // '<span class="add-channel-btn" style="margin-right:10px" data-info="' + device.code + '" data-type="' + device.deviceType + '"><i class="fa-solid fa-plus"></i> Add channel</span>' +
        // '<i class="fa-solid fa-caret-down" data-info="' + device.code + '"></i>';

        // Thêm đối tượng mới vào DOM
        $('.add-device-main').append(newDevice);
        if (device.channels && device.channels.length > 0) {
            $('.device-added-' + device.code).find('table').remove();
            $('.device-added-' + device.code).find('table').append(createchannelTable(device.code));
        }
    }

    $('.menu').on('click', '.device-hd', function () {
        $('.color-gray').removeClass('color-gray');
        $(this).toggleClass('color-gray');
        var deviceID = $(this).data('info');
        var deviceType = $(this).data('type')
        $('#main').find('.device-added').remove();
        for (var i = 0; i < projectData.devices.length; i++) {
            var device = projectData.devices[i];
            if (device.code == deviceID) {
                addProject(device);
            }
        }
        console.log(2)
        switch (deviceType) {
            case '1k3p': addChannelList1k3p(deviceID);
                console.log(deviceID);
                console.log(3)
                break;
            case '6k1p': addChannelList6k1p(deviceID);
                break;
            case '6k3p': addChannelList6k3p(deviceID);
                break;
            case '12k3p': addChannelList12k3p(deviceID);
                break;
        }

        initializeTooltips();
    })

    function addChannelList1k3p(deviceID) {
        console.log(deviceID)
        var channelList = ['CT A', 'CT B', 'CT C']
        var PhaseA = $('<div></div>').addClass('PhaseA');
        for (var i = 1; i <= 3; i++) {
            var chonch = 'P' + i;
            var button = createSVGButton(deviceID, chonch, channelList[i - 1]);
            PhaseA.append(button);
        }
        $('.channel-list').append(PhaseA);

    }

    function addChannelList6k1p(deviceID) {
        var channelList = ['C6', 'C5', 'C4', 'C3', 'C2', 'C1']
        var PhaseA = $('<div></div>').addClass('PhaseA');
        for (var i = 6; i >= 1; i--) {
            var chonch = 'A1' + i;
            var button = createSVGButton(deviceID, chonch, channelList[i - 1]);
            PhaseA.append(button);
        }
        $('.channel-list').append(PhaseA);
    }

    function addChannelList6k3p(deviceID) {
        console.log(deviceID)
        var channelList = ['01', '02', '03', '04', '05', '06']
        var PhaseA = $('<div></div>').addClass('PhaseA');
        for (var i = 1; i <= 6; i++) {
            var chonch = 'A1' + i;
            var button = createSVGButton(deviceID, chonch, channelList[i - 1]);
            PhaseA.append(button);
        }
        $('.channel-list').append(PhaseA);
        var PhaseB = $('<div></div>').addClass('PhaseB');
        for (var i = 1; i <= 6; i++) {
            var chonch = 'A2' + i;
            var button = createSVGButton(deviceID, chonch, channelList[i - 1]);
            PhaseB.append(button);
        }
        $('.channel-list').append(PhaseB);
        var PhaseC = $('<div></div>').addClass('PhaseC');
        for (var i = 1; i <= 6; i++) {
            var chonch = 'A3' + i;
            var button = createSVGButton(deviceID, chonch, channelList[i - 1]);
            PhaseC.append(button);
        }
        $('.channel-list').append(PhaseC);
    }

    function addChannelList12k3p(deviceID) {
        var channelList = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
        var PhaseA = $('<div></div>').addClass('PhaseA');
        for (var i = 1; i <= 6; i++) {
            var chonch = 'A1' + i;
            var button = createSVGButton(deviceID, chonch, channelList[i - 1]);
            PhaseA.append(button);
        }
        for (var i = 1; i <= 6; i++) {
            var chonch = 'A4' + i;
            var button = createSVGButtonBot(deviceID, chonch, channelList[i + 5]);
            PhaseA.append(button);
        }
        $('.channel-list').append(PhaseA);
        var PhaseB = $('<div></div>').addClass('PhaseB');
        for (var i = 1; i <= 6; i++) {
            var chonch = 'A2' + i;
            var button = createSVGButton(deviceID, chonch, channelList[i - 1]);
            PhaseB.append(button);
        }
        for (var i = 1; i <= 6; i++) {
            var chonch = 'A5' + i;
            var button = createSVGButtonBot(deviceID, chonch, channelList[i + 5]);
            PhaseB.append(button);
        }
        $('.channel-list').append(PhaseB);
        var PhaseC = $('<div></div>').addClass('PhaseC');
        for (var i = 1; i <= 6; i++) {
            var chonch = 'A3' + i;
            var button = createSVGButton(deviceID, chonch, channelList[i - 1]);
            PhaseC.append(button);
        } for (var i = 1; i <= 6; i++) {
            var chonch = 'A6' + i;
            var button = createSVGButtonBot(deviceID, chonch, channelList[i + 5]);
            PhaseC.append(button);
        }
        $('.channel-list').append(PhaseC);
    }

    // đóng
    $('.add-device-mockup').on('click', '.device-close', function (event) {
        event.preventDefault()
        $('.edit-device-save').remove();
        $('.device-add').remove();
        $('.add-device-mockup').find('.loaitb').prop('disabled', false);
        $('.add-device-mockup').addClass('hide');
        $('.device-lv').find('.mockup').remove();
    })

    function createSVGButton(deviceID, chonch, text) {
        // console.log(deviceID)
        var div = $('<div></div>')
            .addClass('channel')
            .addClass('channel-' + chonch)
            .data('chonch', chonch)
            .data('chonpha', '1 pha')
            .data('deviceid', deviceID)
            .attr('data-bs-toggle', 'tooltip')
            .attr('data-bs-placement', 'top')
            .prop('title', chonch);

        console.log(div.data('deviceid'))
        console.log(div.data('chonch'))
        console.log(div.data('chonpha'))
        var svg = '<img src="./assets/img/test.svg" alt="">'
        div.append(svg);
        var span = $('<span></span>').text(text);
        div.append(span);
        return div;
    }

    function createSVGButtonBot(deviceID, chonch, text) {
        // console.log(deviceID)
        var div = $('<div></div>')
            .addClass('channel')
            .addClass('channel-' + chonch)
            .data('chonch', chonch)
            .data('chonpha', '1 pha')
            .data('deviceid', deviceID)
            .attr('data-bs-toggle', 'tooltip')
            .attr('data-bs-placement', 'bottom')
            .prop('title', chonch);

        console.log(div.data('deviceid'))
        console.log(div.data('chonch'))
        console.log(div.data('chonpha'))
        var svg = '<img src="./assets/img/test.svg" alt="">'
        div.append(svg);
        var span = $('<span></span>').text(text);
        div.append(span);
        return div;
    }

    $('input').on('keypress keydown', function (event) {
        if (event.which === 13) {
            event.preventDefault();
        }
    });

    function initializeTooltips() {
        $('#main').children().each(function () {
            $(this).find('.channel').each(function () {
                $(this).tooltip({
                    placement: $(this).data('bs-placement'),
                    title: $(this).attr('title'),
                });
            });
        });
    }

    // test

    addChannelList12k3p()
    // end
});

