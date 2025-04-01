var runner;
var block

window.addEventListener("load", (event) => {
    runner = document.getElementById("runner");
    block = document.getElementById("block");
});


function jump() {
    console.log("Jump");
    if(runner.classList != "animate")
    {
        runner.classList.add("animate");
        setTimeout(function(){
            runner.classList.remove("animate")
        }, 500);
    }
}

document.body.onkeyup = function(e) {
    if (e.key == " " ||
        e.code == "Space" ||      
        e.keyCode == 32      
    ) {
      jump();
    }
  }

var checkDead = setInterval(function(){
    var runnerTop = parseInt(window.getComputedStyle(runner).getPropertyValue("top"));
    var blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));

    if (blockLeft<20 && blockLeft>0 && runnerTop >= 130) {
        alert("u lose!!!");
        block.style.animation = "none";
        block.style.display = "none";
    }
}, 10);