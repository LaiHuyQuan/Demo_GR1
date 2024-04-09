// kiểm tra list kênh
function checkChannel(channelID, deviceID) {
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
                if (key == channelID) {
                    var values = reversedMapping[key];
                    console.log(values)
                    result = checkChannelExistence(values, deviceID);
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
function checkDuplicateNameAndCodeInBlock(block, inputText, inputCode) {
    var names = {};
    var codes = {};
    var hasDuplicates = false;

    block.find('.block').map(function () {
        console.log(1)
        var levelInfo = $(this).contents().first().text().trim();
        var match = levelInfo.match(/^(.+?)\s*\(code:\s*(.+?)\)$/);
        names[match[1]] = true;
        codes[match[2]] = true;
    });

    if (inputText === '' || names[inputText] || inputCode === '' || codes[inputCode]) {
        hasDuplicates = true;
    }
    return hasDuplicates;
}