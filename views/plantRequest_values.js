function handleSelectionChange () {

    const selectionDropdown = document.getElementById("in_out");
    const climateZone = document.getElementById("climateZone")
    const sunlightH = document.getElementById("sunlightH");

    if (selectionDropdown.value === "Outdoors") {
        followUpDiv.style.display = "block";
        followUpDiv2.style.display = "none";
    } else if (selectionDropdown.value === "Indoors") {
        followUpDiv.style.display = "none";
        followUpDiv2.style.display = "block";
    } else {
        followUpDiv.style.display = "none";
        followUpDiv2.style.display = "none";
    }
}

/*
console.log("handle selection changes function is working")

const newInput = document.createElement("input");
newInput.type = "text";
newInput.name = "additionalField";

climateZone.appendChild(newInput);


handleSelectionChange();
*/