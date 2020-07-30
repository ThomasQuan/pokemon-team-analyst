import Physical from "../../assets/images/physical_icon.png";
import Status from "../../assets/images/status_icon.png";
import Special from "../../assets/images/special_icon.png";
const DamageClassDetector=(damage_type)=>{
    if(damage_type === "physical"){
        return Physical
    }
    else if(damage_type === 'status'){
        return Status
    }
    else if(damage_type === 'special'){
        return Special
    }else{
        return Special
    }
}

export default DamageClassDetector;
