// Dữ liệu ban đầu
var projectData = {
    "projectCode": "qưeqe",
    "projectName": "nhà c7",
    "devices": [
        {
            "code": "m1321",
            "cabinet": 0,
            "date": 0,
            "lv1": "0",
            "lv2": "0",
            "lv3": "0",
            "lv4": "0",
            "deviceType": "1k3p",
            "channels": [
                {
                    "pha": "3 pha",
                    "chonch": "p1",
                    "itt": 0,
                    "ptt": 0,
                    "ct": 0,
                    "type": 0,
                    "name": "1111",
                    "sourceFr": 0,
                    "lv1": "0",
                    "lv2": "0",
                    "lv3": "0",
                    "lv4": "0",
                    "includeS": false,
                    "includeL": false,
                    "source": false
                },
                {
                    "pha": "3 pha",
                    "chonch": "p3",
                    "itt": 0,
                    "ptt": 0,
                    "ct": 0,
                    "type": 0,
                    "name": "Vịt Vụng Về",
                    "sourceFr": 0,
                    "lv1": "0",
                    "lv2": "0",
                    "lv3": "0",
                    "lv4": "0",
                    "includeS": false,
                    "includeL": false,
                    "source": false
                }
            ]
        },
        {
            "code": "12313213",
            "cabinet": 0,
            "date": 0,
            "lv1": "0",
            "lv2": "0",
            "lv3": "0",
            "lv4": "0",
            "deviceType": "6k1p",
            "channels": [
                {
                    "pha": "1 pha",
                    "chonch": "a12",
                    "itt": "1231",
                    "ptt": 0,
                    "ct": 0,
                    "type": 0,
                    "name": 0,
                    "sourceFr": 0,
                    "lv1": "0",
                    "lv2": "0",
                    "lv3": "0",
                    "lv4": "0",
                    "includeS": false,
                    "includeL": false,
                    "source": false
                }
            ]
        },
        {
            "code": "qưqq",
            "cabinet": "qqq",
            "date": 0,
            "lv1": "0",
            "lv2": "0",
            "lv3": "0",
            "lv4": "0",
            "deviceType": "12k3p",
            "channels": []
        }
    ]
};

// Tạo mảng cho thông tin dự án
var data = [
    {
        "projectCode": "123123",
        "projectName": "nahf c6"
    },
    {
        "projectCode": "123123",
        "deviceCode": "123123",
        "lv1name": "12312",
        "lv2name": "0",
        "lv3name": "0",
        "lv4name": "0",
        "cabinet": "123123",
        "date": "",
        "deviceType": "6k1p"
    },
    {
        "projectCode": "123123",
        "deviceCode": "12312311",
        "lv1name": "0",
        "lv2name": "0",
        "lv3name": "0",
        "lv4name": "0",
        "cabinet": "123123",
        "date": 0,
        "deviceType": "6k1p"
    },
    {
        "deviceCode": "123123",
        "loadId": 0,
        "chonch": "a12",
        "chonpha": "1 pha",
        "itt": "1231",
        "ptt": 0,
        "ct": 0,
        "type": 0,
        "name": 0,
        "source": false,
        "lv1name": "12312",
        "lv2name": "1232",
        "lv3name": "0",
        "lv4name": "0",
        "includeS": false,
        "includeL": false
    },
    {
        "deviceCode": "123123",
        "loadId": 1,
        "chonch": "a15",
        "chonpha": "1 pha",
        "itt": 0,
        "ptt": 0,
        "ct": 0,
        "type": 0,
        "name": 0,
        "source": false,
        "lv1name": "0",
        "lv2name": "0",
        "lv3name": "0",
        "lv4name": "0",
        "includeS": false,
        "includeL": true
    },
    {
        "deviceCode": "12312311",
        "loadId": 0,
        "chonch": "a12",
        "chonpha": "1 pha",
        "itt": 0,
        "ptt": 0,
        "ct": 0,
        "type": 0,
        "name": 0,
        "source": false,
        "lv1name": "0",
        "lv2name": "0",
        "lv3name": "0",
        "lv4name": "0",
        "includeS": false,
        "includeL": true
    },
    {
        "deviceCode": "12312311",
        "loadId": 1,
        "chonch": "a15",
        "chonpha": "1 pha",
        "itt": 0,
        "ptt": 0,
        "ct": 0,
        "type": 0,
        "name": 0,
        "source": false,
        "lv1name": "12312",
        "lv2name": "1232",
        "lv3name": "0",
        "lv4name": "0",
        "includeS": false,
        "includeL": false
    }
];

// Tạo chuỗi dữ liệu
var dataText = data.map(obj => JSON.stringify(obj)).join('\n');

// Tải dữ liệu xuống dưới dạng tệp văn bản
download('data.txt', dataText);

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

