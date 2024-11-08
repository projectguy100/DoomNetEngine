//Number insertion
function insert(num){
                document.form.textview.value = document.form.textview.value + num;
           }
//Equal
function equal(){
                var exp = document.form.textview.value;
                if (exp){
                    document.form.textview.value = eval(exp);
                }
            }
 //Clear
function clean(){
              document.form.textview.value = " ";
            }
 //Backspace
function back(){
                var exp = document.form.textview.value;
                document.form.textview.value = exp.substring(0,exp.length-1);
            }
//Complex mode
function complex(){
                  var checkBox = document.getElementById("complexcheck");
                   // Get the output text
                  var text = document.getElementById("complex");

                  // If the checkbox is checked, display the output text
                  if (checkBox.checked == true){
                    text.style.display = "block";
                  } else {
                    text.style.display = "none";
                  }
}
