
function consTypeChange(element){
    inputSlump = document.getElementById("slump");
    if(element.options[element.selectedIndex].value == "Reinforced foundation walls and footings")
        document.getElementById("slumpLabel").innerHTML = "4. Slump (1 to 3 inches recommended)";
        inputSlump.setAttribute("max", 3);
        
    /*if(element.options[element.selectedIndex].value == "Reinforced foundation walls and footings")
        alert(element.options[element.selectedIndex].innerText + 'was selected');*/
}


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

    
    step3(); 

    
}

//3. Estimation of mixing water and air content using Table M2 in lb/yd^3
function step3(){
    
    const TableM2_nonAir = [
        ["", 0.375, 0.5, 0.75, 1, 1.5, 2, 3, 6],
        ["1 to 2", 350, 335, 315, 300, 275, 260, 220, 190],
        ["3 to 4", 385, 365, 340, 325, 300, 285, 245, 210],
        ["6 to 7", 410, 385, 360, 340, 315, 3000, 270, ""],
        ["air", 3, 2.5, 2, 1.5, 1, 0.5, 0.3, 0.2]
        ];
    const TableM2_Air = [
        ["", 0.375, 0.5, 0.75, 1, 1.5, 2, 3, 6],
        ["1 to 2", 305, 295, 280, 270, 250, 240, 205, 180],
        ["3 to 4", 340, 325, 305, 295, 275, 265, 225, 200],
        ["6 to 7", 365, 345, 325, 310, 290, 280, 260, ""],
        ["Mild", 4.5, 4, 3.5, 3, 2.5, 2, 1.5, 1],
        ["Moderate", 6, 5.5, 5, 4.5, 4.5, 4, 3.5, 3],
        ["Severe", 7.5, 7, 6, 6, 5.5, 5, 4.5, 4]
        ];

    if(slump >= 1 && slump <= 2){
        slumpRange = "1 to 2";
    }

    else if(slump >= 3 && slump <= 4){
        slumpRange = "3 to 4";
    }

    else{
        slumpRange = "6 to 7";
    }

    //if Non-Air Entrained
    if(airEnt == "Non-Air Entrained"){
        for(j=0; j<9; j++){
            if (TableM2_nonAir[0][j] == maxAggre){
                col = j;    
                break;
            }
        }
    
        for(i=0; i<4; i++){    
            if (TableM2_nonAir[i][0] == slumpRange){
                row = i;    
                break;
            }
        }

        water = TableM2_nonAir[row][col];
        air = TableM2_nonAir[4][col];
    }

    //if Air Entrained
    if(airEnt == "Air Entrained"){
        for(j=0; j<9; j++){
            if (TableM2_Air[0][j] == maxAggre){
                col = j;    
                break;
            }
        }
        
    
        for(i=0; i<4; i++){    
            if (TableM2_Air[i][0] == slumpRange){
                row = i;    
                break;
            }
        }

        water = TableM2_Air[row][col];

        if(exposure == "Mild"){k=4;}
        else if(exposure == "Moderate"){k=5;}
        else if(exposure == "Severe"){k=6;}
        
        air = TableM2_Air[k][col];
        
    }

    step4 ();

}

