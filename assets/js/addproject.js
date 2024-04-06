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

//mapping
var mapping = {
    "CH1": ["A11", "A21", "A31", "P1", "P2", "P3"],
    "CH2": ["A12", "A22", "A32"],
    "CH3": ["A13", "A23", "A33"],
    "CH4": ["A14", "A24", "A34"],
    "CH5": ["A15", "A25", "A35"],
    "CH6": ["A16", "A26", "A36"],
    "CH7": ["A41", "A51", "A61"],
    "CH8": ["A42", "A52", "A62"],
    "CH9": ["A43", "A53", "A63"],
    "CH10": ["A44", "A54", "A64"],
    "CH11": ["A45", "A55", "A65"],
    "CH12": ["A46", "A56", "A66"]
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
        var mappingchannel = {
            "CH1": ["A11", "A21", "A31"],
            "CH2": ["A12", "A22", "A32"],
            "CH3": ["A13", "A23", "A33"],
            "CH4": ["A14", "A24", "A34"],
            "CH5": ["A15", "A25", "A35"],
            "CH6": ["A16", "A26", "A36"],
            "CH7": ["A41", "A51", "A61"],
            "CH8": ["A42", "A52", "A62"],
            "CH9": ["A43", "A53", "A63"],
            "CH10": ["A44", "A54", "A64"],
            "CH11": ["A45", "A55", "A65"],
            "CH12": ["A46", "A56", "A66"]
        };
    
        // Tạo mảng cho thông tin dự án
        var projectInfo = {
            "Project": [{
                "projectCode": projectData.projectCode,
                "projectName": projectData.projectName
            }]
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
                "lv1Code": device.lv1Code  || 0,
                "lv2Code": device.lv2Code  || 0,
                "lv3Code": device.lv3Code  || 0,
                "lv4Code": device.lv4Code || 0,
                "cabinet": device.cabinet,
                "date": device.date,
                "deviceType": device.deviceType
            };
        });
    
        // Tạo mảng cho các kênh
        var channels = [];
    
        projectData.devices.forEach(function (device) {
            var deviceCode = device.code;
            var loadId = 0;
    
            device.channels.forEach(function (channel) {
                var loadIdTemp = loadId;
                var channelData = {
                    "deviceID": deviceCode,
                    "chonpha": channel.chonpha,
                    "loadId": loadIdTemp,
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
                    "lv1Code": channel.lv1Code || 0,
                    "lv2Code": channel.lv2Code || 0,
                    "lv3Code": channel.lv3Code || 0,
                    "lv4Code": channel.lv4Code || 0,
                    "includeS": channel.includeS,
                    "includeL": channel.includeL,
                    "sourceFr": channel.sourceFr
                };
    
                if (channel.chonpha == "3 pha") {
                    var phase = ["A", "B", "C"]
                        for(var i=0 ; i < 3; i++) {
                            channels.push(Object.assign({}, channelData, { "chonch": channel.chonch +'-'+ phase[i]}));
                        };
                } else {
                    channels.push(Object.assign({}, channelData, { "chonch": channel.chonch }));
                }
                loadId++;
            });
        });
    
        // Chuỗi dữ liệu cho danh sách thiết bị
        var devicesText = JSON.stringify(devices, null, 2);
    
        // Chuỗi dữ liệu cho danh sách kênh
        var channelsText = JSON.stringify(channels, null, 2);
    
        // Kết hợp các chuỗi dữ liệu thành một object
        var data = {
            ...projectInfo,
            "Devices": devices,
            "Channels": channels
        };
    
        // Tải dữ liệu xuống dưới dạng tệp văn bản
        download('project_data.txt', JSON.stringify(data, null, 2));
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
            '<div style="border:1px #fff solid; padding-top:20px">' +
            '<div class="channel-diagram"></div>' +
            '<div class="channel-list" data-info="' + device.code + '"></div>' +
            '</div>' +
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
            $('#main').find('.device-added-' + device.code).append(createchannelTable(device.code));
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
        switch (deviceType) {
            case '1k3p': addChannelList1k3p(deviceID);
                break;
            case '6k1p': addChannelList6k1p(deviceID);
                break;
            case '6k3p': addChannelList6k3p(deviceID);
                break;
            case '12k3p': addChannelList12k3p(deviceID);
                break;
        }
        if (device.channels && device.channels.length > 0) {
            $('.device-added-' + device.code).find('table').remove();
            $('#main').find('.device-added-' + device.code).append(createchannelTable(device.code));
        }

        for (var i = 0; i < projectData.devices.length; i++) {
            if (projectData.devices[i].code == deviceID) {
                var foundDevice = projectData.devices[i];
                for (var j = 0; j < foundDevice.channels.length; j++) {
                    console.log(0)
                    if (mapping.hasOwnProperty(foundDevice.channels[j].chonch)) {
                        console.log(1)
                        var Values = mapping[foundDevice.channels[j].chonch];
                        for (var k = 0; k < Values.length; k++) {
                            $('#main').find('.device-added-' + deviceID).find('.channel-' + Values[k]).addClass('created');
                        }
                    }
                    $('#main').find('.device-added-' + deviceID).find('.channel-' + foundDevice.channels[j].chonch).addClass('created');
                }
            }
        }

        initializeTooltips();
    })

    function addChannelList1k3p(deviceID) {
        var list = ['CH1'];
        for (var i = 0; i < list.length; i++) {
            var chonch = list[i];
            var channelID = i + 1;
            $('.channel-diagram').append(createChannelLink(channelID, chonch, deviceID));
        }
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
        var list = ['CH1', 'CH2', 'CH3', 'CH4', 'CH5', 'CH6'];
        for (var i = 0; i < list.length; i++) {
            var chonch = list[i];
            var channelID = i + 1; // Sử dụng chỉ số i + 1 để tạo ID cho mỗi kênh
            $('.channel-diagram').append(createChannelLink(channelID, chonch, deviceID));
        }
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
        var list = ['CH1', 'CH2', 'CH3', 'CH4', 'CH5', 'CH6', 'CH7', 'CH8', 'CH9', 'CH10', 'CH11', 'CH12'];
        for (var i = 0; i < list.length; i++) {
            var chonch = list[i];
            var channelID = i + 1; // Sử dụng chỉ số i + 1 để tạo ID cho mỗi kênh
            $('.channel-diagram').append(createChannelLink(channelID, chonch, deviceID));
        }

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
        var div = $('<div></div>')
            .addClass('channel')
            .addClass('channel-' + chonch)
            .data('chonch', chonch)
            .data('chonpha', '1 pha')
            .data('deviceid', deviceID)
            .attr('data-bs-toggle', 'tooltip')
            .attr('data-bs-placement', 'top')
            .prop('title', chonch);

        var svg = '<img src="./assets/img/test.svg" alt="">'
        div.append(svg);
        var span = $('<span></span>').text(text);
        div.append(span);
        return div;
    }

    function createSVGButtonBot(deviceID, chonch, text) {
        var div = $('<div></div>')
            .addClass('channel')
            .addClass('channel-' + chonch)
            .data('chonch', chonch)
            .data('chonpha', '1 pha')
            .data('deviceid', deviceID)
            .attr('data-bs-toggle', 'tooltip')
            .attr('data-bs-placement', 'bottom')
            .prop('title', chonch);

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

    //  test
    function createChannelLink(i, chonch, deviceID) {
        var html = '<div class="channel-link-' + i + ' channel-link" data-info="' + chonch + '">' +
            '<span class="' + chonch + '-channel channel1phase" data-chonch="' + chonch + '" data-chonpha="3 pha" data-deviceid="' + deviceID + '">' + chonch + '</span> </div>'
        return html;
    }

    var hoverTimer;

    $('#main').on('mouseenter', '.channel1phase', function () {
        hoverTimer = setTimeout(function () {
            var Values = mapping[link];
            for (var i = 0; i < Values.length; i++) {
                $('#main').find('.channel-' + Values[i]).addClass('related-link')
            }
        }, 200);

        var link = $(this).data('chonch');
    });

    $('#main').on('mouseleave', '.channel1phase', function () {
        clearTimeout(hoverTimer);
        var link = $(this).data('chonch');
        hoverTimer = setTimeout(function () {
            var Values = mapping[link];
            for (var i = 0; i < Values.length; i++) {
                $('#main').find('.channel-' + Values[i]).removeClass('related-link')
            }
        }, 200);
    });
    // end
});

