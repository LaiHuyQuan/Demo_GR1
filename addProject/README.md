# Mô tả

Trang cập nhật thông tin dự án và thiết bị

# Hướng dẫn bảo trì
## 1. addProject.js
### 1.1: Dữ liệu
#### 1.1.1: Biến lưu trữ dự án
Gồm thông tin về dự án và các thiết bị bên trong
```bash
var projectData = {
    "projectCode": '',
    "projectName": '',
    "devices": []
}
```
#### 1.1.2: Biến lưu trữ cấu trúc dự án
Lưu trữ các level và dữ liệu liên quan (levelName, levelCode)
```bash
var jsonStructure = {
    "level0": []
}
```
#### 1.1.3: Mảng lưu trữ kênh
Ánh xạ các kênh 
```bash
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
```
Ánh xạ ngược
```bash
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
```

### 1.2 Sự kiện
#### 1.2.1: Mở mockup
-Hiển thị mockup đã bị ẩn đi
-Khởi tạo ô chọn cấu trúc
-Khởi tạo nút `Save`
```bash
$('#add-project').on('click', '.add-device-btn', function () {
        $('.add-device-mockup').removeClass('hide');
        createSelectInputsForLevels('.device-lv');
        var addDeviceIndex = '<button type="reset" class="btn btn-primary me-1 mb-1 device-add">Save</button>'
        $('.device-btns').append(addDeviceIndex);
        $('#ma').focus();
    })
```
### 1.2.2: Chỉnh sửa thiết bị
-Thêm trạng thái `editing` cho thiết bị
-Hiển thị mockup
-Khởi tạo ô chọn cấu trúc
-Tìm và truyền thông tin thiết bị từ `projectData` và truyền vào form
-Khởi tạo nút `Save`
```bash
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
```
### 1.2.3: Lưu bản chỉnh sửa thiết bị