//4. Selection of water/cement ratio, WC
function step4(){
    
    boundary = false;
    const TableM3 = [
        ["psi", "Non-Air", "Air"],
        [6525, 0.38, ""],
        [6000, 0.41, ""],
        //["5 to 6", 0.43, ""],
        [5000, 0.48, 0.4],
        //["4 to 5", 0.55, 0.46],
        [4000, 0.57, 0.48],
        //["3 to 4", 0.62, 0.53],
        [3000, 0.68, 0.61],
        //["2 to 3 _2", 0.7, 0.61],
        //["2 to 3 _1", 0.8, 0.71],
        [200, 0.82, 0.74]
        ];
        
    //determine the index to be used for TableM3
    if(airEnt == "Non-Air Entrained"){
        j = 1;
        
    }
    else if(airEnt == "Air Entrained"){
        j = 2;
        
    }

    //determine the WC ratio using the specFC
    for (var i=1; i<7; i++){
        
        if(TableM3[i][0] == specFC){
            boundary = true;
            WCratio = TableM3[i][j];
            break;
        }
        boundary = false;
    }
    
    
    if (boundary == false){
        if(specFC > 200 && specFC < 3000){
            i = 5;
        }
        else if(specFC > 3000 && specFC < 4000){
            i = 4;
        }
        else if(specFC > 4000 && specFC < 5000){
            i = 3;
        }
        else if(specFC > 5000 && specFC < 6000){
            i = 2;
        }
        else if(specFC > 6000 && specFC < 6525){
            i = 1;
        }
        else{
            alert("Please input average compressive strength (f'c) within the range of 200 psi to 6525 psi.");
        }

        WCratio = Math.round((TableM3[i][j] - (( (TableM3[i][0]-specFC) * (TableM3[i][j]-TableM3[i+1][j]) ) / (TableM3[i][0]-TableM3[i+1][0]))) *100) / 100;
        //WCratio = TableM3[i][j] - (( (TableM3[i][0]-specFC) * (TableM3[i][j]-TableM3[i+1][j]) ) / (TableM3[i][0]-TableM3[i+1][0]));
        
    }
    
    step5();

}

//5. Calculation of cement content
function step5(){
    cement = Math.round((water/WCratio) *100)/100;
    alert("cement is "+cement);

    step6();
}

//6. Estimation of coarse aggregate (gravel) content
function step6(){
    
    const TableM5 = [
        ["maxAggreSize", 2.4, 2.6, 2.8, 3],
        [0.375, 0.50, 0.48, 0.46, 0.44],
        [0.5, 0.59, 0.57, 0.55, 0.53],
        [0.75, 0.66, 0.64, 0.62, 0.60],
        [1, 0.71, 0.69, 0.67, 0.65],
        [1.5, 0.75, 0.73, 0.71, 0.69],
        [2, 0.78, 0.76, 0.74, 0.72],
        [3, 0.82, 0.80, 0.78, 0.76],
        [6, 0.87, 0.85, 0.83, 0.81]
    ];

    for(j=0; j<5; j++){
        if (TableM5[0][j] == FM_Sand){
            col = j;    
            break;
        }
    }
    

    for(i=0; i<9; i++){    
        if (TableM5[i][0] == maxAggre){
            row = i;    
            break;
        }
    }

    volFactionGravel = TableM5[row][col];
    dryRoddedVolGravel = volFactionGravel * 27;
    gravel = dryRoddedVolGravel * DRUW_Gravel;

    alert("gravel is "+gravel);

    step7();
}

//7. Estimation of Fine Aggregate (sand) Content
function step7(){
    
    //using Weight Method
    const TableM6 = [
        ["maxAggreSize", "Non-Air", "Air"],
        [0.375, 3840, 3690],
        [0.5, 3890, 3760],
        [0.75, 3960, 3840],
        [1, 4010, 3900],
        [1.5, 4070, 3960],
        [2, 4120, 4000],
        [3, 4160, 4040],
        [6, 4230, 4120]
    ];
    
    for(i=0; i<8; i++){    
        if (TableM6[i][0] == maxAggre){
            row = i;    
            break;
        }
    }

    if(airEnt == "Non-Air Entrained"){j=1;}
    else if (airEnt == "Air Entrained"){j=2;}

    approxDensity = TableM6[i][j];
    sandWM = approxDensity - (water + cement + gravel);

    
    //using Absolute Volume Method
    waterAVM = water / 62.4;
    cementAVM = cement / BD_Cement;
    gravelAVM = gravel / BD_Gravel;
    airAVM = (air/100) * 27;
    volSandAVM = 27 - (waterAVM+cementAVM+gravelAVM+airAVM);
    sandAVM = volSandAVM * BD_Sand;
/*
    alert("sandWM is "+sandWM);
    alert("sandAVM is "+sandAVM);
*/
    step8();
}

