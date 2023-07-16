function handleSelectionChange () {

    const selectionDropdown = document.getElementById("in_out");
    const climateZone = document.getElementById("climateZone")
    const sunlightH = document.getElementById("sunlightH");

    if (selectionDropdown.value === "Outdoors") {
        followUp.style.display = "block";
        followUp2.style.display = "none";
        console.log("outdoors selected")
    } else if (selectionDropdown.value === "Indoors") {
        followUp.style.display = "none";
        followUp2.style.display = "block";
        console.log("indoors selected")
    } else {
        followUp.style.display = "none";
        followUp2.style.display = "none";
        console.log("none selected")
    }
}

export {handleSelectionChange};

/*
console.log("handle selection changes function is working")

const newInput = document.createElement("input");
newInput.type = "text";
newInput.name = "additionalField";

climateZone.appendChild(newInput);


handleSelectionChange();
*/