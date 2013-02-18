var runMe = function () {
    alert(a + "");
    var a = 1;
    alert(a + "");
    a = 2;
    alert(a + "");
};
$(document).ready(function () {
    $('#btn-run-type').on('click', function () {
        runMe();
    });
});
