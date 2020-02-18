//Dùng axios kéo file về
var promiseNet = axios({
    url: 'http://svcy.myclass.vn/api/quanlytrungtam/danhsachnguoidung',
    method: 'GET',
    responseType: 'json',
})
var mangNguoiDung = [];
promiseNet.then(function(result){
    mangNguoiDung = result.data;
    var contentRow = '';
    for(var i =0; i < mangNguoiDung.length; i++){
        var user = mangNguoiDung[i];
        contentRow += `
        <tr>
            <td>${user.TaiKhoan}</td>
            <td>${user.MatKhau}</td>
            <td>${user.HoTen}</td>
            <td>${user.Email}</td>
            <td>${user.SoDT}</td>
            <td>${user.TenLoaiNguoiDung}</td>
            <td><button class = "btn btn-warning" onclick = "suaNguoiDung('${i}')">Sửa</button></td>
            <td><button class = "btn btn-danger" onclick = "xoaNguoiDung('${user.TaiKhoan}')">Xóa</button></td>
        </tr>
        `;
    }
    document.getElementById('danhSachNguoiDung').innerHTML = contentRow;
}).catch(function(error){
    // Xử lý thất bại
    console.log(error.response.data);
})


// Code chức năng thêm người dùng, dùng axios đưa dữ liệu lên server
document.getElementById('btnThemNguoiDung').onclick = function(){
    // Lấy thông tin từ người dùng nhập vào
    var taiKhoan = document.getElementById('taiKhoan').value;
    var matKhau = document.getElementById('matKhau').value;
    var hoTen = document.getElementById('hoTen').value;
    var email = document.getElementById('email').value;
    var sodt = document.getElementById('soDT').value;
    var maLoaiNguoiDung = document.getElementById('maLoaiNguoiDung').value;

    // Tạo object ứng với Model của api
    var objectNguoiDung = {
        TaiKhoan:taiKhoan,
        MatKhau:matKhau,
        HoTen:hoTen,
        Email:email,
        SoDT:sodt,
        MaLoaiNguoiDung:maLoaiNguoiDung
    }

    // Gửi objectNguoiDung về server => load lại trang để gọi api danhSachNguoiDung mới
    console.log(objectNguoiDung);

    var promise = axios({
        method: 'POST',
        url: 'http://svcy.myclass.vn/api/quanlytrungtam/themnguoidung',
        data: objectNguoiDung,
    })
    promise.then(function(result){
        console.log(result.data);
        // Reload lại trang để gọi lại api danhsachnguoidung => kiểm tra xem dữ liệu đã được thêm thành công chưa
        location.reload();
    }).catch(function(error){
        console.log(error.response.data);
    })

}

function xoaNguoiDung(taiKhoan){
    alert(taiKhoan);
    // gọi api xoaNguoiDung
    var promise = axios({
        method:'DELETE',
        url: 'http://svcy.myclass.vn/api/QuanLyTrungTam/XoaNguoiDung/' + taiKhoan,
        responseType: 'json'
    });

    promise.then(function(result){
        console.log(result);
        // Xóa thành cọng sẽ reload lại trang => gọi api danhsachnguoidung load data sau khi xóa
        location.reload();
    }).catch(function(error){
        console.log(error);
    })
}

function suaNguoiDung(index){
    // Dựa vào index lấy ra người dùng cần chỉnh sửa
    var nguoiDungChinhSua = mangNguoiDung[index];

    // Gán lên các textbox
    document.getElementById("taiKhoan").value = nguoiDungChinhSua.TaiKhoan;
    document.getElementById("matKhau").value = nguoiDungChinhSua.MatKhau;
    document.getElementById("hoTen").value = nguoiDungChinhSua.HoTen;
    document.getElementById("email").value = nguoiDungChinhSua.Email;
    document.getElementById("soDT").value = nguoiDungChinhSua.SoDT;
    document.getElementById("maLoaiNguoiDung").value = nguoiDungChinhSua.MaLoaiNguoiDung;
    // document.getElementById("taiKhoan").setAttribute()
}

// Xử lý nút cập nhật = api
document.getElementById('btnCapNhatNguoiDung').onclick = function(){
    // Lấy thọng tin từ người dùng nhập vào => Gửi lên api cập nhật

    // Lấy thông tin từ người dùng nhập vào
    var taiKhoan = document.getElementById('taiKhoan').value;
    var matKhau = document.getElementById('matKhau').value;
    var hoTen = document.getElementById('hoTen').value;
    var email = document.getElementById('email').value;
    var sodt = document.getElementById('soDT').value;
    var maLoaiNguoiDung = document.getElementById('maLoaiNguoiDung').value;

    // Tạo object ứng với Model của api
    var nguoiDungCapNhat = {
        TaiKhoan:taiKhoan,
        MatKhau:matKhau,
        HoTen:hoTen,
        Email:email,
        SoDT:sodt,
        MaLoaiNguoiDung:maLoaiNguoiDung
    }

    // Gọi axios
    var promise = axios({
        method: 'PUT',
        url: 'http://svcy.myclass.vn/api/QuanLyTrungTam/CapNhatThongTinNguoiDung',
        data: nguoiDungCapNhat,
        responseType: 'json'
    });

    promise.then(function(result){
        location.reload();
    }).catch(function(error){
        console.log(error)
    })
}