// Sử dụng axios để đọc dự liệu từ file xml


// axios là 1 hàm nhận vào 1 object chứa các thông tin url, method, headers . . .
var objectAjax = {
    url: './data/DanhSachNguoiDung.xml',   // ĐƯờng dẫn đến file hoặc api từ backend cung cấp
    method: 'GET',      // Do backend cung cấp (hoặc đọc file dùng GET)
    responseType: 'document',       // Định dạng dự liệu sau khi đọc xml
}

// Sau khi gọi axios() thì hàm này sẽ trả về 1 promise chứa 2 hàm thành công (then) và thất bạo (catch)
var promise = axios (objectAjax);

promise.then(function(result){
    var xmlResult = result.data;
    // Giá trị trả về khi thành công result.data
    var dsTheNguoiDung = xmlResult.getElementsByTagName('NguoiDung');
    // console.log(dsTheNguoiDung);
    // Duyệt danh sách thẻ người dùng lấy nội dung hiển thị lên table
    var contentTable = '';
    for (var i = 0; i < dsTheNguoiDung.length; i++){
        var tagNguoiDung = dsTheNguoiDung[i];       // Lấy ra mỗi tag người dùng sau mỗi lần duyệt
        // var email = tagNguoiDung.getElementsByTagName('Email')[0].innerHTML    trả về dạng mảng, trong đây là chỉ có 1 phần tử nên chỉ cần [0]
        var email = tagNguoiDung.querySelector('Email').innerHTML;
        var hoTen = tagNguoiDung.querySelector('HoTen').innerHTML;
        var sodt = tagNguoiDung.querySelector('SoDT').innerHTML;
        var matKhau = tagNguoiDung.querySelector('MatKhau').innerHTML;
        var taiKhoan = tagNguoiDung.querySelector('TaiKhoan').innerHTML;
        // console.log(email);

        // Tạo nội dung html từ data được trích xuất từ file xml

        contentTable +=
        `
        <tr>
            <td>${taiKhoan}</td>
            <td>${matKhau}</td>
            <td>${hoTen}</td>
            <td>${email}</td>
            <td>${sodt}</td>
        </tr>
        `
    }

    document.getElementById('tblDanhSachNguoiDung').innerHTML = contentTable;

}).catch(function(error){
    // Trích xuất lỗi từ xml
    var errorMessage = error.response.data.querySelector('pre').innerHTML;
    document.querySelector('body').innerHTML = errorMessage;
    //console.log(error.response.data);
})


// Dùng axios đọc file json

var promiseJson = axios({
    method: 'GET',  // Phương thức đọc dữ liệu backen cung cấp
    url: './data/DanhSachNguoiDung.json',   // đường dna64 đến file json hoặc api
    responseType: 'json',   // Định dạng dữ liệu khi server trả về 
})

promiseJson.then(function(result){
    // Xử lý thành công
    console.log(result.data);
    var mangNguoiDung = result.data;

    // Duyệt mảng hiển thị ra giao diện
    var contentRow = '';
    for(var i = 0; i < mangNguoiDung.length; i++)
    {
        var nguoiDung = mangNguoiDung[i];
        // Tạo ra các div card từ dữ liệu json object
        contentRow += `
        <div class="col-md-4 mb-2">
                <div class="card text-left">
                    <img class="card-img-top"
                        src="https://image.shutterstock.com/image-vector/user-icon-trendy-flat-style-260nw-418179865.jpg"
                        alt="">
                    <div class="card-body">
                        <h4 class="card-title">Họ tên: ${nguoiDung.HoTen}</h4>
                        <p class="card-text">
                            <p>Tài khoản: ${nguoiDung.TaiKhoan}</p>
                            <p>Mật khẩu: ${nguoiDung.MatKhau}</p>
                            <p>Email: ${nguoiDung.Email}</p>
                        </p>
                    </div>
                </div>
            </div>
        `;
    }
    document.getElementById('danh-sach-nguoi-dung').innerHTML = contentRow;

}).catch(function(error){
    // Xử lý thất bại
    console.log(error.response.data);
})


