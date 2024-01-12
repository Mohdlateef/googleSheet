// Download
const dowmload=document.getElementById("download");
dowmload.addEventListener("click",exportData);
function exportData(){
    const jsondata=JSON.stringify(state);
    const blob=new Blob([jsondata],{type:"text/plain"});
    const url=URL.createObjectURL(blob);
    const link=document.createElement("a");
    link.download="data.json"
    link.href=url;
    link.click();
}