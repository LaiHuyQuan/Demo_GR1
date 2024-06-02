# Mô tả

Trang quản lý các thiết bị trong dự án

# Cấu trúc
**/assets/complied/css**
**/assets/complied/js**

```
app.js          //default
api.js          // các thao tác lấy dữu liệu từ api
chart.js        // các thao tác vẽ đồ thị
control.js      // thao tác thiết lập 
diagram.js      // các thao tác với đồ thị
element.js      // thiết lập các element
management.js   // khởi tạo và vẽ đồ thị
```

# Hướng dẫn bảo trì
## 1.Thao tác lấy dữ liệu từ API(api.js)
### 1.1 Dữ liệu
#### 1.1.1: Biến lưu trữ 

```
var diaData;  // Biến lưu trữ thông tin đồ thị
var heatmapData; //Biến lưu thông tin heatmap
var chartData;  //Biến lưu trữ thông tin biểu đồ
var phaseColor = ["#ff3838", "#fff200", "#18dcff"];
var c1name = ["Pha A", "Pha B", "Pha C"];
var lineChart = {}; // trạng thái đồ thị
var selectCells = [] // tọa độ các element
```