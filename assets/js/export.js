$(document).ready(function () {
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
            "lv1Code": device.lv1code  || 0,
            "lv2Code": device.lv2code  || 0,
            "lv3Code": device.lv3code  || 0,
            "lv4Code": device.lv4code || 0,
            "cabinet": device.cabinet,
            "date": device.date,
            "deviceType": device.deviceType,
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
                "lv1Code": channel.lv1code || 0,
                "lv2Code": channel.lv2code || 0,
                "lv3Code": channel.lv3code || 0,
                "lv4Code": channel.lv4code || 0,
                "includeS": channel.includeS,
                "includeL": channel.includeL,
                "sourceFr": channel.source
            };

            if (channel.chonpha == "3 pha") {
                var phase = ["A", "B", "C"]
                var Values = mappingchannel[channel.chonch];
                if (Values) {
                     for(var i =0; i < Values.length; i++){
                        channels.push(Object.assign({}, channelData, { "chonch": Values[i], "pha":phase[i]}));
                    };
                }
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
// end
});