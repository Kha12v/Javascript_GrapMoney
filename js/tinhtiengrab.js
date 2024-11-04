/**Đề bài: Cho người dùng chọn 1 trong 3 loại grab:
1, GrabCar
 KM Đầu Tiên => 8000 VND
 Từ 1 - 19 KM => 7500 VND
 Từ 19 KM trở lên => 7000
2, Grab SUV:
 KM Đầu Tiên => 9000 VND
 Từ 1 - 19 KM => 8500 VND
 Từ 19 KM trở lên => 8000
3, GrabBlack:
 KM Đầu Tiên => 10000 VND
 Từ 1 - 19 KM => 9500 VND
 Từ 19 KM trở lên => 9000   
-> cho người dùng nhập vào số km đi được và thời gian chờ:
 - input:
 chọn 1 trong 3 loại grab
 nhập số km đi được
 nhập thời gian chờ
 - Progressing:
 Tính tổng tiền đi được
 - Output:
 Số tiền đi được là bao nhiêu
 In hóa đơn
 * 
 */
//Khai báo biến lưu trữ phí cho từng loại grab
//grabCar
const grabCar_1 = 8000;
const grabCar_2 = 7500;
const grabCar_3 = 7000;
const grabCar_Wait = 2000;
//grabSUV
const grabSUV_1 = 9000;
const grabSUV_2 = 8500;
const grabSUV_3 = 8000;
const grabSUV_Wait = 3000;
//grabBlack
const grabBlack_1 = 10000;
const grabBlack_2 = 9500;
const grabBlack_3 = 9000;
const grabBlack_Wait = 3500;

//Khai báo 1 đối tượng tổng hợp chứa các "giá trị phí" cho từng loại "phí dịch vụ grab"
//grabRates: Giúp quản lí và truy cập giá của từng loại Grab dễ dàng hơn.
const grabRates = { //grabRates.grabCar: Chứa các hằng số phí của GrabCar
    grabCar: {
        km1: grabCar_1,
        km2: grabCar_2,
        km3: grabCar_3,
        wait: grabCar_Wait
    },
    grabSUV: { //grabRates.grabSUV: Chứa các hằng số phí của grabSUV
        km1: grabSUV_1,
        km2: grabSUV_2,
        km3: grabSUV_3,
        wait: grabSUV_Wait
    },
    grabBlack: { //grabRates.grabBlack: Chứa các hằng số phí của grabBlack
        km1: grabBlack_1,
        km2: grabBlack_2,
        km3: grabBlack_3,
        wait: grabBlack_Wait
    }
};//Ví dụ: grabRates.grabCar.km1 -> trả về phí của km đầu tiên cho grabCar là 8000

/**Hàm chọn loại Grab
input[name="selector"] => chọn all elements có thuộc tính name="selector"
:checked => chỉ định chỉ tìm các phần input trong nhóm selector đang có trạng thái "được chọn"
?.value => nếu không có elements nào được chọn, thì grabType() sẽ trả về là undefined.*/
function grabType() {
    return document.querySelector('input[name="selector"]:checked')?.value;
}
/**Khi grabType() trả về underfined, cần hiển thị thông báo chưa chọn loại Grab */
function checkAndAlertGrabType() {
    selectedGrabType = grabType();
    if (!selectedGrabType) {
        alert("Bạn chưa chọn loại Grab!");
        return null;
    }
    return selectedGrabType;
}
/**Ý nghĩa của 2 hàm grabType() & checkAndAlertGrabType():
 grabType() => kiểm tra giá trị trả về của loại grab được chọn và underfined nếu không có loại nào được chọn
 checkAndAlertGrabType() => Gọi hàm  grabType() để kiểm tra loại grab đã chọn, nếu chưa chọn sẽ
 hiển thị câu thông báo, ngược lại sẽ trả về hàm grapType() - loại grab được chọn.
 */


//Tính tiền grab dựa trên: Loại Grab, Số Km & Thời gian chờ
function CalGrapMoney() {
    const CarType = grabType();
    if (!CarType) {
        alert("Vui lòng chọn loại xe!");
        return;
    }

    //lấy số km và thời gian chờ từ input
    const km = parseFloat(document.getElementById("txt-km").value);
    const waitTime = parseFloat(document.getElementById("txt-thoiGianCho").value);
    console.log(`Số KM: ${km}, Thời gian chờ: ${waitTime}`); // Log các giá trị nhập vào

    //Kiểm tra số km & waitTime nhập vào phải lớn hơn 0
    if (km <= 0 || waitTime < 0) {
        alert("Vui lòng nhập số km hợp lệ!");
        return;
    }
    //lấy cấu trúc phí của grabType() đã chọn dựa vào grabRates.
    const rate = grabRates[CarType];
    let totalKM = 0;

    //Tính tiền grab dựa trên số km
    if (km <= 1) { //check km đầu tiên
        totalKM = rate.km1;
    } else if (km <= 19) { // check km từ 2 - 19 (1 < km <=19)
        totalKM = rate.km1 + (km - 1) * rate.km2;
        //Tổng phí: km đầu tiên + phí của các km tiếp theo.
        //Ví dụ người nhập vào => km = 10 => phí là: rate.km1 + (10-1=9) * rate.km2 
        //(km đầu tiên tính theo rates.km1 và 9 km tiếp theo tính theo rates.km2)
    } else { //check km từ 19 trở đi
        totalKM = rate.km1 + 18 * rate.km2 + (km - 19) * rate.km3;
        /**Ví dụ người nhập km => 25 => phí là:
         rate.km1 + 18 * rate.km2 + (25-19=6) * rate.km3;
         */
    }

    //Tính tiền chờ được tính: 
    //tổng số km (totalKM) = totalKM + waitTime * rate.wait (số tiền thời gian chờ dựa trên loại grab)
    totalKM += waitTime * rate.wait;
    console.log(`Thành tiền: ${totalKM}`); // Log kết quả tính được

    //Show kết quả lên giao diện
    document.getElementById("xuatTien").innerText = totalKM.toLocaleString("vn-VN") + " VND";
    document.getElementById("divThanhTien").classList.remove("hidden");
}
//Thêm sự kiện cho nút tính tiền
/** Gọi document.querySelectorAll(".contact100-form-btn") -> nhận NodeList chứa 2 element giống nhau
  nên sử dụng chỉ định [0] & [1] để ko ảnh hướng đến nút còn lại
   [0]: Nút đầu tiên có text là "TÍNH TIỀN"
   [1]: Nút thứ hai có text là "IN HÓA ĐƠN"*/
document.querySelectorAll(".contact100-form-btn")[0].addEventListener("click", CalGrapMoney);
