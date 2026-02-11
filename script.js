function SubmitFirst(){
    alert("Submitted");
}

function addName(){
    document.getElementById("extra").innerHTML=`
    <div class="sign-in-input">
        <p style="text-align: left; margin-bottom: 10px;"><b>Restaurant/Organization Name</b></p>
        <input type="text" name="name" placeholder="Your Restaurant Name" required>
    </div>`
}
