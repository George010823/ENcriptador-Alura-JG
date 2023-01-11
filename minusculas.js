var inputs = [].slice.call(document.querySelectorAll('#txt_input'));
var toUpper = function(v) { return v.toLowerCase(); };
var transform = function(e, input, value) {
    var caretPos;

    if (typeof value === 'undefined') {
        var char = window.event ? e.which : e.keyCode;
        var string = String.fromCharCode(char);
        caretPos = 1;
    } else {
        var string = value;
        caretPos = value.length;
    }

    var value = input.value;
    var valBef = value.slice(0, input.selectionStart);
    var valAft = input.value.slice(valBef.length, input.value.length);

    if (/[A-Z\u0080-\u00FF]/.test(string)) {
        e.preventDefault();
        input.value = valBef;
        input.value += string.replace(/[A-Z\u0080-\u00FF]+/g, toUpper);
        input.value += valAft;
        input.setSelectionRange(valBef.length + caretPos, valBef.length + caretPos);
    }
};

inputs.forEach(function(input) {
    input.addEventListener('keypress', function(e) {
        transform(e, this);
    });
    input.addEventListener('paste', function(e) {
        var value = e.clipboardData.getData('text');
        transform(e, this, value);
    });
    input.addEventListener('drop', function(e) {
        var value = e.dataTransfer.getData('text');
        transform(e, this, value);
    });
});
            