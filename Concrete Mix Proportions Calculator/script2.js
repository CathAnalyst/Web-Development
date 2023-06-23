var consType;
var exposure;
var airEnt;
var maxAggre;
var slump;
var specFC;

var BSG_Cement;
var BSG_Sand;
var BSG_Gravel;

var BD_Cement;
var BD_Sand;
var BD_Gravel;

var DRUW_Gravel;
var FM_Sand;

var MD_Sand;
var MD_Gravel; //should be negative


function getFormData(){
    consType = document.getElementById('consType').value;
    exposure = document.getElementById('exposure').value;
    airEnt = document.getElementById('airEnt').value;
    maxAggre = document.getElementById('maxAggre').value;
    slump = document.getElementById('slump').value;
    specFC = document.getElementById('specFC').value;

    BSG_Cement = document.getElementById('BSG_Cement').value;
    BSG_Sand = document.getElementById('BSG_Sand').value;
    BSG_Gravel = document.getElementById('BSG_Gravel').value;

    BD_Cement = document.getElementById('BD_Cement').value;
    BD_Sand = document.getElementById('BD_Sand').value;
    BD_Gravel = document.getElementById('BD_Gravel').value;

    DRUW_Gravel = document.getElementById('DRUW_Gravel').value;
    FM_Sand = document.getElementById('FM_Sand').value;

    MD_Sand = document.getElementById('MD_Sand').value;
    MD_Gravel = document.getElementById('MD_Gravel').value;
   
    function checkValues(){
        //slump check if within range in terms of construction type
        if (slump <= 0){
            alert("Please input positive integer!");
        }
        else{
            if(consType == "Reinforced foundation walls and footings" && slump > 3){
                alert("Range of slump for this construction type is 1 to 3 inches!");
            }
            else if(consType == "lain footings, caissons, and substructure walls" && slump > 3){
                alert("Range of slump for this construction type is 1 to 3 inches!");
            }
            else if(consType == "Beams and reinforced walls" && slump > 4){
                alert("Range of slump for this construction type is 1 to 4 inches!");
            }
            else if(consType == "Building columns" && slump > 4){
                alert("Range of slump for this construction type is 1 to 4 inches!");
            }
            else if(consType == "Pavement and slabs" && slump > 3){
                alert("Range of slump for this construction type is 1 to 3 inches!");
            }
            else if(consType == "Mass concrete" && slump > 2){
                alert("Range of slump for this construction type is 1 to 2 inches!");
            }
            else if(consType == null){ //if no selected
                alert("Plese select a Construction Type!");
            }
            else{
                nextStep1 = true;
            }
        }
/*
        //MD_Gravel check if negative
        if(MD_Gravel >= 0){
            alert("Please input negative number for Moisture DEviation of Gravel.");
        }
        else{
            nextStep2 = true;
        }

        if(nextStep1 == true && nextStep2 == true){
            step3();
        }
        else{
            alert("Please check values if within range.")
        }*/
    }
}