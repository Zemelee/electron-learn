console.log("render")
const btn1 = document.querySelector("#btn1")
const btn2 = document.querySelector("#btn2")
const input = document.querySelector("#input")
const div1 = document.querySelector("#div1")

btn1.addEventListener("click",function(){
    myAPI.saveFile(input.value)
})
btn2.onclick = async ()=>{
    let x = await myAPI.readFile()
    div1.innerHTML = x
}
div1.onclick = ()=>{
    div1.innerHTML = myAPI.getVersion()
}