//8. Adjustments for Aggregate Moisture
function step8(){
    alert("step 8 started");
    
    //Weight Method Moisture Correction
    sandWM_MCorrection = sandWM * (MD_Sand/100);
    gravelWM_MCorrection = gravel * (MD_Gravel/100);
    waterWM_MCorrection = -(sandWM_MCorrection + gravelWM_MCorrection);

    sandWM_final = sandWM + sandWM_MCorrection;
    gravelWM_final = gravel + gravelWM_MCorrection;
    waterWM_final = water + waterWM_MCorrection;
    
    
    //Absolute Volume Method Mosture Correction
    sandAVM_MCorrection = sandAVM * (MD_Sand/100);
    gravelAVM_MCorrection = gravel * (MD_Gravel/100);
    waterAVM_MCorrection = -(sandAVM_MCorrection + gravelAVM_MCorrection);

    sandAVM_final = sandAVM + sandAVM_MCorrection;
    gravelAVM_final = gravel + gravelAVM_MCorrection;
    waterAVM_final = water + waterAVM_MCorrection;
/*   
    alert("WM final values");
    alert("sandWMcorr is "+ sandWM_MCorrection);
    alert("gravelWMcorr is "+ gravelWM_MCorrection);
    alert("waterWMcorr is "+ waterWM_MCorrection);
    alert("sandWM is "+ sandWM_final);
    alert("gravelWM is "+ gravelWM_final);
    alert("waterWM is "+ waterWM_final);
/*
    alert("AVM final values");
    alert("sandAVM is "+ sandAVM_final);
    alert("gravelAVM is "+ gravelAVM_final);
    alert("waterAVM is "+ waterAVM_final);
*/
    step9();
}

function step9(){
    alert("step 9 started");
    
    WMorAVM = document.getElementById("WMorAVM").value;
    alert("WMorAVm is"+WMorAVM);
    if(WMorAVM == "via Weight Method"){
        localwater = waterWM_final;
        localsand = sandWM_final;
        localgravel = gravelWM_final;
    }
    else if(WMorAVM == "via Absolute Volume Method"){
        localwater = waterAVM_final;
        localsand = sandAVM_final;
        localgravel = gravelAVM_final;
    }

    alert("localwater is "+localwater);
    alert("localsand is "+localsand);
    alert("localgravel is "+localgravel);

    //cement
    cementUnit = document.getElementById("cement_units").value;
    if(cementUnit == "lb"){
        document.getElementById("QM_cement").innerHTML = cement;
    }
    else if (cementUnit == "kg"){
        document.getElementById("QM_cement").innerHTML = cement * 2.205;
    }
    else if(cementUnit == "40kg bag"){
        document.getElementById("QM_cement").innerHTML = roundup((cement*2.205)/40); 
    }
    else if(cementUnit == "50kg bag"){
        document.getElementById("QM_cement").innerHTML = roundup((cement*2.205)/50); 
    }

    //water
    waterUnit = document.getElementById("water_units").value;
    alert("waterUnit is "+waterUnit);
    if(waterUnit == "lb"){
        document.getElementById("QM_water").innerHTML = localwater;
    }
    else if (waterUnit == "kg"){
        document.getElementById("QM_water").innerHTML = localwater * 2.205;
    }
    else if(waterUnit == "L"){
        document.getElementById("QM_water").innerHTML = localwater *  0.45359237;
    }
    else if(waterUnit == "m^3"){
        document.getElementById("QM_water").innerHTML = localwater *  0.45359237 / 1000; 
    }

    //gravel
    gravelUnit = document.getElementById("gravel_units").value;
    if(gravelUnit == "lb"){
        document.getElementById("QM_gravel").innerHTML = localgravel;
    }
    else if (gravelUnit == "kg"){
        document.getElementById("QM_gravel").innerHTML = localgravel * 2.205;
    }
    else if(gravelUnit == "m^3"){
        document.getElementById("QM_gravel").innerHTML = 
        localgravel *  2.205 / 1000; 
    }

    //sand
    sandUnit = document.getElementById("sand_units").value;
    if(sandUnit == "lb"){
        document.getElementById("QM_sand").innerHTML = localsand;
    }
    else if (sandUnit == "kg"){
        document.getElementById("QM_sand").innerHTML = localsand * 2.205;
    }
    else if(sandUnit == "m^3"){
        document.getElementById("QM_sand").innerHTML = localsand *  2.205 / 1000; 
    }

}