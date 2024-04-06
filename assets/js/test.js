var data = {
    "Anh Phong IFC": [
      [
        "gsnl35383313",
        "Online",
        "Hà Nội",
        "Vũ Hồng Phong's Home",
        "Toàn nhà",
        "không"
      ],
      [
        "gsnl7718963b",
        "Online",
        "Hà Nội",
        "Vũ Hồng Phong's Home",
        "Toàn nhà",
        "không"
      ]
    ]
  };
  
  // Lặp qua mỗi phần tử trong đối tượng data
  var newArray = Object.keys(data).map(function(key) {
    var innerArray = data[key].map(function(item) {
      return {
        "deviceID": item[0],
        "status": item[1],
        "location": item[2],
        "address": item[3],
        "type": item[4],
        "availability": item[5]
      };
    });
  
    return {
      [key]: innerArray
    };
  });
  
  console.log(newArray);